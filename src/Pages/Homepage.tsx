import { Box, Container, Typography } from '@mui/material';
import SearchBar from '../Components/SearchBar';
import HotelCard from '../Components/HotelCard';
import NavBar from '../Components/NavBar';

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
		</>
	);
}
