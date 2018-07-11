({
    createSettingWindow: function () {
        var path = "assets/pages/popup.html";
        var width = 318;
        var height = 456;
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
    vars: {
        settingWindowId: 0
    },
    init: function () {
        var self = this;

        chrome.windows.onCreated.addListener(function (window) {
            self.vars.settingWindowId = window.id;
        });

        chrome.windows.onRemoved.addListener(function () {
            self.vars.settingWindowId = 0;
        });

        chrome.browserAction.onClicked.addListener(function () {
            if (0 == self.vars.settingWindowId) {
                self.createSettingWindow();
            } else {
                chrome.windows.update(self.vars.settingWindowId, {
                    drawAttention: true,
                    focused: true
                });
            }
        });
    }
}).init();
