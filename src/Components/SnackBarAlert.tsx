import { Snackbar, Alert } from '@mui/material';

interface BaseSnackbarProps {
	open: boolean;
	message: string;
	onClose: () => void;
	duration?: number;
}

const BaseSnackbar = ({
	open,
	message,
	onClose,
	duration = 4000, // 4 seconds
	severity,
}: BaseSnackbarProps & { severity: 'success' | 'error' }) => {
	return (
		<Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
			<Alert onClose={onClose} severity={severity} variant='filled' sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
};

// Success Snackbar
export const SnackbarSuccess = (props: BaseSnackbarProps) => {
	return <BaseSnackbar {...props} severity='success' />;
};

// Error Snackbar
export const SnackbarError = (props: BaseSnackbarProps) => {
	return <BaseSnackbar {...props} severity='error' />;
};
