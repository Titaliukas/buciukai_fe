import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	color: 'black',
	border: '2px solid #3c5732ff',
	boxShadow: 24,
	p: 4,
	borderRadius: 2,
};

interface ConfirmModalProps {
	open: boolean;
	handleClose: () => void;
	onResult: (value: boolean) => void;
	title: string;
	description: string;
	cancelButton: string;
	confirmButton: string;
}

export default function ConfirmModal({
	open,
	handleClose,
	onResult,
	title,
	description,
	cancelButton,
	confirmButton,
}: ConfirmModalProps) {
	const handleConfirm = () => {
		onResult(true);
		handleClose();
	};

	const handleCancel = () => {
		onResult(false);
		handleClose();
	};

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			open={open}
			onClose={handleCancel}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
		>
			<Fade in={open}>
				<Box sx={style}>
					<Typography id='transition-modal-title' variant='h6' component='h2'>
						{title}
					</Typography>
					<Typography id='transition-modal-description' sx={{ mt: 2 }}>
						{description}
					</Typography>

					<Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
						<Button variant='contained' color='error' onClick={handleCancel}>
							{cancelButton}
						</Button>
						<Button variant='contained' onClick={handleConfirm} sx={{ bgcolor: '#54923D' }}>
							{confirmButton}
						</Button>
					</Box>
				</Box>
			</Fade>
		</Modal>
	);
}
