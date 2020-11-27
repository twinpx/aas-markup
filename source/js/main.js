//not authorized
if ( document.querySelector( '.b-header__profile .btn' )) {
  document.querySelector( 'body' ).classList.add( 'not-authorized' );
}

//placeholders
setTimeout( function() {
  $( '.ph-block, .b-breadcrumbs, h1' ).addClass( 'ph-block--animated' );
}, 500 );

//header menu items width
if ( window.matchMedia( '(min-width: 768px)' ).matches ) {//desktop
  var menuItemsWidthArray = [];
  document.querySelectorAll( '.b-header__menu-item' ).forEach( function( menuItem ) {
    menuItemsWidthArray.push( menuItem.offsetWidth );
  });

  setMenuItemsVisibility();

  window.addEventListener( 'resize', function(e) {
    setMenuItemsVisibility();
  });
}

function setMenuItemsVisibility() {
  var menuItemsWidth = 0;
  var space = document.querySelector( '.b-header__menu' ).offsetWidth - 50;
  var hiddenIndex = menuItemsWidthArray.length;

  var i = 0;
  while( menuItemsWidth < space ) {
    if ( menuItemsWidthArray[i]) {
      menuItemsWidth += menuItemsWidthArray[i] + 30;
      i++;
    } else {
      i++;
      break;
    }
  }
  hiddenIndex = i-1;
  
  if ( hiddenIndex < 0 ) {
    hiddenIndex = 0;
  }

  for ( var j = 0; j < hiddenIndex; j++ ) {
    document.querySelectorAll( '.b-header__menu-item' )[j].removeAttribute( 'style' );
  }

  for ( var k = hiddenIndex; k < menuItemsWidthArray.length; k++ ) {
    document.querySelectorAll( '.b-header__menu-item' )[k].style.display = 'none';
  }
}

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

  if ( $( '.b-header__bottom' ).is( ':visible' )) {
    document.querySelector( 'body' ).classList.remove( 'shutter' );
  } else {
    document.querySelector( 'body' ).classList.add( 'shutter' );
  }
  
  $( '.b-header__bottom' ).stop().slideToggle().toggleClass( 'open-sandwich' );
  $( '.b-header__profile-menu' ).hide();
  
});

//profile dropdown
document.querySelector( '.b-header__profile-icon' ).addEventListener( 'click', function(e) {
  e.preventDefault();

  if ( $( '.b-header__profile-menu' ).is( ':visible' )) {
    document.querySelector( 'body' ).classList.remove( 'shutter' );
  } else {
    document.querySelector( 'body' ).classList.add( 'shutter' );
  }

  $( '.b-header__profile-menu' ).stop().slideToggle().toggleClass( 'open-sandwich' );
  $( '.b-header__bottom' ).hide();
});

//shutter
document.querySelector( '.b-body-shutter' ).addEventListener( 'click', function(e) {
  e.preventDefault();
  $( '.b-header__bottom' ).stop().slideUp();
  $( '.b-header__profile-menu' ).stop().slideUp();
  document.querySelector( 'body' ).classList.remove( 'shutter' );
});

//header scroll
var widthTimeoutId;
var menuWidthTimeoutId;
if ( window.matchMedia( '(min-width: 768px)' ).matches ) {
  var height = document.querySelector( '.b-header' ).offsetHeight - 86;
  window.addEventListener( 'scroll', function(e) {
    
    if ( window.scrollY >= height ) {
      document.querySelector( 'body' ).classList.add( 'header-fixed' );
      //profile width 
      clearTimeout( widthTimeoutId );
      widthTimeoutId = setTimeout( function() {
        $( '.b-header__profile' ).addClass( 'width' );
      }, 500);
      //menu width
      document.querySelector( '.b-header__menu' ).classList.add( 'nowrap' );
      setMenuItemsVisibility();
      clearTimeout( menuWidthTimeoutId );
      menuWidthTimeoutId = setTimeout( function() {
        setMenuItemsVisibility();
        document.querySelector( '.b-header__menu' ).classList.remove( 'nowrap' );
      }, 300);
      
    } else {
      document.querySelector( 'body' ).classList.remove( 'header-fixed' );
      //profile width 
      clearTimeout( widthTimeoutId );
      $( '.b-header__profile' ).removeClass( 'width' );
      //menu width
      document.querySelector( '.b-header__menu' ).classList.add( 'nowrap' );
      setMenuItemsVisibility();
      clearTimeout( menuWidthTimeoutId );
      menuWidthTimeoutId = setTimeout( function() {
        setMenuItemsVisibility();
        document.querySelector( '.b-header__menu' ).classList.remove( 'nowrap' );
      }, 300);
    }
    
  });
  
  window.dispatchEvent( new Event( 'scroll' ));
}