import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useState } from 'react';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';
import axiosInstance from '../config/axiosConfig';
import { SnackbarError } from '../Components/SnackBarAlert';

export default function SignUpPage() {
	const navigate = useNavigate();

	const [username, SetUsername] = useState('');
	const [name, SetName] = useState('');
	const [surname, SetSurname] = useState('');
	const [email, SetEmail] = useState('');
	const [password, SetPassword] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [nameError, setNameError] = useState('');
	const [surnameError, setSurnameError] = useState('');
	const [usernameError, setUsernameError] = useState('');

	const validateEmail = (value: string) => {
		if (!value) return 'E. paštas yra privalomas';
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) return 'Neteisingas e. pašto formatas';
		return '';
	};

	const validatePassword = (value: string) => {
		if (!value) return 'Slaptažodis yra privalomas';
		if (value.length < 6) return 'Slaptažodis turi būti bent 6 simbolių';
		return '';
	};

	const validateUsername = (value: string) => {
		if (!value) return 'Slapyvardis yra privalomas';
		if (value.length < 3) return 'Slapyvardis turi būti bent 3 simbolių';
		return '';
	};

	const validateName = (value: string) => {
		if (!value) return 'Vardas yra privalomas';
		return '';
	};

	const validateSurname = (value: string) => {
		if (!value) return 'Pavardė yra privalomas';
		return '';
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevents page reload
		setIsLoading(true);

		try {
			const emailErr = validateEmail(email);
			const passErr = validatePassword(password);
			const usernameErr = validateUsername(password);
			const nameErr = validateName(password);
			const surnameErr = validateName(password);

			setEmailError(emailErr);
			setPasswordError(passErr);
			setSurnameError(surnameErr);
			setUsernameError(usernameErr);
			setNameError(nameErr);

			if (!emailErr && !passErr && !usernameErr && !nameErr && !surnameErr) {
				await createUserWithEmailAndPassword(auth, email, password);
				const user = auth.currentUser;
				console.log(user);

				const path = `/users/signup`;

				await axiosInstance.post(path, { username, name, surname, email, password, role: 1 });

				if (user) {
					const token = await user.getIdToken();
					localStorage.setItem('token', token);
				}

				navigate(ROUTES.HomePage, {
					state: { message: 'Registracija sėkminga!' },
				});
			}
		} catch (error) {
			console.log(error);
			const user = auth.currentUser;
			if (user) await deleteUser(user);
			setSnackbarMessage('Registracija nepavyko!');
			setSnackbarOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh' }}>
				<Box
					sx={{
						bgcolor: '#54923D',
						color: 'white',
						p: 4,
						textAlign: 'center',
						position: 'relative',
						minHeight: '30vh',
						display: 'flex',
						justifyContent: 'space-between',
						flexFlow: 'column',
					}}
				>
					<Typography
						variant='h3'
						sx={{ fontWeight: 'bold', cursor: 'pointer' }}
						onClick={() => navigate('/')}
						role='button'
					>
						Bučiukai
					</Typography>
					<Typography variant='h4' sx={{ fontWeight: 'bold' }}>
						Registracija
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
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								width: '100%',
								maxWidth: 400,
							}}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Slapyvardis*</Typography>
							<TextField
								variant='outlined'
								fullWidth
								placeholder='Slapyvardis'
								value={username}
								onChange={(e) => {
									SetUsername(e.target.value);
									setUsernameError(validateUsername(e.target.value));
								}}
								error={Boolean(usernameError)}
								helperText={usernameError}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								width: '100%',
								maxWidth: 400,
							}}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Vardas*</Typography>
							<TextField
								variant='outlined'
								fullWidth
								placeholder='Vardas'
								value={name}
								onChange={(e) => {
									SetName(e.target.value);
									setNameError(validateName(e.target.value));
								}}
								error={Boolean(nameError)}
								helperText={nameError}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								width: '100%',
								maxWidth: 400,
							}}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Pavardė*</Typography>
							<TextField
								variant='outlined'
								fullWidth
								placeholder='Pavardė'
								value={surname}
								onChange={(e) => {
									SetSurname(e.target.value);
									setSurnameError(validateSurname(e.target.value));
								}}
								error={Boolean(surnameError)}
								helperText={surnameError}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								width: '100%',
								maxWidth: 400,
							}}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>E. paštas*</Typography>
							<TextField
								variant='outlined'
								fullWidth
								placeholder='E. paštas'
								value={email}
								onChange={(e) => {
									SetEmail(e.target.value);
									setEmailError(validateEmail(e.target.value));
								}}
								error={Boolean(emailError)}
								helperText={emailError}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								width: '100%',
								maxWidth: 400,
							}}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Slaptažodis*</Typography>
							<TextField
								variant='outlined'
								fullWidth
								placeholder='**********'
								type='password'
								value={password}
								onChange={(e) => {
									SetPassword(e.target.value);
									setPasswordError(validatePassword(e.target.value));
								}}
								error={Boolean(passwordError)}
								helperText={passwordError}
								sx={{
									bgcolor: '#eaeaea',
									borderRadius: 1,
									fontWeight: 'bold',
								}}
							/>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								width: '100%',
								justifyContent: 'space-between',
								alignItems: 'end',
							}}
						>
							<Button
								variant='contained'
								type='submit'
								disabled={isLoading}
								sx={{ bgcolor: '#54923D', fontWeight: 'bold', minWidth: '9rem' }}
							>
								{isLoading ? <CircularProgress size={24} color='success' /> : 'Registruotis'}
							</Button>
							<Typography
								sx={{
									color: 'black',
									fontWeight: 'bold',
									cursor: 'pointer',
									borderBottom: '2px solid #54923D',
									display: 'inline-block',
									'&:hover': {
										color: '#54923D',
									},
								}}
								onClick={() => navigate(ROUTES.SignInPage)}
								role='button'
							>
								Grįžti į prisijungimą
							</Typography>
						</Box>
					</Box>
				</Container>
			</Box>
			<SnackbarError open={snackbarOpen} message={snackbarMessage} onClose={() => setSnackbarOpen(false)} />
		</>
	);
}
