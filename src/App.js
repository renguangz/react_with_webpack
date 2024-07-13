import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./routes/home";
import ReduxPage from "./routes/implements/redux";

const container = document.getElementById("root");
const root = createRoot(container);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/implements/redux" element={<ReduxPage />} />
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
