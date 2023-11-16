javascript: (() => {
    let nIntervId;
    let waitIntervalID, pressIntervalID, countdownIntervalID;
    let timeToStart = 0, timeToStop = 0;

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
        'Random pentru pornire (min): <input type="number" value="8" id="startTime1">' + '<br>' +
        'Random pentru pornire (max): <input type="number" value="12" id="startTime2">' + '<br>' +
        'Random pentru a apasa M (min): <input type="number" value="0.5" id="pressTime1">' + '<br>' +
        'Random pentru a apasa M (max): <input type="number" value="0.8" id="pressTime2">' + '<br>' +
        '<button id="startButton">Start</button>' +
        '<button id="stopButton">Stop</button>' +

        '<p id="status">' +
            'Scriptul va porni in: <span id="timeStart">0</span>' + '<br>' +
            'Apasa pe M timp de: <span id="timePlay">0</span>' +
        '</p>' +
        '</div>';

    var list = document.getElementById("contentContainer");
    list.insertAdjacentHTML('beforebegin', codeBlock);

    let startTime1 = parseFloat(document.getElementById('startTime1').value);
    let startTime2 = parseFloat(document.getElementById('startTime2').value);
    let pressTime1 = parseFloat(document.getElementById('pressTime1').value);
    let pressTime2 = parseFloat(document.getElementById('pressTime2').value);

    document.getElementById('startButton').addEventListener('click', function() {
        startTime1 = parseFloat(document.getElementById('startTime1').value);
        startTime2 = parseFloat(document.getElementById('startTime2').value);
        pressTime1 = parseFloat(document.getElementById('pressTime1').value);
        pressTime2 = parseFloat(document.getElementById('pressTime2').value);

        startPressing(startTime1, startTime2, pressTime1, pressTime2);
    });

    document.getElementById('stopButton').addEventListener('click', stopPressing);
    function scheduleNextPress() {
        clearInterval(waitIntervalID);
        clearInterval(pressIntervalID);
        clearInterval(countdownIntervalID);
        timeToStart = getRandomTimeInSeconds(startTime1, startTime2);
        waitIntervalID = setInterval(() => {
            if (timeToStart > 0) {
                updateTimeDisplay(timeToStart, 0);
                timeToStart--;
            } else {
                clearInterval(waitIntervalID);
                startPressing();
            }
        }, 1000);
    }

    function startPressing() {
        timeToStop = getRandomTimeInSeconds(pressTime1, pressTime2);
        pressMInterval();
        countdownIntervalID = setInterval(() => {
            if (timeToStop > 0) {
                updateTimeDisplay(0, timeToStop);
                timeToStop--;
            } else {
                clearInterval(countdownIntervalID);
                scheduleNextPress();
            }
        }, 1000);
    }

    function stopPressing() {
        clearInterval(waitIntervalID);
        clearInterval(pressIntervalID);
        updateTimeDisplay(0, 0);
    }

    function pressMInterval() {
        let randomPress = getRandomArbitrary(400, 750);
        pressIntervalID = setInterval(() => {
            if (timeToStop > 0) {
                pressM();
            } else {
                clearInterval(pressIntervalID);
            }
        }, randomPress);
    }

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function pressM() {
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

    function getRandomTimeInSeconds(min, max) {
        const minSec = min * 60;
        const maxSec = max * 60;
        return Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
    }

    function updateTimeDisplay(startSeconds, playSeconds) {
        const startMinutes = Math.floor(startSeconds / 60);
        const startSecRemaining = startSeconds % 60;
        const playMinutes = Math.floor(playSeconds / 60);
        const playSecRemaining = playSeconds % 60;

        document.getElementById('timeStart').textContent = `${startMinutes}m ${startSecRemaining}s`;
        document.getElementById('timePlay').textContent = `${playMinutes}m ${playSecRemaining}s`;
    }

})();
