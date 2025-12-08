import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useState } from 'react';
import { auth } from '../config/FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { SnackbarError, SnackbarSuccess } from '../Components/SnackBarAlert';

export default function ResetPasswordPage() {
	const navigate = useNavigate();

	const [email, SetEmail] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
	const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState('');
	const [snackbarErrorOpen, setSnackbarErrorOpen] = useState(false);
	const [snackbarErrorMessage, setSnackbarErrorMessage] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevents page reload
		setIsLoading(true);

		try {
			await sendPasswordResetEmail(auth, email);
			setSnackbarSuccessMessage('Atkūrimo laiškas nusiųstas!');
			setSnackbarSuccessOpen(true);
		} catch (error) {
			console.log(error);
			setSnackbarErrorMessage('Nepavyko nusiųsti laiško!');
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
						Slaptažodžio atkūrimas
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
							<Typography sx={{ color: 'black', mb: 0.5 }}>E. Paštas</Typography>
							<TextField
								variant='outlined'
								fullWidth
								placeholder='E. paštas'
								value={email}
								onChange={(e) => SetEmail(e.target.value)}
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
								sx={{ bgcolor: '#54923D', fontWeight: 'bold', minWidth: '6rem' }}
							>
								{isLoading ? <CircularProgress size={24} color='success' /> : 'Atkurti'}
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
			<SnackbarSuccess
				open={snackbarSuccessOpen}
				message={snackbarSuccessMessage}
				onClose={() => setSnackbarSuccessOpen(false)}
			/>
			<SnackbarError
				open={snackbarErrorOpen}
				message={snackbarErrorMessage}
				onClose={() => setSnackbarErrorOpen(false)}
			/>
		</>
	);
}
