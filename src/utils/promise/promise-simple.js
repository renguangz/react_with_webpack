// NOTE: class this 都會指向自己的 instance

export class PromiseSimple {
  constructor(executorFunction) {
    this.promiseChain = [];
    this.handleError = () => {};

    // NOTE: 如果不綁定，會造成 class 內部使用 this 的所有屬性可能綁錯人，造成 undefined error
    this.onResolve = this.onResolve.bind(this);
    this.onReject = this.onReject.bind(this);

    executorFunction(this.onResolve, this.onReject);
  }

  then(onResolve) {
    // 把很多個 then 裡面的 callback functions 都推到 promiseChain，在 this.onResolve 一起處理
    this.promiseChain.push(onResolve);
    return this; // return this make promise can chain multiple thens
  }

  catch(handleError) {
    this.handleError = handleError;
    return this;
  }

  onResolve(value) {
    let storedValue = value;
    try {
      this.promiseChain.forEach((nextFunction) => {
        storedValue = nextFunction(storedValue);
      });
    } catch (err) {
      this.promiseChain = [];
      this.onReject(err);
    }
  }

  onReject(error) {
    this.handleError(error);
  }
}
