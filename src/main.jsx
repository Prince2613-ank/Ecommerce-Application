// src/main.jsx

import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // 👈 ADD THIS IMPORT
import { store } from "./app/store";
import App from "./App.jsx";
import "./index.css"; 

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* 👈 ADD THIS WRAPPER */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </Provider>
);