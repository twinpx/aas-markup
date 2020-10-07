//placeholders
setTimeout( function() {
  $( '.ph-block, h1' ).addClass( 'ph-block--animated' );
}, 500 );

//header search
document.querySelector( '.b-header__search-icon' ).addEventListener( 'click', function(e) {
  e.preventDefault();
  document.querySelector( '.b-header__bottom' ).classList.toggle( 'b-header__bottom--search' );
  document.querySelector( '.b-header__search input' ).focus();
  return false;
});

//header dropdown
document.querySelectorAll( '.b-header__menu a[ data-dropdown ]' ).forEach( function( elem ) {
  elem.addEventListener( 'click', function(e) {
    e.preventDefault();
    var data = elem.getAttribute( 'data-dropdown' );
    $( '.b-header__dropdown-wrapper' ).slideToggle();
    $( '.b-header__dropdown-wrapper--show' ).removeClass( 'b-header__dropdown-wrapper--show' );
    $( '.b-header__dropdown-wrapper div[ data-dropdown=' + data + ' ]' ).addClass( 'b-header__dropdown-wrapper--show' );
    return false;
  });
});


//header scroll
if ( window.matchMedia( '(min-width: 576px)' ).matches ) {
  var headerTop = document.querySelector( '.b-header__top' );
  window.addEventListener( 'scroll', function(e) {
    var height = headerTop.offsetHeight;
    if ( window.scrollY >= height ) {
      document.querySelector( 'body' ).classList.add( 'header-fixed' );
    } else {
      document.querySelector( 'body' ).classList.remove( 'header-fixed' );
    }
  });
  
  window.dispatchEvent( new Event( 'scroll' ));
}