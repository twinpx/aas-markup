( function($) {

  'use strict';
  
  $( function() {
    $( '.b-registry tbody tr' ).click( function() {
      window.location = $( this ).data( 'url' );
    });
  });

}( jQuery ));