import { User as AuthUser } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../config/FirebaseConfig';
import { UserInfo } from '../types/UserInfo';
import axiosInstance from '../config/axiosConfig';

interface AuthContextType {
	user: AuthUser | null;
	userInfo: UserInfo | null;
	isLoading: boolean;
	setUserInfo?: (data: UserInfo) => void;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	userInfo: null,
	isLoading: true,
});

interface ProviderProps {
	children: ReactNode;
}

export const AuthContextProvider = ({ children }: ProviderProps) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
			setUser(firebaseUser);

			if (firebaseUser) {
				try {
					const path = '/users/profile';
					const res = await axiosInstance.get<UserInfo>(path);
					console.log(res.data);
					setUserInfo(res.data);
				} catch (error) {
					console.error('Failed to fetch user info:', error);
					setUserInfo(null);
				}
			} else {
				setUserInfo(null);
			}

			setIsLoading(false);
		});

		return unsubscribe;
	}, []);

	return <AuthContext.Provider value={{ user, userInfo, isLoading, setUserInfo }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
