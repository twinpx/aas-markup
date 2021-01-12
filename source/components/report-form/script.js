(function ($) {
  'use strict';

  $(function () {
    //staff table events
    document.querySelectorAll('.b-staff-table').forEach(function (tableBlock) {
      //delete tr
      tableBlock.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.matches('.btn-delete')) {
          e.stopPropagation();

          var btn = e.target;
          var tr = btn.closest('tr');
          var tbody = tr.closest('tbody');
          var table = tr.closest('table');

          //send ajax
          staffMembersAutocompleteRequest(btn);

          //remove td in tr
          tr.style.height = tr.clientHeight + 'px';
          tr.classList.add('removing');

          setTimeout(function () {
            tr.querySelectorAll('td').forEach(function (td) {
              td.remove();
            });
            tr.style.height = '0px';
            setTimeout(function () {
              tr.remove();

              //remove thead if needed
              if (!tbody.querySelectorAll('tr').length) {
                table.closest('.b-staff-table').classList.add('hide');
              }
            }, 300);
          }, 300);
        }
      });
    });

    //staff modal
    document.querySelectorAll('.b-member-modal').forEach(function (staffModal) {
      staffModal.querySelectorAll('input').forEach(function (input, index) {
        input.addEventListener('keyup', function (e) {
          if (
            (index === 0 && input.value.length < 9) ||
            (index === 1 && input.value.length < 5)
          ) {
            return;
          }

          //get html for the hint
          $.ajax({
            url: input.closest('.modal-body').getAttribute('data-hint-url'),
            type: input.closest('.modal-body').getAttribute('data-method'), //GET
            dataType: 'json',
            data: { str: input.value },
            success: function (data) {
              if (data && typeof data === 'object') {
                if (data.SUCCESS === 'Y') {
                  input.closest('.b-float-label').classList.remove('invalid');
                  input
                    .closest('.b-float-label')
                    .querySelector('.b-input-hint').innerHTML = data.HTML;
                } else {
                  input.closest('.b-float-label').classList.add('invalid');
                  input
                    .closest('.b-float-label')
                    .querySelector('.b-input-hint').innerHTML = '';
                }
              }
            },
            error: ajaxError,
          });
        });
      });

      //staff modal complete form
      var memberObject = {};
      staffModal.querySelectorAll('.b-input-hint').forEach(function (hint) {
        hint.addEventListener('click', function (e) {
          if (e.target.matches('a')) {
            e.preventDefault();
          }

          //get member's info
          $.ajax({
            url: hint.closest('.modal-body').getAttribute('data-info-url'),
            type: hint.closest('.modal-body').getAttribute('data-method'), //GET
            dataType: 'json',
            data: {
              id: hint
                .querySelector('.b-input-hint__item')
                .getAttribute('data-id'),
            },
            success: function (data) {
              if (data && typeof data === 'object') {
                if (data.SUCCESS === 'Y') {
                  //fill the memeberObject
                  memberObject.ornz = data.ORNZ;
                  memberObject.fio = data.FIO;
                  memberObject.html = data.HTML;
                  memberObject.url = data.URL;

                  //fill the inputs
                  staffModal
                    .querySelectorAll('.b-float-label')
                    .forEach(function (elem, index) {
                      elem.querySelector('label').classList.add('active');
                      if (index === 0) {
                        elem.querySelector('input[type=text]').value =
                          data.ORNZ;
                      } else {
                        elem.querySelector('input[type=text]').value = data.FIO;
                      }
                    });

                  //clear hint
                  hint.innerHTML = '';
                } else {
                }
              }
            },
            error: ajaxError,
          });
        });
      });

      //staff modal add the member
      staffModal.querySelector('.btn').addEventListener('click', function (e) {
        e.preventDefault();

        //clean inputs
        staffModal
          .querySelectorAll('input[type=text]')
          .forEach(function (input) {
            input.value = '';
            input
              .closest('.b-float-label')
              .querySelector('label')
              .classList.remove('active');
          });

        //show the table
        var table = document
          .querySelector(
            '[data-target = "#' + staffModal.getAttribute('id') + '"]'
          )
          .closest('.b-collapse-block__body')
          .querySelector('.b-staff-table.added');
        table.classList.remove('hide');

        //add tr
        var tr = document.createElement('tr');
        tr.setAttribute('data-url', memberObject.url);
        tr.innerHTML = memberObject.html;

        table.querySelector('tbody').appendChild(tr);
      });
    });

    //calendar icon
    document.querySelectorAll('.calendar-icon').forEach(function (iconImg) {
      var src = iconImg.closest('.b-float-label').getAttribute('data-src');
      iconImg.src = src;
      iconImg.classList.add('show');
    });

    //complete inputs
    document
      .querySelectorAll('.b-complete-link')
      .forEach(function (completeLink) {
        completeLink.addEventListener('click', function (e) {
          e.preventDefault();
          completeInput(completeLink);
          fieldAutocompleteRequest(
            completeLink
              .closest('.row')
              .querySelector('.b-float-label input, .b-float-label textarea')
          );
          resetClearButton(
            completeLink
              .closest('.b-collapse-block__body')
              .querySelectorAll('.b-report-form__buttons .btn ')[1]
          );
        });
      });

    //buttons
    document
      .querySelectorAll('.b-report-form__buttons')
      .forEach(function (buttonsBlock) {
        var bodyElem = buttonsBlock.closest('.b-collapse-block__body');
        var buttons = buttonsBlock.querySelectorAll('.btn');
        var clearButton = buttons[1];

        //complete button
        buttons[0].addEventListener('click', function (e) {
          e.preventDefault();
          bodyElem
            .querySelectorAll('.b-complete-link')
            .forEach(function (completeLink) {
              completeInput(completeLink);
            });
          formAutocompleteRequest(buttonsBlock.closest('form'));
          resetClearButton(clearButton);
        });

        //clear button
        clearButton.addEventListener('click', function (e) {
          e.preventDefault();

          if (clearButton.className.search('return') === -1) {
            //clear button

            bodyElem
              .querySelectorAll('.b-float-label input, .b-float-label textarea')
              .forEach(function (input) {
                window.localStorage.setItem(input.name, input.value);
                input.value = '';
                input
                  .closest('.b-float-label')
                  .querySelector('label')
                  .classList.remove('active');
              });
            setClearButton(clearButton);
          } else {
            //return button

            bodyElem
              .querySelectorAll('.b-float-label input, .b-float-label textarea')
              .forEach(function (input) {
                var value = window.localStorage.getItem(input.name);
                if (!value) {
                  return;
                }
                input.value = value;
                input
                  .closest('.b-float-label')
                  .querySelector('label')
                  .classList.add('active');
              });
            resetClearButton(clearButton);
          }

          formAutocompleteRequest(buttonsBlock.closest('form'));
        });
      });

    //save form
    document
      .querySelectorAll(
        '.b-report-form input[ name ], .b-report-form textarea[ name ]'
      )
      .forEach(function (input) {
        input.addEventListener('blur', function (e) {
          //send ajax
          fieldAutocompleteRequest(input);
          resetClearButton(
            input
              .closest('.b-collapse-block__body')
              .querySelectorAll('.b-report-form__buttons .btn ')[1]
          );
        });
      });

    //autosave
    setInterval(function () {
      var form = document.querySelector('.b-report-form form');
      formAutocompleteRequest(form);
    }, 120000);

    //validation
    document
      .querySelectorAll('.b-report-form [ required ]')
      .forEach(function (input) {
        if (input.getAttribute('type') === 'checkbox') {
          input.addEventListener('change', function (e) {
            inputValidation(input);
          });
        } else {
          input.addEventListener('blur', function (e) {
            inputValidation(input);
          });
        }
      });

    //scroll to the first invalid field
    document
      .querySelector('.b-report-form__submit a')
      .addEventListener('click', function (e) {
        e.preventDefault();
        var fieldIndex;
        document
          .querySelectorAll('.b-report-form [required]')
          .forEach(function (input, index) {
            if (fieldIndex) {
              return;
            }
            if (input.value.trim() === '') {
              fieldIndex = index;
            }
          });

        //focus
        var field = document.querySelectorAll('.b-report-form [required]')[
          fieldIndex
        ];
        if (fieldIndex && field) {
          field.focus();
        }
      });

    var regExp = {
      email: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i,
    };

    function inputValidation(input) {
      var validFlag = false;
      var inputValue =
        input.getAttribute('type') === 'checkbox' ? '' : input.value.trim();

      //is valid
      if (inputValue !== '') {
        validFlag = true;

        if (
          input.getAttribute('type') === 'email' &&
          !inputValue.match(regExp.email)
        ) {
          validFlag = false;
        }
      }

      //highlight input
      if (validFlag === true) {
        removeInvalid(input);
      } else {
        setInvalid(input);
      }

      //hightlight block
      if (input.closest('.b-collapse-block__body')) {
        if (validFlag === true) {
          var invalidLength = input
            .closest('.b-collapse-block__body')
            .querySelectorAll('.b-float-label.invalid').length;
          if (invalidLength > 0) {
            input.closest('.b-collapse-block').classList.add('invalid');
          } else {
            input.closest('.b-collapse-block').classList.remove('invalid');
          }
        } else {
          input.closest('.b-collapse-block').classList.add('invalid');
        }
      }

      //highlight form
      if (validFlag === true) {
        if (isFormValid()) {
          document
            .querySelector('.b-report-form__submit')
            .classList.add('valid');
          document
            .querySelector('.b-report-form__submit .btn')
            .removeAttribute('disabled');
        } else {
          document
            .querySelector('.b-report-form__submit')
            .classList.remove('valid');
          document
            .querySelector('.b-report-form__submit .btn')
            .setAttribute('disabled', 'disabled');
        }
      } else {
        document
          .querySelector('.b-report-form__submit')
          .classList.remove('valid');
        document
          .querySelector('.b-report-form__submit .btn')
          .setAttribute('disabled', 'disabled');
      }
    }

    function isFormValid() {
      var flag = true;

      document
        .querySelectorAll('.b-report-form [ required ]')
        .forEach(function (input) {
          if (
            input.value.trim() === '' ||
            (input.getAttribute('type') === 'email' &&
              !input.value.match(regExp.email)) ||
            (input.getAttribute('type') === 'checkbox' && !input.checked)
          ) {
            flag = false;
          }
        });

      return flag;
    }

    function setClearButton(clearButton) {
      clearButton.classList.add('return');
    }

    function resetClearButton(clearButton) {
      clearButton.classList.remove('return');
    }

    function completeInput(completeLink) {
      var input = completeLink
        .closest('.row')
        .querySelector('.b-float-label input, .b-float-label textarea');
      input.value = completeLink.textContent;
      completeLink
        .closest('.row')
        .querySelector('.b-float-label label')
        .classList.add('active');
      inputValidation(input);
    }

    function staffMembersAutocompleteRequest(btn, cnt) {
      var memberId = btn.closest('tr').getAttribute('data-url');
      var counter = cnt || 0;
      var id;

      if (document.getElementById('element_id')) {
        id = document.getElementById('element_id').value;
      }

      $.ajax({
        url: btn.closest('form').getAttribute('data-ajax-url'),
        type: btn.closest('form').getAttribute('method'), //GET
        dataType: 'json',
        data: { member: memberId, element_id: id },
        success: function (data) {
          if (data && typeof data === 'object' && data.SUCCESS) {
            if (data.SUCCESS !== 'Y' && counter < 3) {
              fieldAutocompleteRequest(btn, ++counter);
            } else if (data.SUCCESS === 'Y' && typeof data.DATE === 'string') {
              //showAutocompleteTime( data.DATE );
            }
          }
        },
        error: ajaxError,
      });
    }

    function fieldAutocompleteRequest(input, cnt) {
      var inputName = input.getAttribute('name');
      var inputValue = input.value;
      var counter = cnt || 0;
      var id;

      if (document.getElementById('element_id')) {
        id = document.getElementById('element_id').value;
      }

      $.ajax({
        url: input.closest('form').getAttribute('data-ajax-url'),
        type: input.closest('form').getAttribute('method'), //GET
        dataType: 'json',
        data: { name: inputName, value: inputValue, element_id: id },
        success: function (data) {
          if (data && typeof data === 'object' && data.SUCCESS) {
            if (data.SUCCESS !== 'Y' && counter < 3) {
              fieldAutocompleteRequest(input, ++counter);
            } else if (data.SUCCESS === 'Y' && typeof data.DATE === 'string') {
              //showAutocompleteTime( data.DATE );
            }
          }
        },
        error: function (a, b, c) {
          if (window.console) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        },
      });
    }

    function formAutocompleteRequest(form, cnt) {
      var counter = cnt || 0;

      $.ajax({
        url: form.getAttribute('data-ajax-url'),
        type: form.getAttribute('method'), //GET
        dataType: 'json',
        data: $(form).serialize(),
        success: function (data) {
          if (data && typeof data === 'object' && data.SUCCESS) {
            if (data.SUCCESS !== 'Y' && counter < 3) {
              formAutocompleteRequest(form, ++counter);
            } else if (data.SUCCESS === 'Y' && typeof data.DATE === 'string') {
              showAutocompleteTime(data.DATE);
            }
          }
        },
        error: function (a, b, c) {
          if (window.console) {
            console.log(a);
            console.log(b);
            console.log(c);
          }
        },
      });
    }

    function showAutocompleteTime(date) {
      document.querySelector(
        '.b-report-form__autosave-text span'
      ).textContent = date;
    }

    function setInvalid(input) {
      if (input.getAttribute('type') === 'checkbox') {
        input.closest('.b-checkbox').classList.add('invalid');
      } else {
        input.closest('.b-float-label').classList.add('invalid');
      }
    }

    function removeInvalid(input) {
      if (input.getAttribute('type') === 'checkbox') {
        input.closest('.b-checkbox').classList.remove('invalid');
      } else {
        input.closest('.b-float-label').classList.remove('invalid');
      }
    }

    function ajaxError(a, b, c) {
      if (window.console) {
        console.log(a);
        console.log(b);
        console.log(c);
      }
    }
  });
})(jQuery);
