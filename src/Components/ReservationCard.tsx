import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Reservation from "../types/Reservation";
import CloseIcon from "@mui/icons-material/Close";
import Status from "../enum/Status";
import InfoComponent from "./InfoComponent";

interface Props {
  reservation?: Reservation | null;
}

function formatDate(dateStr : string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ReservationCard({
  reservation = null,
}: Props) {
  const r =
    reservation ||
    ({
      id: "RES-20251108-001",
      hotelName: "Viešbutis 1",
      roomName: "Studio",
      checkIn: "2026-06-15",
      checkOut: "2026-06-18",
      priceTotal: 799.0,
      address: "Studentų g. 15, Kaunas, Lietuva",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=example",
      status: Status.Confirmed,
    });


    function onCancel() {}

  return (
    <Card sx={{ width: '100vh', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: 2, position: 'relative' }}>
      <IconButton
        aria-label={`Cancel reservation ${r.id}`}
        onClick={onCancel}
        size="small"
        sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'transparent', color: 'text.secondary', '&:hover': { bgcolor: 'rgba(0,0,0,0.06)' } }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <CardMedia
        component="img"
        sx={{ width: { xs: "100%", sm: 260 }, height: 180, objectFit: "cover" }}
        image={r.image}
        alt={`${r.hotelName} - ${r.roomName}`}
      />

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ pb: 1 }}>
          <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
            <Box>
              <Typography component="h3" variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36 }}>
                  <HotelIcon />
                </Avatar>
                <Box sx={{ ml: 1 }}>{r.hotelName}</Box>
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {r.roomName}
              </Typography>
            </Box>

              <Chip
             label={r.status}
             color={r.status === Status.Cancelled ? 'error' : 'success'}
             sx={{ mt: 2, transform: 'translateY(15px)' }}
              />
          </Stack>

          <Divider sx={{ my: 1.25 }} />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <InfoComponent icon={<CalendarTodayIcon fontSize="small" />} title="Atvykimas" text={formatDate(r.checkIn)} />
            <InfoComponent icon={<CalendarTodayIcon fontSize="small" />} title="Išvykimas" text={formatDate(r.checkOut)} />
            <InfoComponent icon={<LocationOnIcon fontSize="small" />} title="Adresas" text={r.address} />
          </Stack>

          <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant='caption' color='text.secondary'>
                Suma
              </Typography>
              <Typography variant='h6'>
                {r.priceTotal.toFixed(2)} €
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
