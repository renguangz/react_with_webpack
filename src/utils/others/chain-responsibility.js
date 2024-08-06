class LazyMan {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.isRunning = false;

    console.log(`Hi I am ${this.name}`);
  }

  runTasks() {
    /**
     * 不能用 this.tasks.length <= 0 return 的原因
     * 如果是使用 this.tasks.length 判斷: man.eat('food1').sleep(2).eat('food2') -> 順序會正確，但不會有延遲兩秒的作用
     * 第一次 macro tasks 執行 -> eat('food1') 丟一個 setTimeout 裡面是 task, sleep(2) 丟一個 setTimeout 裡面是 task, eat('food2') 丟一個 setTimeout 裡面是 task。目前總共會有三個 setTimeout
     * 執行第一個 setTimeout console log food1, 馬上執行第二個 task sleep, console log 秒數後丟一個 setTimout 到最後面。包含第一個總共丟了四個 setTimeout
     * 執行第二個 setTimeout 執行 task, 裡面是執行 console log food2 然後去執行下一個 tasks，因為沒 tasks 了 return 回來
     * 執行第三個 setTimeout 執行 task, 因為沒 tasks 了 return 回來
     * 執行第四個 setTimeout, 這個 setTimeout 是 sleep 丟出來的，因此會等待秒數再開始執行，但這時候也沒 tasks 了所以 return
     * */
    if (this.isRunning) return;
    this.isRunning = true;

    const run = () => {
      const task = this.tasks.shift();
      if (task) {
        task(() => {
          run();
        });
      } else {
        this.isRunning = false;
      }
    };

    run();
  }

  eat(food) {
    const eatTask = (next) => {
      console.log(`I am eating ${food}`);
      next();
    };

    this.tasks.push(eatTask);
    // @NOTE: 所有 method 都會觸發 runTasks，使 instance 可以重複調用
    setTimeout(() => this.runTasks(), 0);

    // @NOTE: 如果不返回 this，後續無法繼續掉用，會是 undefined
    return this;
  }

  sleep(ms) {
    const sleepTask = (next) => {
      console.log(`等待 ${ms} 秒`);
      setTimeout(() => next(), ms * 1000);
    };

    this.tasks.push(sleepTask);
    setTimeout(() => this.runTasks(), 0);

    // @NOTE: 如果不返回 this，後續無法繼續掉用，會是 undefined
    return this;
  }

  sleepFirst(ms) {
    const sleepFirstTask = (next) => {
      console.log(`等待 ${ms} 秒`);
      setTimeout(() => next(), ms * 1000);

      this.tasks.unshift(sleepFirstTask);
      setTimeout(() => this.runTasks(), 0);

      // @NOTE: 如果不返回 this，後續無法繼續掉用，會是 undefined
      return this;
    };
  }
}

function LazyManFactory(name) {
  return new LazyMan(name);
}

const tom = new LazyMan("Tom");
// Hi I am Tom

new LazyMan("Tom").sleep(10).eat("lunch");
// Hi I am Tom
// 等待 10 秒
// I am eating lunch

tom.sleep(10).eat("lunch"); // 重複執行也可以
// 等待 10 秒
// I am eating lunch

new LazyMan("Tom")
  .eat("lunch")
  .eat("dinner")
  .sleepFirst(5)
  .sleep(5)
  .eat("food");
// Hi I am Tom
// 等待 5 秒
// I am eating lunch
// I am eating dinner
// 等待 5 秒
// I am eating food
