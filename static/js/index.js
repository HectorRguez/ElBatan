$(document).ready(function() {
    // Initialize EmailJS with your public key
    emailjs.init("viX_yg8yLILomxjI5");  // Replace with your actual public key
    
    // Mobile menu toggle
    $('#mobile-menu').click(function() {
        $('.nav-menu').toggleClass('active');
        $(this).find('.bar').each(function(index) {
            $(this).toggleClass('bar-' + (index + 1));
        });
    });

    // Smooth scrolling
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        var target = this.hash;
        var $target = $(target);
        
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 70
            }, 800);
            
            // Close mobile menu if open
            $('.nav-menu').removeClass('active');
        }
    });

    // Active navigation on scroll
    $(window).scroll(function() {
        var scrollPos = $(document).scrollTop();
        
        $('.nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            
            if (refElement.length && refElement.position().top <= scrollPos + 100 && refElement.position().top + refElement.height() > scrollPos) {
                $('.nav-link').removeClass("active");
                currLink.addClass("active");
            }
        });
    });

    // Contact form submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const btn = $(this).find('.submit-btn');
        const originalText = btn.text();
        btn.text('Enviando...').prop('disabled', true);
        
        // Send email using EmailJS
        emailjs.send(
            "service_90f7zkl",     // Replace with your Service ID
            "template_k873q7s",    // Replace with your Template ID
            {
                from_name: $('#name').val(),
                from_email: $('#email').val(),
                message: $('#message').val()
            }
        )
        .then(function(response) {
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            $('#contactForm')[0].reset();
            btn.text(originalText).prop('disabled', false);
        }, function(error) {
            alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
            console.error('EmailJS error:', error);
            btn.text(originalText).prop('disabled', false);
        });
    });
});