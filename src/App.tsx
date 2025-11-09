import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import { ROUTES } from './constants';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import NewPasswordPage from './Pages/NewPasswordPage';
import RoomsListPage from './Pages/RoomsListPage';
import ReservationsPage from './Pages/ReservationsPage';
import ReservationTimesPage from './Pages/ReservationTimesPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROUTES.HomePage} element={<HomePage />} />
				<Route path={ROUTES.ProfilePage} element={<ProfilePage />} />
				<Route path={ROUTES.SignInPage} element={<SignInPage />} />
				<Route path={ROUTES.SignUpPage} element={<SignUpPage />} />
				<Route path={ROUTES.ResetPasswordPage} element={<ResetPasswordPage />} />
				<Route path={ROUTES.NewPasswordPage} element={<NewPasswordPage />} />
				<Route path={ROUTES.RoomsListPage} element={<RoomsListPage />} />
				<Route path={ROUTES.ReservationsPage} element={<ReservationsPage />} />
				<Route path={ROUTES.ReservationTimesPage} element={<ReservationTimesPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
