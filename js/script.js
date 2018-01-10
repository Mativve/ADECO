$(window).on('load', function () {
    //preload
    $("#preloader #image").fadeOut();
    $("#preloader").delay(350).fadeOut("slow");
    

    $(document).on("scroll", onScroll);


    //glaadki scrool
    var $root = $('html, body');

    $('a[href^="#"]').click(function () {
        $root.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 800);

        //        if (menu.hasClass("show")) {
        //            menu.slideToggle(500, function () {
        //                menu.toggleClass("show");
        //            });
        //        }

        return false;
    });


    //Parallax
    var ofertatop = $("#oferta").offset().top + ($("#oferta").offset().top / 1.5);
    $(window).scroll(function () {
        var scroll = $(this).scrollTop();

        if (scroll <= ofertatop) {
            $('.parallaxdown').css({
                'background-position-y': (scroll * 0.3) - 140 + 'px'
            });
        }

        if (scroll <= (($("header").height() * 2) + 400)) {
            $('.absparallax').css({
                'top': (scroll * 0.3) - 140 + 'px',
                'width': 100 + (scroll / 50) + "%"
            });
        }

    });

    //Event na scrollu
    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('nav ul li a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));

            if (!refElement.length) return;

            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('nav a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    }


    //messenger
    var t = {
        delay: 100,
        overlay: $(".fb-overlay"),
        widget: $(".fb-widget"),
        button: $(".fb-button")
    };
    setTimeout(function () {
        $("div.fb-livechat").fadeIn()
    }, 8 * t.delay), $(".ctrlq").on("click", function (e) {
        e.preventDefault(), t.overlay.is(":visible") ? (t.overlay.fadeOut(t.delay), t.widget.stop().animate({
            bottom: 0,
            opacity: 0
        }, 2 * t.delay, function () {
            $(this).hide("slow"), t.button.show()
        })) : t.button.fadeOut("medium", function () {
            t.widget.stop().show().animate({
                bottom: "30px",
                opacity: 1
            }, 2 * t.delay), t.overlay.fadeIn(t.delay)
        })
    });



    //play video on scroll
    // Get media - with autoplay disabled (audio or video)
    var media = $('video').not("[autoplay='autoplay']");
    var tolerancePixel = 40;

    function checkMedia() {
        // Get current browser top and bottom
        var scrollTop = $(window).scrollTop() + tolerancePixel;
        var scrollBottom = $(window).scrollTop() + $(window).height() - tolerancePixel;

        media.each(function (index, el) {
            var yTopMedia = $(this).offset().top;
            var yBottomMedia = $(this).height() + yTopMedia;

            if (scrollTop < yBottomMedia && scrollBottom > yTopMedia) { //view explaination in `In brief` section above
                $(this).get(0).play();
            } else {
                $(this).get(0).currentTime = 0;
                $(this).get(0).pause();
            }
        });
    }
    $(document).on('scroll', checkMedia);

});
