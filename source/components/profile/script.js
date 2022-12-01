window.addEventListener('load', function () {
  //button
  let interval = 5 * 1000,
    closeInterval = 5 * 60 * 1000,
    profileButton = document.querySelector('.b-profile__button .btn');

  if (profileButton) {
    profileButton.addEventListener('click', (e) => {
      e.preventDefault();
      $('#getPdfModal').modal('show');
      setLoading(true);
      generate();
      window.scrollTo(0, 0);
    });
  }

  function setLoading(flag) {
    let buttonBlock = document.querySelector('.b-profile__button');
    flag
      ? buttonBlock.classList.add('b-profile__button--loading')
      : buttonBlock.classList.remove('b-profile__button--loading');
  }

  function generate() {
    let formData = new FormData();
    formData.set('json', profileButton.getAttribute('data-json'));
    (async () => {
      let counter = 0;
      do {
        try {
          let response;
          if (counter === 0) {
            response = await fetch(window.getPdfPaths.response, {
              method: 'POST',
              body: formData,
            });
          } else {
            response = await fetch(window.getPdfPaths.onMounted);
          }
          counter++;
          let result = await response.json();

          if (result.STATUS === 'LOADING') {
            if (counter >= closeInterval / interval) {
              $('#getPdfModal').modal('hide');
              setLoading(false);
              break;
            } else {
              await new Promise((r) => setTimeout(r, interval));
            }
          } else if (result.STATUS !== 'Y') {
            $('#getPdfModal').modal('hide');
            setLoading(false);
            throw new Error('Ошибка');
          } else if (result.GENERATED) {
            setTimeout(() => {
              window.open(result.GENERATED.fileURL);
              $('#getPdfModal').modal('hide');
              setLoading(false);
            }, 500);
            break;
          } else {
            $('#getPdfModal').modal('hide');
            setLoading(false);
            break;
          }
        } catch (err) {
          $('#getPdfModal').modal('hide');
          setLoading(false);
          throw err;
        }
      } while (true);
    })();
  }
});
