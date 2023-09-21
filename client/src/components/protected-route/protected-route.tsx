import { ROUTES } from '@router/routes';
import { useSelector } from '@services/hooks';
import { selectUserData } from '@services/slices/user-slice';
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoute = () => {
  const location = useLocation();
  const { user } = useSelector(selectUserData);
  const token = localStorage.getItem('auth-token');

  return user && token ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.login.path} state={{from: location}} replace/>
  )
}
