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
import LibarianRquest from "../pages/Dashboard/Admin/LibarianRquest";
import LibarianRoute from "./LibarianRoute";
import AdminRoute from "./AdminRoute";
import HomeDashboard from "../pages/Dashboard/HomeDashboard/HomeDashboard";
import AdminOverview from "../pages/Dashboard/Admin/AdminOverview";
import About from "../components/Home/About";
import Blog from "../components/Home/Blog/Blog";

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
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/payment-success",
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
            <AdminOverview />
          </PrivateRoute>
        ),
      },
      // first login takthe hobe tarporor libarian hothe hobe tarpor route te dokthe parbe
      {
        path: "add-book",
        element: (
          <PrivateRoute>
            <LibarianRoute>
              <AddBook />
            </LibarianRoute>
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
        path: "labirian-request",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <LibarianRquest />
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
        path: "manage-orders",
        element: (
          <PrivateRoute>
            <LibarianRoute>
              <ManageOrders />,
            </LibarianRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
