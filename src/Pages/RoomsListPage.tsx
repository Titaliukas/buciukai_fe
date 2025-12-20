import { Box, Container, Typography, CircularProgress } from '@mui/material';
import NavBar from '../Components/NavBar';
import RoomCard from '../Components/RoomCard';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRoomsByHotelId } from '../api/roomApi';
import type Room from '../types/Room';
import type HotelEvent from '../types/HotelEvent';
import axiosInstance from '../config/axiosConfig';

export default function RoomsListPage() {
  const { hotelId } = useParams<{ hotelId: string }>();
  const location = useLocation();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotelName, setHotelName] = useState<string>(location.state?.hotelName || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<HotelEvent[]>([]);


  useEffect(() => {
  if (!hotelId) return;

  axiosInstance
    .get<HotelEvent[]>(`/events/hotel/${hotelId}`)
    .then(res => setEvents(res.data))
    .catch(err => console.error('Failed to fetch events', err));
  }, [hotelId]);


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

    {/* Page background */}
    <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', pb: 4, pt: 2 }}>
      <Container maxWidth="lg">

        {/* EVENTS SECTION */}
        {events.length > 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              📅 Viešbučio renginiai
            </Typography>

            {events.map(ev => (
              <Box
                key={ev.id}
                sx={{
                  bgcolor: '#fff',
                  p: 2.5,
                  mb: 2,
                  borderLeft: '5px solid #54923D',
                  borderRadius: 2,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold', color: '#000' }}
                >
                  {ev.title}
                </Typography>

                <Typography
                  sx={{ mt: 0.5, color: '#333' }}
                >
                  {ev.description}
                </Typography>

                <Typography
                  variant="caption"
                  sx={{ display: 'block', mt: 1, color: '#666' }}
                >
                  {new Date(ev.startAt).toLocaleString()} –{' '}
                  {new Date(ev.endAt).toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* ROOMS SECTION */}
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', mb: 2, color: '#000' }}
        >
          {hotelName
            ? `${hotelName} viešbučio kambariai`
            : 'Viešbučio kambariai'}
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', py: 4, color: 'red' }}
          >
            {error}
          </Typography>
        )}

        {!loading && !error && rooms.length === 0 && (
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', py: 4, color: '#666' }}
          >
            Kambarių nerasta.
          </Typography>
        )}

        {!loading && !error &&
          rooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))
        }
      </Container>
    </Box>
  </>
);

}