import {
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import axiosInstance from '../config/axiosConfig';
import { SnackbarError } from '../Components/SnackBarAlert';
import NavBar from '../Components/NavBar';
import { ROUTES } from '../constants';

interface OccupiedRoom {
	roomId: number;
	roomNumber: number;
	roomType: string;
	bedType: string;
	floorNumber: number;
	price: number;
	clientName: string;
	clientSurname: string;
	clientEmail: string;
	clientPhone: string;
	checkIn: string;
	checkOut: string;
	reservationId: number;
}

interface DailyReport {
	reportDate: string;
	hotelId: number;
	hotelName: string;
	hotelAddress: string;
	hotelCity: string;
	totalRooms: number;
	occupiedRooms: number;
	occupiedRoomsList: OccupiedRoom[];
}

interface Hotel {
	id: number;
	name: string;
}

export default function DailyOccupancyReportPage() {
	const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
	const [selectedHotel, setSelectedHotel] = useState<number | ''>('');
	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [report, setReport] = useState<DailyReport | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingHotels, setIsLoadingHotels] = useState(true);

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	useEffect(() => {
		fetchHotels();
	}, []);

	const fetchHotels = async () => {
		try {
			const response = await axiosInstance.get('/hotels');
			setHotels(response.data);
		} catch (error) {
			console.error(error);
			setSnackbarMessage('Nepavyko gauti viešbučių sąrašo!');
			setSnackbarOpen(true);
		} finally {
			setIsLoadingHotels(false);
		}
	};

	const fetchReport = async () => {
		if (!selectedHotel) {
			setSnackbarMessage('Pasirinkite viešbutį!');
			setSnackbarOpen(true);
			return;
		}

		setIsLoading(true);
		try {
			const response = await axiosInstance.get('/reports/occupancy/daily', {
				params: {
					hotelId: selectedHotel,
					date: selectedDate,
				},
			});
			setReport(response.data);
		} catch (error) {
			console.error(error);
			setSnackbarMessage('Nepavyko gauti ataskaitos!');
			setSnackbarOpen(true);
		} finally {
			setIsLoading(false);
		}
	};

	const handleGenerateReport = () => {
		fetchReport();
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('lt-LT');
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
						Dienos užimtumo ataskaita
					</Typography>

					{/* Selection Controls */}
					<Paper
						sx={{
							p: 3,
							mb: 3,
							borderRadius: 3,
							boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
						}}
					>
						<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
							<Box sx={{ flex: '1 1 300px', minWidth: '200px' }}>
								<FormControl fullWidth>
									<InputLabel>Viešbutis</InputLabel>
									<Select
										value={selectedHotel}
										onChange={(e) => setSelectedHotel(e.target.value as number)}
										label='Viešbutis'
										disabled={isLoadingHotels}
									>
										{hotels.map((hotel) => (
											<MenuItem key={hotel.id} value={hotel.id}>
												{hotel.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
							<Box sx={{ flex: '1 1 300px', minWidth: '200px' }}>
								<TextField
									label='Pasirinkite datą'
									type='date'
									value={selectedDate}
									onChange={(e) => setSelectedDate(e.target.value)}
									InputLabelProps={{ shrink: true }}
									fullWidth
								/>
							</Box>
							<Box sx={{ flex: '1 1 300px', minWidth: '200px' }}>
								<Button
									variant='contained'
									onClick={handleGenerateReport}
									disabled={isLoading || !selectedHotel}
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
									{isLoading ? <CircularProgress size={24} color='inherit' /> : 'Generuoti ataskaitą'}
								</Button>
							</Box>
						</Box>
					</Paper>

					{/* Report Summary */}
					{report && (
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
									{report.hotelName}
								</Typography>
								<Typography variant='body1' color='textSecondary' gutterBottom>
									📍 {report.hotelAddress}, {report.hotelCity}
								</Typography>
								<Typography variant='body1' color='textSecondary' gutterBottom>
									📅 Data: {formatDate(report.reportDate)}
								</Typography>
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
												Viso kambarių
											</Typography>
											<Typography variant='h4' sx={{ fontWeight: 'bold', color: '#1976d2' }}>
												{report.totalRooms}
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
												Užimti kambariai
											</Typography>
											<Typography variant='h4' sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
												{report.occupiedRooms}
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
												Užimtumas
											</Typography>
											<Typography variant='h4' sx={{ fontWeight: 'bold', color: '#388e3c' }}>
												{report.totalRooms > 0
													? ((report.occupiedRooms / report.totalRooms) * 100).toFixed(1)
													: 0}
												%
											</Typography>
										</CardContent>
									</Card>
								</Box>
							</Box>

							{/* Occupied Rooms Table */}
							<Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}>
								Užimti kambariai
							</Typography>
							{report.occupiedRoomsList.length > 0 ? (
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
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kambarys</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Tipas</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Lovos</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Aukštas</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Kaina</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Klientas</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>El. paštas</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Telefonas</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Atvykimas</TableCell>
												<TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Išvykimas</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{report.occupiedRoomsList.map((room) => (
												<TableRow
													key={room.roomId}
													sx={{
														'&:nth-of-type(odd)': { bgcolor: '#fafafa' },
														'&:hover': { bgcolor: '#f0f0f0' },
													}}
												>
													<TableCell sx={{ fontWeight: 500 }}>{room.roomNumber}</TableCell>
													<TableCell sx={{ textTransform: 'capitalize' }}>{room.roomType}</TableCell>
													<TableCell sx={{ textTransform: 'capitalize' }}>{room.bedType}</TableCell>
													<TableCell>{room.floorNumber}</TableCell>
													<TableCell sx={{ fontWeight: 500 }}>€{room.price.toFixed(2)}</TableCell>
													<TableCell>
														{room.clientName} {room.clientSurname}
													</TableCell>
													<TableCell>{room.clientEmail}</TableCell>
													<TableCell>{room.clientPhone || '-'}</TableCell>
													<TableCell>{formatDate(room.checkIn)}</TableCell>
													<TableCell>{formatDate(room.checkOut)}</TableCell>
												</TableRow>
											))}
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
										Šią dieną nėra užimtų kambarių
									</Typography>
								</Paper>
							)}
						</>
					)}

					{/* Empty State */}
					{!report && !isLoading && (
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
								Pasirinkite viešbutį ir datą, tada spauskite "Generuoti ataskaitą"
							</Typography>
						</Box>
					)}
				</Container>
			</Box>
			<SnackbarError open={snackbarOpen} message={snackbarMessage} onClose={() => setSnackbarOpen(false)} />
		</>
	);
}