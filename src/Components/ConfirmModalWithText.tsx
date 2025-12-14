import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

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
	onResult: (confirmed: boolean, inputValue?: string) => void;
	title: string;
	description: string;
	cancelButton: string;
	confirmButton: string;
}

export default function ConfirmModalWithText({
	open,
	handleClose,
	onResult,
	title,
	description,
	cancelButton,
	confirmButton,
}: ConfirmModalProps) {
	const [input, SetInput] = useState('');

	const handleConfirm = () => {
		onResult(true, input);
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
					<Typography id='transition-modal-description' sx={{ mt: 2, pb: 2 }}>
						{description}
					</Typography>

					<TextField
						variant='outlined'
						fullWidth
						type='password'
						value={input}
						onChange={(e) => SetInput(e.target.value)}
						sx={{
							bgcolor: '#eaeaea',
							borderRadius: 1,
							fontWeight: 'bold',
						}}
					/>

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
