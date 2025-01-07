import { Outlet, createBrowserRouter } from "react-router-dom";
import App from "./App"; // Main layout component
import {DashboardLayout,TeamsLayout,EmployeesLayout,SettingLayout,EmployeeProfileLayout} from './Layouts/AllLayout'

const EmployeesLayoutOutlet = () => ( 
  <>
  <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // The main layout that includes Navbar, Sidebar, and Outlet
    children: [
      {
        path: "", // Default child route
        element: <DashboardLayout />, // This will be the content inside the main layout (App)
      },
      {
        path: "teams",
        element: <TeamsLayout />,
      },
      {
        path: "employees",
        element: <EmployeesLayoutOutlet />,
        children :[
          {
            path: "",
            element: <EmployeesLayout />,
          },
          {
            path: "profile/:employeeId",
            element: <EmployeeProfileLayout />,
          }
        ]
      },
      {
        path: "settings",
        element: <SettingLayout />,
      },
    ],
  },
]);
