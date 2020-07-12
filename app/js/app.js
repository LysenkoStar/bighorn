jQuery.noConflict();

$(document).ready(function() {

    let menu        = $('#main__menu'),
        menuOpen    = $('#menu__open'),
        menuClose   = $('#menu__close');
    menuToggle(menu, menuOpen, menuClose);


    $(window).on('load', function () {
        jQuery(function($){

            var sync1 = $("#property__slider-thumbnail");
            var sync2 = $("#property__slider-navigation");

            var thumbnailItemClass = '.owl-item';

            var slides = sync1.owlCarousel({
                video:true,
                startPosition: 1,
                items:1,
                loop:true,
                margin: 0,
                autoplay:true,
                autoplayTimeout:6000,
                autoplayHoverPause:false,
                nav: false,
                dots: true
            }).on('changed.owl.carousel', syncPosition);

            function syncPosition(el) {
                $owl_slider = $(this).data('owl.carousel');
                var loop = $owl_slider.options.loop;

                if(loop){
                    var count = el.item.count-1;
                    var current = Math.round(el.item.index - (el.item.count/2) - .5);
                    if(current < 0) {
                        current = count;
                    }
                    if(current > count) {
                        current = 0;
                    }
                }else{
                    var current = el.item.index;
                }

                var owl_thumbnail = sync2.data('owl.carousel');
                var itemClass = "." + owl_thumbnail.options.itemClass;


                var thumbnailCurrentItem = sync2
                    .find(itemClass)
                    .removeClass("synced")
                    .eq(current);

                thumbnailCurrentItem.addClass('synced');

                if (!thumbnailCurrentItem.hasClass('active')) {
                    var duration = 300;
                    sync2.trigger('to.owl.carousel',[current, duration, true]);
                }
            }
            var thumbs = sync2.owlCarousel({
                startPosition: 12,
                items:3,
                loop:true,
                margin: 0,
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
                    var duration = 300;
                    var itemIndex =  $(e.target).parents(thumbnailItemClass).index();
                    sync1.trigger('to.owl.carousel',[itemIndex, duration, true]);
                }).on("changed.owl.carousel", function (el) {
                    var number = el.item.index;
                    $owl_slider = sync1.data('owl.carousel');
                    $owl_slider.to(number, 100, true);
                });


        });
    });

});



function menuToggle(menu, open, close) {

    $(open).click(function () {
        $(menu).css('left', 0)
    })
    $(close).click(function () {
        $(menu).css('left', '-120%')
    })
}