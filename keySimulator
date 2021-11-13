javascript: (() => {
	let nIntervId;
	
	const styles = `
    .mainDiv { 
        background: lightgreen;
		box-shadow: 0px 4px 20px rgba(54, 70, 142, 0.16);
		padding: 16px;
    }
`;


	var styleSheet = document.createElement("style");
	styleSheet.type = "text/css";
	styleSheet.innerText = styles;
	document.head.appendChild(styleSheet);
	
var codeBlock = '<div class="mainDiv">' +
                    '<h2>Simulator pt tasta M</h2>' +
                    '<div class="container">' +
						'<button id="trigger">Apasa</button>' +
					'</div>' +
                '</div>';
				
	var list = document.getElementById("contentContainer"); 
	list.insertAdjacentHTML('beforebegin', codeBlock);
	
	document.getElementById("trigger").addEventListener("click", pressMInterval);

	function pressMInterval() {
		let randomPress = getRandomArbitrary(200, 250);
		console.log(randomPress);
		nIntervId = setInterval(pressM, randomPress);
		console.log(randomPress);
	}
	
	function getRandomArbitrary(min, max) {
	  return Math.floor(Math.random() * (max - min) + min);
	}
	
	function pressM () {
		window.dispatchEvent(new KeyboardEvent('keydown', {
		  key: "e",
		  keyCode: 77,
		  code: "KeyM",
		  which: 77,
		  shiftKey: false,
		  ctrlKey: false,
		  metaKey: false
		}));	
	}
})();
