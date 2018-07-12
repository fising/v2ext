({
    createSettingWindow: function () {
        var self = this;
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
        }, function (w) {
            w.alwaysOnTop = true;
            self.vars.settingWindowId = w.id;
        });
    },
    vars: {
        settingWindowId: 0
    },
    init: function () {
        var self = this;

        chrome.browserAction.onClicked.addListener(function () {
            chrome.windows.get(self.vars.settingWindowId, {
                windowTypes: ['popup']
            }, function (w) {
                if (chrome.runtime.lastError) {
                    return self.createSettingWindow();
                }

                chrome.windows.update(self.vars.settingWindowId, {
                    drawAttention: true,
                    focused: true
                }, function (w) {
                    w.alwaysOnTop = true;
                });
            });
        });
    }
}).init();
