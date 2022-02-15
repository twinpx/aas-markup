window.addEventListener('load', () => {
  let intervalId = setInterval(() => {
    if (
      document
        .querySelector('.b-header')
        .classList.contains('ph-block--animated')
    ) {
      //top
      document
        .getElementById('topNotification')
        .classList.add('top-notification--show');
      //notifications
      document.querySelectorAll('.notification').forEach((n) => {
        n.classList.add('notification--show');
      });
      //popup
      $('#notModal').modal('show');

      clearInterval(intervalId);
    }
  }, 100);

  //clear
  document.querySelectorAll('.notification__clear').forEach((clear) => {
    clear.addEventListener('click', function (e) {
      e.preventDefault();
      //hide
      e.target.closest('.notification').classList.remove('notification--show');
      if (
        e.target
          .closest('.notification')
          .classList.contains('notification--top')
      ) {
        document.querySelector('body').classList.remove('body--notifications');
      }
    });
  });

  //top
  document
    .querySelector('#topNotificationClear')
    .addEventListener('click', async function (e) {
      e.preventDefault();

      //fetch
      let formData = new FormData();
      formData.append('id', id);
      let response = await fetch('', {
        method: 'POST',
        headers: {
          Authorization: 'token',
        },
        body: formData,
      });

      let result = await response.json();

      if ((result.STATUS = 'Y')) {
        //hide
        document
          .querySelector('#topNotification')
          .classList.remove('top-notification--show');
        document.querySelector('body').classList.remove('body--notifications');
      }
    });
});
