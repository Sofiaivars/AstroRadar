import { createBrowserRouter } from "react-router";
import App from './src/App.jsx'
import LoginPage from "./src/pages/LoginPage.jsx";
import DashboardMain from "./src/components/dashboard/DashboardMain.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {index: true, Component: LoginPage},
      {path: '/dashboard', Component: DashboardMain},
    ]
  }
])

export default router