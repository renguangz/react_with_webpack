const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

const HANDLERS = Symbol("handlers"); // 用於存放 then 中宣告的 onFulfilled 與 onRejected
const QUEUE = Symbol("queue"); // 用於存放 then 所產生的 Promise，也就是 Producer-Concumer 架構中的 Buffer
const STATE = Symbol("state"); // 用於存放 Promise 的狀態，是 Pending、Fulfilled、Rejected 其中一個
const VALUE = Symbol("value"); // 用於存放 resolve 後的 value，或者是 reject 後的 reason

class Handlers {
  constructor() {
    this.onFulfilled = null;
    this.onRejected = null;
  }
}

class Promise {
  constructor(executor) {
    this[QUEUE] = [];
    this[HANDLERS] = [];
    this[STATE] = PENDING;
    this[VALUE] = null;

    if (typeof executor === "function") {
      tryFunction(this, executor);
    } else {
      throw new TypeError(`Promise resolver ${executor} is not a function`);
    }
  }

  then(onFulfilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      if (this[STATE] === FULFILLED && typeof onFulfilled !== "function") {
        resolve(this[VALUE]);
      } else if (this[STATE] === REJECTED && typeof onRejected !== "function") {
        reject(this[VALUE]);
      }
    });

    if (typeof onFulfilled === "function") {
      promise2[HANDLERS].onFulfilled = onFulfilled;
    }
    if (typeof onRejected === "function") {
      promise2[HANDLERS].onRejected = onRejected;
    }

    this[QUEUE].push(promise2);
    process(this);
    return promise2;
  }
}

function tryFunction(promise, executor) {
  const resolve = (value) => {
    transition(promise, FULFILLED, value);
  };
  const reject = (value) => {
    transition(promise, REJECTED, value);
  };

  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

function transition(promise, state, value) {
  if (promise[STATE] === state || promise[STATE] !== PENDING) return;
  promise[STATE] = state;
  promise[VALUE] = value;
  return process(promise);
}
