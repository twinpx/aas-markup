( function($) {

  'use strict';
  
  $( function() {
    
    document.querySelectorAll( '.b-gallery .swiper-container' ).forEach( function(elem) {
      new Swiper( '.b-gallery .swiper-container', {
        loop: true,
        autoplay: {
          delay: 1*elem.getAttribute( 'data-delay' ) || 3500,
          disableOnInteraction: false,
        },
        effect: 'fade',
        lazy: {
          loadPrevNext: true,
        },
      });
    });
    
    
  });

}( jQuery ));