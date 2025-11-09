import React, { useState } from 'react';
import {
    Box,
    Container,
    Button,
    Typography,
} from '@mui/material';
import NavBar from '../Components/NavBar';
import { ROUTES } from '../constants';
import PopupForm from '../Components/ReportPopupForm';

const reportOptions = [
    { label: 'Sugeneruoti išsamią užimtumo ir pajamų ataskaitą', link: ROUTES.OccupancyIncomeReport },
    { label: 'Sugeneruoti dienos užimtumo ataskaitą', link: ROUTES.DailyOcupancyReport },
    { label: 'Sugeneruoti rezervacijų būsenos ataskaitą', link: ROUTES.ReservationStatusReport },
    { label: 'Sugeneruoti kliento apsistojimų istorijos ataskaitą', link: ROUTES.ClientHistoryReport },
];

export default function ReportSelectionPage() {
    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{ label: string; link: string } | null>(null);
    const [formData, setFormData] = useState({ name: '' });

    const handleOpenForm = (option: { label: string; link: string }) => {
        setSelectedOption(option);
        setOpen(true);
    };

    const handleCloseForm = () => {
        setOpen(false);
        setFormData({ name: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (selectedOption) {
            window.location.href = selectedOption.link;
        }
    };

    return (
        <>
            <NavBar />

            <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 8 }}>
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                        <Button
                            variant="outlined"
                            onClick={() => (window.location.href = ROUTES.AdminPage)}
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
                            Grįžti į administratoriaus skydelį
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
                        Kurti naują ataskaitą
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: 4,
                        }}
                    >
                        {reportOptions.map((option) => (
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
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => handleOpenForm(option)}
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

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            mt: 6,
                        }}
                    >
                        
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 2,
                            }}
                        >
                        <Button
                            variant="outlined"
                            onClick={() => (window.location.href = ROUTES.OldReports)}
                            sx={{
                                borderColor: '#54923D',
                                color: '#54923D',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                py: 1.2,
                                px: 4,
                                fontSize: '1rem',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#f0f8f0',
                                    borderColor: '#437531',
                                    color: '#437531',
                                },
                            }}
                        >
                            Žiūrėti seniau sukurtas ataskaitas
                        </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <PopupForm
                open={open}
                title={selectedOption?.label || ''}
                onClose={handleCloseForm}
                onSubmit={handleSubmit}
                formData={formData}
                onChange={handleChange}
            />
        </>
    );
}
