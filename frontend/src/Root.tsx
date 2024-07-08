import { Outlet } from "react-router-dom"

export const Root = () => {
  return (
    <div className="main-container text-center text-balance p-4">
      <Outlet />
    </div>
  )
}
