import { Box, Container, Typography, CircularProgress } from '@mui/material';
import NavBar from '../Components/NavBar';
import RoomCard from '../Components/RoomCard';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRoomsByHotelId } from '../api/roomApi';
import type Room from '../types/Room';

export default function RoomsListPage() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const location = useLocation();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotelName, setHotelName] = useState<string>(location.state?.hotelName || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!hotelId) {
        setError('Viešbučio ID nerastas');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getRoomsByHotelId(hotelId);
        setRooms(data);
        // Use hotel ID as fallback if name wasn't passed
        if (!hotelName) {
          setHotelName(`Viešbutis #${hotelId}`);
        }
        setError(null);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
        setError('Nepavyko užkrauti kambarių. Bandykite dar kartą vėliau.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [hotelId, hotelName]);
  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', pb: 4, pt: 0.01 }}>

        {/* White Content Section */}
        <Container sx={{ mt: 4 }}>
          <Typography variant='h5' sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
            {hotelName ? `${hotelName} viešbučio kambariai` : 'Viešbučio kambariai'}
          </Typography>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Typography variant='body1' color='error' sx={{ textAlign: 'center', py: 4 }}>
              {error}
            </Typography>
          )}

          {!loading && !error && rooms.length === 0 && (
            <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'center', py: 4 }}>
              Kambarių nerasta.
            </Typography>
          )}

          {!loading && !error && rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </Container>
      </Box>
    </>
  );
}
