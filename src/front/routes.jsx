import { createBrowserRouter } from "react-router";
import App from "./src/App.jsx";
import LoginPage from "./src/pages/LoginPage.jsx";
import DashboardMain from "./src/pages/DashboardMain.jsx";
import SignUpPage from "./src/pages/SignUpPage.jsx";
import MissionsPage from "./src/pages/MissionsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: LoginPage },
      { path: "/signup", Component: SignUpPage },
      { path: "/dashboard", Component: DashboardMain },
      { path: "/missions", Component: MissionsPage },
    ],
  },
]);

export default router;
