window.addEventListener('load', function () {
  //show hide button
  var button = document.querySelector('.b-appeal-stamp__form button');

  function showButton() {
    button.style.display = 'inline-block';
  }

  function hideButton() {
    button.style.display = 'none';
  }

  //clear img
  document
    .querySelectorAll('.b-appeal-stamp__form .clear')
    .forEach(function (clear) {
      clear.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var item = clear.closest('.b-appeal-stamp__item');

        //clear input
        document.querySelector('input#' + item.getAttribute('for')).value = '';

        //clear class
        item.classList.remove('filled');
        item.classList.remove('error');
        item.classList.add('default');

        //clear image
        var img = item.querySelector('.b-appeal-stamp__item__img');
        img.style.backgroundImage =
          'url("' + img.getAttribute('data-default') + '")';

        hideButton();
      });
    });

  //img preview
  document
    .querySelectorAll('.b-appeal-stamp__form input[type=file]')
    .forEach(function (input) {
      input.addEventListener('change', function (e) {
        var input = this;
        var item = input.parentNode.querySelector(
          '[for=' + input.getAttribute('id') + ']'
        );

        if (!input.files || !input.files[0]) {
          hideButton();
          return;
        }

        //validation
        var error = '';
        var validSize = 10e6;
        var validExtReg = /gif|jpg|jpeg|png|tiff|webp|heic/gi;

        if (input.files[0].size > validSize) {
          error = 'Размер файла превышает 10Мб';
        } else if (
          !validExtReg.test(
            input.files[0].name
              .substr(input.files[0].name.lastIndexOf('.') + 1)
              .toLowerCase()
          )
        ) {
          error = 'Загружайте изображения GIF JPG PNG TIFF WEBP HEIC';
        }

        if (error) {
          item.classList.remove('default');
          item.classList.remove('current');
          item.classList.remove('filled');
          item.classList.add('error');

          item.querySelector('.b-appeal-stamp__item__error').textContent =
            error;

          hideButton();
          return;
        }

        //show img
        var reader = new FileReader();

        reader.onload = function (e) {
          item.classList.remove('default');
          item.classList.remove('current');
          item.classList.remove('error');
          item.classList.add('filled');
          item.querySelector(
            '.b-appeal-stamp__item__img'
          ).style.backgroundImage = 'url("' + e.target.result + '")';

          //show button
          var showButtonFlag = true;
          item
            .closest('.b-appeal-stamp__form')
            .querySelectorAll('.b-appeal-stamp__item')
            .forEach(function (i) {
              if (
                !(
                  i.classList.contains('filled') ||
                  i.classList.contains('current')
                )
              ) {
                showButtonFlag = false; //at least one
              }
            });
          if (showButtonFlag) {
            showButton();
          }
        };

        reader.readAsDataURL(input.files[0]);
      });
    });
});
