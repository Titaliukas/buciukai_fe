import { Box, Container, Typography } from '@mui/material';
import SearchBar from '../Components/SearchBar';
import HotelCard from '../Components/HotelCard';
import NavBar from '../Components/NavBar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SnackbarSuccess } from '../Components/SnackBarAlert';
import NewsItem from '../types/NewsItem';
import axiosInstance from '../config/axiosConfig';
import { getHotels, searchHotels, type HotelSearchFilters } from '../api/hotelApi';
import type Hotel from '../types/Hotel';

export default function HomePage() {
	const location = useLocation();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const [news, setNews] = useState<NewsItem[]>([]);
	const [hotels, setHotels] = useState<Hotel[]>([]);
	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		getHotels()
			.then(setHotels)
			.catch(err => console.error('Failed to load hotels', err));
	}, []);

	useEffect(() => {
		axiosInstance
			.get<NewsItem[]>('/announcements/news')
			.then(res => setNews(res.data))
			.catch(err => console.error('Failed to load news', err));
	}, []);

	useEffect(() => {
		if (location.state?.message) {
			setSnackbarMessage(location.state.message);
			setSnackbarOpen(true);
			window.history.replaceState({}, document.title);
		}
	}, [location.state]);

	const handleSearch = async (filters: HotelSearchFilters) => {
		setIsSearching(true);
		try {
			const results = await searchHotels(filters);
			setHotels(results);
		} catch (e) {
			console.error('Search failed', e);
			// jei norit, galite rodyti snackbar error (reikia atskiro komponento)
		} finally {
			setIsSearching(false);
		}
	};

	const handleReset = async () => {
		setIsSearching(true);
		try {
			const all = await getHotels();
			setHotels(all);
		} catch (e) {
			console.error('Reload hotels failed', e);
		} finally {
			setIsSearching(false);
		}
	};

	return (
		<>
			<NavBar />

			<Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', pb: 4 }}>
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
						<Typography variant='h5' sx={{ fontWeight: 'bold', mb: 3, textAlign: 'left' }}>
							Raskite savo viešbutį
						</Typography>

						<SearchBar onSearch={handleSearch} onReset={handleReset} />
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

				<Container sx={{ mt: 4 }}>
					<Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
						Viešbučiai {isSearching ? '(kraunama...)' : ''}
					</Typography>

					{hotels.length === 0 && (
						<Typography sx={{ color: 'text.secondary' }}>
							Viešbučių nėra
						</Typography>
					)}

					{hotels.map((hotel) => (
						<HotelCard key={hotel.id} hotel={hotel} />
					))}
				</Container>
			</Box>

			<SnackbarSuccess
				open={snackbarOpen}
				message={snackbarMessage}
				onClose={() => setSnackbarOpen(false)}
			/>
		</>
	);
}
