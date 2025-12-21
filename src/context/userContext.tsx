import { createContext, ReactNode, useEffect, useState } from 'react';
import axiosInstance from '../config/axiosConfig';
import { auth } from '../config/FirebaseConfig';
import Roles from '../enum/Roles';
import type { UserInfo } from '../types/UserInfo';

interface UserContextType {
  userInfo: UserInfo | null;
  isLoading: boolean; // loading user profile
  isStaff: boolean;
  hasRole: (role: Roles) => boolean;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  userInfo: null,
  isLoading: true,
  isStaff: false,
  hasRole: () => false,
  refresh: async () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: ProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get<UserInfo>('/users/profile');
      setUserInfo(res.data);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setUserInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        await loadProfile();
      } else {
        setUserInfo(null);
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const hasRole = (role: Roles) => userInfo?.role === role;
  const isStaff = userInfo?.role === Roles.Staff;

  return (
    <UserContext.Provider value={{ userInfo, isLoading, isStaff, hasRole, refresh: loadProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
