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
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// A flexible, accessible MUI card for a hotel room reservation
// Default export is the ReservationCard component. Example usage at the bottom.

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
}) {
  // sensible default demo data if none provided
  const r =
    reservation ||
    ({
      id: "RES-20251108-001",
      hotelName: "Viešbutis 1",
      roomName: "Studio",
      checkIn: "2026-06-15",
      checkOut: "2026-06-18",
      priceTotal: 799.0,
      address: "12 Ocean Avenue, Palms Bay",
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&auto=format&fit=crop&ixlib=rb-4.0.3&s=example",
      status: "Confirmed",
    });

  return (
    <Card sx={{ maxWidth: 720, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
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

            <Chip label={r.status} color={r.status === "Cancelled" ? "error" : "success"} />
          </Stack>

          <Divider sx={{ my: 1.25 }} />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <CalendarTodayIcon fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Check-in
                </Typography>
                <Typography variant="body2">{formatDate(r.checkIn)}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <CalendarTodayIcon fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Check-out
                </Typography>
                <Typography variant="body2">{formatDate(r.checkOut)}</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <LocationOnIcon fontSize="small" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body2">{r.address}</Typography>
              </Box>
            </Box>
          </Stack>

          <Box sx={{ mt: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>

            <Box sx={{ textAlign: "right" }}>
              <Typography variant="caption" color="text.secondary">
                Total
              </Typography>
              <Typography variant="h6">
                €
                {r.priceTotal.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}