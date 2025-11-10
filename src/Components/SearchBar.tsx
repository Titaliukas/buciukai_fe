import { useState } from "react";
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
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@mui/material";

export default function SearchBar() {
	const [showOptions, setShowOptions] = useState(false);

	const [city, setCity] = useState("");
	const [guests, setGuests] = useState("");
	const [priceFrom, setPriceFrom] = useState("");
	const [priceTo, setPriceTo] = useState("");
	const [roomType, setRoomType] = useState("");
	const [bedType, setBedType] = useState("");
	const [sortBy, setSortBy] = useState("");
	const [amenities, setAmenities] = useState({
		wifi: false,
		parking: false,
		pool: false,
		gym: false,
		restaurant: false,
	});

	const handleAmenityChange = (name: keyof typeof amenities) => {
		setAmenities((prev) => ({ ...prev, [name]: !prev[name] }));
	};

	return (
		<Paper
			elevation={3}
			sx={{
				p: 3,
				mt: 2,
				backgroundColor: "white",
				borderRadius: 2,
			}}
		>
			{/* Pagrindinė paieškos eilutė */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					gap: 2,
					flexWrap: "wrap",
				}}
			>
				<TextField
					label="Miestas"
					variant="outlined"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					sx={{ flex: 1 }}
				/>

				<TextField
					label="Svečiai"
					variant="outlined"
					type="number"
					value={guests}
					onChange={(e) => setGuests(e.target.value)}
					sx={{ width: 140 }}
				/>

				<Button
					variant="contained"
					color="primary"
					sx={{
						textTransform: "none",
						px: 4,
						backgroundColor: "#54923D",
						"&:hover": { backgroundColor: "#457f32" },
					}}
					onClick={() => {
						console.log({
							city,
							guests,
							priceFrom,
							priceTo,
							roomType,
							bedType,
							sortBy,
							amenities,
						});
					}}
				>
					Ieškoti
				</Button>

				<Button
					variant="outlined"
					onClick={() => setShowOptions(!showOptions)}
					sx={{ textTransform: "none", whiteSpace: "nowrap" }}
				>
					Daugiau pasirinkimų
				</Button>
			</Box>

			{/* Papildomi pasirinkimai */}
			<Collapse in={showOptions}>
				<Box
					sx={{
						mt: 3,
						p: 2,
						borderRadius: 2,
						border: "1px solid #ddd",
						backgroundColor: "#fafafa",
						display: "flex",
						flexDirection: "column",
						gap: 3,
					}}
				>
					<Typography variant="h6" sx={{ fontWeight: "bold" }}>
						Papildomi pasirinkimai
					</Typography>

					{/* Kainų intervalas */}
					<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
						<TextField
							label="Kaina nuo (€)"
							type="number"
							value={priceFrom}
							onChange={(e) => setPriceFrom(e.target.value)}
							sx={{ flex: 1, minWidth: 120 }}
						/>
						<TextField
							label="Kaina iki (€)"
							type="number"
							value={priceTo}
							onChange={(e) => setPriceTo(e.target.value)}
							sx={{ flex: 1, minWidth: 120 }}
						/>
					</Box>


					{/* Kambario ir lovos tipai */}
					<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
						<FormControl sx={{ flex: 1, minWidth: 180 }}>
							<InputLabel>Kambario tipas</InputLabel>
							<Select
								value={roomType}
								label="Kambario tipas"
								onChange={(e) => setRoomType(e.target.value)}
							>
								<MenuItem value="Standartinis">Standartinis</MenuItem>
								<MenuItem value="Liukso">Liukso</MenuItem>
								<MenuItem value="Šeimyninis">Šeimyninis</MenuItem>
							</Select>
						</FormControl>

						<FormControl sx={{ flex: 1, minWidth: 180 }}>
							<InputLabel>Lovos tipas</InputLabel>
							<Select
								value={bedType}
								label="Lovos tipas"
								onChange={(e) => setBedType(e.target.value)}
							>
								<MenuItem value="Viengulė">Viengulė</MenuItem>
								<MenuItem value="Dvigulė">Dvigulė</MenuItem>
								<MenuItem value="Karališka">Karališka</MenuItem>
							</Select>
						</FormControl>
					</Box>

					{/* Rikiavimas */}
					<Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
						<FormControl sx={{ flex: 1, minWidth: 180 }}>
							<InputLabel>Rikiuoti pagal</InputLabel>
							<Select
								value={sortBy}
								label="Rikiuoti pagal"
								onChange={(e) => setSortBy(e.target.value)}
							>
								<MenuItem value="name">Abėcėlę</MenuItem>
								<MenuItem value="price">Kainą</MenuItem>
							</Select>
						</FormControl>
					</Box>

					{/* Patogumai */}
					<Box>
						<Typography variant="subtitle1" sx={{ mb: 1, textAlign: "center" }}>
							Patogumai
						</Typography>
						<FormGroup
							row
							sx={{
								flexWrap: "wrap",
								justifyContent: "center", // ← centruoja
								gap: 1.5,                 // ← tarpai tarp elementų
							}}
						>
							<FormControlLabel
								control={
									<Checkbox
										checked={amenities.wifi}
										onChange={() => handleAmenityChange("wifi")}
									/>
								}
								label="Wi-Fi"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={amenities.parking}
										onChange={() => handleAmenityChange("parking")}
									/>
								}
								label="Parkingas"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={amenities.pool}
										onChange={() => handleAmenityChange("pool")}
									/>
								}
								label="Baseinas"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={amenities.gym}
										onChange={() => handleAmenityChange("gym")}
									/>
								}
								label="Sporto salė"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={amenities.restaurant}
										onChange={() => handleAmenityChange("restaurant")}
									/>
								}
								label="Restoranas"
							/>
						</FormGroup>
					</Box>

				</Box>
			</Collapse>
		</Paper>
	);
}
