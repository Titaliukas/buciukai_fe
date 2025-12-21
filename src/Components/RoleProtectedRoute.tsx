import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/authContext';
import UserContext from '../context/userContext';
import { ROUTES } from '../constants';
import Roles from '../enum/Roles';

type Props = {
  roles: Roles[];
};

export const RoleProtectedRoute = ({ roles }: Props) => {
  const { user, isLoading } = useContext(AuthContext);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      void navigate(ROUTES.SignInPage);
      return;
    }

    if (!isLoading && user && userInfo && !roles.includes(userInfo.role)) {
      // Not authorized: redirect to home
      void navigate(ROUTES.HomePage);
    }
  }, [user, isLoading, userInfo, roles, navigate, location]);

  return <Outlet />;
};
