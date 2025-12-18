import { IconButton, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';

export default function InboxButton() {
  const [unread, setUnread] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get<number>('/inbox/unread-count')
      .then(res => setUnread(res.data))
      .catch(() => setUnread(0));
  }, []);

  return (
    <IconButton
      color="inherit"
      onClick={() => navigate('/inbox')}
      sx={{ mr: 1 }}
    >
      <Badge badgeContent={unread} color="error">
        <MailIcon />
      </Badge>
    </IconButton>
  );
}
