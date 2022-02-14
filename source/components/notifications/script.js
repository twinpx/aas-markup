window.addEventListener('load', () => {
  let intervalId = setInterval(() => {
    if (
      document
        .querySelector('.b-header')
        .classList.contains('ph-block--animated')
    ) {
      document
        .getElementById('topNotification')
        .classList.add('top-notification--show');
      clearInterval(intervalId);
    }
  }, 100);

  document
    .querySelector('#topNotificationClear')
    .addEventListener('click', (e) => {
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
