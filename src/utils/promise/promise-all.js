// 請實作Promise.All

function promise1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("1");
    }, 2000);
  });
}

function promise2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("2");
    }, 1000);
  });
}

function promise3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("3");
    }, 1000);
  });
}

function promise4() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("4");
    }, 1000);
  });
}

function PromiseAll(promises) {
  // 請實作Promise.All
  return new Promise((resolve, reject) => {
    const res = [];
    let count = promises.length;
    promises.forEach(() => {
      res.push(null);
    });

    promises.forEach((promise, index) => {
      promise()
        .then((data) => {
          res[index] = data;
          count--;
          if (count === 0) resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}

PromiseAll([promise1, promise2, promise3, promise4]).then((values) => {
  console.log(values);
});

// ["1", "2", "3", "4"]
