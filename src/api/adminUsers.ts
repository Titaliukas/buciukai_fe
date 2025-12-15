import axiosInstance from '../config/axiosConfig';
import { AdminUser } from '../types/admin';

export const fetchClients = async () => {
  const res = await axiosInstance.get<AdminUser[]>('/admin/users');
  return res.data;
};

export const blockUser = async (userId: string) => {
  await axiosInstance.post(`/admin/users/${userId}/block`);
};

export const unblockUser = async (userId: string) => {
  await axiosInstance.post(`/admin/users/${userId}/unblock`);
};

export const changeUserEmail = async (userId: string, email: string) => {
  await axiosInstance.patch(`/admin/users/${userId}/email`, { email });
};

export const changeUserPassword = async (
  userId: string,
  password: string
) => {
  await axiosInstance.patch(`/admin/users/${userId}/password`, {
    password,
  });
};
