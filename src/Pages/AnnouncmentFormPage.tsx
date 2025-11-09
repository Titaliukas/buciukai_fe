import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from '@mui/material';
import NavBar from '../Components/NavBar';
import { Announcement } from '../types'; 

export default function AnnouncementFormPage() {
  const [announcement, setAnnouncement] = useState<Announcement>({
    announcementType: '' as 'news' | 'inbox',
    recipients: [],
    message: '',
  });

  // Placeholder user list
  const users = ['vartotojas1', 'vartotojas2', 'vartotojas3', 'vartotojas4'];

  // Handlers
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(announcement);
    alert('Pranešimas sėkmingai sukurtas (placeholderis)');
  };

  const handleTypeChange = (value: string) => {
    setAnnouncement((prev) => ({ ...prev, announcementType: value as 'news' | 'inbox' }));
  };

  const handleUserChange = (event: any) => {
    const { value } = event.target;
    setAnnouncement((prev) => ({
      ...prev,
      recipients: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const handleMessageChange = (value: string) => {
    setAnnouncement((prev) => ({ ...prev, message: value }));
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
            Naujo Pranešimo Kūrimas
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
            {/* Announcement Type */}
            <TextField
              select
              label="Pranešimo tipas"
              value={announcement.announcementType}
              onChange={(e) => handleTypeChange(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            >
              <MenuItem value="news">Naujiena (rodoma sistemoje)</MenuItem>
              <MenuItem value="inbox">Žinutė vartotojams</MenuItem>
            </TextField>

            {/* Conditional User Selection */}
            {announcement.announcementType === 'inbox' && (
              <FormControl fullWidth>
                <InputLabel>Pasirinkite vartotojus</InputLabel>
                <Select
                  multiple
                  value={announcement.recipients}
                  onChange={handleUserChange}
                  input={<OutlinedInput label="Pasirinkite vartotojus" />}
                  renderValue={(selected) => selected.join(', ')}
                  sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
                >
                  {users.map((user) => (
                    <MenuItem key={user} value={user}>
                      <Checkbox checked={announcement.recipients.includes(user)} />
                      <ListItemText primary={user} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Message Input */}
            <TextField
              label="Pranešimo tekstas"
              multiline
              rows={5}
              value={announcement.message}
              onChange={(e) => handleMessageChange(e.target.value)}
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
              Sukurti Pranešimą
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
