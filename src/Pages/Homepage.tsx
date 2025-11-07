import { Box, Container, Typography } from '@mui/material';
import SearchBar from '../Components/SearchBar';
import HotelCard from '../Components/HotelCard';
import AvatarButton from '../Components/AvatarButton';

const hotelList = ['Viešbutis 1', 'Viešbutis 2', 'Viešbutis 3'];

export default function HomePage() {
	return (
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
					{/* Top row: title and profile icon */}
					<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
						<Typography variant='h5' sx={{ fontWeight: 'bold' }}>
							Bučiukai
						</Typography>
						<AvatarButton />
					</Box>

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
					<HotelCard hotel={hotel} />
				))}
			</Container>
		</Box>
	);
}
