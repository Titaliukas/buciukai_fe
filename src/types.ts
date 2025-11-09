export interface User {
	name: string;
	surname: string;
	birthdate: string;
	email: string;
	password: string;
}

export interface Announcement {
  announcementType: 'news' | 'inbox';
  recipients: string[];
  message: string;
}

export interface Event {
  hotel: string;
  startDate: string;
  endDate: string;   
  description: string;
}

export interface HotelDetails {
  name: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  starRating: number;
  description: string;
  totalRooms: number;
  pictures: File[];        
}

export interface RoomDetails {         
  hotel: string;
  roomNumber: string;
  type: string;
  price: number;
  floor: number;
  size: number;
  bedType: string;
  description: string;
  pictures: File[];
}