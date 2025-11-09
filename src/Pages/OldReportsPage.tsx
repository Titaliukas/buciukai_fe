import {
    Box,
    Container,
    Button,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import NavBar from '../Components/NavBar';
import { ROUTES } from '../constants';

const oldReports = [
    { title: '2023 m. užimtumo ataskaita', link: ROUTES.DailyOcupancyReport },
    { title: '2024 m. pajamų analizė', link: ROUTES.OccupancyIncomeReport },
    { title: 'Rezervacijų būsenos santrauka', link: ROUTES.ReservationStatusReport },
    { title: 'Klientų apsistojimų istorija', link: ROUTES.ClientHistoryReport },
];

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
                            mb: 4,
                        }}
                    >
                        Pasirinkti iš senų ataskaitų
                    </Typography>

                    <List sx={{ bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
                        {oldReports.map((report) => (
                            <ListItem key={report.title} disablePadding>
                                <ListItemButton
                                    onClick={() => (window.location.href = report.link)}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: '#f0f8f0',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={report.title}
                                        slotProps={{
                                            primary: {
                                                sx: {
                                                    fontWeight: 'medium',
                                                    fontSize: '1rem',
                                                    color: '#333',
                                                },
                                            },
                                        }}
                                    />


                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </Box>
        </>
    );
}
