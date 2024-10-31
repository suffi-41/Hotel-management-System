import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Landding from "../Layout/Landding.jsx";
import Login from "../pages/Login.jsx";
import Verify from "../pages/Verify.jsx";
import Password from "../pages/Password.jsx";
import Creatation from "../pages/Creatation.jsx";

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
            <Creatation/>
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
            <Password/>
          </Landding>),
      },
      {
        path: "*",
        element: <h1>404</h1>,
      },
    ],
  },
]);

export default router;
