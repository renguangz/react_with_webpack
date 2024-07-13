// "use strict";
// this in global space -> global object - window, global
// console.log("this", this);

// this inside a function -> depends on strict / non strict mode
function x() {
  // strict mode -> undefined
  // non strict mode -> window
  console.log("function", this);
}
// x();
// window.x();

// this is strict mode - (this substitution)
// If the value of `this` keyword is undefined or null
// `this` keyword will be replaced with globalObject
// only in non strict mode

// this value depends on how this is called

// this inside a object method
// function in object is a method
const obj = {
  a: 10,
  x: function () {
    console.log(this);
  },
};
// obj.x();

// call apply bind methods (sharing methods)
// const obj2 = {
//   a: 20,
// };
// obj.x.call(obj2);
// obj.x.apply(obj2);
// const x2 = obj.x.bind(obj2);
// x2();

// this inside arrow function -> 定義的作用域，以這個例子來說，this 在物件宣告的時候一起被定義，並且物件被宣告在 global，所以是 global
const obj3 = {
  a: 10,
  x: () => {
    console.log("obj3", this);
  },
};
obj3.x();

//  this inside nested arrow function
const obj4 = {
  a: 20,
  x: function () {
    // enclosing lexical context
    // 這邊的 this 定義的作用域是 function，因此這個 console.log(this) 相當於寫在外面
    // 所以是指向 obj4
    console.log(this); // same as writing inside y function
    const y = () => {
      console.log(this);
    };
    y();
  },
};
obj4.x();

// this inside DOM -> reference to target HTML element
