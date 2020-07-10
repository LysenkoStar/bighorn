$(document).ready(function() {

    (function ($) {

        let menu        = $('#main__menu'),
            menuOpen    = $('#menu__open'),
            menuClose   = $('#menu__close');
        menuToggle(menu, menuOpen, menuClose);

        let sync1 = jQuery(".property__slider"),
            sync2 = jQuery(".property__slider-nav"),
            thumbnailItemClass = '.owl-item';

        let slides = sync1.owlCarousel({
            video: true,
            startPosition: 12,
            items: 1,
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 6000,
            autoplayHoverPause: false,
            nav: false,
            dots: true
        }).on('changed.owl.carousel', syncPosition);

        function syncPosition(el) {
            let $owl_slider = $(this).data('owl.carousel');
            let loop = $owl_slider.options.loop;

            if(loop){
                let count = el.item.count-1;
                let current = Math.round(el.item.index - (el.item.count/2) - .5);
                if(current < 0) {
                    current = count;
                }
                if(current > count) {
                    current = 0;
                }
            }else{
                let current = el.item.index;
            }

            let owl_thumbnail = sync2.data('owl.carousel');
            let itemClass = "." + owl_thumbnail.options.itemClass;


            let thumbnailCurrentItem = sync2
                .find(itemClass)
                .removeClass("synced")
                .eq(current);

            thumbnailCurrentItem.addClass('synced');

            if (!thumbnailCurrentItem.hasClass('active')) {
                let duration = 300;
                sync2.trigger('to.owl.carousel',[current, duration, true]);
            }
        }
        let thumbs = sync2.owlCarousel({
            startPosition: 1,
            items:3,
            loop:false,
            margin:10,
            autoplay:false,
            nav: true,
            dots: false,
            onInitialized: function (e) {
                var thumbnailCurrentItem =  $(e.target).find(thumbnailItemClass).eq(this._current);
                thumbnailCurrentItem.addClass('synced');
            },
        })
            .on('click', thumbnailItemClass, function(e) {
                e.preventDefault();
                let duration = 300;
                let itemIndex =  $(e.target).parents(thumbnailItemClass).index();
                sync1.trigger('to.owl.carousel',[itemIndex, duration, true]);
            }).on("changed.owl.carousel", function (el) {
                let number = el.item.index;
                let $owl_slider = sync1.data('owl.carousel');
                $owl_slider.to(number, 100, true);
            });

    })(jQuery);

});

function menuToggle(menu, open, close) {

    $(open).click(function () {
        $(menu).css('left', 0)
    })
    $(close).click(function () {
        $(menu).css('left', '-120%')
    })
}