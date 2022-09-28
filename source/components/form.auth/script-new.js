window.addEventListener('load', () => {
  document.querySelectorAll('.b-validate-form').forEach((formBlock) => {
    const form = formBlock.querySelector('form'),
      loginInput = form.querySelector('input[ type="text" ]'),
      passwordInput = form.querySelector('input[ type="password" ]'),
      checkboxBlock = form.querySelector('.b-checkbox'),
      checkboxInput = form.querySelector('input[ type="checkbox" ]'),
      modal = form.querySelector('#docToSignModal');

    form.addEventListener('submit', (e) => {
      let errorFlag = false;

      //validate inputs
      [loginInput, passwordInput, checkboxInput].forEach((input) => {
        if (!input) return;
        let isCheckbox = input.getAttribute.type === 'checkbox' ? true : false;
        let wrapper = isCheckbox
          ? checkboxBlock
          : input.closest('.b-float-label');

        if (isCheckbox ? !checkboxInput.checked : input.value.trim() === '') {
          wrapper.classList.add('invalid');
          errorFlag = true;
        } else {
          wrapper.classList.remove('invalid');
        }
      });

      //if
      if (errorFlag) {
        e.preventDefault();
        form.querySelector('.b-float-label.invalid input').focus();
      }
    });

    if (loginInput && passwordInput && checkboxInput) {
      //change checkbox - check signed docs
      checkboxInput.addEventListener('change', () => {
        if (
          loginInput.value.trim() !== '' &&
          passwordInput.value.trim() !== '' &&
          checkboxInput.checked
        ) {
          //show preloader
          checkboxBlock.classList.add('b-checkbox--loading');
          //send request
          sendRequest();
        }
      });

      [loginInput, passwordInput].forEach((input) => {
        let value = '';
        input.addEventListener('keydown', () => {
          value = input.value;
        });
        input.addEventListener('keyup', () => {
          if (value !== input.value) {
            //change login or password - reset checkbox
            checkboxInput.checked = false;
            //disable submit button
            form
              .querySelector('button[type=submit]')
              .setAttribute('disabled', 'disabled');
          }
        });
      });
    }

    //sign doc
    if (modal) {
      modal.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.id === 'docToSignButton') {
          //send id, login
          document
            .querySelector('.modal-body')
            .classList.add('modal-body--loading');
          sendRequest(e.target.getAttribute('data-id'));
        }
      });
    }

    async function sendRequest(docId) {
      if (docId) {
        BX.ajax
          .runComponentAction('twinpx:agreements', 'setAgreement', {
            mode: 'class',
            data: {
              id: docId,
              login: loginInput.value,
              password: passwordInput.value,
            }, // ключи объекта data соответствуют параметрам метода
          })
          .then(function (response) {
            if (response.status === 'success') {
              checkboxBlock.classList.remove('b-checkbox--loading');

              if (response.data && response.data.html) {
                //open popup window
                $('#docToSignModal').modal('show');
                //set modal content
                document.querySelector(
                  '#docToSignModal .modal-dialog'
                ).innerHTML = response.data.html;
              } else if (response.data && response.data.errors) {
                //show error
                let errorBlock = document.createElement('p');
                errorBlock.classList.add('text-center', 'invalid');
                errorBlock.textContent =
                  response.data.errors || 'Server error.';
                document
                  .querySelector('.b-form-auth__block')
                  .prepend(errorBlock);
                //close popup window
                $('#docToSignModal').modal('hide');
              } else {
                //enable submit button
                form
                  .querySelector('button[type=submit]')
                  .removeAttribute('disabled');
                //close popup window
                $('#docToSignModal').modal('hide');
              }
            }
          });
      } else {
        BX.ajax
          .runComponentAction('twinpx:agreements', 'chechAgreement', {
            mode: 'class',
            data: {
              login: loginInput.value,
              password: passwordInput.value,
            }, // ключи объекта data соответствуют параметрам метода
          })
          .then(function (response) {
            if (response.status === 'success') {
              // Если форма успешно отправилась
              //            	let result = response;
              //hide preloader
              checkboxBlock.classList.remove('b-checkbox--loading');

              if (response.data && response.data.html) {
                //open popup window
                $('#docToSignModal').modal('show');
                //set modal content
                document.querySelector(
                  '#docToSignModal .modal-dialog'
                ).innerHTML = response.data.html;
              } else if (response.data && response.data.errors) {
                //show error
                let errorBlock = document.createElement('p');
                errorBlock.classList.add('text-center', 'invalid');
                errorBlock.textContent =
                  response.data.errors || 'Server error.';
                document
                  .querySelector('.b-form-auth__block')
                  .prepend(errorBlock);
                //close popup window
                $('#docToSignModal').modal('hide');
              } else {
                //enable submit button
                form
                  .querySelector('button[type=submit]')
                  .removeAttribute('disabled');
                //close popup window
                $('#docToSignModal').modal('hide');
              }
            }
          });
      }
    }
  });
});
