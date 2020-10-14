( function($) {

  'use strict';
  
  $( function() {
    
    $( '#bx-panel-hider' ).bind( 'click', function() {
      var $headerPanel = $( '.b-header-panel' );
      $header.data( 'topBorder', $header.offset().top );
    });
    
    document.querySelector( '.b-header-fixed-wrapper' ).style.top = document.getElementById( 'bx-panel' ).offsetHeight + 'px';
    
  });

}( jQuery ));