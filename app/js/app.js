$(document).ready(function() {

    let menu        = $('#main__menu'),
        menuOpen    = $('#menu__open'),
        menuClose   = $('#menu__close');

    menuToggle(menu, menuOpen, menuClose)

});

function menuToggle(menu, open, close) {

    $(open).click(function () {
        $(menu).css('left', 0)
    })
    $(close).click(function () {
        $(menu).css('left', '-100%')
    })
}