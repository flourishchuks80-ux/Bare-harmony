export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  rating: number;
  ratingLabel: string;
  reviewsCount: number;
  description: string;
  longDescription: string;
  stars: number;
  basePrice: number;
  images: string[];
  amenities: string[];
  coordinates: { lat: number; lng: number };
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  hotelCity: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  roomType: string;
  totalPrice: number;
  guestName: string;
  guestEmail: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}
