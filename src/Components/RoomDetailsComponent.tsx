import { Box, Stack, Typography } from "@mui/material";

export default function Detail({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value?: string | number;
}) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box sx={{ color: '#3A35DD' }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight={500} color="text.primary">
          {value ?? '—'}
        </Typography>
      </Box>
    </Stack>
  );
}