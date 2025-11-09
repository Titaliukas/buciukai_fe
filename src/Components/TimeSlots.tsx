import { useState } from 'react';
import {
  Checkbox,
  IconButton,
  Typography,
  Box,
  Paper,
  Button,
} from '@mui/material';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isBefore,
  addDays,
} from 'date-fns';
import { startOfDay } from 'date-fns';
import { lt } from 'date-fns/locale';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function TimeSlotsCalendar() {
  const [month, setMonth] = useState(new Date());
  const [selected, setSelected] = useState(new Set());

  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart, { locale: lt });
  const calendarEnd = endOfWeek(monthEnd, { locale: lt });
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  const currentMonthStart = startOfMonth(new Date());
  const isAtOrBeforeCurrentMonth = isBefore(monthStart, currentMonthStart) || isSameMonth(monthStart, currentMonthStart);
  const todayStart = startOfDay(new Date());

  const handlePrevMonth = () => {
    if (isAtOrBeforeCurrentMonth) return;
    setMonth((m) => subMonths(m, 1));
  };
  const handleNextMonth = () => setMonth((m) => addMonths(m, 1));

  const handleDayToggle = (dayKey: string) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dayKey)) newSet.delete(dayKey);
      else newSet.add(dayKey);
      return newSet;
    });
  };

  const handleSelectAll = () => {
    const enabledDays = days.filter((d) => isSameMonth(d, month) && !isBefore(startOfDay(d), todayStart));
    const enabledKeys = enabledDays.map((d) => format(d, 'yyyy-MM-dd'));
    const allSelected = enabledKeys.every((k) => selected.has(k));
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(enabledKeys));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handlePrevMonth} disabled={isAtOrBeforeCurrentMonth} aria-label="Previous month">
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h5" color='black'>{format(month, 'MMMM yyyy', { locale: lt })}</Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
          {[...Array(7)].map((_, i) => (
            <Box key={i}>
              <Typography align="center" variant="subtitle2" sx={{ fontWeight: 600 }}>
                {format(addDays(startOfWeek(new Date(), { locale: lt }), i), 'EEE', { locale: lt })}
              </Typography>
            </Box>
          ))}

          {days.map((day) => {
            const key = format(day, 'yyyy-MM-dd');
            const checked = selected.has(key);
            const inCurrentMonth = isSameMonth(day, month);
            const isPastDay = inCurrentMonth && isBefore(day, todayStart);
            const isOtherMonth = !inCurrentMonth;

            return (
              <Box key={key}>
                <Box
                  sx={{
                    textAlign: 'center',
                    borderRadius: 2,
                    p: 1,
                    opacity: isOtherMonth ? 0.35 : (isPastDay ? 0.6 : 1),
                    border: checked ? '2px solid #1976d2' : '1px solid #ddd',
                    bgcolor: checked ? 'action.selected' : 'background.paper',
                  }}
                >
                  <Typography variant="h6" sx={{ color:  'inherit' }}>{format(day, 'd', { locale: lt })}</Typography>
                  {isOtherMonth ? (
                    <Box sx={{ height: 40 }} />
                  ) : (
                    <Checkbox
                      checked={checked}
                      onChange={() => handleDayToggle(key)}
                      disabled={isPastDay}
                      sx={{ mt: 0.5 }}
                    />
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Paper>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button variant="text" onClick={handleSelectAll}>
          Pasirinkti viską
        </Button>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" onClick={() => setSelected(new Set())}>Išvalyti</Button>
          <Button variant="contained" color="primary" onClick={() => {}}>
            Išsaugoti
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
