window.dispatch = function () {
    var q = document.getElementById("q");
    if (q.value != "") {
        var url = 'http://www.bing.com/search?q=site:v2ex.com%20' + q.value;
        if (navigator.userAgent.indexOf('iPad') > -1 || navigator.userAgent.indexOf('iPod') > -1 || navigator.userAgent.indexOf('iPhone') > -1) {
            location.href = url;
        } else {
            window.open(url, "_blank");
        }
        return false;
    } else {
        return false;
    }
}