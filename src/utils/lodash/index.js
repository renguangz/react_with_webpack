export function debounce(fn, wait, { maxWait } = { maxWait: null }) {
  let timer, maxTimer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      clearTimeout(maxTimer);
      maxTimer = null;
      fn(...args);
    }, wait);
    if (maxWait && !maxTimer) {
      maxTimer = setTimeout(() => {
        clearTimeout(timer);
        maxTimer = null;
        fn(...args);
      }, maxWait);
    }
  };
}

export function throttle(fn, time) {
  let isWaiting = false;
  return function (...args) {
    if (isWaiting) return;
    fn(...args);
    isWaiting = true;
    setTimeout(() => {
      isWaiting = false;
    }, time);
  };
}
