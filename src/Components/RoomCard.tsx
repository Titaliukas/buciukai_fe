import { Box, Button, Paper, Typography } from '@mui/material';
import Room from '../types/Room';

type Props = {
	room: Room;
};

export default function RoomCard({ room }: Props) {
	return (
		<Paper elevation={3} sx={{ borderRadius: 1, mb: 2, overflow: 'hidden' }}>
			<Box
				component='img'
				src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/c1/4c/boutique-hotels.jpg?w=1200&h=-1&s=1'
				alt='Room'
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
						{room.type}
					</Typography>
					<Typography variant='h6' sx={{ mt: 1, fontWeight: 'bold' }}>
						{room.price}€
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
					onClick={() => {}}
				>
					Peržiūrėti
				</Button>
			</Box>
		</Paper>
	);
}
