import { Box, Container, Typography } from '@mui/material';
import NavBar from '../Components/NavBar';
import ReservationCard from '../Components/ReservationCard';

const ReservationList = [{id: '1'}, {id: '2'}, {id: '3'}];

export default function ReservationsPage() {
  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', height: '100vh', pb: 4, pt: 0.01  }}>
        <Container sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: 'black', alignSelf: 'flex-start' }}>
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
