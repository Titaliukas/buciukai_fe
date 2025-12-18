import { useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import NavBar from '../Components/NavBar';
import axiosInstance from '../config/axiosConfig';

type SystemSettingsDto = {
  systemActive: boolean;
  registrationEnabled: boolean;
};

export default function SystemSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [systemActive, setSystemActive] = useState(true);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);

  const [isShutdownDialogOpen, setIsShutdownDialogOpen] = useState(false);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<SystemSettingsDto>('/admin/system');
      setSystemActive(res.data.systemActive);
      setRegistrationEnabled(res.data.registrationEnabled);
    } catch (e) {
      console.error(e);
      alert('Nepavyko gauti sistemos nustatymų (GET /admin/system)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const toggleRegistration = async () => {
    const next = !registrationEnabled;
    setSaving(true);
    try {
      await axiosInstance.patch(`/admin/system/registration?enabled=${next}`);
      setRegistrationEnabled(next);
    } catch (e) {
      console.error(e);
      alert('Nepavyko pakeisti registracijos nustatymo');
    } finally {
      setSaving(false);
    }
  };

  const confirmShutdown = async () => {
    setIsShutdownDialogOpen(false);

    const next = false; // shutdown => systemActive = false
    setSaving(true);
    try {
      await axiosInstance.patch(`/admin/system/active?active=${next}`);
      setSystemActive(next);
      alert('Sistema išjungta');
    } catch (e) {
      console.error(e);
      alert('Nepavyko išjungti sistemos');
    } finally {
      setSaving(false);
    }
  };

  const toggleSystemActive = async () => {
    // optional: allow turning system back on
    const next = !systemActive;
    setSaving(true);
    try {
      await axiosInstance.patch(`/admin/system/active?active=${next}`);
      setSystemActive(next);
    } catch (e) {
      console.error(e);
      alert('Nepavyko pakeisti sistemos aktyvumo');
    } finally {
      setSaving(false);
    }
  };

  const runBackup = async () => {
    setSaving(true);
    try {
      await axiosInstance.post('/admin/system/backup');
      alert('Backup paleistas');
    } catch (e) {
      console.error(e);
      alert('Nepavyko paleisti backup');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333', mb: 5 }}
          >
            Sistemos Nustatymai
          </Typography>

          <Paper sx={{ p: 4, borderRadius: 3, bgcolor: 'white' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {/* REGISTRATION */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Typography variant="h6">Leisti naujų vartotojų registraciją</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={registrationEnabled}
                        onChange={toggleRegistration}
                        disabled={saving}
                      />
                    }
                    label={registrationEnabled ? 'Įjungta' : 'Išjungta'}
                  />
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* BACKUP */}
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
                    sx={{ bgcolor: '#54923D', fontWeight: 'bold', textTransform: 'none' }}
                    disabled={saving}
                    onClick={runBackup}
                  >
                    Kurti
                  </Button>
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* SYSTEM ACTIVE */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <Typography variant="h6">Sistemos aktyvumas</Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={systemActive}
                        onChange={toggleSystemActive}
                        disabled={saving}
                      />
                    }
                    label={systemActive ? 'Aktyvi' : 'Išjungta'}
                  />
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* SHUTDOWN BUTTON */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="error">
                    Išjungti sistemą
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ fontWeight: 'bold', textTransform: 'none', borderRadius: 2 }}
                    disabled={saving}
                    onClick={() => setIsShutdownDialogOpen(true)}
                  >
                    Išjungti
                  </Button>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Button variant="outlined" onClick={loadSettings} disabled={saving}>
                    Atnaujinti (reload)
                  </Button>
                </Box>
              </>
            )}
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
          <Button color="error" variant="contained" onClick={confirmShutdown}>
            Patvirtinti išjungimą
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
