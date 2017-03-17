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
        }, function (window) {
            console.log(window)
        });
    },
    vars: {
        settingWindowExist: false
    },
    init: function () {
        var self = this;

        chrome.windows.onCreated.addListener(function () {
            self.vars.settingWindowExist = true;
        });

        chrome.windows.onRemoved.addListener(function () {
            self.vars.settingWindowExist = false;
        });

        chrome.browserAction.onClicked.addListener(function () {
            if (!self.vars.settingWindowExist) {
                self.createSettingWindow();
            }
        });
    }
}).init();
