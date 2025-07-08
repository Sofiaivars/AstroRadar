import { createBrowserRouter } from "react-router";
import App from "./src/App.jsx";
import LoginPage from "./src/pages/LoginPage.jsx";
import DashboardMain from "./src/pages/DashboardMain.jsx";
import SignUpPage from "./src/pages/SignUpPage.jsx";
import MissionsPage from "./src/pages/MissionsPage.jsx";
import AboutUs from "./src/pages/AboutUs.jsx";
import ErrorPage from "./src/pages/ErrorPage.jsx";
import DashboardComponents from "./src/components/dashboard/DashboardComponents.jsx";
import Step1Page from "./src/pages/Step1Page.jsx";
import Step2Page from "./src/pages/Step2Page.jsx";
import Step3Page from "./src/pages/Step3Page.jsx";

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
        children: [
          { index: true, Component: DashboardComponents },
          {
            path: "missions",
            Component: MissionsPage,
            children: [
              { index: true, Component: Step1Page },
              { path: "step1", Component: Step1Page },
              { path: "step2", Component: Step2Page },
              { path: "step3", Component: Step3Page },
            ],
          },
        ],
      },
      { path: "/about-us", Component: AboutUs },
      { path: "*", Component: ErrorPage },
    ],
  },
]);

export default router;
