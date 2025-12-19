import { useEffect, useState, useContext } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  Container,
  TextField,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import NavBar from '../Components/NavBar';
import axiosInstance from '../config/axiosConfig';
import AuthContext from '../context/authContext';

interface AdminUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  city: string;
  birthdate: string;
  blocked: boolean;
  firebaseUid: string;
  role: 'CLIENT' | 'STAFF' | 'ADMIN';
}

export default function ClientManagementPage() {
  const { user, isLoading } = useContext(AuthContext);

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get<AdminUser[]>('/admin/users');
      setUsers(res.data);
    } catch {
      setError('Nepavyko gauti klientų');
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      fetchUsers();
    }
  }, [isLoading, user]);

  const toggleBlock = async (u: AdminUser) => {
    try {
      await axiosInstance.post(
        `/admin/users/${u.id}/${u.blocked ? 'unblock' : 'block'}`
      );
      fetchUsers();
    } catch {
      alert('Nepavyko pakeisti vartotojo būsenos');
    }
  };

  const changeEmail = async (u: AdminUser) => {
    const email = prompt('Įveskite naują el. paštą', u.email);
    if (!email) return;

    try {
      await axiosInstance.patch(`/admin/users/${u.id}/email`, { email });
      fetchUsers();
    } catch {
      alert('Nepavyko pakeisti el. pašto');
    }
  };

  const changePassword = async (u: AdminUser) => {
    const password = prompt('Įveskite naują slaptažodį');
    if (!password) return;

    try {
      await axiosInstance.patch(`/admin/users/${u.id}/password`, {
        password,
      });
      alert('Slaptažodis pakeistas');
    } catch {
      alert('Nepavyko pakeisti slaptažodžio');
    }
  };

  const changeRole = async (u: AdminUser, newRole: AdminUser['role']) => {
  if (u.role === newRole) return;


  const confirmed = window.confirm(
    `Ar tikrai norite pakeisti rolę į ${newRole}?`
  );
  if (!confirmed) return;

  try {
    await axiosInstance.patch(`/admin/users/${u.id}/role`, {
      role:
        newRole === 'CLIENT' ? 1 :
        newRole === 'STAFF' ? 2 :
        3,
    });

    fetchUsers();
  } catch {
    alert('Nepavyko pakeisti rolės');
  }
};


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.surname.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="lg">
          <Typography color='black' variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
            Klientų Tvarkyklė
          </Typography>

          <TextField
            placeholder="Ieškoti pagal vardą, pavardę ar el. paštą"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{ mb: 3, bgcolor: 'white' }}
          />

          {error && <Typography color="error">{error}</Typography>}

          <Paper>
            <Table>
              <TableHead sx={{ bgcolor: '#54923D' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Vardas</TableCell>
                  <TableCell sx={{ color: 'white' }}>Pavardė</TableCell>
                  <TableCell sx={{ color: 'white' }}>El. paštas</TableCell>
                  <TableCell sx={{ color: 'white' }}>Miestas</TableCell>
                  <TableCell sx={{ color: 'white' }}>Rolė</TableCell>
                  <TableCell sx={{ color: 'white' }}>Veiksmai</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.surname}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
  <TextField
    select
    size="small"
    value={u.role}
    onChange={(e) => {
      changeRole(u, e.target.value as 'CLIENT' | 'STAFF' | 'ADMIN');
    }}
    sx={{ minWidth: 120 }}
  >
    <MenuItem value="CLIENT">CLIENT</MenuItem>
    <MenuItem value="STAFF">STAFF</MenuItem>
    <MenuItem value="ADMIN">ADMIN</MenuItem>
  </TextField>
</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        size="small"
                        onClick={() => toggleBlock(u)}
                        sx={{ mr: 1 }}
                      >
                        {u.blocked ? 'Atblokuoti' : 'Blokuoti'}
                      </Button>

                      <Button
                        size="small"
                        onClick={() => changePassword(u)}
                        sx={{ mr: 1 }}
                      >
                        Pakeisti slaptažodį
                      </Button>

                      <Button size="small" onClick={() => changeEmail(u)}>
                        Pakeisti el. paštą
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
