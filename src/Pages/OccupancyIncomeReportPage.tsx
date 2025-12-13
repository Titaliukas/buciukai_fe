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
	TextField,
	Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosInstance from '../config/axiosConfig';
import { SnackbarError } from '../Components/SnackBarAlert';
import NavBar from '../Components/NavBar';
import { ROUTES } from '../constants';

interface MonthlyData {
	year: number;
	month: number;
	monthName: string;
	revenue: number;
	occupancyRate: number;
	totalReservations: number;
}

interface HotelRevenueReport {
	startDate: string;
	endDate: string;
	hotelId: number;
	hotelName: string;
	hotelAddress: string;
	hotelCity: string;
	totalRooms: number;
	totalRevenue: number;
	averageOccupancy: number;
	monthlyData: MonthlyData[];
}

interface Hotel {
	id: number;
	name: string;
}

export default function HotelRevenueReportPage() {
	const [selectedHotel, setSelectedHotel] = useState<number | ''>('');
	const [startDate, setStartDate] = useState<string>('');
	const [endDate, setEndDate] = useState<string>('');
	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [report, setReport] = useState<HotelRevenueReport | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingHotels, setIsLoadingHotels] = useState(true);

	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	useEffect(() => {
		fetchHotels();
		// Set default dates: last 6 months
		const end = new Date();
		const start = new Date();
		start.setMonth(start.getMonth() - 6);
		setEndDate(end.toISOString().split('T')[0]);
		setStartDate(start.toISOString().split('T')[0]);
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

		if (!startDate || !endDate) {
			setSnackbarMessage('Pasirinkite datos intervalą!');
			setSnackbarOpen(true);
			return;
		}

		if (new Date(startDate) > new Date(endDate)) {
			setSnackbarMessage('Pradžios data negali būti vėlesnė nei pabaigos data!');
			setSnackbarOpen(true);
			return;
		}

		setIsLoading(true);
		try {
			const response = await axiosInstance.get('/reports/hotel-revenue', {
				params: {
					hotelId: selectedHotel,
					startDate: startDate,
					endDate: endDate,
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

	const getMonthLabel = (monthName: string, year: number) => {
		const months: { [key: string]: string } = {
			JANUARY: 'Sau',
			FEBRUARY: 'Vas',
			MARCH: 'Kov',
			APRIL: 'Bal',
			MAY: 'Geg',
			JUNE: 'Bir',
			JULY: 'Lie',
			AUGUST: 'Rgp',
			SEPTEMBER: 'Rgs',
			OCTOBER: 'Spa',
			NOVEMBER: 'Lap',
			DECEMBER: 'Gru',
		};
		return `${months[monthName]} ${year}`;
	};

	const chartData = report?.monthlyData.map((data) => ({
        name: getMonthLabel(data.monthName, data.year),
        'Pajamos (€)': data.revenue,
        'Užimtumas (%)': data.occupancyRate,
        Rezervacijos: data.totalReservations,
    }));

	return (
		<>
			<NavBar />

			<Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 8 }}>
				<Container maxWidth='xl'>
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
						Viešbučio pajamų ir užimtumo ataskaita
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
							<Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
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
							<Box sx={{ flex: '1 1 200px', minWidth: '150px' }}>
								<TextField
									label='Nuo'
									type='date'
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									InputLabelProps={{ shrink: true }}
									fullWidth
								/>
							</Box>
							<Box sx={{ flex: '1 1 200px', minWidth: '150px' }}>
								<TextField
									label='Iki'
									type='date'
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									InputLabelProps={{ shrink: true }}
									fullWidth
								/>
							</Box>
							<Box sx={{ flex: '1 1 250px', minWidth: '200px' }}>
								<Button
									variant='contained'
									onClick={handleGenerateReport}
									disabled={isLoading || !selectedHotel || !startDate || !endDate}
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

					{/* Report Content */}
					{report && (
						<>
							{/* Hotel Info */}
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
									📅 Laikotarpis: {formatDate(report.startDate)} - {formatDate(report.endDate)}
								</Typography>
								<Typography variant='body1' color='textSecondary'>
									🏨 Kambarių: {report.totalRooms}
								</Typography>
							</Paper>

							{/* Summary Cards */}
							<Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
								<Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
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
												Bendros pajamos
											</Typography>
											<Typography variant='h4' sx={{ fontWeight: 'bold', color: '#388e3c' }}>
												€{report.totalRevenue.toFixed(2)}
											</Typography>
										</CardContent>
									</Card>
								</Box>
								<Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
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
												Vidutinis užimtumas
											</Typography>
											<Typography variant='h4' sx={{ fontWeight: 'bold', color: '#1976d2' }}>
												{report.averageOccupancy.toFixed(1)}%
											</Typography>
										</CardContent>
									</Card>
								</Box>
								<Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
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
												Viso rezervacijų
											</Typography>
											<Typography variant='h4' sx={{ fontWeight: 'bold', color: '#9c27b0' }}>
												{report.monthlyData.reduce((sum, m) => sum + m.totalReservations, 0)}
											</Typography>
										</CardContent>
									</Card>
								</Box>
							</Box>

							{/* Revenue Chart */}
							<Paper
								sx={{
									p: 3,
									mb: 3,
									borderRadius: 3,
									boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								}}
							>
								<Typography variant='h6' sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
									Mėnesinės pajamos
								</Typography>
								<ResponsiveContainer width='100%' height={350}>
									<BarChart data={chartData}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='name' />
										<YAxis />
										<Tooltip />
										<Legend />
										<Bar dataKey='Pajamos (€)' fill='#54923D' />
									</BarChart>
								</ResponsiveContainer>
							</Paper>

							{/* Occupancy Chart */}
							<Paper
								sx={{
									p: 3,
									mb: 3,
									borderRadius: 3,
									boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								}}
							>
								<Typography variant='h6' sx={{ fontWeight: 'bold', mb: 3, color: '#333' }}>
									Užimtumo rodikliai
								</Typography>
								<ResponsiveContainer width='100%' height={350}>
									<LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray='3 3' />
                                        <XAxis dataKey='name' />
                                        <YAxis />
                                        <Tooltip 
                                            formatter={(value: number, name: string) => {
                                                if (name === 'Užimtumas (%)') {
                                                    return `${value.toFixed(1)}%`;
                                                }
                                                if (name === 'Pajamos (€)') {
                                                    return `€${value.toFixed(2)}`;
                                                }
                                                return value;
                                            }}
                                        />
                                        <Legend />
                                        <Line type='monotone' dataKey='Užimtumas (%)' stroke='#1976d2' strokeWidth={2} />
                                        <Line type='monotone' dataKey='Rezervacijos' stroke='#9c27b0' strokeWidth={2} />
                                    </LineChart>
								</ResponsiveContainer>
							</Paper>
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
								Pasirinkite viešbutį ir datos intervalą, tada spauskite "Generuoti ataskaitą"
							</Typography>
						</Box>
					)}
				</Container>
			</Box>
			<SnackbarError open={snackbarOpen} message={snackbarMessage} onClose={() => setSnackbarOpen(false)} />
		</>
	);
}