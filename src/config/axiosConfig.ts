import axios from 'axios';
import { auth } from './FirebaseConfig';

const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL);
const TIMEOUT = 2500; // 2,5 seconds

const instance = axios.create({
	baseURL: API_BASE_URL,
});

const user = auth.currentUser;

if (!user) {
	throw new Error('User not authenticated');
}

instance.interceptors.request.use(async (config) => {
	config.headers.Authorization = 'Bearer ' + (await user.getIdToken());
	return config;
});
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.timeout = TIMEOUT;

export default instance;
