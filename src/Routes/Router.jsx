import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";
import AdminHome from "../pages/Dashboard/ADminHome";
import HrHome from "../pages/Dashboard/HrHome";
import EmployeeHome from "../pages/Dashboard/EmployeeHome";
import Dashboard from "./Dashboard";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import AllEmployees from "../pages/Dashboard/AllEmployees";
import Payroll from "../pages/Dashboard/Payroll";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      //public
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      //private
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      //dashboard admin
      {
        path: "/dashboard/home",
        element: (
          <PrivateRoute>
            <AdminHome></AdminHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-employee-list",
        element: (
          <PrivateRoute>
            <AllEmployees></AllEmployees>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payroll",
        element: (
          <PrivateRoute>
            <Payroll></Payroll>
          </PrivateRoute>
        ),
      },
      //dashboard hr
      {
        path: "/dashboard/hr-home",
        element: (
          <PrivateRoute>
            <HrHome></HrHome>
          </PrivateRoute>
        ),
      },
      //dashboard employee
      {
        path: "/dashboard/work-sheet",
        element: (
          <PrivateRoute>
            <EmployeeHome></EmployeeHome>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory></PaymentHistory>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
