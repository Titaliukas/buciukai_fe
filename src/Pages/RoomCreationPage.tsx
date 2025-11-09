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
import { RoomDetails } from '../types';

export default function RoomCreationPage() {
  const [room, setRoom] = useState<RoomDetails>({
    hotel: '',
    roomNumber: '',
    type: '',
    price: 0,
    floor: 0,
    size: 0,
    bedType: '',
    description: '',
    pictures: [],
  });

  const bedOptions = [
    'Karališka lova',
    'Dvigulė lova',
    'Viengulė lova',
    'Dvi viengulės lovos',
  ];

  const hotelOptions = ['Viešbutis 1', 'Viešbutis 2', 'Viešbutis 3'];

  const handleChange = (field: keyof RoomDetails, value: string | number) => {
    setRoom((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setRoom((prev) => ({
        ...prev,
        pictures: Array.from(files),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(room);
    alert('🏨 Kambarys sėkmingai sukurtas (placeholder)');
  };

  return (
    <>
      <NavBar />
      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333', mb: 5 }}
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
            <TextField
              select
              label="Pasirinkite viešbutį"
              value={room.hotel}
              onChange={(e) => handleChange('hotel', e.target.value)}
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
              value={room.roomNumber}
              onChange={(e) => handleChange('roomNumber', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Kaina (€)"
              type="number"
              value={room.price}
              onChange={(e) => handleChange('price', Number(e.target.value))}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Kambario tipas"
              value={room.type}
              onChange={(e) => handleChange('type', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Aukšto numeris"
              type="number"
              value={room.floor}
              onChange={(e) => handleChange('floor', Number(e.target.value))}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Kambario dydis (m²)"
              type="number"
              value={room.size}
              onChange={(e) => handleChange('size', Number(e.target.value))}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              select
              label="Lovos tipas"
              value={room.bedType}
              onChange={(e) => handleChange('bedType', e.target.value)}
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
              value={room.description}
              onChange={(e) => handleChange('description', e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />


            <Box>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, fontWeight: 'medium', color: '#555' }}
              >
                Kambario nuotraukos
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

              {room.pictures.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {room.pictures.map((file, index) => (
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
              Sukurti Kambarį
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
