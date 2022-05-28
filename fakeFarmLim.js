calcTroops();
enterCoords();

function calcTroops () {
	let fakeLimit = parseInt(window.fakeLimit || 1);

	let doc=document;
	if(window.frames.length>0 && window.main!=null)
			doc=window.main.document;
	let url=doc.URL;
	if(url.indexOf('screen=place')==-1)
		window.open('game.php?screen=place', '_self');

	let points = game_data.village.points;
	let min_pop = Math.floor(points*fakeLimit/100);

	let selectAllUnitsScript = document.querySelectorAll(".unitsInput");
	let allUnits = [];

	for(i=0; i < selectAllUnitsScript.length; i++) {
		if(selectAllUnitsScript[i].name === "snob" || selectAllUnitsScript[i].name === "knight") {
			selectAllUnitsScript[i].value = 0;
		} else {
			let value = selectAllUnitsScript[i].attributes[6].value;
			selectAllUnitsScript[i].value = parseInt(value);
		}
	}

	let current_units = Object.assign({},...$(".unitsInput").map(function(){return {[this.name]:Math.floor(this.value)}}));

	let unitsPop = {"spear":1, "sword":1, "axe":1, "archer":1, "spy":2, "light":4, "marcher":5, "heavy":6, "ram":5, "catapult":8, "knight":10, "snob":100};

	let currentPop = Object.entries(current_units).reduce(function(total, pair){
		let [key, val] = pair;
		console.log("key", key);
		console.log("val", val);
		return total + unitsPop[key]*val;
	}, 0);

	let multiply_factor = Math.max(min_pop,1) / Math.max(currentPop, 1);

	console.log("multiply_factor", multiply_factor);

	$(".unitsInput").val(function(){
		return Math.ceil(multiply_factor * Math.floor(this.value));
	}); 
}


function enterCoords() {
	const styles = `
    .mainDiv { 
        background: lightgreen;
		box-shadow: 0px 4px 20px rgba(54, 70, 142, 0.16);
		padding: 16px;
    }

	.mainDiv textarea {
		width: 100%;
		height: 150px;
	}
`;


	var styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = styles;
	document.head.appendChild(styleSheet);
	
	var codeBlock = '<div class="mainDiv">' +
                    '<h2>Coordonate pt fake</h2>' +
                    '<div class="container">' +
						'<textarea id="fakeCoords"></textarea>' +
						'<button id="trigger">Salveaza coordonate</button>' +
					'</div>' +
                '</div>';

	var list = document.getElementById("contentContainer"); 
	list.insertAdjacentHTML('beforebegin', codeBlock);

	document.getElementById("trigger").addEventListener("click", saveCoords);
				
	let coords = '';
	let customCoords; 

	function saveCoords() {
		let customCoords = document.getElementById("fakeCoords").value;
		localStorage.setItem("manualCoords", customCoords);
		coords = customCoords;
		alert('Coordonate salvate');
		location.reload();
	}

	if(localStorage.getItem("manualCoords") === null) {
		alert('Introduceti coordonate');
	} else {
		coords = localStorage.getItem("manualCoords");
		document.getElementById("fakeCoords").value = coords;
	}

	var d = document;

	function N(a) {
		return (d.getElementsByName(a)[0]);
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
	}
}
