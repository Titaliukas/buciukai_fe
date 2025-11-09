import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface PopupFormProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  formData: { name: string};
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PopupForm({
  open,
  title,
  onClose,
  onSubmit,
  formData,
  onChange,
}: PopupFormProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Informacija"
          type="text"
          fullWidth
          variant="standard"
          value={formData.name}
          onChange={onChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Informacija"
          type="text"
          fullWidth
          variant="standard"
          value={formData.name}
          onChange={onChange}
        />
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Informacija"
          type="text"
          fullWidth
          variant="standard"
          value={formData.name}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Atšaukti</Button>
        <Button onClick={onSubmit}>Generuoti ataskaitą</Button>
      </DialogActions>
    </Dialog>
  );
}
