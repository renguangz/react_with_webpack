import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
