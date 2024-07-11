import React from "react";
import { createRoot } from "react-dom/client";
import { BatchUpdateComponent } from "./batch-update";
import { Eventloop } from "./event-loop";

const container = document.getElementById("root");
const root = createRoot(container);
const App = () => (
  <div>
    <h1>React</h1>
    <BatchUpdateComponent />
    <Eventloop />
  </div>
);

root.render(<App />);
