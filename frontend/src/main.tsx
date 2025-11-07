import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { store } from "./store/store";
import App from "./App";
import "./index.css"; // optional if you add global styles
import ErrorFallback from "./components/ErrorFallback";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
