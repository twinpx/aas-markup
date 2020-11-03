//placeholders
setTimeout( function() {
  $( '.ph-block, .b-breadcrumbs, h1' ).addClass( 'ph-block--animated' );
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

document.querySelector( '.b-header__cancel-icon' ).addEventListener( 'click', function(e) {
  e.preventDefault();
  document.querySelector( '.b-header__bottom' ).classList.remove( 'b-header__bottom--search' );
  document.querySelector( '.b-header__search input' ).value = '';
  return false;
});

//header dropdown
var headerDropdownId = [];
document.querySelectorAll( '.b-header__menu-item' ).forEach( function( elem, index ) {
    
  if ( window.matchMedia( "(min-width: 768px)" ).matches ) {//desktop
    if ( elem.querySelector( '.b-header__menu-dropdown' )) {//dropdown
      
      elem.addEventListener( 'mouseenter', function(e) {
        e.stopPropagation();
        clearTimeout( headerDropdownId[ index ]);
        headerDropdownId[ index ] = setTimeout( function() {
          $( elem ).find( '.b-header__menu-dropdown' ).slideDown( 400, function() {
            this.classList.add( 'show' );
          });
        }, 100);
      });
      
      elem.addEventListener( 'mouseleave', function(e) {
        e.stopPropagation();
        clearTimeout( headerDropdownId[ index ] );
        elem.querySelector( '.b-header__menu-dropdown' ).classList.remove( 'show' );
        headerDropdownId[ index ] = setTimeout( function() {
          $( elem ).find( '.b-header__menu-dropdown' ).slideUp( 200 );
        }, 300);
      });
      
    }
  } else {//mobile
    
    if ( elem.querySelector( '.b-header__menu-dropdown' )) {
      
      elem.addEventListener( 'click', function(e) {
        e.preventDefault();
        $( this ).find( '.b-header__menu-dropdown' ).slideToggle(300);
        elem.classList.toggle( 'open' );
      });
      
    }
    
  }
});

if ( window.matchMedia( "(max-width: 767px)" ).matches ) {//mobile
  document.querySelectorAll( '.b-header__menu-item span a' ).forEach( function( elem ) {//link
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