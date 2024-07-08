import { createBrowserRouter } from "react-router-dom"
import { Root } from "../Root"
import { Companies } from "../pages/Companies"
import { AddCompany } from "../pages/AddCompany"

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
        element: <AddCompany />
      }
    ]
  },
])
