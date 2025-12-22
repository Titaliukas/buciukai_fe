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


export type HotelSearchFilters = {
  name?: string;
  city?: string;
  starRating?: number;
  priceFrom?: number;
  priceTo?: number;
  roomTypeId?: number; // 1..5
  bedTypeId?: number;  // 1..4
  onlyAvailable?: boolean; // default true
  sortBy?: 'name' | 'price';

};


export async function searchHotels(filters: HotelSearchFilters): Promise<Hotel[]> {
  const params: Record<string, string | number | boolean> = {};

  if (filters.name) params.name = filters.name;
  if (filters.city) params.city = filters.city;
  if (filters.starRating != null) params.starRating = filters.starRating;
  if (filters.priceFrom != null) params.priceFrom = filters.priceFrom;
  if (filters.priceTo != null) params.priceTo = filters.priceTo;
  if (filters.roomTypeId != null) params.roomTypeId = filters.roomTypeId;
  if (filters.bedTypeId != null) params.bedTypeId = filters.bedTypeId;
  if (filters.sortBy) params.sortBy = filters.sortBy;


  params.onlyAvailable = filters.onlyAvailable ?? true;

  const res = await axiosInstance.get<Hotel[]>('/hotels/search', { params });
  return res.data;
}

export default axiosInstance;
