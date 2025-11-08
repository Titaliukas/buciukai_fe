import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import ConfirmModal from './ConfirmModal';

export default function AvatarButton() {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isLoggedin, setIsLoggedin] = useState<boolean>(true);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogOut = () => {
		setAnchorEl(null);
		setTimeout(() => {
			setIsLoggedin(false);
		}, 200);
	};

	const [openModal, setOpenModal] = useState(false);
	const [confirmedModal, setConfirmedModal] = useState<boolean | null>(null);

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);

	const handleResultModal = (value: boolean) => {
		setConfirmedModal(value);
	};

	useEffect(() => {
		if (confirmedModal === true) {
			handleLogOut();
			setConfirmedModal(null);
		}
	}, [confirmedModal]);

	return (
		<>
			<IconButton
				onClick={handleClick}
				sx={{ p: 0, '&:focus': { outline: 'none' }, '&:focus-visible': { outline: 'none' } }}
			>
				<Avatar>
					<PersonIcon />
				</Avatar>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				disableScrollLock
				onClose={handleClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{isLoggedin ? (
					<>
						<MenuItem onClick={() => navigate(ROUTES.ProfilePage)}>Profilio nustatymai</MenuItem>
						<MenuItem onClick={handleClose}>Mano rezervacijos</MenuItem>
						<MenuItem onClick={handleClose}>Admin puslapis</MenuItem>
						<MenuItem onClick={handleOpenModal}>Atsijungti</MenuItem>
						<ConfirmModal
							open={openModal}
							handleClose={handleCloseModal}
							onResult={handleResultModal}
							title='Patvirtinimas'
							description='Ar tikrai norite atsijungti?'
							cancelButton='Ne'
							confirmButton='Taip, atsijungti'
						/>
					</>
				) : (
					<>
						<MenuItem onClick={handleClose}>Prisijungti</MenuItem>
					</>
				)}
			</Menu>
		</>
	);
}
