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
import { Event } from '../types'; 

export default function NewEventPage() {
  const [event, setEvent] = useState<Event>({
    hotel: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const hotels = ['Viešbutis 1', 'Viešbutis 2', 'Viešbutis 3'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(event);
    alert('🎉 Renginys sukurtas (placeholderis)');
  };

  const handleChange = (field: keyof Event, value: string) => {
    setEvent((prev) => ({ ...prev, [field]: value }));
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
            <TextField
              select
              label="Pasirinkite viešbutį"
              value={event.hotel}
              onChange={(e) => handleChange('hotel', e.target.value)}
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

            <TextField
              label="Pradžios data ir laikas"
              type="datetime-local"
              value={event.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Pabaigos data ir laikas"
              type="datetime-local"
              value={event.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            />

            <TextField
              label="Renginio aprašymas"
              multiline
              rows={4}
              value={event.description}
              onChange={(e) => handleChange('description', e.target.value)}
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
              Sukurti Renginį
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
