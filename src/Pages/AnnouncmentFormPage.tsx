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

export default function AnnouncementFormPage() {
  const [announcementType, setAnnouncementType] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  // Placeholder user data
  const users = ['vartotojas1', 'vartotojas2', 'vartotojas3', 'vartotojas4'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert('Pranešimas sėkmingai sukurtas (placeholderis)');
  };

  const handleUserChange = (event: any) => {
    const { target: { value } } = event;
    setSelectedUsers(typeof value === 'string' ? value.split(',') : value);
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
              value={announcementType}
              onChange={(e) => setAnnouncementType(e.target.value)}
              fullWidth
              required
              sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
            >
              <MenuItem value="news">Naujiena (rodoma sistemoje)</MenuItem>
              <MenuItem value="inbox">Žinutė vartotojams</MenuItem>
            </TextField>

            {/* Conditional User Selection */}
            {announcementType === 'inbox' && (
              <FormControl fullWidth>
                <InputLabel>Pasirinkite vartotojus</InputLabel>
                <Select
                  multiple
                  value={selectedUsers}
                  onChange={handleUserChange}
                  input={<OutlinedInput label="Pasirinkite vartotojus" />}
                  renderValue={(selected) => selected.join(', ')}
                  sx={{ bgcolor: '#f9f9f9', borderRadius: 1 }}
                >
                  {users.map((user) => (
                    <MenuItem key={user} value={user}>
                      <Checkbox checked={selectedUsers.indexOf(user) > -1} />
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
