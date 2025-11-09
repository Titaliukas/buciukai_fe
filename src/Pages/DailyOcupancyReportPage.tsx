import {
    Box,
    Container,
    Button,
    Typography,
} from '@mui/material';
import NavBar from '../Components/NavBar';
import { ROUTES } from '../constants';



export default function ReportSelectionPage() {
    return (
        <>
            <NavBar />
            <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 8 }}>
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => (window.location.href = ROUTES.ReportSelection)}
                            sx={{
                                borderColor: '#54923D',
                                color: '#54923D',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                py: 1,
                                px: 3,
                                fontSize: '0.95rem',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#f0f8f0',
                                    borderColor: '#437531',
                                    color: '#437531',
                                },
                            }}
                        >
                            Grįžti į ataskaitų pasirinkimo puslapį
                        </Button>
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#333',
                            mb: 6,
                        }}
                    >
                        Dienos užimtumo ataskaita
                    </Typography>
                </Container>
            </Box>
        </>
    );
}
