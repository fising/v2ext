({
    post_starter_bg: {
        setBackgroud: function (color) {
            var cells = $('.box .cell[id^=r_]'),
                user = $(".header small.gray a:first").text();

            cells.each(function (k, e) {
                if (user === $(e).find('strong a.dark').text()) {
                    $(this).css('background', color);
                }
            });
        },
        init: function () {
            this.setBackgroud('#33CCCC');
        }
    },
    only_post_starter: {
        listener: function () {
            var self = this;

            return function () {
                var cells = $('.box .cell[id^=r_]');
                if ($('#_only_post_starter:visible').length) {
                    var user = $(".header small.gray a:first").text();
                    cells.each(function (k, e) {
                        if (user !== $(e).find('strong a.dark').text()) {
                            $(this).hide();
                        }
                    });
                    self.hide();
                } else {
                    cells.show();
                    self.show();
                }
            }
        },
        show: function () {
            if (!$('#_only_post_starter').length) {
                var html = '<a id="_only_post_starter" href="javascript:;" class="tb">仅看楼主</a>';
                var favorite = $('.topic_buttons a').get(0);
                $(html).insertBefore(favorite);
                $('#_only_post_starter').click(this.listener());
            }
            $('#_cancel_only_post_starter').hide();
            $('#_only_post_starter').show();
        },
        hide: function () {
            if (!$('#_cancel_only_post_starter').length) {
                var html = '<a id="_cancel_only_post_starter" href="javascript:;" class="tb">查看全部</a>';
                var favorite = $('.topic_buttons a').get(0);
                $(html).insertBefore(favorite);
                $('#_cancel_only_post_starter').click(this.listener());
            }
            $('#_only_post_starter').hide();
            $('#_cancel_only_post_starter').show();
        }
    },
    avatar_tips: {
        request: function (user_name, wrapper) {
            $.get('/member/' + user_name, {}, function (data) {
                var regexp = /<span class="gray">.*&nbsp; (.*)<\/span>/g;
                var matches = regexp.exec(data);
                var pieces = matches[1].split('，');
                var items = '';
                for (var i in pieces) {
                    items += '<li>' + pieces[i] + '</li>';
                }
                wrapper.find('._avatar_tips_box_base').html(items);
            }, 'text');
        },
        pos: function (avatar) {
            if (avatar.width() == 73) {
                return '_avatar_tips_large';
            }

            return '_avatar_tips_middle';
        },
        html: function (container) {
            if (container.find('._avatar_tips_wrapper').length == 0) {
                var avatar = container.find('.avatar'),
                    avatar_src = avatar.attr('src').replace('large', 'normal'),
                    avatar_link = avatar.parent().attr('href');

                if (typeof avatar_link === 'undefined') {
                    avatar_link = avatar.parent().next().next().find('strong .dark').attr('href');
                }

                if (typeof avatar_link === 'undefined') {
                    avatar_link = avatar.parent().next().next().find('h1').text();
                }

                var user_name = avatar_link.split('/').pop()

                avatar.wrap('<div class="_avatar_tips_wrapper" style="position:relative"></div>');

                var html = '' +
                    '<div class="_avatar_tips_box ' + this.pos(avatar) + '">' +
                    '<div class="_avatar_tips_box_header">' +
                    '<span class="_avatar_tips_box_avatar">' +
                    '<a target="_blank" href="' + avatar_link + '">' +
                    '<img src="' + avatar_src + '" alt="">' +
                    '</a>' +
                    '</span>' +
                    '<div class="_avatar_tips_box_text">' +
                    '<strong><a href="' + avatar_link + '">' + user_name + '</a></strong>' +
                    '<ul class="_avatar_tips_box_base"></ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                var wrapper = container.find('._avatar_tips_wrapper');
                wrapper.append(html);

                if (wrapper.find('._avatar_tips_box_base').text() === '') {
                    this.request(user_name, wrapper);
                }
            }
        },
        show: function () {
            var self = this;
            return function () {
                self.html($(this));
                $(this).find('._avatar_tips_box').fadeIn();
            }
        },
        hide: function () {
            return function () {
                $(this).find('._avatar_tips_box').hide();
            };
        },
        init: function () {
            $('.avatar').parent().hover(this.show(), this.hide());
        }
    },
    se: {
        map: {
            'baidu': [
                'https://www.baidu.com/s',
                'wd'
            ],
            'bing': [
                'http://www.bing.com/search',
                'q'
            ],
            '360': [
                'https://www.so.com/s',
                'q'
            ],
            'sogou': [
                'https://www.sogou.com/web',
                'query'
            ],
            'google': [
                'https://www.google.com/search',
                'q'
            ]
        },
        getSettings: function (type) {
            if (typeof this.map[type] !== 'undefined') {
                return this.map[type];
            }

            return this.map['google'];
        },
        inject: function (type) {
            var script = document.createElement('script');
            script.src = chrome.extension.getURL('assets/scripts/se/' + type + '.js');
            (document.head || document.documentElement).appendChild(script);
            script.remove();
        },
        set: function (type) {
            switch (type) {
                case 'baidu':
                case 'bing':
                case '360':
                case 'sogou':
                    break;
                default:
                    type = 'google';
                    break;
            }

            var settings = this.getSettings(type);

            $('#Search form').get(0).action = settings[0];
            $('#q').attr('name', settings[1]);

            this.inject(type);
        },
        init: function (search_engine) {
            this.set(search_engine);
        }
    },
    init: function () {
        var self = this,
            defaultSettings = {
            avatar_tips: true,
            only_post_starter: true,
            post_starter_reply_high_light: false,
            search_engine: "google"
        };

        chrome.storage.sync.get(defaultSettings, function (settings) {
            if (settings.avatar_tips) {
                self.avatar_tips.init();
            }

            if (settings.only_post_starter) {
                self.only_post_starter.show();
            }

            if (settings.post_starter_reply_high_light) {
                self.post_starter_bg.init();
            }

            self.se.init(settings.search_engine);
        });
    }
}).init();