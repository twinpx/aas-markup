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

document.querySelector( '.b-header__search input' ).addEventListener( 'blur', function() {
  if ( this.value === '' ) {
    document.querySelector( '.b-header__bottom' ).classList.remove( 'b-header__bottom--search' );
  }
});

//header dropdown
document.querySelectorAll( '.b-header__menu-item' ).forEach( function( elem ) {
  elem.addEventListener( 'click', function(e) {
    e.preventDefault();
    
    if ( window.matchMedia( "(min-width: 768px)" ).matches ) {//desktop
      if ( elem.querySelector( '.b-header__menu-dropdown' )) {//dropdown
        if ( elem.querySelector( '.b-header__menu-dropdown' ).offsetHeight <= 0 ) {//dropdown hidden
          $( '.b-header__menu-dropdown:visible' ).slideUp();
          document.querySelectorAll( '.b-header__menu-item.active' ).forEach( function( elem ) {
            elem.classList.remove( 'active' );
          });
        }
        $( elem ).find( '.b-header__menu-dropdown' ).slideToggle();
        elem.classList.toggle( 'active' );
      } else {
        window.location = elem.querySelector( 'span a' ).getAttribute( 'href' );
      }
    } else {
      
      if ( elem.querySelector( '.b-header__menu-dropdown' )) {
        $( this ).find( '.b-header__menu-dropdown' ).slideToggle();
        elem.classList.toggle( 'active' );
      } else {
        window.location = elem.querySelector( 'span a' ).getAttribute( 'href' );
      }
      
    }
  });
});

if ( window.matchMedia( "(max-width: 767px)" ).matches ) {
  document.querySelectorAll( '.b-header__menu-item span a' ).forEach( function( elem ) {
    elem.addEventListener( 'click', function(e) {
      e.stopPropagation();
      return true;
    });
  });

  document.querySelectorAll( '.b-header__menu-dropdown a' ).forEach( function( elem ) {
    elem.addEventListener( 'click', function(e) {
      e.stopPropagation();
      return true;
    });
  });
} else {
  document.querySelectorAll( '.b-header__menu-item span a' ).forEach( function( elem ) {
    elem.addEventListener( 'click', function(e) {
      e.preventDefault();
      return true;
    });
  });
}

//header dropdown sandwich
document.querySelector( '.b-header__menu-icon' ).addEventListener( 'click', function(e) {
  e.preventDefault();
  $( '.b-header__bottom' ).slideToggle();
});

//header scroll
if ( window.matchMedia( '(min-width: 767px)' ).matches ) {
  var height = document.querySelector( '.b-header' ).offsetHeight - 86;
  window.addEventListener( 'scroll', function(e) {
    if ( window.scrollY >= height ) {
      document.querySelector( 'body' ).classList.add( 'header-fixed' );
    } else {
      document.querySelector( 'body' ).classList.remove( 'header-fixed' );
    }
  });
  
  window.dispatchEvent( new Event( 'scroll' ));
}