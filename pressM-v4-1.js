javascript:(() => {
    let nIntervId, countdownIntervalID, botCheckIntervalID, farmWindow;
    let timeToStart = 0;

    const styles = `
        .mainDiv {
            background: lightgreen;
            box-shadow: 0px 4px 20px rgba(54, 70, 142, 0.16);
            padding: 16px;
        }
        .mainDiv button {
            margin-top: 4px;
            margin-right: 4px;
        }
    `;
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    var codeBlock =
        '<div class="mainDiv">' +
            '<h2>Simulator pt tasta M cu oprire la primul sat</h2>' +
            '<div class="container">' +
                'Random pentru pornire (min, minute): <input type="number" value="8" id="startTime1">' +
                '<br>' +
                'Random pentru pornire (max, minute): <input type="number" value="10" id="startTime2">' +
                '<br>' +
                '<button id="openFarmTabButton">Deschide tab farm</button>' +
                '<button id="startButton">Start</button>' +
                '<button id="stopButton">Stop</button>' +
                '<p id="status">' +
                    'Scriptul va porni in: <span id="timeStart">0</span>' +
                '</p>' +
            '</div>' +
        '</div>';

    var list = document.getElementById("contentContainer");
    if (!list) {
        alert('Nu am gasit elementul cu id="contentContainer".');
        return;
    }
    list.insertAdjacentHTML('beforebegin', codeBlock);

    let startingVillage = getVillageNumber();
    let lastVillage = startingVillage;

    document.getElementById('openFarmTabButton').addEventListener('click', openFarmTab);
    document.getElementById('startButton').addEventListener('click', startPressing);
    document.getElementById('stopButton').addEventListener('click', stopPressing);

    function openFarmTab() {
        const currentVillage = getVillageNumber() || startingVillage || '123';
        const farmUrl = `https://ro112.triburile.ro/game.php?village=${currentVillage}&screen=am_farm`;
        farmWindow = window.open(farmUrl, '_blank');
    }

    function startPressing() {
        startBotProtectionWatcher();
        pressMInterval();
    }

function startBotProtectionWatcher() {
    if (botCheckIntervalID) clearInterval(botCheckIntervalID);

    botCheckIntervalID = setInterval(() => {
        try {
            const currentSettingsDiv = document.getElementById('settingsDiv');
            if (!currentSettingsDiv) {
                stopPressing();
                window.close();
                return;
            }

            if (farmWindow && !farmWindow.closed) {
                const farmDoc = farmWindow.document;
                if (farmDoc && farmDoc.getElementById) {
                    const farmSettingsDiv = farmDoc.getElementById('settingsDiv');

                    if (!farmSettingsDiv) {
                        stopPressing();
                        farmWindow.close();
                    }
                }
            }
        } catch (e) {
            console.error('Eroare la verificarea settingsDiv:', e);
        }
    }, 1000);
}

    function scheduleNextPress() {
        clearInterval(countdownIntervalID);
        let startTime1 = parseFloat(document.getElementById('startTime1').value);
        let startTime2 = parseFloat(document.getElementById('startTime2').value);
        timeToStart = getRandomTimeInSeconds(startTime1, startTime2);

        countdownIntervalID = setInterval(() => {
            if (timeToStart > 0) {
                updateTimeDisplay(timeToStart);
                timeToStart--;
            } else {
                clearInterval(countdownIntervalID);
                pressMInterval();
            }
        }, 1000);
    }

    function pressMInterval() {
        let randomPress = getRandomArbitrary(200, 250);
        clearInterval(nIntervId);
        nIntervId = setInterval(pressM, randomPress);
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
        verifyVillageNumber();
    }

    function verifyVillageNumber() {
        const currentVillage = getVillageNumber();
        if (currentVillage !== lastVillage) {
            lastVillage = currentVillage;
            if (currentVillage === startingVillage) {
                clearInterval(nIntervId);
                scheduleNextPress();
            }
        }
    }

    function stopPressing() {
        clearInterval(nIntervId);
        clearInterval(countdownIntervalID);
        clearInterval(botCheckIntervalID);
        updateTimeDisplay(0);
    }

    function getRandomTimeInSeconds(min, max) {
        const minSec = min * 60;
        const maxSec = max * 60;
        return Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec;
    }

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function getVillageNumber() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('village');
    }

    function updateTimeDisplay(startSeconds) {
        const startMinutes = Math.floor(startSeconds / 60);
        const startSecRemaining = startSeconds % 60;
        document.getElementById('timeStart').textContent = `${startMinutes}m ${startSecRemaining}s`;
    }
})();
