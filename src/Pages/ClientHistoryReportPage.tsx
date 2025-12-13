import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Container,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	Chip,
} from '@mui/material';
import { useState } from 'react';
import axiosInstance from '../config/axiosConfig';
import { SnackbarError } from '../Components/SnackBarAlert';
import NavBar from '../Components/NavBar';
import { ROUTES } from '../constants';

interface Reservation {
	reservationId: number;
	checkIn: string;
	checkOut: string;
	status: string;
	roomNumber: number;
	roomType: string;
	bedType: string;
	floorNumber: number;
	price: number;
	hotelName: string;
	hotelCity: string;
	hotelAddress: string;
}

interface ClientHistory {
	clientId: string;
	clientName: string;
	clientSurname: string;
	clientEmail: string;
	clientPhone: string;
	totalReservations: number;
	reservations: Reservation[];
}

export default function ClientHistoryPage() {
	const [clientEmail, setClientEmail] = useState<string>('');
	const [clientHistory, setClientHistory] = useState<ClientHistory | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const fetchClientHistory = async () => {
		if (!clientEmail.trim()) {
			setSnackbarMessage('Įveskite kliento el. paštą!');
			setSnackbarOpen(true);
			return;
		}

		setIsLoading(true);
		try {
			const response = await axiosInstance.get('/reports/client-history', {
				params: {
					email: clientEmail,
				},
			});
			setClientHistory(response.data);
		} catch (error) {
			console.error(error);
			setSnackbarMessage('Nepavyko gauti kliento istorijos!');
			setSnackbarOpen(true);
			setClientHistory(null);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = () => {
		fetchClientHistory();
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('lt-LT');
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'confirmed':
				return 'primary';
			case 'completed':
				return 'success';
			case 'cancelled':
				return 'error';
			default:
				return 'default';
		}
	};

	const getStatusLabel = (status: string) => {
		switch (status) {
			case 'confirmed':
				return 'Patvirtinta';
			case 'completed':
				return 'Užbaigta';
			case 'cancelled':
				return 'Atšaukta';
			default:
				return status;
		}
	};

	const calculateNights = (checkIn: string, checkOut: string) => {
		const start = new Date(checkIn);
		const end = new Date(checkOut);
		const diffTime = Math.abs(end.getTime() - start.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};

	const calculateTotalSpent = () => {
		if (!clientHistory) return 0;
		return clientHistory.reservations
			.filter((r) => r.status !== 'cancelled')
			.reduce((sum, r) => sum + r.price * calculateNights(r.checkIn, r.checkOut), 0);
	};

	return (
		<>
			<NavBar />

			<Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 8 }}>
				<Container>
					<Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
						<Button
							variant='outlined'
							onClick={() => (window.location.href = ROUTES.ReportSelection)}
							sx={{
								borderColor: '#54923D',
								color: '#54923D',
								fontWeight: 'bold',
								borderRadius: 2,
								py: 1,
								px: 3,
								fontSize: '0.95rem',
								textTransform: 'none',
								'&:hover': {
									bgcolor: '#f0f8f0',
									borderColor: '#437531',
									color: '#437531',
								},
							}}
						>
							Grįžti į ataskaitų pasirinkimą
						</Button>
					</Box>

					<Typography
						variant='h4'
						sx={{
							textAlign: 'center',
							fontWeight: 'bold',
							color: '#333',
							mb: 4,
						}}
					>
						Kliento apsilankymų istorija
					</Typography>

					{/* Search Controls */}
					<Paper
						sx={{
							p: 3,
							mb: 3,
							borderRadius: 3,
							boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
						}}
					>
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
							<Box sx={{ flex: '1 1 400px', minWidth: '250px' }}>
								<TextField
									label='Kliento el. paštas'
									type='email'
									value={clientEmail}
									onChange={(e) => setClientEmail(e.target.value)}
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											handleSearch();
										}
									}}
									fullWidth
									placeholder='pavyzdys@email.com'
								/>
							</Box>
							<Box sx={{ flex: '0 1 200px', minWidth: '200px' }}>
								<Button
									variant='contained'
									onClick={handleSearch}
									disabled={isLoading || !clientEmail.trim()}
									fullWidth
									sx={{
										bgcolor: '#54923D',
										fontWeight: 'bold',
										height: '56px',
										borderRadius: 1,
										fontSize: '1rem',
										textTransform: 'none',
										'&:hover': {
											bgcolor: '#437531',
										},
									}}
								>
									{isLoading ? <CircularProgress size={24} color='inherit' /> : 'Ieškoti'}
								</Button>
							</Box>
						</Box>
					</Paper>

					{/* Client Information Summary */}
					{clientHistory && (
						<>
							<Paper
								sx={{
									p: 3,
									mb: 3,
									borderRadius: 3,
									boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								}}
							>
								<Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
									{clientHistory.clientName} {clientHistory.clientSurname}
								</Typography>
								<Typography variant='body1' color='textSecondary' gutterBottom>
									📧 {clientHistory.clientEmail}
								</Typography>
								{clientHistory.clientPhone && (
									<Typography variant='body1' color='textSecondary' gutterBottom>
										📞 {clientHistory.clientPhone}
									</Typography>
								)}
							</Paper>

							<Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
								<Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
									<Card
										sx={{
											bgcolor: '#e3f2fd',
											borderRadius: 3,
											boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
											height: '100%',
										}}
									>
										<CardContent>
											<Typography color='textSecondary' gutterBottom sx={{ fontWeight: 500 }}>
												Iš viso rezervacijų
											</Typography>
											<Typography variant='h4' sx={{ fontWeight: 'bold', color: '#1976d2' }}>
												{clientHistory.totalReservations}
											</Typography>
										</CardContent>
									</Card>
								</Box>
								<Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
									<Card
										sx={{
											bgcolor: '#f3e5f5',
											borderRadius: 3,
											boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
											height: '100%',
										}}
									>
										<CardContent>
											<Typography color='textSecondary' gutterBottom sx={{ fontWeight: 500 }}>
												Užbaigtų rezervacijų
											</Typography>
											<Typography variant='h4' sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
												{clientHistory.reservations.filter((r) => r.status === 'completed').length}
											</Typography>
										</CardContent>
									</Card>
								</Box>
								<Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
									<Card
										sx={{
											bgcolor: '#e8f5e9',
											borderRadius: 3,
											boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
											height: '100%',
										}}
									>
										<CardContent>
											<Typography color='textSecondary' gutterBottom sx={{ fontWeight: 500 }}>
												Iš viso išleista
											</Typography>
											<Typography variant='h4' sx={{ fontWeight: 'bold', color: '#388e3c' }}>
												€{calculateTotalSpent().toFixed(2)}
											</Typography>
										</CardContent>
									</Card>
								</Box>
							</Box>

							{/* Reservations Table */}
							<Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
								Rezervacijų istorija
							</Typography>
							{clientHistory.reservations.length > 0 ? (
								<TableContainer
									component={Paper}
									sx={{
										borderRadius: 3,
										boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
									}}
								>
									<Table>
										<TableHead sx={{ bgcolor: '#54923D' }}>
											<TableRow>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rezervacija #</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Viešbutis</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Miestas</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kambarys</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tipas</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Atvykimas</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Išvykimas</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Naktys</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kaina/naktį</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Iš viso</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Būsena</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{clientHistory.reservations.map((reservation) => {
												const nights = calculateNights(reservation.checkIn, reservation.checkOut);
												const totalPrice = reservation.price * nights;
												return (
													<TableRow
														key={reservation.reservationId}
														sx={{
															'&:nth-of-type(odd)': { bgcolor: '#fafafa' },
															'&:hover': { bgcolor: '#f0f0f0' },
														}}
													>
														<TableCell sx={{ fontWeight: 500 }}>{reservation.reservationId}</TableCell>
														<TableCell>{reservation.hotelName}</TableCell>
														<TableCell>{reservation.hotelCity}</TableCell>
														<TableCell sx={{ fontWeight: 500 }}>{reservation.roomNumber}</TableCell>
														<TableCell sx={{ textTransform: 'capitalize' }}>{reservation.roomType}</TableCell>
														<TableCell>{formatDate(reservation.checkIn)}</TableCell>
														<TableCell>{formatDate(reservation.checkOut)}</TableCell>
														<TableCell>{nights}</TableCell>
														<TableCell>€{reservation.price.toFixed(2)}</TableCell>
														<TableCell sx={{ fontWeight: 500 }}>€{totalPrice.toFixed(2)}</TableCell>
														<TableCell>
															<Chip
																label={getStatusLabel(reservation.status)}
																color={getStatusColor(reservation.status)}
																size='small'
																sx={{ fontWeight: 500 }}
															/>
														</TableCell>
													</TableRow>
												);
											})}
										</TableBody>
									</Table>
								</TableContainer>
							) : (
								<Paper
									sx={{
										p: 4,
										textAlign: 'center',
										borderRadius: 3,
										boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
									}}
								>
									<Typography variant='h6' color='textSecondary'>
										Šis klientas neturi rezervacijų istorijos
									</Typography>
								</Paper>
							)}
						</>
					)}

					{/* Empty State */}
					{!clientHistory && !isLoading && (
						<Box
							sx={{
								textAlign: 'center',
								py: 8,
								bgcolor: 'white',
								borderRadius: 3,
								boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
							}}
						>
							<Typography variant='h6' color='textSecondary'>
								Įveskite kliento el. paštą ir spauskite "Ieškoti"
							</Typography>
						</Box>
					)}
				</Container>
			</Box>
			<SnackbarError open={snackbarOpen} message={snackbarMessage} onClose={() => setSnackbarOpen(false)} />
		</>
	);
}