import React from "react";

export function Eventloop() {
  test.create("a");
  test.create("b");

  test.test();
  console.log("c");
  test.resolve("a");
  console.log("d");
  test.resolve("b");

  return (
    <div>
      <h1></h1>
    </div>
  );
}

const test = {
  handlers: {},
  resolve: function (name) {
    this.handlers[name]();
  },
  create: function (name) {
    const handler = new Promise((resolve) => {
      this.handlers[name] = resolve;
    });
    handler.then(() => console.log(name));
    console.log(this.handlers[name]());
  },
  test: (b) => {
    const a = {};
    console.log("test()", this);
  },
};

// console.log("begins");
//
// setTimeout(() => {
//   console.log("setTimeout1");
//   Promise.resolve().then(() => {
//     console.log("promise 1");
//   });
// }, 0);
//
// new Promise(function (resolve) {
//   console.log("promise2");
//   setTimeout(() => {
//     console.log("setTimeout2");
//     resolve("resolve1");
//   }, 0);
// }).then((res) => {
//   setTimeout(() => {
//     console.log(res);
//   }, 0);
//   console.log("dot then 1");
// });
