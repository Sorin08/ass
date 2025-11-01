(function() {
    'use strict';

    // --- Utils ---
    const normalizeSpaces = s => (s||"").replace(/\u00A0/g," ").replace(/\u202F/g," ").replace(/\s+/g," ").trim();

    // Extrage lista de jucători din dropdown
    function getPlayersList() {
        const select = document.querySelector('select[name="player_id"]');
        if (!select) return [];

        const players = [];
        const options = select.querySelectorAll('option');

        options.forEach(opt => {
            const value = opt.value;
            const text = normalizeSpaces(opt.textContent);
            const disabled = opt.hasAttribute('disabled');

            // Skip opțiunea "Selectează membru"
            if (!value || opt.hasAttribute('hidden')) return;

            players.push({
                id: value,
                name: text,
                disabled: disabled
            });
        });

        return players;
    }

    // Fetch datele unui jucător
    async function fetchPlayerData(playerId) {
        const url = new URL(location.href);
        url.searchParams.set('screen', 'ally');
        url.searchParams.set('mode', 'members_defense');

        const formData = new FormData();
        formData.append('player_id', playerId);

        try {
            const res = await fetch(url.toString(), {
                method: 'POST',
                body: formData,
                credentials: 'same-origin'
            });
            const html = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            return doc;
        } catch(e) {
            console.error(`Eroare la încărcarea jucătorului ${playerId}:`, e);
            return null;
        }
    }

    // Extrage tabelul cu date din document
    function extractVillagesTable(doc) {
        const container = doc.querySelector('#ally_content');
        if (!container) return null;

        // Găsește tabelul principal cu date
        const paddingDiv = container.querySelector('div[style*="padding"]');
        if (!paddingDiv) return null;

        const table = paddingDiv.querySelector('table.vis.w100');
        if (!table) return null;

        // Clonează tabelul complet (cu toate clasele și atributele originale)
        return table.cloneNode(true);
    }

    // Rulează raportul complet
    async function runShowAll() {
        const players = getPlayersList();
        if (players.length === 0) {
            alert('Nu s-au găsit jucători în listă!');
            return;
        }

        const allyContent = document.querySelector('#ally_content');
        if (!allyContent) return;

        // Salvează dropdown-ul și meniul
        const form = document.querySelector('#ally_content form');
        const menu = document.querySelector('#ally_content table.modemenu');
        const manageBtn = document.querySelector('#ally_content a.btn');

        // Creează container nou pentru rezultate
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'show-all-results';

        // Progress indicator
        const progressDiv = document.createElement('div');
        progressDiv.style.cssText = 'padding: 10px; background: #f0f0f0; border: 1px solid #ccc; margin: 10px 0; text-align: center; font-weight: bold;';
        progressDiv.textContent = `Încarc 0/${players.length} jucători...`;
        resultsContainer.appendChild(progressDiv);

        // Înlocuiește conținutul (păstrează doar meniul și form-ul)
        const paddingDiv = allyContent.querySelector('div[style*="padding"]');
        if (paddingDiv) {
            paddingDiv.innerHTML = '';
            paddingDiv.appendChild(resultsContainer);
        }

        let loaded = 0;

        for (const player of players) {
            loaded++;
            progressDiv.textContent = `Încarc ${loaded}/${players.length} jucători... (${player.name})`;

            // Dacă jucătorul nu are permisiuni
            if (player.disabled) {
                renderPlayerSection(resultsContainer, player, null, true);
                continue;
            }

            // Încarcă datele jucătorului
            const doc = await fetchPlayerData(player.id);
            if (!doc) {
                renderPlayerSection(resultsContainer, player, null, false);
                continue;
            }

            const villagesTable = extractVillagesTable(doc);
            renderPlayerSection(resultsContainer, player, villagesTable, false);

            // Delay mic pentru a nu suprasolicita serverul
            await new Promise(r => setTimeout(r, 200));
        }

        progressDiv.textContent = `✅ Gata! ${players.length} jucători încărcați`;
        progressDiv.style.background = '#d4edda';
        progressDiv.style.borderColor = '#c3e6cb';
        progressDiv.style.color = '#155724';
    }

    // Randează secțiunea unui jucător
    function renderPlayerSection(container, player, villagesTable, isNoPermission) {
        // Wrapper pentru fiecare jucător
        const playerDiv = document.createElement('div');
        playerDiv.style.cssText = 'padding: 12px;margin: 0 0 16px;direction: ltr;background: #e3d5b3 url(https://dsro.innogamescdn.com/asset/c02e1dd8/graphic/index/main_bg.webp) scroll right top repeat;border-collapse: separate !important;border-spacing: 0 !important;border: 1px solid #7d510f;-webkit-box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.2);box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.2);';

        // Header cu numele jucătorului
        const header = document.createElement('h3');
        header.style.cssText = 'margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #dee2e6; color: #603000';
        header.textContent = player.name;

        if (isNoPermission) {
            const badge = document.createElement('span');
            badge.style.cssText = 'background: #ffc107; color: #000; padding: 3px 8px; border-radius: 3px; font-size: 0.8em; margin-left: 10px;';
            badge.textContent = 'Fără permisiune';
            header.appendChild(badge);
        }

        playerDiv.appendChild(header);

        // Dacă nu are permisiuni sau nu are date
        if (isNoPermission || !villagesTable) {
            const noData = document.createElement('p');
            noData.style.cssText = 'color: #6c757d; font-style: italic;';
            noData.textContent = isNoPermission ? 'Acest membru nu și-a dat permisiunea de a vedea datele.' : 'Nu s-au putut încărca datele.';
            playerDiv.appendChild(noData);
            container.appendChild(playerDiv);
            return;
        }

        // Adaugă tabelul cu sate (păstrează toate clasele originale)
        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'table-responsive';
        tableWrapper.appendChild(villagesTable);
        playerDiv.appendChild(tableWrapper);

        container.appendChild(playerDiv);
    }

    // Adaugă butonul "Show All" în pagină
    function addShowAllButton() {
        const form = document.querySelector('#ally_content form');
        if (!form) return;

        // Verifică dacă butonul există deja
        if (document.getElementById('showAllBtn')) return;

        const btnContainer = document.createElement('div');
        btnContainer.style.cssText = 'margin: 10px 0;';

        const btn = document.createElement('button');
        btn.id = 'showAllBtn';
        btn.type = 'button';
        btn.className = 'btn';
        btn.textContent = '📊 Show All Members';
        btn.style.cssText = 'padding: 8px 16px; background: #0d6efd; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 14px;';

        btn.addEventListener('mouseover', () => {
            btn.style.background = '#0b5ed7';
        });

        btn.addEventListener('mouseout', () => {
            btn.style.background = '#0d6efd';
        });

        btn.addEventListener('click', runShowAll);

        btnContainer.appendChild(btn);
        form.parentNode.insertBefore(btnContainer, form.nextSibling);
    }

    // Stiluri custom pentru imagini în header
    const style = document.createElement('style');
    style.textContent = `
        #show-all-results table.vis th img {
            max-width: 32px;
            max-height: 32px;
            display: inline-block;
            vertical-align: middle;
        }

        #show-all-results table.vis th {
            text-align: center;
            vertical-align: middle;
            background-color: #c1a264;
            padding: 4px;
        }

        #show-all-results table.vis td {
            text-align: center;
            vertical-align: middle;
            padding: 4px;
        }

        #show-all-results table.vis td:first-child {
            text-align: left;
        }
    `;
    document.head.appendChild(style);

    // Pornește scriptul
    addShowAllButton();

})();
