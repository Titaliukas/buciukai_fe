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

export default function HotelCreationPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [starRating, setStarRating] = useState('');
  const [description, setDescription] = useState('');
  const [totalRooms, setTotalRooms] = useState('');
  const [pictures, setPictures] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPictures(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      address,
      city,
      country,
      postalCode,
      phone,
      email,
      starRating,
      description,
      totalRooms,
      pictures,
    });

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Adresas"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Miestas"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Šalis"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Pašto kodas"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Telefono numeris"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="El. paštas"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Žvaigždučių įvertinimas"
              type="number"
              inputProps={{ min: 1, max: 5 }}
              value={starRating}
              onChange={(e) => setStarRating(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Bendras kambarių skaičius"
              type="number"
              value={totalRooms}
              onChange={(e) => setTotalRooms(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Aprašymas"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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

              {pictures.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {pictures.map((file, index) => (
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
