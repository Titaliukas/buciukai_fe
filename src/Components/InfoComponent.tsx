import { Box, Typography } from "@mui/material";

interface Props {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function InfoComponent({ icon, title, text }: Props) {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {icon}
      <Box>
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2">{text}</Typography>
      </Box>
    </Box>
  );
}

export default InfoComponent;