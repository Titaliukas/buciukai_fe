import axios from 'axios';
import { auth } from './FirebaseConfig';

const API_BASE_URL = String(import.meta.env.VITE_API_BASE_URL);
const TIMEOUT = 2500; // 2,5 seconds

const instance = axios.create({
	baseURL: API_BASE_URL,
});

instance.interceptors.request.use(async (config) => {
	const user = auth.currentUser;
	if (user) {
		const token = await user.getIdToken();
		config.headers.Authorization = `Bearer ${token}`;
	} else {
		const token = localStorage.getItem('token'); 
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	}
	return config;
});

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 503) {
      window.location.href = '/system-off';
    }
    return Promise.reject(error);
  }
);
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.timeout = TIMEOUT;


export default instance;
