import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
import { useContext, useEffect } from 'react';
import { ROUTES } from '../constants';

export const ProtectedRoute = () => {
	const { user, isLoading } = useContext(AuthContext);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!isLoading && !user) {
			void navigate(ROUTES.SignInPage);
		}
	}, [user, isLoading, navigate, location]);

	if (location.pathname === ROUTES.SystemoffPage) {
    return <Outlet />;
  	}
	
	// Logged in → render the child route
	return <Outlet />;
};
