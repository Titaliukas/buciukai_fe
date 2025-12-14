import {
    Box,
    Container,
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
} from '@mui/material';
import NavBar from '../Components/NavBar';
import { ROUTES } from '../constants';
import { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosConfig';

const reportOptions = [
    { label: 'Sugeneruoti užimtumo ir pajamų ataskaitą', link: ROUTES.OccupancyIncomeReport },
    { label: 'Sugeneruoti dienos užimtumo ataskaitą', link: ROUTES.DailyOcupancyReport },
    { label: 'Sugeneruoti rezervacijų būsenos ataskaitą', link: ROUTES.ReservationStatusReport },
    { label: 'Sugeneruoti kliento apsistojimų istorijos ataskaitą', link: ROUTES.ClientHistoryReport },
];

interface Report {
    id: number;
    reportName: string;
    generationDate: string;
    periodStart: string;
    periodEnd: string | null;
    adminName: string;
}

export default function ReportSelectionPage() {
    const [reports, setReports] = useState<Report[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleNavigate = (link: string) => {
        window.location.href = link;
    };

    const fetchReports = async () => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get('/reports/list');
            setReports(response.data);
        } catch (error) {
            console.error('Failed to fetch reports:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('lt-LT');
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
                            mb: 8,
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
                                    onClick={() => handleNavigate(option.link)}
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

                    {/* Previously Generated Reports Section */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: '#333',
                            mb: 3,
                        }}
                    >
                        Anksčiau sugeneruotos ataskaitos
                    </Typography>

                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                            <CircularProgress sx={{ color: '#54923D' }} />
                        </Box>
                    ) : reports.length > 0 ? (
                        <TableContainer
                            component={Paper}
                            sx={{
                                borderRadius: 3,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                        >
                            <Table>
                                <TableHead sx={{ bgcolor: '#54923D' }}>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ataskaitos pavadinimas</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Generavimo data</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Periodo pradžia</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Periodo pabaiga</TableCell>
                                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Administratorius</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reports.map((report) => (
                                        <TableRow
                                            key={report.id}
                                            sx={{
                                                '&:nth-of-type(odd)': { bgcolor: '#fafafa' },
                                                '&:hover': { bgcolor: '#f0f0f0' },
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: 500 }}>{report.id}</TableCell>
                                            <TableCell>{report.reportName}</TableCell>
                                            <TableCell>{formatDate(report.generationDate)}</TableCell>
                                            <TableCell>{formatDate(report.periodStart)}</TableCell>
                                            <TableCell>{formatDate(report.periodEnd)}</TableCell>
                                            <TableCell>{report.adminName}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Paper
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                borderRadius: 3,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                        >
                            <Typography variant="h6" color="textSecondary">
                                Nėra anksčiau sugeneruotų ataskaitų
                            </Typography>
                        </Paper>
                    )}
                </Container>
            </Box>
        </>
    );
}