( function($) {

  'use strict';
  
  $( function() {

    //sidenote
    document.querySelectorAll( 'article .b-sidenote' ).forEach( function( sidenote ) {
      
      //append to aside
      document.querySelector( 'aside' ).appendChild( sidenote );
      var id = sidenote.getAttribute( 'data-id' );

      //find top of the link in the text
      //var top = document.querySelector( 'article a[ data-id="' + id + '" ]' ).offsetTop;
      var top;
      var fio = sidenote.querySelector( '.b-sidenote__title' ).textContent.replace(/\s+/g, ' ').trim();
      document.querySelectorAll( 'article a[ href="#profile" ]' ).forEach( function( textLink ) {
        var text = textLink.textContent.replace(/\s+/g, ' ').trim();
        if ( text === fio ) {
          top = textLink.offsetTop;
        }
      });

      //positioning the sidenote
      if ( top ) {
        sidenote.style.top = (top - 21) + 'px';
      } else {
        sidenote.style.display = 'none';
        return;
      }

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