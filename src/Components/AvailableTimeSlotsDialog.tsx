import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isBefore, isAfter } from 'date-fns';
import { lt } from 'date-fns/locale';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Room from '../types/Room';

interface Props {
  open: boolean;
  onClose: () => void;
  room: Room;
}

export default function AvailableTimeSlotsDialog({ open, onClose }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });

  const startDate = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekStartForLabels = startOfWeek(new Date(), { locale: lt });

  // prevent navigating to a previous month that would be strictly before the current month
  const prevMonthStart = startOfMonth(addDays(startOfMonth(currentMonth), -1));
  const currentMonthStart = startOfMonth(new Date());
  const disablePrevNavigation = isBefore(prevMonthStart, currentMonthStart);

  const handleDayClick = (day: Date) => {
    if (isBefore(day, new Date())) return; // disable past
    if (!range.start || (range.start && range.end)) {
      setRange({ start: day, end: null });
    } else if (isAfter(day, range.start)) {
      setRange({ ...range, end: day });
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

  const handleSave = () => {
    console.log('Reserved range', range);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <IconButton onClick={handlePrevMonth} disabled={disablePrevNavigation} aria-label="Previous month"><ChevronLeftIcon /></IconButton>
        <Typography variant="h6">{format(currentMonth, 'MMMM yyyy', { locale: lt })}</Typography>
  <IconButton onClick={handleNextMonth}><ChevronRightIcon /></IconButton>
      </DialogTitle>
      <DialogContent>
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1} textAlign="center">
          {[...Array(7)].map((_, i) => (
            <Typography key={i} fontWeight="bold">{format(addDays(weekStartForLabels, i), 'EEE', { locale: lt })}</Typography>
          ))}
          {days.map((day) => {
            const isDisabled = !isSameMonth(day, currentMonth) || isBefore(day, new Date());
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
                  bgcolor: selected ? '#3A35DD' : 'transparent',
                  color: isDisabled ? 'gray' : selected ? 'white' : 'black',
                  cursor: isDisabled ? 'default' : 'pointer',
                  '&:hover': !isDisabled ? { bgcolor: selected ? '#2e2abf' : '#e0e0ff' } : {},
                }}
              >
                {format(day, 'd', { locale: lt })}
              </Box>
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Atšaukti</Button>
        <Button variant="contained" color="primary" onClick={handleSave} disabled={!range.start || !range.end}>
          Patvirtinti
        </Button>
      </DialogActions>
    </Dialog>
  );
}
