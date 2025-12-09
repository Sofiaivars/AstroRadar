import { createBrowserRouter } from "react-router";
import App from "@/App.jsx";
import AuthPage from "@pages/AuthPage.jsx";
import DashboardMain from "@pages/DashboardMain.jsx";
import SignUpPage from "@pages/SignUpPage.jsx";
import MissionsPage from "@pages/MissionsPage.jsx";
import AboutUs from "@pages/AboutUs.jsx";
import ErrorPage from "@pages/ErrorPage.jsx";
import DashboardComponents from "@components/dashboard/DashboardComponents.jsx";
import Step1Page from "@pages/Step1Page.jsx";
import Step2Page from "@pages/Step2Page.jsx";
import Step3Page from "@pages/Step3Page.jsx";
import EventsPage from "@pages/EventsPage.jsx";
import CompletedMissionsPage from "@pages/CompletedMissionsPage.jsx";
import SatellitePage from "@pages/SatellitePage.jsx";
import LoginForm from "@components/login/login.jsx";
import ProfilePage from "@pages/ProfilePage.jsx";
import ProtectedRoute from "@components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "/",
        Component: AuthPage,
        children: [
          { index: true, Component: LoginForm },
          { path: "signup", Component: SignUpPage}
        ]
      },
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
          { path: "completed-missions", Component: CompletedMissionsPage },
          { path: "events", Component: EventsPage },
          { path: "iss", Component: SatellitePage },
          { path: "profile", element: (
            <ProtectedRoute>
              <ProfilePage/>
            </ProtectedRoute>
          )},
        ],
      },
      { path: "/about-us", Component: AboutUs },
      { path: "*", Component: ErrorPage },
    ],
  },
]);

export default router;
