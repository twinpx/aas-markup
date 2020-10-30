( function($) {

  'use strict';
  
  $( function() {

    //sidenote
    document.querySelectorAll( 'article .b-sidenote' ).forEach( function( sidenote ) {
      
      //append to aside
      document.querySelector( 'aside' ).appendChild( sidenote );
      var id = sidenote.getAttribute( 'data-id' );

      //find link in the text
      var top = document.querySelector( 'article a[ data-id="' + id + '" ]' ).offsetTop;

      //positioning the sidenote
      sidenote.style.top = (top - 21) + 'px';

      //hover
      sidenote.addEventListener( 'mouseenter', function() {
        $( sidenote ).find( '.b-sidenote__description' ).slideDown();
        sidenote.style.zIndex = 2;
      });
      sidenote.addEventListener( 'mouseleave', function() {
        $( sidenote ).find( '.b-sidenote__description' ).slideUp();
        sidenote.style.zIndex = 1;
      });
    });

  });

}( jQuery ));