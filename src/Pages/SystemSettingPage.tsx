import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Switch,
  Button,
  Divider,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import NavBar from '../Components/NavBar';

export default function SystemSettingsPage() {
  const [isRegistrationDisabled, setIsRegistrationDisabled] = useState(true);
  const [isShutdownDialogOpen, setIsShutdownDialogOpen] = useState(false);

  const handleShutdown = () => {
    setIsShutdownDialogOpen(false);
    alert(' System would shut down here (placeholderis)');
  };

  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#333',
              mb: 5,
            }}
          >
            Sistemos Nustatymai
          </Typography>

          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              bgcolor: 'white',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h6">Išjungti naujų vartotojų registraciją</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={isRegistrationDisabled}
                    onChange={() => setIsRegistrationDisabled(!isRegistrationDisabled)}
                  />
                }
                label={isRegistrationDisabled ? 'Įjungta' : 'Išjungta'}
              />
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h6">Kurti atsarginę kopiją</Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: '#54923D',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#437531' },
                }}
                onClick={() => alert('💾 Backup started (placeholder)')}
              >
                Kurti
              </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" color="error">
                Išjungti sistemą
              </Typography>
              <Button
                variant="contained"
                color="error"
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 2,
                }}
                onClick={() => setIsShutdownDialogOpen(true)}
              >
                Išjungti
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>

      <Dialog open={isShutdownDialogOpen} onClose={() => setIsShutdownDialogOpen(false)}>
        <DialogTitle>Patvirtinti sistemos išjungimą</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ar tikrai norite išjungti visą sistemą? Vartotojai praras prieigą, kol ji nebus įjungta iš naujo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsShutdownDialogOpen(false)}>Atšaukti</Button>
          <Button color="error" variant="contained" onClick={handleShutdown}>
            Patvirtinti išjungimą
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
