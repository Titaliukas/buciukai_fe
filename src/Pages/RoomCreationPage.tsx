import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import NavBar from '../Components/NavBar';
import axiosInstance from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

interface Option {
  id: number;
  name: string;
}

export default function RoomCreationPage() {
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    hotelId: '',
    roomNumber: '',
    price: '',
    floorNumber: '',
    sizeM2: '',
    description: '',
    roomTypeId: '',
    bedTypeId: '',
  });

  const [hotels, setHotels] = useState<Option[]>([]);
  const [bedTypes, setBedTypes] = useState<Option[]>([]);
  const [roomTypes, setRoomTypes] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [hotelsRes, roomTypesRes, bedTypesRes] = await Promise.all([
          axiosInstance.get<Option[]>('/admin/hotels'),
          axiosInstance.get<Option[]>('/admin/room-types'),
          axiosInstance.get<Option[]>('/admin/bed-types'),
        ]);

        setHotels(hotelsRes.data);
        setRoomTypes(roomTypesRes.data);
        setBedTypes(bedTypesRes.data);
        
      } catch (err) {
        alert('Nepavyko užkrauti duomenų');
      } finally {
        setFetching(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (field: string, value: string) => {
    setRoom((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    await axiosInstance.post('/admin/rooms', {
      hotelId: Number(room.hotelId),
      roomNumber: Number(room.roomNumber),
      price: Number(room.price),
      floorNumber: Number(room.floorNumber),
      sizeM2: Number(room.sizeM2),
      description: room.description,
      roomTypeId: Number(room.roomTypeId),
      bedTypeId: Number(room.bedTypeId),
    });

    alert('Kambarys sėkmingai sukurtas');
    navigate('/admin');
    return; 
  } catch (err) {
    console.error(err);
    alert('Nepavyko sukurti kambario');
  } finally {
    setLoading(false);
  }
};


  if (fetching) {
    return (
      <>
        <NavBar />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="sm">
          <Typography color='black' variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
            Naujo Kambario Kūrimas
          </Typography>

          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              select
              label="Viešbutis"
              required
              value={room.hotelId}
              onChange={(e) => handleChange('hotelId', e.target.value)}
            >
              {hotels.map((h) => (
                <MenuItem key={h.id} value={h.id}>
                  {h.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Kambario numeris"
              required
              value={room.roomNumber}
              onChange={(e) => handleChange('roomNumber', e.target.value)}
            />

            <TextField
              type="number"
              label="Kaina (€)"
              required
              value={room.price}
              onChange={(e) => handleChange('price', e.target.value)}
            />

            <TextField
              type="number"
              label="Aukštas"
              required
              value={room.floorNumber}
              onChange={(e) => handleChange('floorNumber', e.target.value)}
            />

            <TextField
              type="number"
              label="Dydis (m²)"
              required
              value={room.sizeM2}
              onChange={(e) => handleChange('sizeM2', e.target.value)}
            />

            <TextField
              select
              label="Kambario tipas"
              required
              value={room.roomTypeId}
              onChange={(e) => handleChange('roomTypeId', e.target.value)}
            >
              {roomTypes.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
  select
  label="Lovos tipas"
  required
  value={room.bedTypeId}
  onChange={(e) => handleChange('bedTypeId', e.target.value)}
>
  {bedTypes.map((b) => (
    <MenuItem key={b.id} value={b.id}>
      {b.name}
    </MenuItem>
  ))}
</TextField>


            <TextField
              multiline
              rows={3}
              label="Aprašymas"
              required
              value={room.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ bgcolor: '#54923D', mt: 2 }}
            >
              {loading ? 'Kuriama...' : 'Sukurti kambarį'}
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
