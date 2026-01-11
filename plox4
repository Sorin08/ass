var win = (window.frames.length > 0) ? window.main : window; 
if(!(window.main||self).jQuery.xml2json){
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';5(10.M)(w($){$.N({11:w(j,k){5(!j)t{};w B(d,e){5(!d)t y;6 f=\'\',2=y,E=y;6 g=d.x,12=l(d.O||d.P);6 h=d.v||d.F||\'\';5(d.G){5(d.G.7>0){$.Q(d.G,w(n,a){6 b=a.x,u=l(a.O||a.P);6 c=a.v||a.F||\'\';5(b==8){t}z 5(b==3||b==4||!u){5(c.13(/^\\s+$/)){t};f+=c.H(/^\\s+/,\'\').H(/\\s+$/,\'\')}z{2=2||{};5(2[u]){5(!2[u].7)2[u]=p(2[u]);2[u][2[u].7]=B(a,R);2[u].7=2[u].7}z{2[u]=B(a)}}})}};5(d.I){5(d.I.7>0){E={};2=2||{};$.Q(d.I,w(a,b){6 c=l(b.14),C=b.15;E[c]=C;5(2[c]){5(!2[c].7)2[c]=p(2[c]);2[c][2[c].7]=C;2[c].7=2[c].7}z{2[c]=C}})}};5(2){2=$.N((f!=\'\'?A J(f):{}),2||{});f=(2.v)?(D(2.v)==\'16\'?2.v:[2.v||\'\']).17([f]):f;5(f)2.v=f;f=\'\'};6 i=2||f;5(k){5(f)i={};f=i.v||f||\'\';5(f)i.v=f;5(!e)i=p(i)};t i};6 l=w(s){t J(s||\'\').H(/-/g,"18")};6 m=w(s){t(D s=="19")||J((s&&D s=="K")?s:\'\').1a(/^((-)?([0-9]*)((\\.{0,1})([0-9]+))?$)/)};6 p=w(o){5(!o.7)o=[o];o.7=o.7;t o};5(D j==\'K\')j=$.S(j);5(!j.x)t;5(j.x==3||j.x==4)t j.F;6 q=(j.x==9)?j.1b:j;6 r=B(q,R);j=y;q=y;t r},S:w(a){6 b;T{6 c=($.U.V)?A 1c("1d.1e"):A 1f();c.1g=W}X(e){Y A L("Z 1h 1i 1j 1k 1l")};T{5($.U.V)b=(c.1m(a))?c:W;z b=c.1n(a,"v/1o")}X(e){Y A L("L 1p Z K")};t b}})})(M);',62,88,'||obj|||if|var|length||||||||||||||||||||||return|cnn|text|function|nodeType|null|else|new|parseXML|atv|typeof|att|nodeValue|childNodes|replace|attributes|String|string|Error|jQuery|extend|localName|nodeName|each|true|text2json|try|browser|msie|false|catch|throw|XML|window|xml2json|nn|match|name|value|object|concat|_|number|test|documentElement|ActiveXObject|Microsoft|XMLDOM|DOMParser|async|Parser|could|not|be|instantiated|loadXML|parseFromString|xml|parsing'.split('|'),0,{}));
}
function fnAjax(url,method,params,type,isAsync,callback){
		var payload=null;
		(window.main||self).$.ajax({
			'async':isAsync,
			'url':url,
			'data':params,
			'dataType':type,
			'type':String(method||'GET').toUpperCase(),
			'error':function(req,status,err){throw(status);},
			'success':function(data,status,req){if(!isAsync){payload=data;}if(typeof(callback)=='function'){callback(data,status,req);}}
		});
		if(!isAsync){
			if(typeof(callback)=='function'){
				callback(payload);
			}
			return payload;
		}
	}
function FetchUnitConfig(){
		var unitConfig = null;

		fnAjax('/interface.php','GET',{'func':'get_unit_info'},'xml',false,function(data,status,req){
			unitConfig=(window.main||self).$.xml2json(data);
		});
		return unitConfig;
	}
var unitConfig = FetchUnitConfig(); 

var speed = {   
 spear: parseFloat(unitConfig.spear.speed),    
 sword: parseFloat(unitConfig.sword.speed),    
 archer: parseFloat(unitConfig.archer.speed),   
 axe: parseFloat(unitConfig.axe.speed),   
 spy: parseFloat(unitConfig.spy.speed),   
 light: parseFloat(unitConfig.light.speed), 
 marcher: parseFloat(unitConfig.marcher.speed), 
 heavy: parseFloat(unitConfig.heavy.speed),    
 ram: parseFloat(unitConfig.ram.speed),    
 catapult: parseFloat(unitConfig.catapult.speed),   
 knight: parseFloat(unitConfig.knight.speed),    
 snob: parseFloat(unitConfig.snob.speed)
 };

var doc=document;

if(window.frames.length>0)
        doc=window.main.document;

url=doc.URL;

function getID(url){
        var start=url.indexOf("id=")+3;
        var end=url.indexOf('%26',start);
        var id;if(end>0)id=url.substring(start,end);
        else{id=url.substring(start);}
        return id;
}

function getWorld(url){
        start=url.indexOf("ro");
        return url.substring(start,url.indexOf('.',start));
}

includeRallyPoint = function(gameDoc)
	{		
		var commandsTable = gameDoc.getElementById('combined_table');
		var fillerSpan = combined_table.rows[0].cells.length;
		
		var rallyLink = document.createElement('th');
		combined_table.rows[0].appendChild(rallyLink);
		
		rallyLink.innerHTML = "Link";
		
		for(var i=1; i < combined_table.rows.length; i++)
		{	
		    var text = combined_table.rows[i].cells[1].innerHTML;
	        textID = text.substring(text.indexOf("data-id=")+9, text.indexOf(">")-1);
			
			link='http://'+getWorld(url)+".triburile.ro/game.php?village="+textID+"&screen=place";
			
			var rallyLinkCell = combined_table.rows[i].insertCell(-1);
			rallyLinkCell.innerHTML = '<a href="'+link+'"><img src="http://cdn.tribalwars.net/graphic//buildings/place.png" title="Piata" alt="Piata Centrala"/></a>';
	    }

	};

function srtfnc(a,b){
         if(Number(a[0])<Number(b[0]))return-1;
         if(Number(b[0])<Number(a[0]))return 1;return 0
}
function zeroPad(number,length){
var n=number.toString();
while(n.length<length){n="0"+n;}
return n;
}
var doc=(window.frames.length>0)?window.main.document:document;

var destby=String(doc.title.match(/\d+\|\d+/))||'500|500';

destby=prompt("Introduceti satul tinta",destby);
destby=destby.split("|");

var maxdelay;while(true){maxdelay=prompt("Durata maxima (eg, 3:48:50), lasati liber pentru timp nelimitat","");
maxdelay=(maxdelay?maxdelay.split(":"):[]);while(maxdelay.length<3){maxdelay.splice(0,0,0)}
if(maxdelay.length==3){break}}maxdelay=maxdelay.map(function(x){return parseInt(x,10)});
var maxdelaytime=(maxdelay[0]*60*60)+(maxdelay[1]*60)+maxdelay[2];
var diffx;
var diffy;
function fnGetMode(){var scrape;var mode=(scrape=window.location.href.match(/&mode\=(\w+)/i))?scrape[1]:null;
if(!mode){var win=(window.frames.length>0)?window.main:window;
var srcHTML=win.$("td[class=selected]").html();
if(srcHTML){mode=(scrape=srcHTML.match(/;mode\=(\w+)/i))?scrape[1]:null}}return mode}
if(doc.URL.match(/screen\=overview_villages/i)&&(fnGetMode()=='combined'))
{var t=doc.getElementById('combined_table');rs=[];
for(j=1;j<t.rows.length;j++)
{by=t.rows[j].cells[1].innerHTML.match(/\((\d+\|\d+)\)\s*K\d+/i);by=by[1].split("|");
diffx=destby[0]-by[0];diffy=destby[1]-by[1];
dist=Math.sqrt(diffx*diffx+diffy*diffy);
for(c=1;c<t.rows[j].cells.length;c++){var headerHTML=t.rows[0].cells[c].innerHTML;var unitMatch=headerHTML.match(/unit_(\w+)/);if(unitMatch){
unit=unitMatch[1];
time=dist*speed[unit]*60;h=zeroPad(Math.floor(time/3600),2);
mm=zeroPad(Math.floor((time/60)% 60),2);s=zeroPad(Math.round(time% 60),2);
res=h+':'+mm+':'+s;if(t.rows[j].cells[c].className.indexOf('hidden')>=0){t.rows[j].cells[c].innerHTML=res}
else if(maxdelaytime==0){t.rows[j].cells[c].innerHTML="<B>"+t.rows[j].cells[c].innerHTML+"</B><BR>"+res}
else if(time<maxdelaytime){t.rows[j].cells[c].innerHTML="<FONT COLOR=\"#0000FF\"><B>"+t.rows[j].cells[c].innerHTML+"</B><BR>"+res+"</FONT>"}
else{t.rows[j].cells[c].innerHTML="<FONT COLOR=\"#FF0000\"><B>"+t.rows[j].cells[c].innerHTML+"</B><BR>"+res+"</FONT>"}}}
rs.push([dist,t.rows[j].innerHTML])}
rs=rs.sort(srtfnc);
while(t.rows.length>1){t.deleteRow(1)}
for(j=0;j<rs.length;j++){
rr=t.insertRow(j+1);rr.innerHTML=rs[j][1];}
for(j=1;j<t.rows.length;j++){t.rows[j].className=((j%252==1)?'nowrap row_a':'nowrap row_b')}
includeRallyPoint((window.frames.length>0)?window.main.document:document);}
