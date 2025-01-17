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
      //dashboard admin
      {
        path: "/dashboard/home",
        element: (
          <PrivateRoute>
            <AdminHome></AdminHome>
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
        path: "/dashboard/user-home",
        element: (
          <PrivateRoute>
            <EmployeeHome></EmployeeHome>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
