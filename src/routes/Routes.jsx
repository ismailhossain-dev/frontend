import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
// import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import ManageOrders from "../pages/Dashboard/Seller/ManageOrders";
import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import AddBook from "../pages/Dashboard/Seller/AddBook";
import PaymentSuccess from "../StripePayment/PaymentSuccess";
import BookDetails from "../pages/bookDetails/BookDetails";
import AllBook from "../pages/AllBook/AllBook";
import Login from "../pages/Login/Login";

import AdminRoute from "./AdminRoute";
import HomeDashboard from "../pages/Dashboard/HomeDashboard/HomeDashboard";

import About from "../components/Home/About";
import Blog from "../components/Home/Blog/Blog";
import Contact from "../components/Home/Contact";
import SwitchRole from "../pages/Dashboard/SwichRole/SwitchRole";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import ManageBooks from "../pages/Dashboard/Admin/ManageBooks";
import AdminCategory from "../pages/Dashboard/Admin/AdminCategory";
import UserOverview from "../pages/Dashboard/Customer/UserOverview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/all-book",
        element: <AllBook />,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "blog",
        element: (
          <PrivateRoute>
            <Blog />
          </PrivateRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <PrivateRoute>
            <Contact />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      { path: "/login", element: <Login /> },

      { path: "/signup", element: <SignUp /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <SwitchRole />
          </PrivateRoute>
        ),
      },
      //dashboard link set korar jorno route kortechi
      {
        path: "dashboard-overview",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminOverview />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "my-inventory",
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageBooks />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin-category",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminCategory />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "user-overview",
        element: (
          <PrivateRoute>
            <UserOverview />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
