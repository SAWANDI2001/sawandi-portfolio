import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminLogin from "./AdminLogin.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AdminProjects from "./AdminProjects.jsx";
import AdminMessages from "./AdminMessages.jsx";

const path = window.location.pathname;

let page;

if (path === "/admin/login") {
  page = <AdminLogin />;
} else if (path === "/admin/dashboard") {
  page = <AdminDashboard />;
} else if (path === "/admin/projects") {
  page = <AdminProjects />;
} else if (path === "/admin/messages") {
  page = <AdminMessages />;
} else {
  page = <App />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {page}
  </StrictMode>
);