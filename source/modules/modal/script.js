//change frames
document
  .querySelectorAll('.modal-frame .btn[ data-to-frame ]')
  .forEach(function (btn) {
    btn.addEventListener('click', function () {
      var frameNum = btn.getAttribute('data-to-frame');
      console.log(frameNum);
      btn.closest('.modal-frame').classList.remove('modal-frame--active');
      btn
        .closest('.modal-body')
        .querySelector('.modal-frame--' + frameNum)
        .classList.add('modal-frame--active');
    });
  });

document.querySelectorAll('#preappealModal form').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    //fetch data
    $.ajax({
      url: btn.getAttribute('data-url'),
      type: btn.getAttribute('data-method'), //GET
      dataType: 'json',
      data: form.serialize(),
      success: function (data) {},
      error: function (a, b, c) {
        if (window.console) {
          console.log(a);
          console.log(b);
          console.log(c);
        }
      },
    });
  });
});
