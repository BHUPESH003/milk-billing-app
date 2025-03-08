import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Login from "../pages/Login";
import Layout from "../components/Layout";
import AddCustomerForm from "../pages/AddCustomer";
import GenerateBill from "../pages/GenerateBill";
import AddPayment from "../pages/AddPayment";
import CustomerBills from "../pages/CustomerBills";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <CustomerBills />,
      },
      {
        path: "/add-customer",
        element: <AddCustomerForm />,
      },
      {
        path: "/generate-bill",
        element: <GenerateBill />,
      },

      {
        path: "/add-payment",
        element: <AddPayment />,
      },
    ],
  },
]);

export default router;
