type Room = {
  id: number | string;
  roomNumber?: number;
  price: number;
  roomType?: string;
  type?: string;
  floorNumber?: number;
  isAvailable?: boolean;
  description?: string;
  sizeM2?: number;
  bedType?: string;
  hotelId?: number;
}

export default Room;
