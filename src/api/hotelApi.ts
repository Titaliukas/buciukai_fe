import axiosInstance from '../config/axiosConfig';
import type Hotel from '../types/Hotel';

// Backend model fields are assumed; we map to FE Hotel type
type BackendHotel = {
  id: number | string;
  name: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  phoneNumber?: string;
  email?: string;
  starRating?: number;
  description?: string;
  totalRooms?: number;
  lowestPrice?: number;
};

const buildLocation = (h: BackendHotel): string | undefined => {
  const parts = [h.address, h.city, h.country].filter(Boolean) as string[];
  if (parts.length === 0) return undefined;
  const base = parts.join(', ');
  return base;
};

export const getHotels = async (): Promise<Hotel[]> => {
  const { data } = await axiosInstance.get<BackendHotel[]>('/hotels');
  return data.map(h => ({
    id: String(h.id),
    name: h.name,
    location: buildLocation(h),
    lowestPrice: h.lowestPrice,
  }));
};

export const getHotelById = async (id: number | string): Promise<Hotel> => {
  const { data } = await axiosInstance.get<BackendHotel>(`/hotels/${id}`);
  return {
    id: String(data.id),
    name: data.name,
    location: buildLocation(data),
    lowestPrice: data.lowestPrice,
  };
};

export default axiosInstance;
