import { Box, Button, Container, TextField, Typography } from '@mui/material';
import NavBar from '../Components/NavBar';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/authContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import axiosInstance from '../config/axiosConfig';
import { updatePassword } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';

export default function ProfilePage() {
	const [editable, setEditable] = useState<boolean>(false);
	const { userInfo, setUserInfo } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);

	const [username, setUsername] = useState(userInfo?.username || '');
	const [name, setName] = useState(userInfo?.name || '');
	const [surname, setSurname] = useState(userInfo?.surname || '');
	const [email, setEmail] = useState(userInfo?.email || '');
	const [birthdate, setBirthdate] = useState(dayjs(userInfo?.birthdate) || null);
	const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber || '');
	const [postalCode, setPostalCode] = useState(userInfo?.postalCode || '');
	const [city, setCity] = useState(userInfo?.city || '');
	const [password, setPassword] = useState<string>('');

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
					phone_number: phoneNumber,
					birthdate,
					city,
					postal_code: postalCode,
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
					});
				}
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
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
									// onClick={() => console.log(userInfo)}
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
