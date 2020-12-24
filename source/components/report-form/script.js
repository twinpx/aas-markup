( function($) {

  'use strict';
  
  $( function() {

    //staff table click
    document.querySelectorAll( '.b-staff-table td' ).forEach( function( td ) {
      td.addEventListener( 'click', function(e) {
        e.preventDefault();
        window.open( td.closest( 'tr' ).getAttribute( 'data-url' ), '_blank' );
      });
    });

    //staff table remove
    document.querySelectorAll( '.b-staff-table .btn-delete' ).forEach( function( btn ) {
      var tr = btn.closest( 'tr' );
      var tbody = tr.closest( 'tbody' );
      var table = tr.closest( 'table' );

      btn.addEventListener( 'click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        //send ajax
        staffMembersAutocompleteRequest( btn );
  
        //remove td in tr
        tr.style.height = tr.clientHeight + 'px';
        tr.classList.add( 'removing' );

        setTimeout( function() {
          tr.querySelectorAll( 'td' ).forEach( function( td ) {
            td.remove();
          });
          tr.style.height = '0px';
          setTimeout( function() {
            tr.remove();

            //remove thead if needed
            if ( !tbody.querySelectorAll( 'tr' ).length ) {
              table.classList.add( 'hide' );
            }
          }, 300);
        }, 300);
      });
    });

    //calendar icon
    document.querySelectorAll( '.calendar-icon' ).forEach( function( iconImg ) {
      var src = iconImg.closest( '.b-float-label' ).getAttribute( 'data-src' );
      iconImg.src = src;
      iconImg.classList.add( 'show' );
    });

    //complete inputs
    document.querySelectorAll( '.b-complete-link' ).forEach( function( completeLink ) {
      completeLink.addEventListener( 'click', function(e) {
        e.preventDefault();
        completeInput( completeLink );
        fieldAutocompleteRequest( completeLink.closest( '.row' ).querySelector( '.b-float-label input, .b-float-label textarea' ));
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

          bodyElem.querySelectorAll( '.b-float-label input, .b-float-label textarea' ).forEach( function( input ) {
            window.localStorage.setItem( input.name, input.value );
            input.value = '';
            input.closest( '.b-float-label' ).querySelector( 'label' ).classList.remove( 'active' );
          });
          setClearButton( clearButton );
        
        } else {//return button

          bodyElem.querySelectorAll( '.b-float-label input, .b-float-label textarea' ).forEach( function( input ) {
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
    document.querySelectorAll( '.b-report-form input, .b-report-form textarea' ).forEach( function( input ) {
      input.addEventListener( 'blur', function(e) {
        //send ajax
        fieldAutocompleteRequest( input );
        resetClearButton( input.closest( '.b-collapse-block__body' ).querySelectorAll( '.b-report-form__buttons .btn ' )[1]);
      });
    });

    //autosave
    setInterval( function() {
      var form = document.querySelector( '.b-report-form form' );
      formAutocompleteRequest( form );
    }, 120000 );

    //validation
    document.querySelectorAll( '.b-report-form [ required ]' ).forEach( function( input ) {
      input.addEventListener( 'blur', function(e) {
        inputValidation( input );
      });
    });

    //scroll to the first invalid field
    document.querySelector( '.b-report-form__submit a' ).addEventListener( 'click', function(e) {
      e.preventDefault();
      var fieldIndex;
      document.querySelectorAll( '.b-report-form [required]' ).forEach( function( input, index ) {
        if ( fieldIndex ) {
          return;
        }
        if ( input.value.trim() === '' ) {
          fieldIndex = index;
        }
      });

      //focus
      var field = document.querySelectorAll( '.b-report-form [required]' )[ fieldIndex ];
      if ( fieldIndex && field ) {
        field.focus();
      }
    });

    var regExp = {
      email: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
    };

    function inputValidation( input ) {
      var validFlag = false;
      var inputValue = input.value.trim();

      //is valid
      if ( inputValue !== '' ) {
        validFlag = true;

        if ( input.getAttribute( 'type' ) === 'email' && !inputValue.match( regExp.email )) {
          validFlag = false;
        }
      }

      //highlight input
      if ( validFlag === true ) {
        removeInvalid( input );
      } else {
        setInvalid( input );
      }

      //hightlight block
      if ( validFlag === true ) {
        var invalidLingth = input.closest( '.b-collapse-block__body' ).querySelectorAll( '.b-float-label.invalid' ).length;
        if ( invalidLingth > 0 ) {
          input.closest( '.b-collapse-block' ).classList.add( 'invalid' );
        } else {
          input.closest( '.b-collapse-block' ).classList.remove( 'invalid' );
        }
      } else {
        input.closest( '.b-collapse-block' ).classList.add( 'invalid' );
      }

      //highlight form
      if ( validFlag === true ) {
        if ( isFormValid()) {
          document.querySelector( '.b-report-form__submit' ).classList.add( 'valid' );
          document.querySelector( '.b-report-form__submit .btn' ).removeAttribute( 'disabled' );
        } else {
          document.querySelector( '.b-report-form__submit' ).classList.remove( 'valid' );
          document.querySelector( '.b-report-form__submit .btn' ).setAttribute( 'disabled', 'disabled' );
        }
      } else {
        document.querySelector( '.b-report-form__submit' ).classList.remove( 'valid' );
        document.querySelector( '.b-report-form__submit .btn' ).setAttribute( 'disabled', 'disabled' );
      }
    }

    function isFormValid() {
      var flag = true;

      document.querySelectorAll( '.b-report-form [ required ]' ).forEach( function( input ) {
        if ( input.value.trim() === '' || ( input.getAttribute( 'type' ) === 'email' && !input.value.match( regExp.email ))) {
          flag = false;
        }
      });

      return flag;
    }

    function setClearButton( clearButton ) {
      clearButton.classList.add( 'return' );
    }

    function resetClearButton( clearButton ) {
      clearButton.classList.remove( 'return' );
    }

    function completeInput( completeLink ) {
      var input = completeLink.closest( '.row' ).querySelector( '.b-float-label input, .b-float-label textarea' );
      input.value = completeLink.textContent;
      completeLink.closest( '.row' ).querySelector( '.b-float-label label' ).classList.add( 'active' );      
      inputValidation( input );
    }

    function staffMembersAutocompleteRequest( btn, cnt ) {
      var memberId = btn.closest( 'tr' ).getAttribute( 'data-url' );
      var counter = cnt || 0;
      var id;

      if ( document.getElementById( 'element_id' )) {
        id = document.getElementById( 'element_id' ).value;
      }

      $.ajax({
        url: btn.closest( 'form' ).getAttribute( 'data-ajax-url' ),
        type: btn.closest( 'form' ).getAttribute( 'method' ),//GET
        dataType: "json",
        data: { member: memberId, element_id: id },
        success: function( data ) {
          if ( data && typeof data === 'object' && data.SUCCESS ) {
            if ( data.SUCCESS !== 'Y' && counter < 3 ) {
              fieldAutocompleteRequest( btn, ++counter );
            } else if ( data.SUCCESS === 'Y' && typeof data.DATE === 'string' ) {
              //showAutocompleteTime( data.DATE );
            }
          }
        },
        error: function( a, b, c ) {
          if ( window.console ) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        }
      });
    }

    function fieldAutocompleteRequest( input, cnt ) {
      var inputName = input.getAttribute( 'name' );
      var inputValue = input.value;
      var counter = cnt || 0;
      var id;

      if ( document.getElementById( 'element_id' )) {
        id = document.getElementById( 'element_id' ).value;
      }

      $.ajax({
        url: input.closest( 'form' ).getAttribute( 'data-ajax-url' ),
        type: input.closest( 'form' ).getAttribute( 'method' ),//GET
        dataType: "json",
        data: { name: inputName, value: inputValue, element_id: id },
        success: function( data ) {
          if ( data && typeof data === 'object' && data.SUCCESS ) {
            if ( data.SUCCESS !== 'Y' && counter < 3 ) {
              fieldAutocompleteRequest( input, ++counter );
            } else if ( data.SUCCESS === 'Y' && typeof data.DATE === 'string' ) {
              //showAutocompleteTime( data.DATE );
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

    function setInvalid( input ) {
      input.closest( '.b-float-label' ).classList.add( 'invalid' );
    }

    function removeInvalid( input ) {
      input.closest( '.b-float-label' ).classList.remove( 'invalid' );
    }

  });

}( jQuery ));