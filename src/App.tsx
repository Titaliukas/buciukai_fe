import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Homepage';
import ProfilePage from './Pages/ProfilePage';
import { ROUTES } from './constants';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import NewPasswordPage from './Pages/NewPasswordPage';
import AdminPage from './Pages/AdminPage';
import ClientManagementPage from './Pages/ClientManagementPage';
import SystemSettingPage from './Pages/SystemSettingPage';
import EventFormPage from './Pages/EventFormPage';
import RoomCreationPage from './Pages/RoomCreationPage';
import AnnouncementFormPage from './Pages/AnnouncmentFormPage';
import HotelCreationPage from './Pages/HotelCreationPage';
import ReportSelectionPage from './Pages/ReportSelectionPage';
import ClientHistoryReportPage from './Pages/ClientHistoryReportPage';
import DailyOcupancyReportPage from './Pages/DailyOcupancyReportPage';
import OccupancyIncomeReportPage from './Pages/OccupancyIncomeReportPage';
import ReservationStatusReportPage from './Pages/ReservationStatusReportPage';
import RoomsListPage from './Pages/RoomsListPage';
import ReservationsPage from './Pages/ReservationsPage';
import ReservationTimesPage from './Pages/ReservationTimesPage';
import InboxPage from './Pages/InboxPage';
import { ProtectedRoute } from './Components/ProtectedRoute';
import { RoleProtectedRoute } from './Components/RoleProtectedRoute';
import { AuthContextProvider } from './context/authContext';
import { UserContextProvider } from './context/userContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RoomDetailsPage from './Pages/RoomDetailsPage.tsx';
import Roles from './enum/Roles';

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<AuthContextProvider>
				<UserContextProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<ProtectedRoute />}>
							<Route path={ROUTES.HomePage} element={<HomePage />} />
							<Route path={ROUTES.ProfilePage} element={<ProfilePage />} />
							<Route path={ROUTES.AdminPage} element={<AdminPage />} />
							<Route path={ROUTES.ClientManagement} element={<ClientManagementPage />} />
							<Route path={ROUTES.SystemSetting} element={<SystemSettingPage />} />
							<Route path={ROUTES.EventForm} element={<EventFormPage />} />
							<Route path={ROUTES.RoomCreation} element={<RoomCreationPage />} />
							<Route path={ROUTES.AnnouncementForm} element={<AnnouncementFormPage />} />
							<Route path={ROUTES.HotelCreation} element={<HotelCreationPage />} />
							<Route path={ROUTES.ReportSelection} element={<ReportSelectionPage />} />
							<Route path={ROUTES.ClientHistoryReport} element={<ClientHistoryReportPage />} />
							<Route path={ROUTES.DailyOcupancyReport} element={<DailyOcupancyReportPage />} />
							<Route path={ROUTES.OccupancyIncomeReport} element={<OccupancyIncomeReportPage />} />
							<Route path={ROUTES.ReservationStatusReport} element={<ReservationStatusReportPage />} />
							<Route path={ROUTES.RoomsListPage} element={<RoomsListPage />} />
							<Route path={ROUTES.ReservationsPage} element={<ReservationsPage />} />
							{/* Staff-only route for reservation time management */}
							<Route element={<RoleProtectedRoute roles={[Roles.Staff]} />}> 
								<Route path={ROUTES.ReservationTimesPage} element={<ReservationTimesPage />} />
							</Route>
							<Route path={ROUTES.InboxPage} element={<InboxPage />} />
							<Route path={ROUTES.RoomDetailsPage} element={<RoomDetailsPage />} />
						</Route>

						<Route path={ROUTES.SignInPage} element={<SignInPage />} />
						<Route path={ROUTES.SignUpPage} element={<SignUpPage />} />
						<Route path={ROUTES.ResetPasswordPage} element={<ResetPasswordPage />} />
						<Route path={ROUTES.NewPasswordPage} element={<NewPasswordPage />} />
					</Routes>
				</BrowserRouter>
				</UserContextProvider>
			</AuthContextProvider>
		</LocalizationProvider>
	);
}

export default App;
