import { useState } from 'react';
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
} from '@mui/material';
import NavBar from '../Components/NavBar';

export default function ClientManagementPage() {
  const [search, setSearch] = useState('');

  const [users] = useState([
    { id: 1, name: 'Jonas', surname: 'Jonaitis', email: 'jonas@example.com', city: 'Vilnius', birthdate: '1990-05-12' },
    { id: 2, name: 'Ona', surname: 'Petrauskaitė', email: 'ona@example.com', city: 'Kaunas', birthdate: '1988-11-03' },
    { id: 3, name: 'Mantas', surname: 'Kairys', email: 'mantas@example.com', city: 'Klaipėda', birthdate: '1995-02-21' },
  ]);

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

          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#333',
              mb: 5,
            }}
          >
            Klientų Tvarkyklė
          </Typography>


          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Ieškoti pagal vardą, pavardę ar el. paštą..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                width: '100%',
                maxWidth: 400,
                bgcolor: 'white',
                borderRadius: 2,
                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              }}
            />
          </Box>


          <Paper
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Table>
              <TableHead sx={{ bgcolor: '#54923D' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Vardas</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Pavardė</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>El. paštas</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Miestas</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Gimimo data</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">
                    Veiksmai
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{
                      '&:hover': { bgcolor: '#f9f9f9' },
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.surname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>{user.birthdate}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        sx={{
                          mr: 1,
                          textTransform: 'none',
                          borderRadius: 2,
                          borderColor: '#d9534f',
                        }}
                      >
                        Blokuoti
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          mr: 1,
                          textTransform: 'none',
                          borderRadius: 2,
                          borderColor: '#f0ad4e',
                          color: '#f0ad4e',
                          '&:hover': { bgcolor: '#fff7e6' },
                        }}
                      >
                        Pakeisti slaptažodį
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: 'none',
                          borderRadius: 2,
                          borderColor: '#54923D',
                          color: '#54923D',
                          '&:hover': { bgcolor: '#edf7ed' },
                        }}
                      >
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
