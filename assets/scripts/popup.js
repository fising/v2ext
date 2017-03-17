$(document).ready(function () {
    var defaultSettings = {
        avatar_tips: true,
        only_post_starter: true,
        post_starter_reply_high_light: false,
        search_engine: "google"
    };

    var init = function (settings) {
        for (var key in settings) {
            var o = $('#' + key);
            switch (key) {
                case 'avatar_tips':
                case 'only_post_starter':
                case 'post_starter_reply_high_light':
                    o.attr('checked', !!settings[key]);
                    break;
                case 'search_engine':
                    o.val(settings[key]);
                    break;
            }
        }
    }

    var save = function (settings) {
        var settings = $.extend(defaultSettings, settings);
        chrome.storage.sync.set(settings);
    }

    chrome.storage.sync.get(defaultSettings, function (settings) {
        init(settings);
    });

    $('input, select').change(function () {
        var settings = {};

        var key = $(this).attr('id');
        switch (key) {
            case 'avatar_tips':
            case 'only_post_starter':
            case 'post_starter_reply_high_light':
                $(this).attr('checked', !$(this).attr('checked'));
                settings[key] = $(this).attr('checked') === "checked";
                break;
            case 'search_engine':
                settings[key] = $(this).val();
                break;
        }

        console.log(settings[key])

        chrome.storage.sync.get(defaultSettings, function (items) {
            save($.extend(items, settings));
        });
    })
});