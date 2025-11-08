import { Box, Container, Typography } from '@mui/material';
import NavBar from '../Components/NavBar';
import ReservationCard from '../Components/ReservationCard';

const ReservationList = [{id: '1'}, {id: '2'}, {id: '3'}];

export default function ReservationsPage() {
  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', pb: 4, pt: 0.01 }}>

        {/* White Content Section */}
        <Container sx={{ mt: 4 }}>
          <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
            Rezervacijos
          </Typography>

          {ReservationList.map((reservation) => (
            <ReservationCard key={reservation.id} />
          ))}
        </Container>
      </Box>
    </>
  );
}
