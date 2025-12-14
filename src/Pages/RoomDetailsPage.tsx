import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  Chip,
  CircularProgress
} from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import StraightenIcon from '@mui/icons-material/Straighten';
import StairsIcon from '@mui/icons-material/Stairs';
import BedIcon from '@mui/icons-material/Bed';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import type Room from '../types/Room';
import type { RoomDetails } from '../types';
import Detail from '../Components/RoomDetailsComponent';
import { getRoomById } from '../api/roomApi';

export default function RoomDetailsPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { room?: Room & Partial<RoomDetails> } };
  const [room, setRoom] = useState<(Room & Partial<RoomDetails>) | null>(location.state?.room ?? null);
  const [loading, setLoading] = useState(!location.state?.room);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.room || !roomId) {
      setLoading(false);
      return;
    }

    const fetchRoom = async () => {
      try {
        setLoading(true);
        const data = await getRoomById(roomId);
        // Map RoomDto to Room type
        setRoom({
          ...data,
          type: data.roomType,
          size: data.sizeM2,
          floor: data.floorNumber,
        } as unknown as Room & Partial<RoomDetails>);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch room:', err);
        setError('Nepavyko užkrauti kambario informacijos. Bandykite dar kartą vėliau.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId, location.state?.room]);

  console.log('Room details:', room);
  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f5f6fa', minHeight: '100vh', pb: 6, pt: 0.01 }}>
        <Container sx={{ mt: 4 }}>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Typography variant='body1' color='error' sx={{ textAlign: 'center', py: 8 }}>
              {error}
            </Typography>
          )}

          {!loading && !error && room && (
            <>
              {/* HERO IMAGE */}
              <Box
                sx={{
                  position: 'relative',
                  height: 360,
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 3
                }}
              >
                <Box
                  component="img"
                  src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/c1/4c/boutique-hotels.jpg?w=1200"
                  alt={room?.roomType ?? room?.type ?? 'Room'}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Gradient overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))'
                  }}
                />

                {/* Title + Price */}
                <Stack
                  sx={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    right: 24,
                    color: 'white'
                  }}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4" fontWeight="bold">
                    {room?.roomType ?? room?.type ?? 'Kambarys'}
                  </Typography>

                  <Chip
                    label={`${(room?.price ?? 0).toFixed(2)} € už naktį`}
                    sx={{
                      bgcolor: '#3A35DD',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      px: 2,
                      py: 2.5
                    }}
                  />
                </Stack>
              </Box>

              {/* CONTENT CARD */}
              <Box
                sx={{
                  mt: 4,
                  p: 4,
                  bgcolor: 'white',
                  borderRadius: 3,
                  boxShadow: 2
                }}
              >
                {/* DESCRIPTION */}
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {room?.description ?? 'Aprašymas netrukus bus pateiktas.'}
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* ROOM DETAILS */}
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={4}
                  sx={{ mb: 4 }}
                >
                  <Detail icon={<BedIcon />} label="Lovos tipas" value={room?.bedType} />
                  <Detail icon={<StairsIcon />} label="Aukštas" value={room?.floorNumber} />
                  <Detail icon={<StraightenIcon />} label="Dydis" value={room?.sizeM2 ? `${room.sizeM2} m²` : undefined} />
                  <Detail icon={<HotelIcon />} label="Tipas" value={room?.roomType ?? room?.type} />
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {/* ACTIONS */}
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      bgcolor: '#3A35DD',
                      px: 4,
                      '&:hover': { bgcolor: '#2e2abf' }
                    }}
                    onClick={() =>
                      navigate(`/rooms/${room?.id ?? roomId}/reservation-times`)
                    }
                  >
                    Rezervuoti
                  </Button>

                  <Button
                    size="large"
                    variant="outlined"
                    onClick={() => navigate(-1)}
                  >
                    Grįžti
                  </Button>
                </Stack>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </>
  );
}
