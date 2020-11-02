document.querySelectorAll( '.b-collapse-block__head' ).forEach( function( elem ) {

  elem.querySelector( 'a' ).addEventListener( 'click', function(e) {
    e.preventDefault();
    return false;
  });

  elem.addEventListener( 'click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $( elem ).closest( '.b-collapse-block' ).toggleClass( 'slide' ).find( '.b-collapse-block__body' ).slideToggle();
  });
});