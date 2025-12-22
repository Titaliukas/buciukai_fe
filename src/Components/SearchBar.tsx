import { useMemo, useState } from 'react';
import {
	TextField,
	Button,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Collapse,
	Paper,
	Alert,
	FormControlLabel,
	Checkbox,
} from '@mui/material';
import type { HotelSearchFilters } from '../api/hotelApi';

type Props = {
	onSearch: (filters: HotelSearchFilters) => void;
	onReset?: () => void;
};

export default function SearchBar({ onSearch, onReset }: Props) {
	const [showOptions, setShowOptions] = useState(false);

	const [name, setName] = useState('');
	const [city, setCity] = useState('');

	const [priceFrom, setPriceFrom] = useState('');
	const [priceTo, setPriceTo] = useState('');
	const [starRating, setStarRating] = useState<number | ''>('');

	const [roomTypeId, setRoomTypeId] = useState<number | ''>('');
	const [bedTypeId, setBedTypeId] = useState<number | ''>('');
	const [sortBy, setSortBy] = useState<'name' | 'price'>('name');


	const [onlyAvailable, setOnlyAvailable] = useState(true);

	const [error, setError] = useState<string>('');

	const filters = useMemo<HotelSearchFilters>(() => {
		const pf = priceFrom.trim() === '' ? undefined : Number(priceFrom);
		const pt = priceTo.trim() === '' ? undefined : Number(priceTo);

		return {
			name: name.trim() || undefined,
			city: city.trim() || undefined,
			starRating: starRating === '' ? undefined : Number(starRating),
			priceFrom: pf !== undefined && Number.isFinite(pf) ? pf : undefined,
			priceTo: pt !== undefined && Number.isFinite(pt) ? pt : undefined,
			roomTypeId: roomTypeId === '' ? undefined : Number(roomTypeId),
			bedTypeId: bedTypeId === '' ? undefined : Number(bedTypeId),
			onlyAvailable,
			sortBy,
		};
	}, [name, city, starRating, priceFrom, priceTo, roomTypeId, bedTypeId, onlyAvailable, sortBy]);

	const validate = (f: HotelSearchFilters) => {
		if (f.priceFrom != null && f.priceFrom < 0) return 'Kaina nuo negali būti neigiama.';
		if (f.priceTo != null && f.priceTo < 0) return 'Kaina iki negali būti neigiama.';
		if (f.priceFrom != null && f.priceTo != null && f.priceFrom > f.priceTo) {
			return 'Kaina nuo negali būti didesnė nei kaina iki.';
		}
		if (f.starRating != null && (f.starRating < 1 || f.starRating > 5)) {
			return 'Žvaigždučių skaičius turi būti 1–5.';
		}
		return '';
	};

	const handleSearchClick = () => {
		setError('');
		const v = validate(filters);
		if (v) {
			setError(v);
			return;
		}
		onSearch(filters);
	};

	const handleReset = () => {
		setName('');
		setCity('');
		setPriceFrom('');
		setPriceTo('');
		setStarRating('');
		setRoomTypeId('');
		setBedTypeId('');
		setOnlyAvailable(true);
		setError('');
		onReset?.();
	};

	return (
		<Paper
			elevation={3}
			sx={{
				p: 3,
				mt: 2,
				backgroundColor: 'white',
				borderRadius: 2,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
				<TextField
					label='Viešbučio pavadinimas'
					variant='outlined'
					value={name}
					onChange={(e) => setName(e.target.value)}
					sx={{ flex: 1, minWidth: 240 }}
				/>

				<TextField
					label='Miestas'
					variant='outlined'
					value={city}
					onChange={(e) => setCity(e.target.value)}
					sx={{ flex: 1, minWidth: 200 }}
				/>

				<Button
					variant='contained'
					color='primary'
					sx={{
						textTransform: 'none',
						px: 4,
						backgroundColor: '#54923D',
						'&:hover': { backgroundColor: '#457f32' },
					}}
					onClick={handleSearchClick}
				>
					Ieškoti
				</Button>

				<Button
					variant='outlined'
					onClick={() => setShowOptions(!showOptions)}
					sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
				>
					Daugiau filtrų
				</Button>

				<Button
					variant='text'
					onClick={handleReset}
					sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
				>
					Išvalyti
				</Button>
			</Box>

			{error && (
				<Box sx={{ mt: 2 }}>
					<Alert severity='error'>{error}</Alert>
				</Box>
			)}

			<Collapse in={showOptions}>
				<Box
					sx={{
						mt: 3,
						p: 2,
						borderRadius: 2,
						border: '1px solid #ddd',
						backgroundColor: '#fafafa',
						display: 'flex',
						flexDirection: 'column',
						gap: 3,
					}}
				>
					<Typography variant='h6' sx={{ fontWeight: 'bold' }}>
						Filtrai
					</Typography>

					<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
						<FormControl sx={{ flex: 1, minWidth: 160 }}>
							<InputLabel>Žvaigždutės</InputLabel>
							<Select
								value={starRating}
								label='Žvaigždutės'
								onChange={(e) => setStarRating(e.target.value as any)}
								MenuProps={{ disableScrollLock: true }}
							>
								<MenuItem value=''>Visos</MenuItem>
								{[1, 2, 3, 4, 5].map((s) => (
									<MenuItem key={s} value={s}>{s}</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							label='Kaina nuo (€)'
							type='number'
							value={priceFrom}
							onChange={(e) => setPriceFrom(e.target.value)}
							sx={{ flex: 1, minWidth: 160 }}
						/>
						<TextField
							label='Kaina iki (€)'
							type='number'
							value={priceTo}
							onChange={(e) => setPriceTo(e.target.value)}
							sx={{ flex: 1, minWidth: 160 }}
						/>
					</Box>

					<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
						<FormControl sx={{ flex: 1, minWidth: 220 }}>
							<InputLabel>Kambario tipas</InputLabel>
							<Select
								value={roomTypeId}
								label='Kambario tipas'
								onChange={(e) => setRoomTypeId(e.target.value as any)}
								MenuProps={{ disableScrollLock: true }}
							>
								<MenuItem value=''>Visi</MenuItem>
								<MenuItem value={1}>Single</MenuItem>
								<MenuItem value={2}>Double</MenuItem>
								<MenuItem value={3}>Triple</MenuItem>
								<MenuItem value={4}>Suite</MenuItem>
								<MenuItem value={5}>Deluxe</MenuItem>
							</Select>
						</FormControl>

						<FormControl sx={{ flex: 1, minWidth: 220 }}>
							<InputLabel>Lovos tipas</InputLabel>
							<Select
								value={bedTypeId}
								label='Lovos tipas'
								onChange={(e) => setBedTypeId(e.target.value as any)}
								MenuProps={{ disableScrollLock: true }}
							>
								<MenuItem value=''>Visi</MenuItem>
								<MenuItem value={1}>Single</MenuItem>
								<MenuItem value={2}>Double</MenuItem>
								<MenuItem value={3}>King</MenuItem>
								<MenuItem value={4}>Bunk</MenuItem>
							</Select>
						</FormControl>

						<FormControl sx={{ flex: 1, minWidth: 220 }}>
							<InputLabel>Rikiuoti pagal</InputLabel>
							<Select
								value={sortBy}
								label='Rikiuoti pagal'
								onChange={(e) => setSortBy(e.target.value as 'name' | 'price')}
								MenuProps={{ disableScrollLock: true }}
							>
								<MenuItem value='name'>Pavadinimą (A–Z)</MenuItem>
								<MenuItem value='price'>Mažiausią kainą</MenuItem>
							</Select>
						</FormControl>

					</Box>

					<Box>
						<FormControlLabel
							control={
								<Checkbox
									checked={onlyAvailable}
									onChange={() => setOnlyAvailable((v) => !v)}
								/>
							}
							label='Rodyti tik laisvus kambarius'
						/>
					</Box>
				</Box>
			</Collapse>
		</Paper>
	);
}
