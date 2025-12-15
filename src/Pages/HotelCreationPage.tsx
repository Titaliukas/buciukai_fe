import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import NavBar from '../Components/NavBar';
import axiosInstance from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function HotelCreationPage() {
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phoneNumber: '',
    email: '',
    starRating: 3,
    description: '',
    totalRooms: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string | number) => {
    setHotel((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post('/admin/hotels/create', hotel);

      alert('Viešbutis sėkmingai sukurtas');
      navigate('/admin/hotels');

    } catch (err) {
      console.error(err);
      alert('Nepavyko sukurti viešbučio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
            Naujo Viešbučio Kūrimas
          </Typography>

          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField label="Pavadinimas" required onChange={(e) => handleChange('name', e.target.value)} />
            <TextField label="Adresas" required onChange={(e) => handleChange('address', e.target.value)} />
            <TextField label="Miestas" required onChange={(e) => handleChange('city', e.target.value)} />
            <TextField label="Šalis" required onChange={(e) => handleChange('country', e.target.value)} />
            <TextField label="Pašto kodas" onChange={(e) => handleChange('postalCode', e.target.value)} />
            <TextField label="Telefonas" onChange={(e) => handleChange('phoneNumber', e.target.value)} />
            <TextField label="El. paštas" onChange={(e) => handleChange('email', e.target.value)} />
            <TextField type="number" label="Žvaigždutės" onChange={(e) => handleChange('starRating', Number(e.target.value))} />
            <TextField type="number" label="Kambarių skaičius" onChange={(e) => handleChange('totalRooms', Number(e.target.value))} />
            <TextField multiline rows={3} label="Aprašymas" onChange={(e) => handleChange('description', e.target.value)} />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ bgcolor: '#54923D' }}
            >
              {loading ? 'Kuriama...' : 'Sukurti viešbutį'}
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
