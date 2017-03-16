({
    createSettingWindow: function () {
        var path = "assets/pages/popup.html";
        var width = 500;
        var height = 600;
        var left = Math.round((screen.width / 2) - (width / 2));
        var top = Math.round((screen.height / 2) - (height / 2));

        chrome.windows.create({
            url: path,
            width: width,
            height: height,
            left: left,
            top: top,
            focused: true,
            type: "popup"
        });
    },
    init: function () {
        var self = this;

        chrome.browserAction.onClicked.addListener(function (tab) {
            self.createSettingWindow();
        });
    }
}).init();
