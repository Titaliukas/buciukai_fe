import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useEffect, useState } from 'react';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';
import { FirebaseError } from 'firebase/app';
import { SnackbarError } from '../Components/SnackBarAlert';

export default function NewPasswordPage() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const oobCode = searchParams.get('oobCode');
	const [newPassword, setNewPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const [passwordError, setPasswordError] = useState('');

	const validatePassword = (value: string) => {
		if (!value) return 'Slaptažodis yra privalomas';
		if (value.length < 6) return 'Slaptažodis turi būti bent 6 simbolių';
		return '';
	};

	useEffect(() => {
		if (!oobCode) return;
		verifyPasswordResetCode(auth, oobCode).catch(() => setError('Invalid or expired link.'));
	}, [oobCode]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		if (!oobCode) {
			setIsLoading(false);
			return;
		}

		try {
			const passErr = validatePassword(newPassword);

			setPasswordError(passErr);

			if (!passErr) {
				await confirmPasswordReset(auth, oobCode, newPassword);
				navigate(ROUTES.SignInPage, {
					state: { message: 'Sukurtas naujas slaptažodis!' },
				});
			}
		} catch (err) {
			const errr = err as FirebaseError;
			setSnackbarMessage('Nepavyko sukurti naujo slaptažodžio');
			setSnackbarOpen(true);
			setError(errr.message);
		} finally {
			setIsLoading(false);
		}
	};

	if (error) console.error(error);

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
						Naujo Slaptažodžio kūrimas
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
							<Typography sx={{ color: 'black', mb: 0.5 }}>Naujas slaptažodis*</Typography>
							<TextField
								variant='outlined'
								fullWidth
								placeholder='**********'
								type='password'
								value={newPassword}
								onChange={(e) => {
									setNewPassword(e.target.value);
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
								sx={{ bgcolor: '#54923D', fontWeight: 'bold', minWidth: '7.5rem' }}
							>
								{isLoading ? <CircularProgress size={24} color='success' /> : 'Atnaujinti'}
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
