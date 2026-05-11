javascript:(function () {
    var scriptData = { name: 'Categorize Villages', version: 'v1.2.4', author: 'Modified by Request', authorUrl: 'https://twscripts.dev/', helpLink: 'https://forum.tribalwars.net/' };
    if (typeof DEBUG !== 'boolean') DEBUG = false;
    var ALLOWED_GAME_SCREENS = ['info_player'];
    var offensiveKeywords = ["off", "offensive", "atac"];
    var defensiveKeywords = ["deff", "def", "defensive", "aparare"];

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        try { return new URL(url, window.location.href).searchParams.get(name); }
        catch (e) { return null; }
    }

    function startProgressBar(total) {
        var width = jQuery('#contentContainer')[0].clientWidth;
        var preloaderContent = '<div id="progressbar" class="progress-bar" style="margin-bottom:12px;">' +
            '<span class="count label">0/' + total + '</span>' +
            '<div id="progress"><span class="count label" style="width: ' + width + 'px;">0/' + total + '</span></div></div>';
        jQuery('#contentContainer').eq(0).prepend(preloaderContent);
    }

    function updateProgressBar(index, total) {
        jQuery('#progress').css('width', (((index + 1) / total) * 100) + '%');
        jQuery('.count').text('Fetching ' + (index + 1) + '/' + total);
        if (index + 1 === total) { jQuery('#progressbar').fadeOut(1000); }
    }

    function fetchAll(urls, onLoad, onDone, onError) {
        var numDone = 0;
        var lastRequestTime = 0;
        var minWaitTime = 250;
        function loadNext() {
            if (numDone === urls.length) { onDone(); return; }
            var now = Date.now();
            var timeElapsed = now - lastRequestTime;
            if (timeElapsed < minWaitTime) { setTimeout(loadNext, minWaitTime - timeElapsed); return; }
            lastRequestTime = now;
            jQuery.get(urls[numDone]).done(function (data) {
                try { onLoad(numDone, data); numDone++; loadNext(); }
                catch (e) { onError(e); }
            }).fail(function (xhr) { onError(xhr); });
        }
        loadNext();
    }

    function initCategorizeVillages() {
        if (!ALLOWED_GAME_SCREENS.includes(getParameterByName('screen'))) { UI.ErrorMessage('Script must be executed from Player Info screen!'); return; }
        var villagesLinks = [];
        jQuery('#villages_list td a').not('.ctx').each(function () { 
            var href = jQuery(this).attr('href');
            if(href && href.includes('screen=info_village')) { villagesLinks.push(href); }
        });
        
        if (villagesLinks.length === 0) { UI.InfoMessage('No villages found!'); return; }
        startProgressBar(villagesLinks.length);
        UI.SuccessMessage('Fetching village notes...');
        var villageData = [];

        fetchAll(
            villagesLinks,
            function (index, data) {
                updateProgressBar(index, villagesLinks.length);
                var htmlDoc = jQuery.parseHTML(data);
                var content = jQuery(htmlDoc);
                
                var villageName = content.find('#content_value h2').text().trim();
                
                // REVISED COORD LOGIC: Look for the 555|444 pattern in the entire content area
                var pageText = content.find('#content_value').text();
                var coordMatch = pageText.match(/\d{1,3}\|\d{1,3}/);
                var villageCoords = coordMatch ? coordMatch[0] : "000|000";

                var noteElements = content.find('.village-note-body');
                var offensiveCount = 0, defensiveCount = 0;

                noteElements.each(function () {
                    var noteText = jQuery(this).text().trim().toLowerCase();
                    var words = noteText.split(/\s+/);
                    var first5 = words.slice(0, 5);
                    if (first5.some(function (word) { return offensiveKeywords.indexOf(word) > -1; })) { offensiveCount++; }
                    if (first5.some(function (word) { return defensiveKeywords.indexOf(word) > -1; })) { defensiveCount++; }
                });

                var type = "Unknown";
                if (noteElements.length === 0 || noteElements.text().trim() === "") { type = "No notes"; }
                else if (offensiveCount > defensiveCount) { type = "Offensive"; }
                else if (defensiveCount > offensiveCount) { type = "Defensive"; }
                else { type = "Unknown"; }

                villageData.push({ name: villageName, coords: villageCoords, type: type });
                
                var villageUrl = villagesLinks[index];
                var villageId = getParameterByName('id', villageUrl);
                var villageRow = jQuery('#villages_list a[href*="id=' + villageId + '"]').closest('tr');
                if (villageRow.length) {
                    villageRow.find('td:last').append('<span style="margin-left: 5px; font-weight: bold; color: ' +
                        (type === 'Offensive' ? 'red' : type === 'Defensive' ? 'blue' : type === 'No notes' ? 'green' : 'gray') +
                        ';">(' + type + ')</span>');
                }
            },
            function () { displayVillageCategories(villageData); },
            function (error) { UI.ErrorMessage('Error fetching village notes!'); console.error(scriptData.name + " " + scriptData.version + " Error:", error); }
        );
    }

    function displayVillageCategories(villages) {
        var offensiveVillages = villages.filter(function (v) { return v.type === "Offensive"; });
        var defensiveVillages = villages.filter(function (v) { return v.type === "Defensive"; });
        var noNotesVillages = villages.filter(function (v) { return v.type === "No notes"; });
        
        var offensiveList = offensiveVillages.map(function (v) { return v.coords; }).join(' ');
        var defensiveList = defensiveVillages.map(function (v) { return v.coords; }).join(' ');
        var noNotesList = noNotesVillages.map(function (v) { return v.coords; }).join(' ');

        var content = '<div id="categorize_results" style="background-color: #e3d5b3; border: 1px solid #7d510f; padding: 10px; margin-bottom: 10px;">' +
            '<p><b>Offensive villages (' + offensiveVillages.length + '):</b><br><textarea style="width:95%; height:40px;">' + (offensiveList || 'None') + '</textarea></p>' +
            '<p><b>Defensive villages (' + defensiveVillages.length + '):</b><br><textarea style="width:95%; height:40px;">' + (defensiveList || 'None') + '</textarea></p>' +
            '<p><b>No notes villages (' + noNotesVillages.length + '):</b><br><textarea style="width:95%; height:40px;">' + (noNotesList || 'None') + '</textarea></p></div>';
        
        jQuery("#categorize_results").remove(); // Clean up old results if re-run
        jQuery("#content_value").prepend(content);
    }

    initCategorizeVillages();
})();
