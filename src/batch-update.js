import React, { useState } from "react";

export function BatchUpdateComponent() {
  const [pending, setPending] = useState(0);
  const [count, setCount] = useState(0);

  const click = async () => {
    setPending(pending + 1);
    await delay(3000);
    setPending(pending - 1);
    setCount(count + 1);
  };

  return (
    <div>
      <span>pending: {pending}</span>
      <span>count: {count}</span>
      <button onClick={click}>click</button>
    </div>
  );
}

function delay(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
