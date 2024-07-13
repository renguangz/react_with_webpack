import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./home";
import PromisePage from "./implements/promise";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/implements/promise",
    element: <PromisePage />,
  },
]);
