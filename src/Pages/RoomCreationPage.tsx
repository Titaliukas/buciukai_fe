import { useState } from 'react';
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

export default function RoomCreationPage() {
  const [hotel, setHotel] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [price, setPrice] = useState('');
  const [roomType, setRoomType] = useState('');
  const [floor, setFloor] = useState('');
  const [size, setSize] = useState('');
  const [bedType, setBedType] = useState('');
  const [description, setDescription] = useState('');

  const bedOptions = [
    'Karališka lova',
    'Dvigulė lova',
    'Viengulė lova',
    'Dvi viengulės lovos',
  ];

  const hotelOptions = ['Viešbutis 1', 'Viešbutis 2', 'Viešbutis 3'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      hotel,
      roomNumber,
      price,
      roomType,
      floor,
      size,
      bedType,
      description,
    });
    alert('🏨 Kambarys sėkmingai sukurtas (placeholder)');
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
            Naujo Kambario Kūrimas
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
            {/* Viešbučio pasirinkimas */}
            <TextField
              select
              label="Pasirinkite viešbutį"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            >
              {hotelOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Kambario numeris"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Kaina (€)"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Kambario tipas"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Aukšto numeris"
              type="number"
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Kambario dydis (m²)"
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              select
              label="Lovos tipas"
              value={bedType}
              onChange={(e) => setBedType(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            >
              {bedOptions.map((bed) => (
                <MenuItem key={bed} value={bed}>
                  {bed}
                </MenuItem>
              ))}
            </TextField>

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
              Sukurti Kambarį
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
