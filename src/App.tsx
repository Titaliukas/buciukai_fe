import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import { ROUTES } from './constants';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import NewPasswordPage from './Pages/NewPasswordPage';

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
			</Routes>
		</BrowserRouter>
	);
}

export default App;
