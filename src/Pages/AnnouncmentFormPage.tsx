import { useEffect, useState } from 'react';
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
import axiosInstance from '../config/axiosConfig';
import { CreateAnnouncementRequest, UserOption } from '../types/types';

export default function AnnouncementFormPage() {
  const [users, setUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CreateAnnouncementRequest>({
    type: 'NEWS',
    title: '',
    message: '',
    recipientUserIds: [],
    visibleUntil: '',
  });

  /* =========================
     Fetch users (ACTIVE only)
     ========================= */
  useEffect(() => {
    axiosInstance
      .get<UserOption[]>('/admin/users?status=ACTIVE')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to fetch users', err));
  }, []);

  /* =========================
     Handlers
     ========================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post('/admin/announcements', form);
      alert('✅ Pranešimas sukurtas');
      setForm({
        type: 'NEWS',
        title: '',
        message: '',
        recipientUserIds: [],
        visibleUntil: '',
      });
    } catch (err) {
      console.error(err);
      alert('❌ Nepavyko sukurti pranešimo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="sm">
          <Typography variant="h4" textAlign="center" mb={4}>
            Naujo Pranešimo Kūrimas
          </Typography>

          <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {/* Type */}
            <TextField
              select
              label="Pranešimo tipas"
              value={form.type}
              onChange={(e) =>
                setForm(prev => ({
                  ...prev,
                  type: e.target.value as 'NEWS' | 'INBOX',
                  recipientUserIds: [],
                }))
              }
              required
            >
              <MenuItem value="NEWS">Naujiena (visiems)</MenuItem>
              <MenuItem value="INBOX">Žinutė vartotojams</MenuItem>
            </TextField>

            {/* Title */}
            <TextField
              label="Pavadinimas"
              value={form.title}
              onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
              required
            />

            {/* Recipients */}
            {form.type === 'INBOX' && (
              <FormControl fullWidth>
                <InputLabel>Gavėjai</InputLabel>
                <Select
                  multiple
                  value={form.recipientUserIds}
                  onChange={(e) =>
                    setForm(prev => ({
                      ...prev,
                      recipientUserIds: e.target.value as string[],
                    }))
                  }
                  input={<OutlinedInput label="Gavėjai" />}
                  renderValue={(selected) =>
                    users
                      .filter(u => selected.includes(u.id))
                      .map(u => u.username)
                      .join(', ')
                  }
                >
                  {users.map(user => (
                    <MenuItem key={user.id} value={user.id}>
                      <Checkbox checked={form.recipientUserIds.includes(user.id)} />
                      <ListItemText
                        primary={user.username}
                        secondary={user.email}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {/* Message */}
            <TextField
              label="Tekstas"
              multiline
              rows={5}
              value={form.message}
              onChange={(e) => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
            />

            <TextField
  type="date"
  label="Rodyti iki"
  value={form.visibleUntil}
  InputLabelProps={{ shrink: true }}
  required
  onChange={(e) =>
    setForm(prev => ({
      ...prev,
      visibleUntil: e.target.value
    }))
  }
/>


            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Siunčiama...' : 'Sukurti pranešimą'}
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
