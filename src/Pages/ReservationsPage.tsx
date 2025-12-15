import { Box, Container, Typography, CircularProgress, Alert, Snackbar } from '@mui/material';
import { useState, useEffect } from 'react';
import NavBar from '../Components/NavBar';
import ReservationCard from '../Components/ReservationCard';
import { getMyReservations, cancelReservation, type MyReservationDto } from '../api/reservationApi';
import Reservation from '../types/Reservation';
import Status from '../enum/Status';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const data = await getMyReservations();
      
      // Map backend MyReservationDto to frontend Reservation type
      const mapped: Reservation[] = data.map((dto: MyReservationDto) => {
        console.log('Mapping reservation:', dto.id, 'Status from backend:', dto.status);
        return {
          id: dto.id,
          hotelName: dto.hotelName,
          roomName: dto.roomName,
          checkIn: dto.checkIn,
          checkOut: dto.checkOut,
          priceTotal: dto.priceTotal,
          address: dto.address,
          image: dto.image,
          status: dto.status === 'Cancelled' ? Status.Cancelled : Status.Confirmed,
        };
      });
      
      setReservations(mapped);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch reservations:', err);
      setError('Nepavyko užkrauti rezervacijų.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (reservationId: string) => {
    try {
      await cancelReservation(parseInt(reservationId));
      setSuccessMessage('Rezervacija sėkmingai atšaukta!');
      // Refresh reservations after cancellation
      await fetchReservations();
    } catch (err) {
      console.error('Failed to cancel reservation:', err);
      setError('Nepavyko atšaukti rezervacijos.');
    }
  };

  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', pb: 4, pt: 0.01  }}>
        <Container sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: 'black', alignSelf: 'flex-start' }}>
            Rezervacijos
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>
          ) : reservations.length === 0 ? (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 4 }}>
              Neturite rezervacijų.
            </Typography>
          ) : (
            reservations.map((reservation) => (
              <ReservationCard 
                key={reservation.id} 
                reservation={reservation}
                onCancel={() => handleCancel(reservation.id)}
              />
            ))
          )}
        </Container>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
