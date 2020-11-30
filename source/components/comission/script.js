( function($) {

  'use strict';
  
  $( function() {
    
    document.querySelectorAll( '.b-comission-tabs' ).forEach( function( elem ) {

      var menuLinks = elem.querySelectorAll( '.b-comission-tabs__tabs a' );

      //swiper menu
      if ( window.matchMedia( "(max-width: 600px)" ).matches ) {

        var slidesPerView = 2.5;
    
        if ( window.matchMedia( "(min-width: 500px)" ).matches ) {
          slidesPerView = 3;
        }

        //init swiper
        new Swiper( elem.querySelector( '.b-comission-tabs__tabs .swiper-container' ), {
          slidesPerView: slidesPerView,
          spaceBetween: 30,
          freeMode: true
        });
      }

      //decor line
      var decorLine = elem.querySelector( '.b-comission-tabs__decor' );
      setTimeout( function() {
        decorLine.style.left =  menuLinks[0].offsetLeft + 'px';
        decorLine.style.width =  menuLinks[0].offsetWidth + 'px';
      }, 500);

      menuLinks.forEach( function( tabLink, index ) {
        tabLink.addEventListener( 'click', function(e) {
          e.preventDefault();

          //highlight
          menuLinks.forEach( function( tabLinkElem ) {
            tabLinkElem.classList.remove( 'active' );
            tabLink.classList.add( 'active' );
          });

          //decor line
          decorLine.style.left = tabLink.offsetLeft + 'px';
          decorLine.style.width = tabLink.offsetWidth + 'px';

          //show all
          if ( index === 0 ) {
            elem.classList.add( 'all' );
          } else {
            elem.classList.remove( 'all' );

            //slide
            elem.querySelectorAll( '.b-comission-tabs__item' ).forEach( function( el ) {
              el.classList.remove( 'active' );
            });
            elem.querySelectorAll( '.b-comission-tabs__item' )[ index ].classList.add( 'active' );
            
          }
        });
      });

      var clickEvent = new Event( 'click' );
      menuLinks[0].dispatchEvent( clickEvent );
      
    });

  });

}( jQuery ));