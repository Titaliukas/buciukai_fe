import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import NavBar from '../Components/NavBar';
import axiosInstance from '../config/axiosConfig';

type Hotel = {
  id: number;
  name: string;
};

export default function NewEventPage() {
  const [hotels, setHotels] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const [event, setEvent] = useState({
    hotelId: '',
    title: '',
    description: '',
    startAt: '',
    endAt: '',
  });

  useEffect(() => {
    axiosInstance.get<Hotel[]>('/admin/hotels')
      .then(res => setHotels(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (field: string, value: string) => {
    setEvent(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post('/admin/events', {
        hotelId: Number(event.hotelId),
        title: event.title,
        description: event.description,
        startAt: event.startAt,
        endAt: event.endAt,
      });

      alert('Renginys sėkmingai sukurtas');
      setEvent({
        hotelId: '',
        title: '',
        description: '',
        startAt: '',
        endAt: '',
      });
    } catch (err) {
      console.error(err);
      alert(' Nepavyko sukurti renginio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="sm">
          <Typography color='black' variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
            Naujo Renginio Kūrimas
          </Typography>

          <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              select
              label="Viešbutis"
              required
              value={event.hotelId}
              onChange={(e) => handleChange('hotelId', e.target.value)}
            >
              {hotels.map(h => (
                <MenuItem key={h.id} value={h.id}>
                  {h.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Renginio pavadinimas"
              required
              value={event.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />

            <TextField
  type="datetime-local"
  label="Pradžia"
  value={event.startAt}
  InputLabelProps={{ shrink: true }}
  required
  onChange={(e) => handleChange('startAt', e.target.value)}
/>

<TextField
  type="datetime-local"
  label="Pabaiga"
  value={event.endAt}
  InputLabelProps={{ shrink: true }}
  required
  onChange={(e) => handleChange('endAt', e.target.value)}
/>


            <TextField
              multiline
              rows={3}
              label="Aprašymas"
              required
              onChange={(e) => handleChange('description', e.target.value)}
            />

            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Kuriama...' : 'Sukurti renginį'}
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
