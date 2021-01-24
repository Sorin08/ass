function l() {
    var j = (window.frames.length > 0) ? window.main.document : document;
    function m() {
        $("input[type=submit][value=Ok]").click()
    }
    function n(r) {
        return parseInt(r, 10)
    }
    var s = j.location.search;
    var url = String(document.URL);
    if (url.search("screen=market") > 0) {
        if (url.search("try=confirm_send") > 0) m()
    } else {
        var b = s.match(/village\=\d+/i);
        var c = s.match(/t\=\d+/i);
        var s2 = '?screen=market&mode=send' + ((b) ? '&' + b : '') + ((c) ? '&' + c : '');
        var s3 = 'game.php'+s2;
        j.location.search = s2
    }
    var k = $("form[name=market]")[0];
    if ((n(k.wood.value) > 0) || (n(k.stone.value) > 0) || (n(k.iron.value) > 0)) {
        m();
        return
    }
    var intSum = 0;
    arrRatio.forEach(function (r, p, arrParam) {
        intSum += r
    });
    var e = [n($("#wood").html()), n($("#stone").html()), n($("#iron").html())];
    var arrFactors = e.map(function (r, p, arrParam) {
        return arrRatio[p] > 0 ? (r) / arrRatio[p] : 999999
    });
    var numFactor = Math.min.apply(Math, arrFactors);
    var arrSendResources = arrRatio.map(function (r, p, arrParam) {
        return Math.floor(numFactor * r)
    });
    var numSum = 0;
    arrSendResources.forEach(function (r, p, arrParam) {
        numSum += r
    });
    var errMsg = "Resurse insuficiente: " + e;
    var blSend = (minNegustori * 1000) <= numSum;
    if (blSend) {
        var intMaxMerchants = n($("td[valign=top] table[class*=vis] tr th").text().match(/(\d+)\/(\d+)/)[1]);
        errMsg = "Numarul negustorilor este prea mic: " + intMaxMerchants + " < " + minNegustori;
        blSend = (intMaxMerchants >= minNegustori)
    }
    if (!blSend) {
        alert(errMsg);
        location.href = $("a[accessKey=d]")[0].href;
        return
    }
    var o = Math.min(intMaxMerchants, Math.floor(numSum / 1000));
    arrLastResources = arrRatio.map(function (r, p, arrParam) {
        return Math.floor(1000 * o * r / intSum)
    });
    var h = coordonate.split(" ");
    index = 0;
    marketcookie = localStorage['SendMarket'];
    if (marketcookie) index = n(marketcookie);
    if (index >= h.length) {
        index = 0
    }
    var i = h[index].split("|");
    localStorage['SendMarket'] = ++index;
    insertNumber(k.wood, arrLastResources[0]);
    insertNumber(k.stone, arrLastResources[1]);
    insertNumber(k.iron, arrLastResources[2]);
    insertNumber(k.x, parseInt(i[0]));
    insertNumber(k.y, parseInt(i[1]));
    function insertNumber(x,y) {
        x.value = y;
    }
}
l();