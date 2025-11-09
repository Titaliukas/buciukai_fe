import Status from "../enum/Status";

type Reservation = {
  id: string;
    hotelName: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    priceTotal: number;
    address: string;
    image: string;
    status: Status;
};

export default Reservation;