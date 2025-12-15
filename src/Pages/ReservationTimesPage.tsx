import { Box, Container, Typography } from '@mui/material';
import NavBar from '../Components/NavBar';
import TimeSlotsCalendar from '../Components/TimeSlots';
import { useParams } from 'react-router-dom';

export default function ReservationTimesPage() {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', pb: 4, pt: 0.01}}>

        <Container sx={{ mt: 4 }}>
          <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
            Rezervacijos Laikai
          </Typography>
          {roomId && <TimeSlotsCalendar roomId={roomId} />}
        </Container>
      </Box>
    </>
  );
}
