import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Login from "./Login.jsx";
import Admin from "./Admin.jsx";
import Generate from "./Generate.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login></Login>,
  },
  {
    path: "/buscar",
    element: <App></App>,
  },
  {
    path: "/admin",
    element: <Admin></Admin>,
  },
  {
    path: "/generate",
    element: <Generate></Generate>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
