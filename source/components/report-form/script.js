( function($) {

  'use strict';
  
  $( function() {

    //complete inputs
    document.querySelectorAll( '.b-complete-link' ).forEach( function( completeLink ) {
      completeLink.addEventListener( 'click', function(e) {
        e.preventDefault();
        completeInput( completeLink );
        fieldAutocompleteRequest( completeLink.closest( '.row' ).querySelector( '.b-float-label input' ));
      });
    });

    document.querySelectorAll( '.b-report-form__buttons' ).forEach( function( buttonsBlock ) {
      buttonsBlock.querySelectorAll( '.btn' )[0].addEventListener( 'click', function(e) {
        e.preventDefault();
        buttonsBlock.closest( '.b-collapse-block__body' ).querySelectorAll( '.b-complete-link' ).forEach( function( completeLink ) {
          completeInput( completeLink );
        });
        formAutocompleteRequest( buttonsBlock.closest( 'form' ));
      });
    });

    function completeInput( completeLink ) {
      completeLink.closest( '.row' ).querySelector( '.b-float-label input' ).value = completeLink.textContent;
      completeLink.closest( '.row' ).querySelector( '.b-float-label label' ).classList.add( 'active' );
    }

    //clear form
    document.querySelectorAll( '.b-report-form__buttons' ).forEach( function( buttonsBlock ) {
      buttonsBlock.querySelectorAll( '.btn' )[1].addEventListener( 'click', function(e) {
        e.preventDefault();
        buttonsBlock.closest( '.b-collapse-block__body' ).querySelectorAll( '.b-float-label input' ).forEach( function( input ) {
          input.value = '';
        });
        
        buttonsBlock.closest( '.b-collapse-block__body' ).querySelectorAll( '.b-float-label label' ).forEach( function( label ) {
          label.classList.remove( 'active' );
        });
      });
    });

    //save form
    document.querySelectorAll( '.b-report-form input' ).forEach( function( input ) {
      input.addEventListener( 'blur', function(e) {
        //send ajax
        fieldAutocompleteRequest( input );        
      });
    });

    setTimeout( function() {
      var form = document.querySelector( '.b-report-form form' );
      formAutocompleteRequest( form );
    }, 120000 );

    function fieldAutocompleteRequest( input, cnt ) {
      var inputName = input.getAttribute( 'name' );
      var inputValue = input.value;
      var counter = cnt || 0;

      $.ajax({
        url: input.closest( 'form' ).getAttribute( 'data-ajax-url' ),
        type: input.closest( 'form' ).getAttribute( 'method' ),//GET
        dataType: "json",
        data: { name: inputName, value: inputValue },
        success: function( data ) {
          if ( data && typeof data === 'object' && data.SUCCESS ) {
            if ( data.SUCCESS !== 'Y' && counter < 3 ) {
              fieldAutocompleteRequest( input, ++counter );
            }
          }
        },
        error: function( a, b, c ) {
          if( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    }

    function formAutocompleteRequest( form, cnt ) {
      var counter = cnt || 0;

      $.ajax({
        url: form.getAttribute( 'data-ajax-url' ),
        type: form.getAttribute( 'method' ),//GET
        dataType: "json",
        data: $( form ).serialize(),
        success: function( data ) {
          if ( data && typeof data === 'object' && data.SUCCESS ) {
            if ( data.SUCCESS !== 'Y' && counter < 3 ) {
              formAutocompleteRequest( form, ++counter );
            }
          }
        },
        error: function( a, b, c ) {
          if( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    }


  });

}( jQuery ));