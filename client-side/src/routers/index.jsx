import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Landding from "../Layout/Landding.jsx";
import Login from "../pages/Login.jsx";
import Verify from "../pages/Verify.jsx";
import Password from "../pages/Password.jsx";
import Creatation from "../pages/Creatation.jsx";
import Redux from "../pages/Redux.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";

// admin pages routing
import AdminDashboard from "../Layout/AdminDashborad.jsx";
import CustomerFeedback from "../pages/Admin/CustomerFeedback.jsx";
import RoomManagemant from "../pages/Admin/RoomManagemant.jsx";
import Stuffmanagemant from "../pages/Admin/Stuffmanagemant.jsx";
import Bookings from "../pages/Admin/Bookings.jsx";

// staff pages routing 
import StaffDashboard from "../Layout/StaffDashboard.jsx";
import Notification from "../pages/Stuff/Notification.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Landding>
            <h1>Landding</h1>
          </Landding>
        ),
      },
      {
        path: "/authentication",
        element: (
          <Landding>
            <Login />
          </Landding>
        ),
      },
      {
        path: "/authentication/signup",
        element: (
          <Landding>
            <Creatation />
          </Landding>
        ),
      },
      {
        path: "authentication/verify",
        element: (
          <Landding>
            <Verify />
          </Landding>
        ),
      },
      {
        path: "/authentication/password",
        element: (
          <Landding>
            <Password />
          </Landding>
        ),
      },
      {
        path: "/authentication/reset-password/accound-verification",
        element: (
          <Landding>
            <Verify />
          </Landding>
        ),
      },
      {
        path: "/authentication/reset-password/create-password",
        element: (
          <Landding>
            <ResetPassword />
          </Landding>
        ),
      },
      {
        path: "redux",
        element: (
          <Landding>
            <Redux />
          </Landding>
        ),
      },
      {
        path: "/admin",
        element: <App />,
        children: [
          {
            path: "/admin",
            element: <AdminDashboard />,
          },
          {
            path: "/admin/dashboard/rooms",
            element: (
              <AdminDashboard>
                <RoomManagemant />
              </AdminDashboard>
            ),
          },
          {
            path: "/admin/dashboard/users",
            element: (
              <AdminDashboard>
                <h1>Users</h1>
              </AdminDashboard>
            ),
          },
          {
            path: "/admin/dashboard/bookings",
            element: (
              <AdminDashboard>
                <Bookings />
              </AdminDashboard>
            ),
          },
          {
            path: "/admin/dashboard/feedback",
            element: (
              <AdminDashboard>
                <CustomerFeedback />
              </AdminDashboard>
            ),
          },
          {
            path: "/admin/dashboard/staff",
            element: (
              <AdminDashboard>
                <Stuffmanagemant />
              </AdminDashboard>
            ),
          },
        ],
      },
      {
        path: "/staff",
        element: <App />,
        children: [
          {
            path: "/staff",
            element: <StaffDashboard/>,
          },
          {
            path: "/staff/dashboard",
            element: <h1>Staff Dashboard</h1>,
          },
          {
            path: "/staff/dashboard/notifications",
            element: (
              <StaffDashboard>
                <Notification/>
              </StaffDashboard>
            ),
          },
          {
            path: "/staff/dashboard/feedback",
            element: <h1>Staff Feedback</h1>,
          }
        ],
      },

      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);

export default router;
