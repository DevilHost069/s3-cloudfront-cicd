import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./react-query/queryClient";
import App from "./App";
import ErrorBoundary from "./ErrorBoundary";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";
import ConfigurationOptionsProvider from "@contexts/ConfigurationContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ConfigurationOptionsProvider >
          <Toaster position="top-right" reverseOrder={false} />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </ConfigurationOptionsProvider>
      </QueryClientProvider>
    </ErrorBoundary>

  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
