window.addEventListener('load', () => {
  //params
  let queryObject = parseQuery(window.location.search);

  let value = '';
  const select = document.querySelector('.b-reports-list__select select');
  const param = document
    .querySelector('.b-reports-list__select')
    .getAttribute('data-param');
  $(select).ikSelect({
    onShow() {
      value = select.value;
    },
    onHide() {
      if (value === select.value) return;
      queryObject[param] = value;
      location.replace(getQuery(queryObject));
    },
  });

  function getQuery(queryObject) {
    var result = [];
    for (var k in queryObject) {
      if (k) {
        result.push(k + '=' + queryObject[k]);
      }
    }
    return '?' + result.join('&');
  }

  function parseQuery(queryString) {
    var query = {};
    var pairs = (
      queryString[0] === '?' ? queryString.substr(1) : queryString
    ).split('&');
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }
});
