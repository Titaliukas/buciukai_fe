import axiosInstance from '../config/axiosConfig';

export interface CreateReservationRequest {
  roomId: number;
  checkIn: string; // ISO format: YYYY-MM-DD
  checkOut: string; // ISO format: YYYY-MM-DD
}

export interface MyReservationDto {
  id: string;
  hotelName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  priceTotal: number;
  address: string;
  status: string;
  image: string;
}

/**
 * Create a new reservation
 */
export const createReservation = async (
  request: CreateReservationRequest
): Promise<void> => {
  await axiosInstance.post('/reservations', request);
};

/**
 * Cancel a reservation by ID
 */
export const cancelReservation = async (id: number): Promise<void> => {
  await axiosInstance.patch(`/reservations/${id}/cancel`);
};

/**
 * Get current user's reservations
 */
export const getMyReservations = async (): Promise<MyReservationDto[]> => {
  const response = await axiosInstance.get<MyReservationDto[]>('/reservations/my');
  return response.data;
};

export default {
  createReservation,
  cancelReservation,
  getMyReservations,
};
