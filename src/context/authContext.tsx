import { User as AuthUser } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../config/FirebaseConfig';

interface AuthContextType {
	user: AuthUser | null;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoading: true,
});

interface AuthContextProviderProps {
	children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
			setUser(firebaseUser);
			setIsLoading(false);
		});
		return unsubscribe;
	}, []);

	return <AuthContext.Provider value={{ user, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
