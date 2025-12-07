import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from '../context/authContext';
import { useContext, useEffect } from 'react';
import { ROUTES } from '../constants';

export const ProtectedRoute = () => {
	const { user, isLoading } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isLoading && !user) {
			void navigate(ROUTES.SignInPage, { replace: true });
		}
	}, [user, isLoading, navigate]);

	// Logged in → render the child route
	return <Outlet />;
};
