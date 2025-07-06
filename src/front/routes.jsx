import { createBrowserRouter } from "react-router";
import App from "./src/App.jsx";
import LoginPage from "./src/pages/LoginPage.jsx";
import DashboardMain from "./src/pages/DashboardMain.jsx";
import SignUpPage from "./src/pages/SignUpPage.jsx";
import MissionsPage from "./src/pages/MissionsPage.jsx";
import AboutUs from "./src/pages/AboutUs.jsx";
import ErrorPage from "./src/pages/ErrorPage.jsx";
import DashboardComponents from "./src/components/dashboard/DashboardComponents.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: LoginPage },
      { path: "/signup", Component: SignUpPage },
      { 
        path: "/dashboard", 
        Component: DashboardMain,
        children:[
          { index: true, Component: DashboardComponents },
          { path: "missions", Component: MissionsPage }
        ]
      },
      { path: "/about-us", Component: AboutUs },
      { path: "*", Component: ErrorPage },
    ],
  },
]);

export default router;
