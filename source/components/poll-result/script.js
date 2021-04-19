String.prototype.deformat = function () {
  return Number(this.toString().replace(/\D/g, '').split(' ').join(''));
};

window.onload = function () {
  setTimeout(function () {
    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        document
          .querySelectorAll('.b-poll-result__groups__item')
          .forEach(function (group) {
            let numArray = [];
            group.querySelectorAll('.b-graph__num').forEach(function (num) {
              numArray.push(String(num.textContent).deformat());
            });

            const maxNum = Math.max.apply(null, numArray);

            group.querySelectorAll('.b-graph__num').forEach(function (num) {
              const wrapper = num.closest('.b-graph__wrapper');
              wrapper.style.width =
                Number((String(num.textContent).deformat() * 100) / maxNum) +
                '%';
            });
          });
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
      });
    };

    let observer = new IntersectionObserver(callback, {
      threshold: 1.0,
    });
  }, 1000);
};
