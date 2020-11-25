( function($) {

  'use strict';
  
  $( function() {

    //tr click
    $( '.b-registry' ).delegate( 'tbody tr', 'click', function() {
      window.location = $( this ).data( 'url' );
    });

    //th click, sorting
    $( '.b-registry th' ).click( function() {
      var $th = $( this );
      var $table = $th.closest( 'table' );
      var $thElements = $table.find( 'th' );
      var $tbody = $table.find( 'tbody' );
      var url = $table.data( 'result' );

      //set field and sort variables
      var field = $th.data( 'field' ), sort;

      //set sort
      if ( !$th.data( 'sort' )) {
        $thElements.data({ sort: undefined });
        $th.data({ sort: 'asc' });
      } else {
        if ( $th.data( 'sort' ) === 'asc' ) {
          $thElements.data({ sort: undefined });
          $th.data({ sort: 'desc' });
        } else {
          $thElements.data({ sort: undefined });
          $th.data({ sort: 'asc' });
        }
      }

      sort = $th.data( 'sort' );

      //send ajax
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'html',
        data: { field: field, sort: sort },
        success: function( html ) {

          //get result
          $tbody.html( html );

          //hightlight column
          var index = $table.find( 'th' ).index( $th );
          $thElements.removeClass( 'asc' ).removeClass( 'desc' );
          $th.addClass( sort );
          $tbody.find( 'tr' ).each( function() {
            $( this ).find( 'td:eq(' + index + ')' ).removeClass( 'asc' ).removeClass( 'desc' ).addClass( sort );
          });

          //set URL
          var urlQuery = parseQuery( window.location.search );
          urlQuery.field = field;
          urlQuery.sort = sort;
          window.history.replaceState( {} , '', getQuery( urlQuery ) );
        },
        error: function( a, b, c ) {
          if( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    });

    function getQuery( queryObject ) {
      var result = [];
      for ( var k in queryObject ) {
        result.push( k + '=' + queryObject[k]);
      }
      return '?' + result.join( '&' );
    }

    function parseQuery( queryString ) {
      var query = {};
      var pairs = [];
      if ( queryString ) {
        pairs = ( queryString[0] === '?' ? queryString.substr(1) : queryString ).split('&');
      }
      for ( var i = 0; i < pairs.length; i++ ) {
          var pair = pairs[i].split( '=' );
          query[ decodeURIComponent( pair[0]) ] = decodeURIComponent( pair[1] || '' );
      }
      return query;
    }

  });

}( jQuery ));