import { Box, Button, Paper, Typography } from '@mui/material';

type HotelCardProps = {
	hotel: string;
};

export default function HotelCard({ hotel }: HotelCardProps) {
	return (
		<Paper elevation={3} sx={{ borderRadius: 1, mb: 2, overflow: 'hidden' }}>
			<Box
				component='img'
				src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/c1/4c/boutique-hotels.jpg?w=1200&h=-1&s=1'
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
						{hotel}
					</Typography>
					<Typography>Kaunas, Lietuva</Typography>
					<Typography variant='h6' sx={{ mt: 1, fontWeight: 'bold' }}>
						Nuo 70€
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
				>
					Peržiūrėti
				</Button>
			</Box>
		</Paper>
	);
}
