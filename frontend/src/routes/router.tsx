import { createBrowserRouter } from "react-router-dom"
import { Root } from "../Root"
import { Companies } from "../pages/Companies"
import { AddCompany } from "../pages/AddCompany"
import { CompanyDetails } from "../pages/CompanyDetails"
import { AddCustomer } from "../pages/AddCustomer"
import { AddAddress } from "../pages/AddAddress"
import { CustomerAdressList } from "../pages/CustomerAddressList"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <Companies />,
        index: true,
      },
      {
        path: "/company/add",
        element: <AddCompany />,
      },
      {
        path: "/company/:id",
        element: <CompanyDetails />,
      },
      {
        path: "/company/:id/customer/add",
        element: <AddCustomer />,
      },
      {
        path: "/company/:id/customer/:customerId",
        element: <CustomerAdressList />,
      },
      {
        path: "/company/:id/customer/:customerId/address/add",
        element: <AddAddress />,
      }
    ],
  },
])
