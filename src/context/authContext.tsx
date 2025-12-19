import { User as AuthUser } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../config/FirebaseConfig';
import type { UserInfo } from '../types/UserInfo';
import axiosInstance from '../config/axiosConfig';

interface AuthContextType {
	user: AuthUser | null;
	userInfo: UserInfo | null;
	isLoading: boolean;
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
          const token = await firebaseUser.getIdToken();
          localStorage.setItem('token', token);

          const res = await axiosInstance.get<UserInfo>('/users/profile');
          setUserInfo(res.data);
        } catch (err) {
          console.error('Failed to load user profile', err);
          setUserInfo(null);
        }
      } else {
        setUserInfo(null);
      }
			setIsLoading(false);
		});

		return unsubscribe;
	}, []);

	return <AuthContext.Provider value={{ user, userInfo, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
