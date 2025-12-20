import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/authContext';
import Roles from '../enum/Roles';
import { ROUTES } from '../constants';

export const AdminRoute = () => {
  const { user, userInfo, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null; // or spinner
  }


  if (!user) {
    return <Navigate to={ROUTES.SignInPage} replace />;
  }


  if (userInfo?.role !== Roles.Admin) {
    return <Navigate to={ROUTES.HomePage} replace />;
  }

  return <Outlet />;
};
