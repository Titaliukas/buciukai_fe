import { Box, Container, Typography } from '@mui/material';
import SearchBar from '../Components/SearchBar';
import HotelCard from '../Components/HotelCard';
import NavBar from '../Components/NavBar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SnackbarSuccess } from '../Components/SnackBarAlert';
import NewsItem from '../types/NewsItem';
import axiosInstance from '../config/axiosConfig';

const hotelList = [
	{
		id: '1',
		name: 'Viešbutis 1',
		location: 'Kaunas, Lietuva',
		lowestPrice: 70,
	},
	{
		id: '2',
		name: 'Viešbutis 2',
		location: 'Vilnius, Lietuva',
		lowestPrice: 80,
	},
	{
		id: '3',
		name: 'Viešbutis 3',
		location: 'Klaipėda, Lietuva',
		lowestPrice: 90,
	},
];

export default function HomePage() {
	const location = useLocation();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [news, setNews] = useState<NewsItem[]>([]);

	useEffect(() => {
  	axiosInstance
    .get<NewsItem[]>('/announcements/news')
    .then(res => setNews(res.data))
    .catch(err => console.error('Failed to load news', err));
	}, []);

	
	// Show snackbar only once when arriving
	useEffect(() => {
		if (location.state?.message) {
			setSnackbarMessage(location.state.message);
			setSnackbarOpen(true);
			// Clear state so refresh doesn't show snackbar again
			window.history.replaceState({}, document.title);
		}
	}, [location.state]);

	return (
		<>
			<NavBar />

			<Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', pb: 4 }}>
				{/* Green Header Section */}
				<Box
					sx={{
						bgcolor: '#54923D',
						color: 'white',
						p: 4,
						textAlign: 'center',
						position: 'relative',
					}}
				>
					<Container>
						{/* Title */}
						<Typography variant='h5' sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left' }}>
							Raskite savo viešbutį
						</Typography>

						<SearchBar />
					</Container>
				</Box>

					{/* NEWS SECTION */}
				<Container sx={{ mt: 4 }}>
				<Typography
					variant="h5"
					sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}
				>
					Naujienos
				</Typography>

				{news.length === 0 && (
					<Typography sx={{ color: 'text.secondary' }}>
					Naujienų nėra
					</Typography>
				)}

				{news.map(n => (
					<Box
					key={n.id}
					sx={{
						bgcolor: '#fff',
						p: 3,
						mb: 2,
						borderLeft: '4px solid #54923D',
						borderRadius: 1,
						boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
					}}
					>
					<Typography
						variant="h6"
						sx={{ fontWeight: 'bold', color: '#000' }}
					>
						{n.title}
					</Typography>

					<Typography sx={{ mt: 1, color: '#333' }}>
						{n.message}
					</Typography>

					{n.visibleUntil && (
						<Typography
						variant="caption"
						sx={{ mt: 1, display: 'block', color: 'text.secondary' }}
						>
						Galioja iki: {new Date(n.visibleUntil).toLocaleDateString()}
						</Typography>
					)}
					</Box>
				))}
				</Container>


				{/* White Content Section */}
				<Container sx={{ mt: 4 }}>
					<Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
						Viešbučiai
					</Typography>

					{hotelList.map((hotel) => (
						<HotelCard key={hotel.id} hotel={hotel} />
					))}
				</Container>
			</Box>
			<SnackbarSuccess open={snackbarOpen} message={snackbarMessage} onClose={() => setSnackbarOpen(false)} />
		</>
	);
}
