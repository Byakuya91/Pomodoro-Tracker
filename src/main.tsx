import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import PomodoroTimerPage from "./Pages/PomodoroTimerPage.tsx"; // Ensure the file name matches

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>404! Not found</div>,
  },
  {
    path: "/timer",
    element: <PomodoroTimerPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
