import { Box, Typography, Container } from '@mui/material';

export default function SystemOffPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f2f2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography color="red" variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Sistema laikinai nepasiekiama
        </Typography>

        <Typography textAlign="center" color="text.secondary">
          Sistema šiuo metu atjungta darbams. Prašome pabandyti vėliau.
        </Typography>
      </Container>
    </Box>
  );
}
