import { Box, Button, TextField } from '@mui/material';

export default function SearchBar() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				justifyContent: 'space-between',
				bgcolor: 'rgba(255,255,255,0.15)',
				borderRadius: 2,
				gap: 1,
				p: 1,
			}}
		>
			<TextField
				label='Vieta'
				variant='filled'
				fullWidth
				sx={{ bgcolor: '#eaeaea', borderRadius: 1, fontWeight: 'bold' }}
			/>
			<TextField
				label='Svečiai'
				variant='filled'
				fullWidth
				sx={{ bgcolor: '#eaeaea', borderRadius: 1, fontWeight: 'bold' }}
			/>
			<Button
				variant='contained'
				sx={{
					bgcolor: '#3A35DD',
					color: 'white',
					fontWeight: 'bold',
					borderRadius: 1,
					px: 3,
					'&:hover': { bgcolor: '#2e2abf' },

					flexShrink: 0,
				}}
			>
				Ieškoti
			</Button>
		</Box>
	);
}
