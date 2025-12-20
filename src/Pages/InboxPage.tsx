import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  CircularProgress,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DeleteIcon from '@mui/icons-material/Delete';
import NavBar from '../Components/NavBar';
import axiosInstance from '../config/axiosConfig';

/* ======================
   Types
   ====================== */
type InboxMessage = {
  inboxId: number;
  title: string;
  message: string;
  isRead: boolean;
  receivedAt: string;
};

export default function InboxPage() {
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [loading, setLoading] = useState(true);

  /* ======================
     Load inbox
     ====================== */
  const loadInbox = async () => {
    try {
      const res = await axiosInstance.get<InboxMessage[]>('/inbox');
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to load inbox', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInbox();
  }, []);

  /* ======================
     Actions
     ====================== */
  const markRead = async (inboxId: number) => {
    try {
      await axiosInstance.patch(`/inbox/${inboxId}/read`);
      setMessages(prev =>
        prev.map(m =>
          m.inboxId === inboxId ? { ...m, isRead: true } : m
        )
      );
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const deleteMessage = async (inboxId: number) => {
    try {
      await axiosInstance.delete(`/inbox/${inboxId}`);
      setMessages(prev => prev.filter(m => m.inboxId !== inboxId));
    } catch (err) {
      console.error('Failed to delete message', err);
    }
  };

  /* ======================
     UI states
     ====================== */
  if (loading) {
    return (
      <>
        <NavBar />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <Box sx={{ bgcolor: '#f2f2f2', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="md">
          <Typography color='black' variant="h4" mb={4}>
            📥 Mano pranešimai
          </Typography>

          {messages.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Jūs neturite pranešimų
              </Typography>
            </Paper>
          ) : (
            messages.map(msg => (
              <Paper
                key={msg.inboxId}
                sx={{
                  p: 3,
                  mb: 2,
                  bgcolor: msg.isRead ? 'white' : '#e8f5e9',
                  borderLeft: msg.isRead ? '4px solid transparent' : '4px solid #54923D',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: msg.isRead ? 'normal' : 'bold' }}
                    >
                      {msg.title}
                    </Typography>

                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {msg.message}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mt: 1 }}
                    >
                      {new Date(msg.receivedAt).toLocaleString()}
                    </Typography>
                  </Box>

                  <Box>
                    {!msg.isRead && (
                      <Tooltip title="Pažymėti kaip skaitytą">
                        <IconButton
                          onClick={() => markRead(msg.inboxId)}
                          color="success"
                        >
                          <MarkEmailReadIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    <Tooltip title="Ištrinti">
                      <IconButton
                        onClick={() => deleteMessage(msg.inboxId)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                <Divider sx={{ mt: 2 }} />
              </Paper>
            ))
          )}
        </Container>
      </Box>
    </>
  );
}
