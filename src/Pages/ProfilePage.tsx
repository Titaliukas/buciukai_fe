import { Box, Button, Container, TextField, Typography } from '@mui/material';
import NavBar from '../Components/NavBar';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/authContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import axiosInstance from '../config/axiosConfig';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';
import { UserInfo } from '../types/UserInfo';
import { SnackbarError, SnackbarSuccess } from '../Components/SnackBarAlert';
import ConfirmModalWithText from '../Components/ConfirmModalWithText';

export default function ProfilePage() {
	const [editable, setEditable] = useState<boolean>(false);
	const { user } = useContext(AuthContext);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [username, setUsername] = useState(userInfo?.username || '');
	const role = 1;
	const [name, setName] = useState(userInfo?.name || '');
	const [surname, setSurname] = useState(userInfo?.surname || '');
	const [email, setEmail] = useState(userInfo?.email || '');
	const [birthdate, setBirthdate] = useState<Dayjs | null>(dayjs(userInfo?.birthdate) || null);
	const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || '');
	const [postalCode, setPostalCode] = useState(userInfo?.postalCode || '');
	const [city, setCity] = useState(userInfo?.city || '');
	const [password, setPassword] = useState<string>('');

	const [input, setInput] = useState<string>('');

	const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
	const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('');

	const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
	const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevents page reload
		setIsLoading(true);

		try {
			const path = `/users/profile/edit`;
			const user = auth.currentUser;

			if (user) {
				await axiosInstance.patch(path, {
					username,
					name,
					surname,
					email,
					phoneNumber,
					birthdate,
					city,
					postalCode,
				});
				if (password != '' && password.length >= 6) {
					await updatePassword(user, password);
				}

				if (setUserInfo) {
					setUserInfo({
						username,
						name,
						surname,
						email,
						phoneNumber,
						birthdate: birthdate ? birthdate.toDate() : null,
						city,
						postalCode,
						role,
					});
				}

				setEditable(false);
				setSnackbarSuccessMessage('Nauji duomenys išsaugoti sėkmingai!');
				setSnackbarSuccessOpen(true);
			}
		} catch (error) {
			console.log(error);
			setSnackbarErrorMessage('Naujų duomenų išsaugoti nepavyko!');
			setSnackbarErrorOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	const handleUserDelete = async () => {
		setIsLoading(true);

		try {
			const path = `/users/profile/delete`;
			const user = auth.currentUser;

			if (user && user.email) {
				const credential = EmailAuthProvider.credential(user.email, input);
				await axiosInstance.delete(path);
				await reauthenticateWithCredential(user, credential);
				await deleteUser(user);
			}
		} catch (error) {
			console.error(error);
			setSnackbarErrorMessage('Nepavyko ištrinti vartotojo!');
			setSnackbarErrorOpen(true);
		}
	};

	const [openModal, setOpenModal] = useState(false);
	const [confirmedModal, setConfirmedModal] = useState<boolean | null>(null);

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	const handleResultModal = (value: boolean, inputValue?: string) => {
		if (inputValue) setInput(inputValue);
		setConfirmedModal(value);
	};

	useEffect(() => {
		if (confirmedModal === true && input) {
			handleUserDelete();
			setConfirmedModal(null);
		}
	}, [confirmedModal, input]);

	useEffect(() => {
		if (!user) return;

		const fetchUserInfo = async () => {
			try {
				const res = await axiosInstance.get<UserInfo>('/users/profile');
				setUserInfo(res.data);
			} catch (err) {
				console.error('Failed to load profile:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserInfo();
	}, [user]);

	useEffect(() => {
		if (userInfo) {
			setUsername(userInfo.username || '');
			setName(userInfo.name || '');
			setSurname(userInfo.surname || '');
			setEmail(userInfo.email || '');
			setBirthdate(userInfo.birthdate ? dayjs(userInfo.birthdate) : null);
			setPhoneNumber(userInfo.phoneNumber || '');
			setPostalCode(userInfo.postalCode || '');
			setCity(userInfo.city || '');
		}
	}, [userInfo]);

	return (
		<>
			<NavBar />
			<Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh' }}>
				<Box
					sx={{
						bgcolor: '#54923D',
						color: 'white',
						p: 4,
						textAlign: 'center',
						position: 'relative',
						minHeight: '10vh',
						display: 'flex',
						justifyContent: 'end',
						flexFlow: 'column',
					}}
				>
					<Typography variant='h4' sx={{ fontWeight: 'bold' }}>
						Mano profilis
					</Typography>
				</Box>
				<Container
					component='form'
					onSubmit={handleSubmit}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 2,
						pt: 2,
						pb: 2,
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
							width: '100%',
							maxWidth: 400,
							gap: 2,
						}}
					>
						<Box
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Slapyvardis</Typography>
							<TextField
								variant='outlined'
								fullWidth
								name='name'
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								disabled={!editable}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>
						<Box
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Vardas</Typography>
							<TextField
								variant='outlined'
								fullWidth
								name='name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								disabled={!editable}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Pavardė</Typography>
							<TextField
								variant='outlined'
								fullWidth
								name='surname'
								value={surname}
								onChange={(e) => setSurname(e.target.value)}
								disabled={!editable}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>E. paštas</Typography>
							<TextField
								variant='outlined'
								fullWidth
								name='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={!editable}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Telefono numeris</Typography>
							<TextField
								variant='outlined'
								fullWidth
								name='phoneNumber'
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								disabled={!editable}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Gimimo metai</Typography>
							<DatePicker
								name='birthdate'
								disabled={!editable}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
								value={birthdate}
								onChange={(newValue) => setBirthdate(newValue)}
							/>
						</Box>

						<Box
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Miestas</Typography>
							<TextField
								variant='outlined'
								fullWidth
								name='city'
								value={city}
								onChange={(e) => setCity(e.target.value)}
								disabled={!editable}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Pašto kodas</Typography>
							<TextField
								variant='outlined'
								fullWidth
								name='postalCode'
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								disabled={!editable}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Slaptažodis</Typography>
							<TextField
								variant='outlined'
								fullWidth
								name='password'
								placeholder='*******'
								disabled={!editable}
								value={password}
								type='password'
								onChange={(e) => setPassword(e.target.value)}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
							{editable ? (
								<>
									<Button
										variant='contained'
										onClick={() => setEditable(false)}
										color='error'
										sx={{ fontWeight: 'bold' }}
									>
										Atšaukti
									</Button>
									<Button
										variant='contained'
										type='submit'
										disabled={isLoading}
										sx={{ bgcolor: '#54923D', fontWeight: 'bold' }}
									>
										Išsaugoti
									</Button>
								</>
							) : (
								<Button
									variant='contained'
									onClick={() => setEditable(true)}
									sx={{ bgcolor: '#54923D', fontWeight: 'bold' }}
								>
									Koreguoti duomenis
								</Button>
							)}
						</Box>

						<Button variant='contained' onClick={handleOpenModal} color='error' sx={{ fontWeight: 'bold' }}>
							Ištrinti naudotoją
						</Button>
						<ConfirmModalWithText
							open={openModal}
							handleClose={handleCloseModal}
							onResult={handleResultModal}
							title='Patvirtinimas'
							description='Jei norite ištrinti savo paskyrą, įveskite slaptažodį.'
							cancelButton='Ne'
							confirmButton='Taip, ištrinti'
						/>
					</Box>
				</Container>
			</Box>
			<SnackbarError
				open={snackbarErrorOpen}
				message={snackbarErrorMessage}
				onClose={() => setSnackbarErrorOpen(false)}
			/>
			<SnackbarSuccess
				open={snackbarSuccessOpen}
				message={snackbarSuccessMessage}
				onClose={() => setSnackbarSuccessOpen(false)}
			/>
		</>
	);
}
