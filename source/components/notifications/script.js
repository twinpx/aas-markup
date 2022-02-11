window.addEventListener('load', () => {
  let intervalId = setInterval(() => {
    if (
      document
        .querySelector('.b-header')
        .classList.contains('ph-block--animated')
    ) {
      document.getElementById('top-alert').classList.add('top-alert--show');
      clearInterval(intervalId);
    }
  }, 100);

  //document.querySelector('.b-header-fixed-wrapper').style.top = '70px';
});
