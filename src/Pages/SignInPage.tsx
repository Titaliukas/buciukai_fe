import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

export default function SignInPage() {
	const navigate = useNavigate();

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
								type='password'
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
							onClick={() => navigate(ROUTES.HomePage)}
							sx={{ bgcolor: '#54923D', fontWeight: 'bold' }}
						>
							Prisijungti
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
