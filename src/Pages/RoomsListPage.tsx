import { Box, Container, Typography } from '@mui/material';
import NavBar from '../Components/NavBar';
import RoomCard from '../Components/RoomCard';

const RoomList = [
	{
		id: '1',
		type: 'Studio',
		price: 70,
	},
	{
		id: '2',
		type: 'Apartment with balcony',
		price: 80,
	},
	{
		id: '3',
		type: 'Standard Apartment',
		price: 90,
	},
];

export default function RoomsListPage() {
  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', pb: 4, pt: 0.01 }}>

        {/* White Content Section */}
        <Container sx={{ mt: 4 }}>
          <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
            Viešbučio kambariai
          </Typography>

          {RoomList.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </Container>
      </Box>
    </>
  );
}
