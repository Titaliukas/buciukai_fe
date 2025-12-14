# Viešbučiu rezervavimo sistema

## Paleidimas

Pirmam kartui reikia paleisti `npm i`

Į buciukai_fe aplanką įkelti .env failą.

Kai jau esame viską instaliavę `npm run dev`

## BE kvietimas su axiosInstance

axiosConfig.ts faile nurodytas axios config, ten automatiškai į header nurodo autentifikacijos tokeną.

reikia importi axiosInstance (kartais reikia pačiam, nes normaliai neranda)

```
import axiosInstance from '../config/axiosConfig';
```

Mums reikia nurodyti kelią endpointo į kurį kreipiames ir jei reikia dar paduodam requestBody pagal situaciją.

tik path:

```
const path = '/users/profile';
const res = await axiosInstance.get<UserInfo>(path);
```

su requestBody:

```
await axiosInstance.patch(path, {
username,
name,
surname,
email,
phoneNumber,
birthdate,
city,
postalCode,
});
```

## Snackbar Allertai

yra SnackbarSuccess ir SnackbarError. Jie išmeta pranešimą kairėj apačioj kampe. Reikia nurodyti žinutę ir open = true.

Jei nori tam pačiame lange reikia daryti taip:

```
const [snackbarSuccessOpen, setSnackbarSuccessOpen] = useState(false);
const [snackbarSuccessMessage, setSnackbarSuccessMessage] = useState('');

<SnackbarSuccess
	open={snackbarSuccessOpen}
	message={snackbarSuccessMessage}
	onClose={() => setSnackbarSuccessOpen(false)}
/>
```

Jei norime pereiti į kitą langą ir ten rodyti pranešimą.

Pirmam lange nustatyti state:

```
navigate(ROUTES.HomePage, {
	state: { message: 'Prisijungimas sėkmingas!' },
});
```

Antram lange tikrinti ar yra nustatytas state:

```
// Show snackbar only once when arriving
	useEffect(() => {
		if (location.state?.message) {
			setSnackbarSuccessMessage(location.state.message);
			setSnackbarSuccessOpen(true);
			// Clear state so refresh doesn't show snackbar again
			window.history.replaceState({}, document.title);
		}
	}, [location.state]);
```
