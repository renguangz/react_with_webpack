import React from "react";
import { PromiseSimple } from "../../../utils/promise/promise-simple";

export default function PromisePage() {
  const promise = new PromiseSimple((resolve) => {
    console.log("--- ASYNC REQUEST STARTED ---", Date.now());
    setTimeout(() => {
      resolve({ user: "test" });
    }, 300);
  });
  promise
    .then((user) => {
      console.log("--- PROMISE RETURN ---", Date.now());
      console.log("In the first then");
      return user;
    })
    .then((user) => {
      console.log("user info", user);
      return user;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });

  return <h1>Hello Promise</h1>;
}
