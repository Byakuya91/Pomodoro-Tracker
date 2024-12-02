import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import PomodoroTimerPage from "./Pages/PomodoroTimerPage.tsx"; // Ensure the file name matches
import NotFoundPage from "./Pages/NotFoundPage.tsx";
import HistoryPage from "./Pages/HistoryPage.tsx";

// TODO: Establish the routes for the app
// 1) Turn 404 error page into a component.

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/timer",
    element: <PomodoroTimerPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
