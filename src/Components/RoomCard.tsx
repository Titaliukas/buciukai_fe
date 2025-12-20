import {
  Box,
  Paper,
  Typography,
  IconButton,
  Chip,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Room from '../types/Room';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../context/userContext';

type Props = {
  room: Room;
};

export default function RoomCard({ room }: Props) {
  const navigate = useNavigate();
  const { isStaff } = useContext(UserContext);

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        mb: 3,
        cursor: 'pointer',
        border: '1px solid #e0e0e0',
        transition: 'all 0.25s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
        },
      }}
      onClick={() => navigate(`/rooms/${room.id}`, { state: { room } })}
    >
      {/* IMAGE */}
      <Box sx={{ position: 'relative' }}>
        <Box
          component="img"
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/b0/c1/4c/boutique-hotels.jpg?w=1200"
          alt={room.type}
          sx={{
            width: '100%',
            height: 220,
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* PRICE BADGE */}
        <Chip
          label={`${room.price} € už naktį`}
          sx={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            bgcolor: '#3A35DD',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 14,
            px: 1.5,
          }}
        />

        {/* EDIT BUTTON (staff-only) */}
        {isStaff && (
          <Tooltip title="Redaguoti laikus">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/rooms/${room.id}/reservation-times`);
              }}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                bgcolor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.7)',
                },
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* CONTENT */}
      <Box sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight="bold">
          {room.type}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Spauskite norėdami peržiūrėti kambario informaciją
        </Typography>
      </Box>
    </Paper>
  );
}
