import { Box, Button, Container, TextField, Typography } from '@mui/material';
import NavBar from '../Components/NavBar';
import { ChangeEvent, useState } from 'react';

interface User {
	name: string;
	surname: string;
	birthdate: string;
	email: string;
	password: string;
}

export default function ProfilePage() {
	const [editable, setEditable] = useState<boolean>(false);
	const [user, setUser] = useState<User>({
		name: 'Gintaras',
		surname: 'Bučys',
		birthdate: '2004/11/10',
		email: 'Butas@gmail.com',
		password: 'password',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setUser((prev) => ({ ...prev, [name]: value }));
	};

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
							<Typography sx={{ color: 'black', mb: 0.5 }}>Vardas</Typography>
							<TextField
								variant='outlined'
								fullWidth
								name='name'
								value={user.name}
								onChange={handleChange}
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
								value={user.surname}
								onChange={handleChange}
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
							<TextField
								variant='outlined'
								fullWidth
								name='birthdate'
								value={user.birthdate}
								onChange={handleChange}
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
								value={user.email}
								onChange={handleChange}
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
								value={user.password}
								onChange={handleChange}
								disabled={!editable}
								type='password'
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
										onClick={() => setEditable(false)}
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
					</Box>
				</Container>
			</Box>
		</>
	);
}
