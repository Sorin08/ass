function fakeScript() {
 units = {
    'spear'    : 50,
    'sword'    : 0,
    'axe'      : 50,
    'archer'   : 50,
    'spy'      : 10,
    'light'    : 10,
    'marcher'  : 1,
    'heavy'    : 1,
    'catapult' : 1,
    'ram'      : 10,
};

coords = '488|511 482|514 485|515 478|516 479|516 483|516 483|518 482|520 483|520 477|523 484|524 484|525 485|525';

var unitsPopulation = {
  'spear': 1,
  'sword': 1,
  'axe': 1,
  'archer': 1,
  'spy': 2,
  'light': 4,  
  'marcher': 5,
  'heavy': 6,
  'ram': 5,
  'catapult': 8,
};


  var availableTroops = document.getElementsByClassName('units-entry-all');

  availableTroops = {
    'spear': parseInt(availableTroops[0].innerHTML.substr(1).slice(0, -1)),
    'sword': parseInt(availableTroops[1].innerHTML.substr(1).slice(0, -1)),
    'axe': parseInt(availableTroops[2].innerHTML.substr(1).slice(0, -1)),
    'archer': parseInt(availableTroops[3].innerHTML.substr(1).slice(0, -1)),
	'spy': parseInt(availableTroops[4].innerHTML.substr(1).slice(0, -1)),
    'light': parseInt(availableTroops[5].innerHTML.substr(1).slice(0, -1)),
    'marcher': parseInt(availableTroops[6].innerHTML.substr(1).slice(0, -1)),
    'heavy': parseInt(availableTroops[7].innerHTML.substr(1).slice(0, -1)),
	'ram': parseInt(availableTroops[8].innerHTML.substr(1).slice(0, -1)),
	'catapult': parseInt(availableTroops[9].innerHTML.substr(1).slice(0, -1)),
  };

  var json = document.getElementsByTagName('script');
  var script = json[7].innerHTML.toString();
  json = script.split('"points":').pop();
  json = json.split(',"');  
  var points = parseInt(json[0]);
  var maxPop = Math.trunc( points * 0.01);

  var fakePop = 0;

  
  if( units.catapult > 0 ){ 
  if( availableTroops.catapult > units.catapult )fakePop += units.catapult * unitsPopulation.catapult;
  else{ units.catapult = availableTroops.catapult; availableTroops.catapult = 0; fakePop += units.catapult * unitsPopulation.catapult; }}
  
  var stop = 1;
  var noUnits = 1;
  
  if(availableTroops.spear >= units.spear)fakePop += units.spear * unitsPopulation.spear; else { units.spear = availableTroops.spear; fakePop += units.spear * unitsPopulation.spear;} 
  availableTroops.spear -= units.spear;
  if(availableTroops.sword >= units.sword)fakePop += units.sword * unitsPopulation.sword; else { units.sword = availableTroops.sword; fakePop += units.sword * unitsPopulation.sword;}
  availableTroops.sword -= units.sword;
  if(availableTroops.axe >= units.axe)fakePop += units.axe * unitsPopulation.axe; else { units.axe = availableTroops.axe; fakePop += units.axe * unitsPopulation.axe;}
  availableTroops.axe -= units.axe;
  if(availableTroops.archer >= units.archer)fakePop += units.archer * unitsPopulation.archer; else { units.archer = availableTroops.archer; fakePop += units.archer * unitsPopulation.archer;}
  availableTroops.archer -= units.archer;
  if(availableTroops.spy >= units.spy)fakePop += units.spy * unitsPopulation.spy; else { units.spy = availableTroops.spy; fakePop += units.spy * unitsPopulation.spy;}
  availableTroops.spy -= units.spy;
  if(availableTroops.light >= units.light)fakePop += units.light * unitsPopulation.light; else { units.light = availableTroops.light; fakePop += units.light * unitsPopulation.light;}
  availableTroops.light -= units.light;
  if(availableTroops.marcher >= units.marcher)fakePop += units.marcher * unitsPopulation.marcher; else { units.marcher = availableTroops.marcher; fakePop += units.marcher * unitsPopulation.marcher;}
  availableTroops.marcher -= units.marcher;
  if(availableTroops.heavy >= units.heavy)fakePop += units.heavy * unitsPopulation.heavy; else { units.heavy = availableTroops.heavy; fakePop += units.heavy * unitsPopulation.heavy;}  
  availableTroops.heavy -= units.heavy;
  if(availableTroops.ram >= units.ram)fakePop += units.ram * unitsPopulation.ram; else { units.ram = availableTroops.ram; fakePop += units.ram * unitsPopulation.ram;}
  availableTroops.ram -= units.ram;
  
  while(stop == 1){
  if( fakePop > maxPop )break;  
  if( availableTroops.spear > 0 && units.spear > 0  ){ units.spear++; availableTroops.spear--; fakePop += unitsPopulation.spear; noUnits=0; }  
  if( fakePop > maxPop )break;


  if( availableTroops.sword > 0 && units.sword > 0 ){ units.sword++; availableTroops.sword--; fakePop += unitsPopulation.sword; noUnits=0; } 
  if( fakePop > maxPop )break;
   
  if( availableTroops.axe > 0 && units.axe > 0 ){ units.axe++; availableTroops.axe--; fakePop += unitsPopulation.axe; noUnits=0; } 
  if( fakePop > maxPop )break;
    
  if( availableTroops.archer > 0 && units.archer > 0 ){ units.archer++; availableTroops.archer--; fakePop += unitsPopulation.archer; noUnits=0; } 
  if( fakePop > maxPop )break;
    
  if( availableTroops.spy > 0 && units.spy > 0 ){ units.spy++; availableTroops.spy--; fakePop += unitsPopulation.spy; noUnits=0; } 
  if( fakePop > maxPop )break;  
  
  if( availableTroops.light > 0 && units.light > 0 ){ units.light++; availableTroops.light--; fakePop += unitsPopulation.light; noUnits=0; } 
  if( fakePop > maxPop )break;
    
  if( availableTroops.marcher > 0 && units.marcher > 0 ){ units.marcher++; availableTroops.marcher--; fakePop += unitsPopulation.marcher; noUnits=0; } 
  if( fakePop > maxPop )break;
   
  if( availableTroops.heavy > 0 && units.heavy > 0 ){ units.heavy++; availableTroops.heavy--; fakePop += unitsPopulation.heavy; noUnits=0;} 

  if( fakePop > maxPop )break;
    
  if( availableTroops.ram > 0 && units.ram > 0 ){ units.ram++; availableTroops.ram--; fakePop += unitsPopulation.ram; noUnits=0;} 
  if( fakePop > maxPop )break;

  if( availableTroops.spear == 0 && availableTroops.sword == 0 && availableTroops.axe == 0 && availableTroops.archer == 0 && availableTroops.spy == 0 && availableTroops.light == 0 && availableTroops.marcher == 0 && availableTroops.heavy == 0 ) stop--;
  
  if( noUnits == 1 ) stop--;
  
  noUnits=1;
  
  } 


name = 'aa1a1';

var d = document;

function N(a) {
    return (d.getElementsByName(a)[0]);
}

function max(a) {
    return parseInt(d.units[a].nextSibling.nextSibling.innerHTML.match(/\d+/), 10);
}
if (N('x') && N('x').value == '') {
    if (!N(name)) $('h3').append('<span name="' + name + '" style="color:green;font-size:11px;"></span>');
    coords = coords.split(' ');
    index = 0;
    farmcookie = d.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (farmcookie != null) index = parseInt(farmcookie[2]);
    N(name).innerHTML = ' Tinta nr.' + (index + 1) + '  (' + coords[index] + '). Total: ' + coords.length;
    if (index >= coords.length) {
        N(name).style.color = '#F00';
        N(name).innerHTML = ' Ai ajuns la capatul listei!';
    } else N(name).style.color = 'green';
    if (index >= coords.length) index = 0;
    coords = coords[index];
    coords = coords.split('|');
    index++;
    cookie_date = new Date(2051, 08, 11);
    d.cookie = name + '=' + index + ';expires=' + cookie_date.toGMTString();
    N('x').value = coords[0];
    N('y').value = coords[1];
    for (i in units) {
        if (N(i)) {
            u = parseInt(units[i], 10);
            n = max(i) + u;
            if (isNaN(u)) insertUnit(N(i), max(i));
            else if (u < 0) n < 0 ? '' : insertUnit(N(i), n);
            else if (max(i) >= units[i]) insertUnit(N(i), u);
        }
    }
}
void 0; 
}
