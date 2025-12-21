import { Box, Container, Typography, CircularProgress } from '@mui/material';
import NavBar from '../Components/NavBar';
import TimeSlotsCalendar from '../Components/TimeSlots';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/userContext';

export default function ReservationTimesPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const { isLoading, isStaff } = useContext(UserContext);

  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', pb: 4, pt: 0.01}}>
        <Container sx={{ mt: 4 }}>
          <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
            Rezervacijos Laikai
          </Typography>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : isStaff ? (
            roomId ? <TimeSlotsCalendar roomId={roomId} /> : null
          ) : (
            <Typography variant='body1' color='error'>
              Neturite teisės peržiūrėti šio puslapio.
            </Typography>
          )}
        </Container>
      </Box>
    </>
  );
}
