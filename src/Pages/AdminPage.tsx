import { Box, Button, Container, Typography } from '@mui/material';
import NavBar from '../Components/NavBar';
import { ROUTES } from '../constants';

const adminOptions = [
  { label: 'Klientų Tvarkyklė', image: 'https://www.freeiconspng.com/uploads/blue-user-icon-32.jpg', link: ROUTES.ClientManagement },
  { label: 'Sistemos Nustatymai', image: 'https://i.fbcd.co/products/original/d525acef04a28c158abcc5c6b48b2fcde749d0bf68cba219b884455d11f45c04.jpg', link: ROUTES.SystemSetting },
  { label: 'Naujas Kambarys', image: 'https://media.istockphoto.com/id/1365898408/photo/santorini-window-view-with-flowers.jpg?s=612x612&w=0&k=20&c=uBh4Bi_iSCqziTQ461_gR1CAmx-Il1HxCgqfwipK8GI=', link: ROUTES.RoomCreation },
  { label: 'Naujas pranešimas', image: 'https://img.freepik.com/free-vector/illustrationn-megaphone-monochrome-style-isolated-white-background_1284-38767.jpg?semt=ais_hybrid&w=740&q=80', link: ROUTES.AnnouncementForm },
  { label: 'Naujas renginys', image: 'https://www.shutterstock.com/image-vector/night-party-banner-poster-colorful-600nw-2482368757.jpg', link: ROUTES.EventForm },
  { label: 'Naujas viešbutis', image: 'https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg', link: ROUTES.HotelCreation },
  { label: 'Ataskaitos', image: 'https://thumbs.dreamstime.com/b/yellow-file-folder-paper-document-cartoon-illustration-400000806.jpg', link: ROUTES.ReportSelection },
];

export default function AdminPage() {
  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 8 }}>
        <Container>

          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#333',
              mb: 6,
            }}
          >
            Administratoriaus Valdymo Skydelis
          </Typography>


          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            {adminOptions.map((option) => (
              <Box
                key={option.label}
                sx={{
                  flex: { xs: '1 1 100%', sm: '1 1 45%', md: '1 1 28%' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  bgcolor: 'white',
                  borderRadius: 3,
                  p: 4,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={option.image}
                  alt={option.label}
                  sx={{
                    width: 80,
                    height: 80,
                    objectFit: 'contain',
                    opacity: 0.8,
                    mb: 2,
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => (window.location.href = option.link)}
                  sx={{
                    bgcolor: '#54923D',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: 2,
                    py: 1.2,
                    fontSize: '1rem',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: '#437531',
                    },
                  }}
                >
                  {option.label}
                </Button>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}