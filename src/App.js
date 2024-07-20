import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./routes/home";
import ReduxPage from "./routes/implements/redux";
import UserPage from "./routes/implements/redux/user";
import { Provider } from "react-redux";
import { store } from "./store";

const container = document.getElementById("root");
const root = createRoot(container);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/implements/redux" element={<ReduxPage />} />
        <Route path="/implements/redux/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
