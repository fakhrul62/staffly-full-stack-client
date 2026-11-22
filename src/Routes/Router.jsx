import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./Root";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Contact from "../pages/Contact";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";
import AdminHome from "../pages/Dashboard/AdminHome";
import HrHome from "../pages/Dashboard/HrHome";
import EmployeeHome from "../pages/Dashboard/EmployeeHome";
import Dashboard from "./Dashboard";
import DashboardIndex from "./DashboardIndex";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import AllEmployees from "../pages/Dashboard/AllEmployees";
import Payroll from "../pages/Dashboard/Payroll";
import HrPayment from "../pages/Dashboard/HrPayment";
import Progress from "../pages/Dashboard/Progress";
import EmployeeDetails from "../pages/Dashboard/EmployeeDetails";
import Analytics from "../pages/Dashboard/Analytics";
import Settings from "../pages/Dashboard/Settings";
import Leaves from "../pages/Dashboard/Leaves";
import AuditLogs from "../pages/Dashboard/AuditLogs";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Navigate to="/dashboard/profile" replace />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardIndex />,
      },
      // Shared inside dashboard
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/leaves",
        element: (
          <PrivateRoute>
            <Leaves />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/analytics",
        element: (
          <PrivateRoute>
            <Analytics />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/audit-logs",
        element: (
          <PrivateRoute>
            <AuditLogs />
          </PrivateRoute>
        ),
      },
      // Admin
      {
        path: "/dashboard/home",
        element: (
          <PrivateRoute>
            <AdminHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-employee-list",
        element: (
          <PrivateRoute>
            <AllEmployees />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payroll",
        element: (
          <PrivateRoute>
            <Payroll />
          </PrivateRoute>
        ),
      },
      // HR
      {
        path: "/dashboard/hr-home",
        element: (
          <PrivateRoute>
            <HrHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/details/:id",
        element: (
          <PrivateRoute>
            <EmployeeDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://employee-management-server-rho.vercel.app/employees/${params.id}`
          ),
      },
      {
        path: "/dashboard/progress",
        element: (
          <PrivateRoute>
            <Progress />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/hr-payment",
        element: (
          <PrivateRoute>
            <HrPayment />
          </PrivateRoute>
        ),
      },
      // Employee
      {
        path: "/dashboard/work-sheet",
        element: (
          <PrivateRoute>
            <EmployeeHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
