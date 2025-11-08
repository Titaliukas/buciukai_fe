import { AppBar, Container, Toolbar, Typography, Button, Box } from '@mui/material';
import AvatarButton from './AvatarButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

export default function NavBar() {
	const navigate = useNavigate();

	return (
		<AppBar position='sticky' sx={{ bgcolor: '#54923D' }}>
			<Container maxWidth='lg'>
				<Toolbar disableGutters sx={{ justifyContent: 'space-between', color: 'white', minHeight: 64 }}>
					<Typography
						variant='h5'
						sx={{ fontWeight: 'bold', cursor: 'pointer' }}
						onClick={() => navigate('/')}
						role='button'
					>
						Bučiukai
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Button color='inherit' variant='text' onClick={() => navigate(ROUTES.HomePage)}>
							Pradžia
						</Button>
					</Box>
					<AvatarButton />
				</Toolbar>
			</Container>
		</AppBar>
	);
}
