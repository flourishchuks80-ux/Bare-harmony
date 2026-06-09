import { Hotel } from './types';

export const HOTELS: Hotel[] = [
  {
    id: 'sorell-boutique',
    name: 'Sorell Boutique-Hotel St Peter Zürich',
    location: 'Zürich',
    city: 'Zürich',
    rating: 9.3,
    ratingLabel: 'Wonderful',
    reviewsCount: 1228,
    description: 'Sorell Boutique-Hotel St Peter Zürich has free bikes, fitness center, a garden and shared lounge in Zürich. This 4-star hotel offers room service...',
    longDescription: 'Sorell Boutique-Hotel St Peter Zürich provides clean-cut boutique charm in the historic heart of Zurich. Centered on pedestrian paths, guest rooms combine plush linen layers, warm oak details, and high-spec amenities. It features dynamic common zones, organic breakfast products, complimentary city bikes, and an advanced wellness gym. Guests enjoy direct proximity to Bahnhofstrasse and old-town landmarks.',
    stars: 4,
    basePrice: 693.82,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Free bikes', 'Fitness center', 'Garden', 'Shared lounge', 'Room service', 'Free Wi-Fi', 'Sustainable foods'],
    coordinates: { lat: 47.3712, lng: 8.5401 }
  },
  {
    id: 'st-josef',
    name: 'Hotel St. Josef',
    location: 'Zürich',
    city: 'Zürich',
    rating: 9.1,
    ratingLabel: 'Wonderful',
    reviewsCount: 2312,
    description: 'This 3-star hotel is just a 10-minute walk from Zurich Main Train Station. It features a restaurant and free in-room Wi-Fi. The Bahnhofstrasse...',
    longDescription: 'Located in Zurich-Niederdorf, the vibrant historic quarter, Hotel St. Josef provides standard Swiss hospitality and comfort. Every room comes with solid timber furniture, smart workspaces, and direct natural light. The internal garden-terrace restaurant serves fresh local trout and seasonal salads. Being just 10 minutes walking distance from Zurich Main Station, it is perfect for rail passengers and budget conscious travelers seeking premium Swiss quality.',
    stars: 3,
    basePrice: 399.17,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Restaurant', 'Terrace', 'Free Wi-Fi', 'Work desks', 'Family suites', 'Central position'],
    coordinates: { lat: 47.3756, lng: 8.5441 }
  },
  {
    id: 'schweizerhof',
    name: 'Hotel Schweizerhof Zürich',
    location: 'Zürich',
    city: 'Zürich',
    rating: 9.0,
    ratingLabel: 'Wonderful',
    reviewsCount: 1252,
    description: 'The Hotel Schweizerhof Zürich is located opposite the main station at the beginning of the Bahnhofstrasse and offers soundproofed rooms with...',
    longDescription: 'Directly facing Zurich Main Station at the gate of Bahnhofstrasse, the historic Hotel Schweizerhof Zürich is the pinnacle of grand continental hospitality. Guests benefit from soundproofed rooms fitted with electrically adjustable specialty beds, fine silk wallpapers, and deep marble bathrooms. It offers butler options, premium champagne cocktails, and complimentary access to nearby fitness clubs. Ideal for supreme luxury.',
    stars: 5,
    basePrice: 958.26,
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Prime location', 'Soundproofed quarters', 'Smart beds', 'Cocktail bar', 'Butler options', 'Marble bathtubs', 'Free Wi-Fi'],
    coordinates: { lat: 47.3773, lng: 8.5398 }
  },
  {
    id: 'b2-boutique',
    name: 'B2 Hotel Zürich',
    location: 'Zürich',
    city: 'Zürich',
    rating: 9.2,
    ratingLabel: 'Wonderful',
    reviewsCount: 936,
    description: 'Next to Zürich’s center, B2 Hotel Zürich provides stylish, air-conditioned rooms in a former brewery...',
    longDescription: 'B2 Hotel Zurich is a breathtaking architectural conversion of a former historic Swiss brewery. It is world-renowned for its Wine Library containing over 33,000 antique books, illuminated by beer-bottle chandeliers. Features stylish air-conditioned custom loft rooms with oak floors, designer chaise loungers, and access to the public thermal baths and spa rooftop pool on the Zurich hillside.',
    stars: 4,
    basePrice: 559.09,
    images: [
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1629832141316-4d7dec1e5f18?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Theme design', 'Rooftop hot spring', 'Antique library', 'Spa center', 'Air conditioning', 'Gourmet cellar', 'Free Wi-Fi'],
    coordinates: { lat: 47.3590, lng: 8.5273 }
  },
  {
    id: 'd-angleterre',
    name: 'Hotel d’Angleterre Geneva',
    location: 'Geneva',
    city: 'Geneva',
    rating: 9.5,
    ratingLabel: 'Exceptional',
    reviewsCount: 840,
    description: 'Boasting a prime location directly on Lake Geneva shore, this historic luxury hotel offers unique mountain views and fine dining...',
    longDescription: 'Framing Lake Geneva with custom art pieces and historic treasures, Hotel d’Angleterre is a boutique heritage hotel. Its legendary Windows Restaurant overlooking Mont Blanc serves bespoke traditional culinary menus. Each suite provides private butler service, heavy custom velvet accents, fine European luxury collectibles, and soundproofed security layouts for VIP delegates.',
    stars: 5,
    basePrice: 720.00,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1521783988139-89397d761dce?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Lake view', 'Butlers', 'Michelin-concept dining', 'Premium bar', 'Classic fireplaces', 'Pet friendly'],
    coordinates: { lat: 46.2104, lng: 6.1534 }
  },
  {
    id: 'shard-hotel',
    name: 'The Shard London Luxury Stay',
    location: 'London',
    city: 'London',
    rating: 9.6,
    ratingLabel: 'Exceptional',
    reviewsCount: 1945,
    description: 'Soaring high above London in the iconic Shard pinnacle, enjoy breath-taking panoramic views of the Thames and luxury suites...',
    longDescription: 'High above the bustling streets of London, Shangri-La at The Shard provides floor-to-ceiling glass views of the River Thames, London Eye, and St. Pauls Cathedral. Features a futuristic heated infinity pool on Level 52, customizable cloud-standard mattresses, and elite Chinese dining chambers. Experience the clouds in the heart of London.',
    stars: 5,
    basePrice: 910.00,
    images: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Panoramic view', 'Infinity sky pool', 'Thames perspective', 'Floor-to-ceiling glass', 'Espresso suites', 'Full spa'],
    coordinates: { lat: 51.5045, lng: -0.0865 }
  },
  {
    id: 'regina-paris',
    name: 'Hotel Regina Louvre Paris',
    location: 'Paris',
    city: 'Paris',
    rating: 9.2,
    ratingLabel: 'Wonderful',
    reviewsCount: 1680,
    description: 'Overlooking the Louvre museum and the Tuileries Gardens, experience quintessential 19th-century Parisian chic and history...',
    longDescription: 'Dating back to the 1900 World Expo, Hotel Regina Louvre sits directly opposite the Louvre Museum. It offers elegant high-ceiling rooms fitted with period furniture, pastel silk curtains, and gold-leaf mirrors. Many suites feature direct private balcony views of the Eiffel Tower. Enjoy legendary french croissants on the leafy private flowered terrace.',
    stars: 5,
    basePrice: 650.00,
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499856138030-7db4de285824?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Louvre museum views', 'Eiffel tower sights', 'Flowered patio', 'Art-nouveau salon', 'Classic fireplaces', 'Premium French wines'],
    coordinates: { lat: 48.8631, lng: 2.3314 }
  },
  {
    id: 'aparthotel-familie',
    name: 'Aparthotel Familie Hugenschmidt',
    location: 'Zürich',
    city: 'Zürich',
    rating: 9.5,
    ratingLabel: 'Exceptional',
    reviewsCount: 283,
    description: 'The family-run Aparthotel Familie Hugenschmidt is located in the charming Seefeld quarter of Zürich, just a 3-minute walk from the gree...',
    longDescription: 'The family-run Aparthotel Familie Hugenschmidt is located in the charming and quiet Seefeld quarter of Zürich, just a 3-minute walk from the green banks of Lake Zürich. Fusing comfort and flexibility, it features bright self-service apartment layouts, hardwood details, espresso stations, private garden access, and easy walking links to boutiques and lakeside pedestrian paths.',
    stars: 4,
    basePrice: 377.70,
    images: [
      'https://images.unsplash.com/photo-1549294413-26f195afcbce?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Free Wi-Fi', 'Garden access', 'Espresso machines', 'Lake proximity', 'Kitchenette', 'Quiet setting'],
    coordinates: { lat: 47.3575, lng: 8.5574 }
  },
  {
    id: 'park-hyatt-vienna',
    name: 'Park Hyatt Golden Quarter Vienna',
    location: 'Vienna',
    city: 'Vienna',
    rating: 9.4,
    ratingLabel: 'Wonderful',
    reviewsCount: 1105,
    description: 'Housed in a 100-year-old former bank building, this ultra-chic design resort is located in the exclusive Golden Quarter of Vienna...',
    longDescription: 'Housed inside the converted centenary headquarters of a former Austrian bank in the high-fashion Golden Quarter, Park Hyatt Vienna fuses historic architectural grandeur with contemporary Austrian minimalism. Dive into the subterranean swimming pool housed inside the form gold bullion vault, sip champagne under the stained glass ceiling, and enjoy close walking distances to St. Stephens Cathedral.',
    stars: 5,
    basePrice: 780.00,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Historic vault pool', 'Vault security features', 'Marble restrooms', 'Golden quarter shopping', 'Cocktail archive', 'Stained-glass lounge'],
    coordinates: { lat: 48.2101, lng: 16.3681 }
  },
  {
    id: 'catalonia-barcelona',
    name: 'Hotel Catalonia Barcelona Plaza',
    location: 'Barcelona',
    city: 'Barcelona',
    rating: 9.0,
    ratingLabel: 'Wonderful',
    reviewsCount: 1540,
    description: 'Featuring a seasonal rooftop pool and terrace with panoramic city views, this high-end design location overlooks Plaza España...',
    longDescription: 'Overlooking the majestic Plaza España in Barcelona, Hotel Catalonia Barcelona Plaza features curated modern design, a magnificent sun terrace, and an outdoor rooftop swimming pool with breathtaking 360-degree views of Montjuïc Castle. Guest quarters boast custom Spanish acoustic dampening, luxury rain showers, and immediate metro connection to the Gothic quarter.',
    stars: 4,
    basePrice: 200.00,
    images: [
      'https://images.unsplash.com/photo-1583422409516-2895a77efedd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['360 Rooftop Pool', 'Plaza views', 'Gourmet Tapas Bar', 'Solarium', 'Fitness center', 'Acoustic suite designs'],
    coordinates: { lat: 41.3752, lng: 2.1492 }
  },
  {
    id: 'gran-via-madrid',
    name: 'Gran Vía Palace Hotel Madrid',
    location: 'Madrid',
    city: 'Madrid',
    rating: 9.2,
    ratingLabel: 'Wonderful',
    reviewsCount: 1120,
    description: 'Set in a stunning classicist building on the bustling Gran Vía avenue in the heart of Madrid, offering a royal Spanish experience...',
    longDescription: 'Perfectly centered on Madrids vibrant Gran Vía high-fashion street, the Gran Vía Palace Hotel is a restored monumental palace fusing grand neoclassical style with modern high-tier luxury. Indulge in authentic Madrid gastronomy, enjoy plush velvet guest rooms, private balconies, and exceptional concierge services assisting with premium Flamenco tickets.',
    stars: 5,
    basePrice: 122.00,
    images: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Palatial interiors', 'Gran Vía views', 'Churros breakfast buffet', 'Private terraces', 'Personal butler options', 'Luxury wellness room'],
    coordinates: { lat: 40.4201, lng: -3.7035 }
  },
  {
    id: 'bosphorus-istanbul',
    name: 'Bosphorus Mansion & Spa Istanbul',
    location: 'Istanbul',
    city: 'Istanbul',
    rating: 9.4,
    ratingLabel: 'Wonderful',
    reviewsCount: 980,
    description: 'A gorgeous Ottoman-themed seafront boutique mansion on the scenic shore of the Bosphorus Strait in Ortaköy...',
    longDescription: 'Bosphorus Mansion & Spa Istanbul is a carefully preserved Ottoman landmark situated directly on the shore of the beautiful Bosphorus Strait in the historical Ortaköy district. Experience breathtaking sunrise views of the Bosphorus Bridge, authentic Turkish hammam rituals, handcrafted walnut wood decor, and sunset yacht cruises departing from the private pier.',
    stars: 5,
    basePrice: 69.00,
    images: [
      'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Seafront lounge', 'Turkish Hammam', 'Bosphorus Bridge sights', 'Private yacht harbor', 'Handmade walnut details', 'Traditional tea garden'],
    coordinates: { lat: 41.0475, lng: 29.0274 }
  }
];

export const CITIES = ['Zürich', 'London', 'Paris', 'Geneva', 'Vienna', 'Barcelona', 'Madrid', 'Istanbul'];

export const ROOM_TYPES = [
  { name: 'Standard Comfort Room', addon: 0, description: 'Cozy room with queen-size bed, workstation, smart TV, and complimentary Swiss chocolates.' },
  { name: 'Deluxe Executive Suite', addon: 120, description: 'Spacious floorplan with king-size bed, deep marble bathtub, living space with espresso and mini-bar.' },
  { name: 'Presidential Panoramic Suite', addon: 350, description: 'Top-floor penthouse with panoramic private balcony, premium bedding, full dining zone, and master butler service.' }
];
