import { Box, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { auth } from '../config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

export default function SignInPage() {
	const navigate = useNavigate();

	const [email, SetEmail] = useState('');
	const [password, SetPassword] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevents page reload
		setIsLoading(true);

		try {
			await signInWithEmailAndPassword(auth, email, password);

			navigate(ROUTES.HomePage);
		} catch (error) {
			console.log(error);
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
							sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', maxWidth: 400 }}
						>
							<Typography sx={{ color: 'black', mb: 0.5 }}>Slaptažodis</Typography>
							<TextField
								variant='outlined'
								fullWidth
								placeholder='**********'
								type='password'
								value={password}
								onChange={(e) => SetPassword(e.target.value)}
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
		</>
	);
}
