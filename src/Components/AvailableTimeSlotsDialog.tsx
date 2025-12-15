import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isBefore, isAfter, parseISO } from 'date-fns';
import { lt } from 'date-fns/locale';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Room from '../types/Room';
import { getAvailability } from '../api/availabilityApi';
import { createReservation } from '../api/reservationApi';

interface Props {
  open: boolean;
  onClose: () => void;
  room: Room;
}

export default function AvailableTimeSlotsDialog({ open, onClose, room }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !room.id) return;
    
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const data = await getAvailability(room.id);
        const dates = new Set<string>();
        data.availabilitySlots.forEach((slot) => {
          const start = parseISO(slot.startDate);
          const end = parseISO(slot.endDate);
          const current = new Date(start);
          while (current <= end) {
            dates.add(format(current, 'yyyy-MM-dd'));
            current.setDate(current.getDate() + 1);
          }
        });
        setAvailableDates(dates);
      } catch (err) {
        console.error('Failed to fetch availability:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [open, room.id]);

  const startDate = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekStartForLabels = startOfWeek(new Date(), { locale: lt });

  // prevent navigating to a previous month that would be strictly before the current month
  const prevMonthStart = startOfMonth(addDays(startOfMonth(currentMonth), -1));
  const currentMonthStart = startOfMonth(new Date());
  const disablePrevNavigation = isBefore(prevMonthStart, currentMonthStart);

  const handleDayClick = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    if (isBefore(day, new Date()) || !availableDates.has(dateKey)) return; // disable past and unavailable
    
    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null });
    } else if (isAfter(day, range.start)) {
      // Check if all dates between start and end are available (no gaps)
      const startDate = new Date(range.start);
      const endDate = new Date(day);
      const current = new Date(startDate);
      let hasGap = false;
      
      while (current <= endDate) {
        const currentKey = format(current, 'yyyy-MM-dd');
        if (!availableDates.has(currentKey)) {
          hasGap = true;
          break;
        }
        current.setDate(current.getDate() + 1);
      }
      
      if (hasGap) {
        // Reset selection if there's a gap
        setRange({ start: day, end: null });
      } else {
        setRange({ ...range, end: day });
      }
    } else {
      setRange({ start: day, end: null });
    }
  };

  const handlePrevMonth = () => {
    if (disablePrevNavigation) return;
    setCurrentMonth(addDays(startOfMonth(currentMonth), -1));
  };
  const handleNextMonth = () => setCurrentMonth(addDays(endOfMonth(currentMonth), 1));

  const isInRange = (day: Date) => {
    if (!range.start || !range.end) return false;
    return !isBefore(day, range.start) && !isAfter(day, range.end);
  };

  const handleSave = async () => {
    if (!range.start || !room.id) return;

    try {
      setSaving(true);
      setError(null);

      // Use selected end date as checkOut, or start date if only one date selected
      const checkOutDate = range.end || range.start;

      await createReservation({
        roomId: typeof room.id === 'string' ? parseInt(room.id) : room.id,
        checkIn: format(range.start, 'yyyy-MM-dd'),
        checkOut: format(checkOutDate, 'yyyy-MM-dd'),
      });

      setSuccessMessage('Rezervacija sėkmingai sukurta!');
      setRange({ start: null, end: null });
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Failed to create reservation:', err);
      setError('Nepavyko sukurti rezervacijos. Bandykite dar kartą.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <IconButton onClick={handlePrevMonth} disabled={disablePrevNavigation} aria-label="Previous month"><ChevronLeftIcon /></IconButton>
        <Typography variant="h6">{format(currentMonth, 'MMMM yyyy', { locale: lt })}</Typography>
  <IconButton onClick={handleNextMonth}><ChevronRightIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} textAlign="center">
            {[...Array(7)].map((_, i) => (
              <Typography key={i} fontWeight="bold">{format(addDays(weekStartForLabels, i), 'EEE', { locale: lt })}</Typography>
            ))}
            {days.map((day) => {
              const dateKey = format(day, 'yyyy-MM-dd');
              const isAvailable = availableDates.has(dateKey);
              const isDisabled = !isSameMonth(day, currentMonth) || isBefore(day, new Date()) || !isAvailable;
              const selected =
                (range.start && format(range.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')) ||
                (range.end && format(range.end, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')) ||
                isInRange(day);

              return (
                <Box
                  key={day.toISOString()}
                  onClick={() => !isDisabled && handleDayClick(day)}
                  sx={{
                    p: 1.2,
                    borderRadius: 1,
                    bgcolor: selected ? '#3A35DD' : isDisabled ? '#f5f5f5' : 'transparent',
                    color: isDisabled ? '#bdbdbd' : selected ? 'white' : 'black',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    opacity: isDisabled ? 0.5 : 1,
                    '&:hover': !isDisabled ? { bgcolor: selected ? '#2e2abf' : '#e0e0ff' } : {},
                  }}
                >
                  {format(day, 'd', { locale: lt })}
                </Box>
              );
            })}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Atšaukti</Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSave} 
          disabled={!range.start || saving}
        >
          {saving ? 'Kuriama...' : 'Patvirtinti'}
        </Button>
      </DialogActions>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}
