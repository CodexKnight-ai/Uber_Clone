import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import {store} from "./store/store.js";
// import UserContext from "./context/UserContext.jsx";
// import CaptainContext from "./context/CaptainContext.jsx"?;
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
