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
    init: function () {
        this.only_post_starter.show();
    }
}).init();