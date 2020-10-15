( function($) {

  'use strict';
  
  $( function() {
    
    if ( document.getElementById( 'bx-panel' )) {
      $( '#bx-panel-hider' ).bind( 'click', function() {
        var $headerPanel = $( '.b-header-panel' );
        $header.data( 'topBorder', $header.offset().top );
      });
      
      document.querySelector( '.b-header-fixed-wrapper' ).style.top = document.getElementById( 'bx-panel' ).offsetHeight + 'px';
      
      window.addEventListener( 'scroll', function(e) {
        
        if ( document.getElementById( 'bx-panel' ).className.search( 'bx-panel-fixed' ) === -1 ) {
          if (( document.getElementById( 'bx-panel' ).offsetHeight - window.scrollY ) >= 0) {
            document.querySelector( '.b-header-fixed-wrapper' ).style.top = ( document.getElementById( 'bx-panel' ).offsetHeight - window.scrollY ) + 'px';
          } else {
            document.querySelector( '.b-header-fixed-wrapper' ).style.top = 0;
          }
        } else {
          if ( window.scrollY < 58) {
            document.querySelector( '.b-header-fixed-wrapper' ).style.top = ( document.getElementById( 'bx-panel' ).offsetHeight - window.scrollY ) + 'px';
          } else {
            document.querySelector( '.b-header-fixed-wrapper' ).style.top = ( document.getElementById( 'bx-panel' ).offsetHeight - 58 ) + 'px';
          }
        }
      });
      
      window.dispatchEvent( new Event( 'scroll' ));
    }
    
  });

}( jQuery ));