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

export default function NewEventPage() {
  const [hotel, setHotel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  // Placeholder hotel list
  const hotels = ['Viešbutis 1', 'Viešbutis 2', 'Viešbutis 3'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      hotel,
      startDate,
      endDate,
      description,
    });
    alert('🎉 Renginys sukurtas (placeholder)');
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
            Naujo Renginio Kūrimas
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
            {/* Hotel dropdown */}
            <TextField
              select
              label="Pasirinkite viešbutį"
              value={hotel}
              onChange={(e) => setHotel(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            >
              {hotels.map((h) => (
                <MenuItem key={h} value={h}>
                  {h}
                </MenuItem>
              ))}
            </TextField>

            {/* Start date & time */}
            <TextField
              label="Pradžios data ir laikas"
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            {/* End date & time */}
            <TextField
              label="Pabaigos data ir laikas"
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            {/* Description */}
            <TextField
              label="Renginio aprašymas"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            {/* Submit button */}
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
              Sukurti Renginį
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}