import { Box, Button, Paper, Typography, IconButton } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Room from '../types/Room';
import { useNavigate } from 'react-router-dom';
import AvailableTimeSlotsDialog from './AvailableTimeSlotsDialog';

type Props = {
	room: Room;
};

export default function RoomCard({ room }: Props) {
	const navigate = useNavigate();
	const [timesOpen, setTimesOpen] = useState(false);
		return (
			<Paper elevation={3} sx={{ borderRadius: 1, mb: 2, overflow: 'hidden' }}>
				{/* Image container with relative positioning so we can overlay buttons */}
				<Box sx={{ position: 'relative' }}>
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
							position: 'absolute',
							top: 8,
							right: 8,
							display: 'flex',
							gap: 1,
							zIndex: 2,
						}}
					>
						<IconButton
							size='small'
							aria-label='Įterpti laikus'
							onClick={() => navigate(`/rooms/${room.id}/reservation-times`)}
							sx={{
								color: 'black',
								bgcolor: 'transparent',
								'&:hover': { backdropFilter: 'blur(2px)' },
								boxShadow: 'none',
							}}
						>
							<EditIcon fontSize='medium'/>
						</IconButton>
					</Box>
				</Box>
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
				onClick={() => setTimesOpen(true)}
				>
					Rezervuoti
				</Button>
        <AvailableTimeSlotsDialog
          open={timesOpen}
          onClose={() => setTimesOpen(false)}
          room={room}
        />
			</Box>
		</Paper>
	);
}
