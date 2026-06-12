(function ($) {
    "use strict";


    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    // Mouse-tracking Parallax in Hero Section (Desktop only)
    $(document).ready(function() {
        var $hero = $('#home');
        var $heroImg = $('.img-hero-container img');
        var $heroText = $('.hero-text-container');
        var $heroDots = $('.hero-shape-dots');
        var $heroCircle = $('.hero-shape-circle');

        if ($hero.length) {
            $hero.on('mousemove', function(e) {
                if (window.innerWidth <= 991) return;
                
                var width = window.innerWidth;
                var height = window.innerHeight;
                
                // Relative coordinate from center (-0.5 to 0.5)
                var mouseX = (e.clientX / width) - 0.5;
                var mouseY = (e.clientY / height) - 0.5;

                // Calculate custom speed for each layer
                var imgX = mouseX * 25;
                var imgY = mouseY * 25;
                var textX = mouseX * -15;
                var textY = mouseY * -15;
                var dotsX = mouseX * 45;
                var dotsY = mouseY * 45;
                var circleX = mouseX * -35;
                var circleY = mouseY * -35;

                // Apply translations
                $heroImg.css('transform', 'translate3d(' + imgX + 'px, ' + imgY + 'px, 0)');
                $heroText.css('transform', 'translate3d(' + textX + 'px, ' + textY + 'px, 0)');
                $heroDots.css('transform', 'translate3d(' + dotsX + 'px, ' + dotsY + 'px, 0)');
                $heroCircle.css('transform', 'translate3d(' + circleX + 'px, ' + circleY + 'px, 0)');
            });

            // Reset when cursor leaves the hero area
            $hero.on('mouseleave', function() {
                $heroImg.css('transform', 'translate3d(0px, 0px, 0)');
                $heroText.css('transform', 'translate3d(0px, 0px, 0)');
                $heroDots.css('transform', 'translate3d(0px, 0px, 0)');
                $heroCircle.css('transform', 'translate3d(0px, 0px, 0)');
            });
        }
    });

    // Contact Form Submission (Interactivity)
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        var $submitBtn = $(this).find('button[type="submit"]');
        var $status = $('#formStatus');
        
        // Show loading state
        $submitBtn.prop('disabled', true).html('<i class="fa-solid fa-spinner fa-spin me-2"></i>Envoi en cours...');
        
        // Simulate email sending API call
        setTimeout(function() {
            $submitBtn.prop('disabled', false).html('<i class="fa-solid fa-paper-plane me-2"></i>Envoyer le message');
            $status.removeClass('d-none alert-danger').addClass('alert-success-warm').html('<i class="fa-solid fa-circle-check me-2"></i>Merci pour votre message ! Je vous recontacterai très rapidement.');
            $('#contactForm')[0].reset();
            
            // Fade status after 6 seconds
            setTimeout(function() {
                $status.fadeOut('slow', function() {
                    $(this).addClass('d-none').show();
                });
            }, 6000);
        }, 1200);
    });

})(jQuery);

