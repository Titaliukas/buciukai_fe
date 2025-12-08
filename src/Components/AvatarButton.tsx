import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import ConfirmModal from './ConfirmModal';
import { signOut } from 'firebase/auth';
import { auth } from '../config/FirebaseConfig';

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
	const handleLogOut = async () => {
		setAnchorEl(null);
		try {
			await signOut(auth);

			setIsLoggedin(false);
		} catch (error) {
			console.error('Logout failed:', error);
		}
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
						<MenuItem onClick={() => navigate(ROUTES.ReservationsPage)}>Mano rezervacijos</MenuItem>
						<MenuItem onClick={() => navigate(ROUTES.AdminPage)}>Administravimas</MenuItem>
						<Divider />
						<MenuItem onClick={handleOpenModal} sx={{ color: 'red' }}>
							Atsijungti
						</MenuItem>
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
						<MenuItem onClick={() => navigate(ROUTES.SignInPage)}>Prisijungti</MenuItem>
					</>
				)}
			</Menu>
		</>
	);
}
