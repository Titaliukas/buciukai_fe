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
import { HotelDetails } from '../types';

export default function HotelCreationPage() {
  const [hotel, setHotel] = useState<HotelDetails>({
    name: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
    email: '',
    starRating: 0,
    description: '',
    totalRooms: 0,
    pictures: [],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (files) {
    setHotel((prev) => ({
      ...prev,
      pictures: Array.from(files),
    }));
  }
};

  const handleChange = (field: keyof HotelDetails, value: string | number) => {
    setHotel((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(hotel);
    alert('🏨 Viešbutis sėkmingai sukurtas (placeholder)');
  };

  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#333',
              mb: 5,
            }}
          >
            Naujo Viešbučio Kūrimas
          </Typography>

          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              bgcolor: 'white',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <TextField
              label="Viešbučio pavadinimas"
              value={hotel.name}
              onChange={(e) => handleChange('name', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Adresas"
              value={hotel.address}
              onChange={(e) => handleChange('address', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Miestas"
              value={hotel.city}
              onChange={(e) => handleChange('city', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Šalis"
              value={hotel.country}
              onChange={(e) => handleChange('country', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Pašto kodas"
              value={hotel.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Telefono numeris"
              value={hotel.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="El. paštas"
              type="email"
              value={hotel.email}
              onChange={(e) => handleChange('email', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Žvaigždučių įvertinimas"
              type="number"
              inputProps={{ min: 1, max: 5 }}
              value={hotel.starRating}
              onChange={(e) => handleChange('starRating', Number(e.target.value))}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Bendras kambarių skaičius"
              type="number"
              value={hotel.totalRooms}
              onChange={(e) => handleChange('totalRooms', Number(e.target.value))}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Aprašymas"
              multiline
              rows={4}
              value={hotel.description}
              onChange={(e) => handleChange('description', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            {/* Picture Upload */}
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 'medium', color: '#555' }}
              >
                Viešbučio nuotraukos
              </Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Pasirinkti nuotraukas
                <input
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              {hotel.pictures.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {hotel.pictures.map((file, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Nuotrauka ${index + 1}`}
                        width="100%"
                        height="100%"
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#54923D',
                fontWeight: 'bold',
                textTransform: 'none',
                borderRadius: 2,
                py: 1.2,
                '&:hover': { bgcolor: '#437531' },
              }}
            >
              Sukurti Viešbutį
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
