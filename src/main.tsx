import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import App from "./App.tsx";

// ? third party imports
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([1]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
