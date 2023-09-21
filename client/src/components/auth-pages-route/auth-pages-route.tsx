import { ROUTES } from "@router/routes";
import { useSelector } from "@services/hooks";
import { selectUserData } from "@services/slices/user-slice";
import { Navigate, Outlet, useLocation } from "react-router-dom"

export const AuthPagesRoute = () => {
  const loacation = useLocation();
  const { user } = useSelector(selectUserData);
  const token = localStorage.getItem("auth-token");

  return user && token ? (
    <Navigate to={ROUTES.app.path} state={{from: loacation}} replace/>
  ) : (
    <Outlet />
  )
}
