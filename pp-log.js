(function () {
  'use strict';

  // Inject Bootstrap CSS (o singură dată)
  if (!document.querySelector('link[href*="bootstrap.min.css"]')) {
    const bs = document.createElement("link");
    bs.rel = "stylesheet";
    bs.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    document.head.appendChild(bs);
  }

  // --- Utils ---
  const MONTHS_RO = {"ian.":0,"feb.":1,"mar.":2,"apr.":3,"mai":4,"iun.":5,"iul.":6,"aug.":7,"sept.":8,"oct.":9,"nov.":10,"dec.":11};
  const now = new Date();
  const normalizeSpaces = s => (s||"").replace(/\u00A0/g," ").replace(/\u202F/g," ").replace(/\s+/g," ").trim();
  const stripDiacritics = s => (s||"").normalize ? s.normalize("NFD").replace(/[\u0300-\u036f]/g,"") : s;

  function parseRoDate(raw){
    if(!raw) return null;
    let s = normalizeSpaces(raw).replace(/,(\d{4})/,", $1");
    const m = s.match(/^([a-zăâîșț\.]+)\s+(\d{1,2}),\s*(?:(\d{4})\s+)?(\d{1,2}):(\d{2})$/i);
    if(!m) return null;
    const month = MONTHS_RO[m[1].toLowerCase()];
    if(month==null) return null;
    const day=+m[2], year=m[3]?+m[3]:now.getFullYear(), hour=+m[4], minute=+m[5];
    return new Date(year,month,day,hour,minute);
  }

  const parseNumberCell = s => {
    const n = parseInt(normalizeSpaces(s).replace(/[^\d\-+]/g,""),10);
    return Number.isFinite(n)?n:0;
  };

  function parseWorld(raw){
    const s = normalizeSpaces(raw);
    const m = s.match(/Lumea\s+(\d+|master)/i);
    return m?m[1]:"necunoscut";
  }

  const actionKey = a => stripDiacritics(normalizeSpaces(a)).toLowerCase();

  function isDepotSale(infoCellText){
    const t = stripDiacritics(normalizeSpaces(infoCellText)).toLowerCase();
    // E.g.: "Depozit Premium: Argilă vândut (97)"
    return t.includes("depozit premium:") && (t.includes("vandut"));
  }

  function ensureWorld(map,w){
    if(!map.has(w)) map.set(w,{ cumparat:0, depozit:0, consumat:0 });
    return map.get(w);
  }

  async function fetchDoc(url){
    const res = await fetch(url,{credentials:"same-origin"});
    const html = await res.text();
    const parser = new DOMParser();
    return parser.parseFromString(html,"text/html");
  }

  function getMaxPageFromDoc(doc){
    const selects = doc.querySelectorAll(".vis_item select");
    if(!selects.length) return 0;
    let maxIdx = 0;
    selects.forEach(sel => sel.querySelectorAll("option").forEach(opt=>{
      try{
        const url = new URL(opt.value, location.href);
        const p = +(url.searchParams.get("page")||"0");
        if(!Number.isNaN(p)) maxIdx = Math.max(maxIdx,p);
      }catch{}
    }));
    return maxIdx;
  }

  function findLogTable(doc){
    const tables = Array.from(doc.querySelectorAll("table.vis"));
    return tables.find(t=>{
      const ths = Array.from(t.querySelectorAll("tr th")).map(th=>normalizeSpaces(th.textContent).toLowerCase());
      return ths.length>=5 && ths[0].startsWith("data") && ths[2].startsWith("tranzac");
    })||null;
  }

  // --- Raportare ---
  async function runReport(){
    const perWorld = new Map();
    let totalCumparatAll = 0;      // fără 'necunoscut'
    let totalDepotAll    = 0;
    let spentLast24h     = 0;

    const firstDoc = document;
    const maxPage = getMaxPageFromDoc(firstDoc);

    // UI progress
    const progressEl = document.getElementById("progressText");
    if (progressEl) progressEl.textContent = `Încarc 0/${maxPage}`;

    function processDoc(doc){
      const table = findLogTable(doc);
      if(!table) return;

      const rows = Array.from(table.querySelectorAll("tr")).slice(1);
      for(const tr of rows){
        const tds = tr.querySelectorAll("td");
        if(tds.length<6) continue;

        const dateStr = tds[0].textContent;
        const world   = parseWorld(tds[1].textContent);
        const action  = actionKey(tds[2].textContent);
        const delta   = parseNumberCell(tds[3].textContent);
        const infoTxt = tds[5].textContent || "";
        const d       = parseRoDate(dateStr);

        // CUMPĂRAT (achiziție din magazin)
        if(action==="cumparare" && delta>0){
          const w = ensureWorld(perWorld,world);
          w.cumparat += delta;
          if(world!=="necunoscut") totalCumparatAll += delta;
        }
        // LUAT PRIN DEPOZIT (Transmite pozitiv doar dacă info spune Depozit Premium ... vândut)
        else if(action==="transmite" && delta>0 && isDepotSale(infoTxt)){
          const w = ensureWorld(perWorld,world);
          w.depozit += delta;
          totalDepotAll += delta;
        }

        // CONSUMAT (orice delta negativ: activări, depozit cumpărat etc.)
        if(delta<0){
          const w = ensureWorld(perWorld,world);
          w.consumat += Math.abs(delta);

          if(d instanceof Date && !isNaN(d)){
            const diffH = (now - d)/(1000*60*60);
            if(diffH<=24) spentLast24h += Math.abs(delta);
          }
        }
      }
    }

    // prima pagină din DOM curent
    processDoc(firstDoc);

    // iterăm paginile ulterioare
    for(let p=1; p<=maxPage; p++){
      const url = new URL(location.href);
      url.searchParams.set("screen","premium");
      url.searchParams.set("mode","log");
      url.searchParams.set("page", String(p));
      const u = url.toString();

      if (progressEl) progressEl.textContent = `Încarc ${p}/${maxPage}`;
      console.log(`[INFO] Incarc pagina ${p}/${maxPage} -> ${u}`);

      try{
        const doc = await fetchDoc(u);
        processDoc(doc);
      }catch(e){
        console.warn(`[WARN] Eroare la pagina ${p}:`, e);
      }
      await new Promise(r=>setTimeout(r,100));
    }

    if (progressEl) progressEl.textContent = `Gata (${maxPage}/${maxPage})`;
    renderTable(perWorld, { totalCumparatAll, totalDepotAll, spentLast24h });
  }

  function createUI(){
    if(document.getElementById("premium-report-bootstrap")) return;
    const div = document.createElement("div");
    div.id = "premium-report-bootstrap";
    div.className = "card shadow position-fixed bottom-0 end-0 m-3";
    div.style.zIndex = "9999";
    div.style.width = "640px";
    div.innerHTML = `
      <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white">
        <span>Raport Premium Log</span>
        <div>
          <button id="runReportBtn" class="btn btn-light btn-sm me-2">Rulare raport</button>
          <button id="closeReportBtn" class="btn btn-outline-light btn-sm">×</button>
        </div>
      </div>
      <div class="card-body p-2">
        <div id="premium-table-wrapper" class="table-responsive" style="max-height:360px; overflow:auto;">
          <p id="progressText" class="text-center text-secondary m-2">Pregătire…</p>
          <div id="tableHost"></div>
        </div>
      </div>
    `;
    document.body.appendChild(div);
    document.getElementById("runReportBtn").addEventListener("click", runReport);
    document.getElementById("closeReportBtn").addEventListener("click", () => div.remove());
  }

  function renderTable(map, totals){
    const { totalCumparatAll, totalDepotAll, spentLast24h } = totals;
    const host = document.getElementById("tableHost");
    if(!host) return;

    const entries = Array.from(map.entries())
      .sort((a,b)=>String(a[0]).localeCompare(String(b[0]),"ro",{numeric:true}));

    let html = `
      <div class="mb-2 small">
        <strong>Total cumpărat (fără „necunoscut”):</strong> ${totalCumparatAll}<br>
        <strong>Total luat prin depozit:</strong> ${totalDepotAll}<br>
        <strong>Consum ultimele 24h:</strong> ${spentLast24h}
      </div>
      <table class="table table-sm table-striped table-bordered mb-0 align-middle">
        <thead class="table-light sticky-top">
          <tr>
            <th style="min-width:90px;">Lume</th>
            <th class="text-end">Cumpărat</th>
            <th class="text-end">Luat prin depozit</th>
            <th class="text-end">Cumpărat + Depozit</th>
            <th class="text-end">Consumat</th>
          </tr>
        </thead>
        <tbody>
    `;

    for(const [world,v] of entries){
      const intrariTotal = v.cumparat + v.depozit;
      html += `
        <tr>
          <td>${world}</td>
          <td class="text-end">${v.cumparat}</td>
          <td class="text-end">${v.depozit}</td>
          <td class="text-end fw-semibold">${intrariTotal}</td>
          <td class="text-end">${v.consumat}</td>
        </tr>`;
    }
    html += `</tbody></table>`;
    host.innerHTML = html;
  }

  // pornește UI
  createUI();

})();
