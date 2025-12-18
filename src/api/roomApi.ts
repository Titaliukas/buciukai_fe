 
import axiosInstance from '../config/axiosConfig';

// Use global axios instance configured in config/axiosConfig

export interface RoomDto {
  id: number;
  roomNumber: number;
  price: number;
  roomType: string;
  floorNumber: number;
  isAvailable: boolean;
  description: string;
  sizeM2: number;
  bedType: string;
  hotelId: number;
}

export const getRoomsByHotelId = async (hotelId: number | string): Promise<RoomDto[]> => {
  const { data } = await axiosInstance.get<RoomDto[]>(`/rooms/hotel/${hotelId}`);
  return data;
};

export const getRoomById = async (id: number | string): Promise<RoomDto> => {
  const { data } = await axiosInstance.get<RoomDto>(`/rooms/${id}`);
  return data;
};

export default axiosInstance;
