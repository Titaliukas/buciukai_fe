import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { auth } from '../config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { SnackbarError, SnackbarSuccess } from '../Components/SnackBarAlert';

export default function SignInPage() {
	const navigate = useNavigate();

	const [email, SetEmail] = useState('');
	const [password, SetPassword] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
	const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('');

	const location = useLocation();
	const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
	const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState('');

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

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

	// Show snackbar only once when arriving
	useEffect(() => {
		if (location.state?.message) {
			setSnackbarSuccessMessage(location.state.message);
			setSnackbarSuccessOpen(true);
			// Clear state so refresh doesn't show snackbar again
			window.history.replaceState({}, document.title);
		}
	}, [location.state]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevents page reload
		setIsLoading(true);

		try {
			const emailErr = validateEmail(email);
			const passErr = validatePassword(password);

			setEmailError(emailErr);
			setPasswordError(passErr);

			if (!emailErr && !passErr) {
				await signInWithEmailAndPassword(auth, email, password);

				const user = auth.currentUser;
				if (user) {
					const token = await user.getIdToken();
					localStorage.setItem('token', token);
				}

				navigate(ROUTES.HomePage, {
					state: { message: 'Prisijungimas sėkmingas!' },
				});
			}
		} catch (error: any) {
			console.log(error);
			if (error.code === 'auth/user-disabled') {
    		setSnackbarErrorMessage('Jūsų paskyra užblokuota');
			}
			else {
			setSnackbarErrorMessage('Prisijungimas nepavyko!');
			}
			setSnackbarErrorOpen(true);
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
						Prisijungimas
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
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>E. Paštas*</Typography>
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
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
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

						<Typography
							sx={{
								color: 'black',
								fontWeight: 'bold',
								cursor: 'pointer',
								borderBottom: '2px solid #54923D',
								display: 'inline-block',
								alignSelf: 'flex-end',
								'&:hover': {
									color: '#54923D',
								},
							}}
							onClick={() => navigate(ROUTES.ResetPasswordPage)}
							role='button'
						>
							Pamiršai slaptažodį?
						</Typography>
						<Button
							variant='contained'
							type='submit'
							disabled={isLoading}
							sx={{ bgcolor: '#54923D', fontWeight: 'bold', minWidth: '8rem' }}
						>
							{isLoading ? <CircularProgress size={24} color='success' /> : 'Prisijungti'}
						</Button>

						<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
							<Typography sx={{ color: 'black' }}>Neturi paskyros?</Typography>
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
								onClick={() => navigate(ROUTES.SignUpPage)}
								role='button'
							>
								Registruotis
							</Typography>
						</Box>
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
