window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/pwa/poll/sw.js', { scope: '/pwa/poll/' })
      .then((registration) => {
        console.log('registered', registration);
      })
      .catch((error) => {
        console.log('failed', error);
      });
  }
});
