({
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
                    '<div class="_avatar_tips_box_base"></div>' +
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
    init: function () {
        this.only_post_starter.show();
        this.avatar_tips.init();
    }
}).init();