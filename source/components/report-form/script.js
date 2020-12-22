( function($) {

  'use strict';
  
  $( function() {

    //complete inputs
    document.querySelectorAll( '.b-complete-link' ).forEach( function( completeLink ) {
      completeLink.addEventListener( 'click', function(e) {
        e.preventDefault();
        completeInput( completeLink );
        fieldAutocompleteRequest( completeLink.closest( '.row' ).querySelector( '.b-float-label input' ));
        resetClearButton( completeLink.closest( '.b-collapse-block__body' ).querySelectorAll( '.b-report-form__buttons .btn ' )[1]);
      });
    });

    //buttons
    document.querySelectorAll( '.b-report-form__buttons' ).forEach( function( buttonsBlock ) {
      var bodyElem = buttonsBlock.closest( '.b-collapse-block__body' );
      var buttons =  buttonsBlock.querySelectorAll( '.btn' );
      var clearButton = buttons[1];

      //complete button
      buttons[0].addEventListener( 'click', function(e) {
        e.preventDefault();
        bodyElem.querySelectorAll( '.b-complete-link' ).forEach( function( completeLink ) {
          completeInput( completeLink );
        });
        formAutocompleteRequest( buttonsBlock.closest( 'form' ));
        resetClearButton( clearButton );
      });

      //clear button
      clearButton.addEventListener( 'click', function(e) {
        e.preventDefault();

        if ( clearButton.className.search( 'return' ) === -1 ) {//clear button

          bodyElem.querySelectorAll( '.b-float-label input' ).forEach( function( input ) {
            window.localStorage.setItem( input.name, input.value );
            input.value = '';
            input.closest( '.b-float-label' ).querySelector( 'label' ).classList.remove( 'active' );
          });
          setClearButton( clearButton );
        
        } else {//return button

          bodyElem.querySelectorAll( '.b-float-label input' ).forEach( function( input ) {
            var value = window.localStorage.getItem( input.name );
            if ( !value ) {
              return;
            }
            input.value = value;
            input.closest( '.b-float-label' ).querySelector( 'label' ).classList.add( 'active' );
          });
          resetClearButton( clearButton );

        }

        formAutocompleteRequest( buttonsBlock.closest( 'form' ));
      });
    });

    //save form
    document.querySelectorAll( '.b-report-form input' ).forEach( function( input ) {
      input.addEventListener( 'blur', function(e) {
        //send ajax
        fieldAutocompleteRequest( input );
        resetClearButton( input.closest( '.b-collapse-block__body' ).querySelectorAll( '.b-report-form__buttons .btn ' )[1]);
      });
    });

    setTimeout( function() {
      var form = document.querySelector( '.b-report-form form' );
      formAutocompleteRequest( form );
    }, 120000 );

    function setClearButton( clearButton ) {
      clearButton.classList.add( 'return' );
    }

    function resetClearButton( clearButton ) {
      clearButton.classList.remove( 'return' );
    }

    function completeInput( completeLink ) {
      completeLink.closest( '.row' ).querySelector( '.b-float-label input' ).value = completeLink.textContent;
      completeLink.closest( '.row' ).querySelector( '.b-float-label label' ).classList.add( 'active' );
    }

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
            } else if ( data.SUCCESS === 'Y' && typeof data.DATE === 'string' ) {
              showAutocompleteTime( data.DATE );
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
            } else if ( data.SUCCESS === 'Y' && typeof data.DATE === 'string' ) {
              showAutocompleteTime( data.DATE );
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

    function showAutocompleteTime( date ) {
      document.querySelector( '.b-report-form__autosave-text span' ).textContent = date;
    }


  });

}( jQuery ));