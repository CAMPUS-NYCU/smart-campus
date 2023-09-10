import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

import App from "./App.tsx";
import store from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <NextThemeProvider attribute="class">
          <App />
        </NextThemeProvider>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
);
