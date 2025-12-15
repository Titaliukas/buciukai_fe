import axiosInstance from '../config/axiosConfig';

export interface AvailabilitySlotDTO {
  startDate: string; // ISO format YYYY-MM-DD
  endDate: string;   // ISO format YYYY-MM-DD
}

export interface ExclusionDTO {
  startDate: string; // ISO format YYYY-MM-DD
  endDate: string;   // ISO format YYYY-MM-DD
}

export interface AvailabilityUpsertRequest {
  availabilitySlots: AvailabilitySlotDTO[];
  exclusions: ExclusionDTO[];
}

export interface AvailabilityResponse {
  availabilitySlots: AvailabilitySlotDTO[];
  exclusions: ExclusionDTO[];
}

/**
 * Fetch existing availability slots and exclusions for a room
 */
export const getAvailability = async (roomId: number | string): Promise<AvailabilityResponse> => {
  const { data } = await axiosInstance.get<AvailabilityResponse>(`/rooms/${roomId}/availability`);
  return data;
};

/**
 * Create or update availability slots and exclusions for a room
 */
export const upsertAvailability = async (
  roomId: number | string,
  request: AvailabilityUpsertRequest
): Promise<AvailabilityResponse> => {
  const { data } = await axiosInstance.post<AvailabilityResponse>(
    `/rooms/${roomId}/availability`,
    request
  );
  return data;
};

export default { getAvailability, upsertAvailability };
