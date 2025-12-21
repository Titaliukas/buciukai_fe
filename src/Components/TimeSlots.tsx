import { useState, useEffect } from 'react';
import {
  Checkbox,
  IconButton,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
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
import { getAvailability, upsertAvailability, deleteAvailability, type AvailabilitySlotDTO } from '../api/availabilityApi';
import ConfirmModal from './ConfirmModal';

interface Props {
  roomId: string;
}

export default function TimeSlotsCalendar({ roomId }: Props) {
  const [month, setMonth] = useState(new Date());
  const [selected, setSelected] = useState(new Set<string>());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [insertConfirmOpen, setInsertConfirmOpen] = useState(false);

  // Fetch existing availability on mount
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setLoading(true);
        const data = await getAvailability(roomId);
        // Convert availability slots to selected dates
        const selectedDates = new Set<string>();
        data.availabilitySlots.forEach((slot) => {
          const start = new Date(slot.startDate);
          const end = new Date(slot.endDate);
          const current = new Date(start);
          while (current <= end) {
            selectedDates.add(format(current, 'yyyy-MM-dd'));
            current.setDate(current.getDate() + 1);
          }
        });
        setSelected(selectedDates);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch availability:', err);
        setError('Nepavyko užkrauti laiko duomenų.');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [roomId]);

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
    
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (allSelected) {
        // Deselect only current month's enabled days
        enabledKeys.forEach((k) => newSet.delete(k));
      } else {
        // Add current month's enabled days to existing selections
        enabledKeys.forEach((k) => newSet.add(k));
      }
      return newSet;
    });
  };

  const handleClear = async () => {
    try {
      setSaving(true);
      setError(null);
      await deleteAvailability(roomId);
      setSelected(new Set());
      setSuccessMessage('Laiko tvarkaraštis išvalytas!');
    } catch (err) {
      console.error('Failed to delete availability:', err);
      setError('Nepavyko ištrinti laiko tvarkaraščio.');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      // Convert selected dates to sorted array
      const sortedDates = Array.from(selected).sort();
      
      if (sortedDates.length === 0) {
        setError('Pasirinkite bent vieną dieną.');
        setSaving(false);
        return;
      }

      // Build continuous availability slots
      const availabilitySlots: AvailabilitySlotDTO[] = [];
      let currentStart = sortedDates[0];
      let currentEnd = sortedDates[0];

      for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(sortedDates[i - 1]);
        const currDate = new Date(sortedDates[i]);
        const dayDiff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

        if (dayDiff === 1) {
          // Continuous
          currentEnd = sortedDates[i];
        } else {
          // Gap found - save current slot
          availabilitySlots.push({
            startDate: currentStart,
            endDate: currentEnd,
          });
          currentStart = sortedDates[i];
          currentEnd = sortedDates[i];
        }
      }
      // Push the last slot
      availabilitySlots.push({
        startDate: currentStart,
        endDate: currentEnd,
      });

      // Build exclusions (gaps between slots)
      const exclusions: AvailabilitySlotDTO[] = [];
      for (let i = 0; i < availabilitySlots.length - 1; i++) {
        const currentSlotEnd = new Date(availabilitySlots[i].endDate);
        const nextSlotStart = new Date(availabilitySlots[i + 1].startDate);
        const exclusionStart = new Date(currentSlotEnd);
        exclusionStart.setDate(exclusionStart.getDate() + 1);
        const exclusionEnd = new Date(nextSlotStart);
        exclusionEnd.setDate(exclusionEnd.getDate() - 1);

        if (exclusionStart <= exclusionEnd) {
          exclusions.push({
            startDate: format(exclusionStart, 'yyyy-MM-dd'),
            endDate: format(exclusionEnd, 'yyyy-MM-dd'),
          });
        }
      }

      await upsertAvailability(roomId, { availabilitySlots, exclusions });
      setSuccessMessage('Laiko tvarkaraštis sėkmingai išsaugotas!');
    } catch (err) {
      console.error('Failed to save availability:', err);
      setError('Nepavyko išsaugoti laiko tvarkaraščio.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

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
          <Button variant="outlined" onClick={() => setDeleteConfirmOpen(true)} disabled={saving}>
            {saving ? 'Ištrinami laikai...' : 'Ištrinti laikus'}
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setInsertConfirmOpen(true)}
            disabled={saving || selected.size === 0}
          >
            {saving ? 'Įterpiama...' : 'Įterpti'}
          </Button>
        </Box>
      </Box>

      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {successMessage && (
        <Snackbar open={Boolean(successMessage)} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
          <Alert severity="success" onClose={() => setSuccessMessage(null)}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}

      <ConfirmModal
        open={deleteConfirmOpen}
        handleClose={() => setDeleteConfirmOpen(false)}
        onResult={(confirmed) => {
          if (confirmed) {
            handleClear();
          }
        }}
        title={'Patvirtinti trynimą'}
        description={'Ar tikrai norite ištrinti laiko tvarkaraštį?'}
        cancelButton={'Atšaukti'}
        confirmButton={'Patvirtinti'}
      />

      <ConfirmModal
        open={insertConfirmOpen}
        handleClose={() => setInsertConfirmOpen(false)}
        onResult={(confirmed) => {
          if (confirmed) {
            handleSave();
          }
        }}
        title={'Patvirtinti įterpimą'}
        description={'Ar tikrai norite išsaugoti pasirinktus laikus?'}
        cancelButton={'Atšaukti'}
        confirmButton={'Patvirtinti'}
      />
    </Box>
  );
}
