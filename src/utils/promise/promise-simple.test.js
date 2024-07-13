import { PromiseSimple } from "./promise-simple";

describe("PromiseSimple", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  it("should make an api call", () => {
    const promise = () => {
      return new PromiseSimple((resolve) => {
        console.log("--- ASYNC REQUEST STARTED ---", Date.now());
        setTimeout(() => {
          resolve({ user: "test" });
          console.log(resolve);
        }, 300);
      });
    };
    jest.advanceTimersByTime(301);
    promise()
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
  });
});
