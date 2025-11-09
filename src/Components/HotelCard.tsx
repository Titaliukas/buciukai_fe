import { Box, Button, Paper, Typography } from '@mui/material';
import Hotel from '../types/Hotel';
import { useNavigate } from 'react-router-dom';

type HotelCardProps = {
	hotel: Hotel;
};

export default function HotelCard({ hotel }: HotelCardProps) {
	const navigate = useNavigate();

	return (
		<Paper elevation={3} sx={{ borderRadius: 1, mb: 2, overflow: 'hidden' }}>
			<Box
				component='img'
				src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/a5/8b/9a/the-kayon-jungle-resort.jpg?w=1400&h=-1&s=1'
				alt='Hotel'
				sx={{
					width: '100%',
					height: 200,
					objectFit: 'cover',
					borderTopLeftRadius: 1,
					borderTopRightRadius: 1,
					display: 'block',
				}}
			/>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'flex-end',
					bgcolor: '#54923D',
					color: 'white',
					p: 2,
					borderBottomLeftRadius: 1,
					borderBottomRightRadius: 1,
				}}
			>
				<Box>
					<Typography variant='h6' fontWeight='bold'>
						{hotel.name}
					</Typography>
					<Typography>{hotel.location}</Typography>
					<Typography variant='h6' sx={{ mt: 1, fontWeight: 'bold' }}>
						Nuo {hotel.lowestPrice}€
					</Typography>
				</Box>

				<Button
					variant='contained'
					sx={{
						bgcolor: '#3A35DD',
						fontWeight: 'bold',
						mt: 2,
						'&:hover': { bgcolor: '#2e2abf' },
					}}
					onClick={() => navigate(`/hotel/${hotel.id}/rooms`)}
				>
					Peržiūrėti
				</Button>
			</Box>
		</Paper>
	);
}
