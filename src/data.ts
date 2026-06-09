import { Hotel } from './types';

export const HOTELS: Hotel[] = [
  // --- SPAIN HOTELS (10) ---
  {
    id: 'majestic-barcelona',
    name: 'Majestic Hotel & Spa Barcelona GL',
    location: 'Barcelona',
    city: 'Barcelona',
    rating: 9.2,
    ratingLabel: 'Wonderful',
    reviewsCount: 2450,
    description: 'A historic 100-year-old luxury icon in central Passeig de Gràcia. Features custom Spanish marble suites and Gaudi terrace views.',
    longDescription: 'Majestic Hotel & Spa Barcelona GL represents neoclassical master artistry at its peak since premiering in 1918. Standing proudly along the opulent Passeig de Gràcia avenue, this hotel provides curated art tours, elegant timber work interiors, full spa water circuits, and panoramic sunrise deck looks directly at Antoni Gaudi\'s Casa Batlló.',
    stars: 5,
    basePrice: 380.00,
    images: [
      '/assets/images/majestic_barcelona_1781024498943.png',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Rooftop Pool', 'Michelin Star Dining', 'Spa & Wellness', 'Luxury Suites', 'Passeig de Gràcia Views', 'Free Wi-Fi'],
    coordinates: { lat: 41.3925, lng: 2.1648 }
  },
  {
    id: 'alfonso-seville',
    name: 'Hotel Alfonso XIII, Seville',
    location: 'Seville',
    city: 'Seville',
    rating: 9.4,
    ratingLabel: 'Exceptional',
    reviewsCount: 1810,
    description: 'An iconic palatial estate combining Andalusian history with Moorish arches, next to Seville’s Alcázar.',
    longDescription: 'Commissioned by King Alfonso XIII for the 1929 Ibero-American Exposition, this palatial estate stands as Seville’s pinnacle landmark. Hand-painted ceramic tiles, sweeping orange-tree garden pathways, heavy iron lanterns, and dynamic master courtyards define a stay filled with royal Spanish history.',
    stars: 5,
    basePrice: 420.00,
    images: [
      '/assets/images/alfonso_xiii_1781023953287.png',
      'https://images.unsplash.com/photo-1555881400-7db40f66578a?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Moorish Courtyard', 'Outdoor Pool', 'Royal Gardens', 'Pillow bar', 'Tapas Conservatory', 'Valet Parking'],
    coordinates: { lat: 37.3808, lng: -5.9930 }
  },
  {
    id: 'ritz-madrid',
    name: 'Mandarin Oriental Ritz Madrid',
    location: 'Madrid',
    city: 'Madrid',
    rating: 9.7,
    ratingLabel: 'Exceptional',
    reviewsCount: 955,
    description: 'A Belle Époque luxury palace in Madrid\'s Golden Triangle, next to Prado and Retiro garden paths.',
    longDescription: 'First inaugurated by King Alfonso XIII in 1910, the majestic Mandarin Oriental Ritz Madrid stands as a grand monument of Belle Époque charm. Meticulously restored with stunning glass domes, and hosting a subterranean sanctuary of tranquility complete with heated pools, custom marble showers, and private butler service.',
    stars: 5,
    basePrice: 890.00,
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Belle Époque Palace', 'Vaulted Indoor Pool', 'Subterranean Spa', 'Prado District Walkway', 'Gourmet Lounge', 'Personal Concierge'],
    coordinates: { lat: 40.4158, lng: -3.6923 }
  },
  {
    id: 'onlyyou-madrid',
    name: 'Only YOU Boutique Hotel Madrid',
    location: 'Madrid',
    city: 'Madrid',
    rating: 9.1,
    ratingLabel: 'Wonderful',
    reviewsCount: 1612,
    description: 'Chic, award-winning designer hotel in the vibrant Chueca district, inside a renovated 19th-century palace.',
    longDescription: 'Award-winning interiors designed by Lázaro Rosa-Violán blend deep blues and pristine whites inside a fully custom-engineered 19th-century palace. Celebrated for its friendly 24-hour breakfast lounges, private library fireplace rooms, and bespoke memory foam mattresses.',
    stars: 4,
    basePrice: 220.00,
    images: [
      '/assets/images/only_you_madrid_1781024265061.png',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Lázaro Designer Rooms', '24h Breakfast Lounge', 'Craft Cocktail Club', 'Chueca District Walkway', 'Premium Espresso', 'Bespoke Beds'],
    coordinates: { lat: 40.4225, lng: -3.6975 }
  },
  {
    id: 'catalonia-ronda',
    name: 'Hotel Catalonia Ronda',
    location: 'Ronda',
    city: 'Ronda',
    rating: 9.3,
    ratingLabel: 'Wonderful',
    reviewsCount: 1420,
    description: 'Scenic hotel featuring a dramatic rooftop infinity pool directly looking over Ronda’s famous El Tajo gorge.',
    longDescription: 'Located directly opposite the historical Plaza de Toros, the Hotel Catalonia Ronda serves as a majestic architectural retreat in Malaga\'s cliffs. Guests can submerge in the rooftop infinity pool, sipping local Andalusian white wines while watching golden hour shadows sweep across the famous El Tajo canyon.',
    stars: 4,
    basePrice: 145.00,
    images: [
      'https://images.unsplash.com/photo-1512753360425-0f01450a8b9e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Infinity pool', 'Gorge View Deck', 'Historic Frontage', 'Local Tapas Cellar', 'Solarium Spa', 'Underground Parking'],
    coordinates: { lat: 36.7423, lng: -5.1666 }
  },
  {
    id: 'maria-cristina',
    name: 'Hotel Maria Cristina, San Sebastian',
    location: 'San Sebastian',
    city: 'San Sebastian',
    rating: 9.5,
    ratingLabel: 'Exceptional',
    reviewsCount: 1150,
    description: 'An elegant Belle Époque palace overlooking Urumea River, nestled next to Basque Michelin culinary spots.',
    longDescription: 'Enjoy supreme French-classic styling by the Basque coastline. For more than a century, Hotel Maria Cristina has hosted Hollywood legends. Offering private balconies, marble baths with soaking fixtures, organic bakeries, and immediate access to pintxos gourmet walking paths.',
    stars: 5,
    basePrice: 510.00,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['River & Sea Sights', 'Michelin Culinary Tours', 'Plush bedding', 'Art galleries', 'Cocktail conservatory', 'Custom butler options'],
    coordinates: { lat: 43.3228, lng: -1.9796 }
  },
  {
    id: 'auditorium-madrid',
    name: 'Madrid Marriott Auditorium Hotel',
    location: 'Madrid',
    city: 'Madrid',
    rating: 8.9,
    ratingLabel: 'Very Good',
    reviewsCount: 3950,
    description: 'Refined airport-hub retreat featuring incredible soundproofing, heated indoor pools, and gourmet dining.',
    longDescription: 'Providing a perfectly quiet buffer near the Madrid-Barajas airport, this design-forward transit property matches luxury and performance. Features double-insulated walls, dynamic key check-in, an extensive intercontinental buffet, and heated wellness pools.',
    stars: 4,
    basePrice: 115.00,
    images: [
      'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Airport shuttle', 'Heated Indoor Pool', 'Soundproofed Quarters', 'Gourmet Buffet', 'Atrium bar', 'Transit business lounge'],
    coordinates: { lat: 40.4485, lng: -3.5352 }
  },
  {
    id: 'w-barcelona',
    name: 'W Barcelona Resort',
    location: 'Barcelona',
    city: 'Barcelona',
    rating: 9.1,
    ratingLabel: 'Wonderful',
    reviewsCount: 4890,
    description: 'Iconic sail-like glass resort standing directly on the sandy shores of Barceloneta Beach.',
    longDescription: 'Designed by structural mastermind Ricardo Bofill, the sail-shaped W Barcelona rises above the Mediterranean coast. It represents premier lifestyle leisure, boasting floor-to-ceiling glass panel vistas, custom infinity beach club pools, and the electronic music ECLIPSE rooftop bar on the 26th floor.',
    stars: 5,
    basePrice: 450.00,
    images: [
      '/assets/images/w_barcelona_1781023902244.png',
      'https://images.unsplash.com/photo-1502005229762-fc1b2381f0db?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Beachfront access', 'Beach Club Infinity Pool', 'Rooftop Sky Lounge', 'Panoramic coastal view', 'Modern gym', 'Designer spa'],
    coordinates: { lat: 41.3683, lng: 2.1901 }
  },
  {
    id: 'nh-calderon',
    name: 'NH Collection Gran Hotel Calderon',
    location: 'Barcelona',
    city: 'Barcelona',
    rating: 9.0,
    ratingLabel: 'Wonderful',
    reviewsCount: 2150,
    description: 'Superb boutique stay in central Eixample, boasting a dazzling 360-degree rooftop view terrace.',
    longDescription: 'Live in the art-filled heart of Barcelona. NH Collection Calderon offers direct walks to Plaça de Catalunya, featuring modern high-contrast design, organic breakfast pastries, pillow menus, rain showers, and a pristine roof terrace with a pool.',
    stars: 4,
    basePrice: 195.00,
    images: [
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Rooftop Pool', '360° City view', 'Organic bakery', 'Central position', 'Ergonomic workspaces', 'Organic tea selection'],
    coordinates: { lat: 41.3888, lng: 2.1643 }
  },
  {
    id: 'iberostar-mallorca',
    name: 'Iberostar Selection Llaüt Palma',
    location: 'Mallorca',
    city: 'Mallorca',
    rating: 9.2,
    ratingLabel: 'Wonderful',
    reviewsCount: 1340,
    description: 'Mediterranean beachside oasis featuring pristine organic spa gardens and a rooftop fusion bar.',
    longDescription: 'Iberostar Selection Llaüt Palma blends pure Balearic coastal charm with high-tier ecological sustainability. Steps from Playa de Palma beach, it offers tranquil organic garden paths, Japanese-fusion rooftop culinary creations, and deep thermal circuit water spas.',
    stars: 5,
    basePrice: 280.00,
    images: [
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Ocean Panorama', 'Balearic Spa Circuit', 'Eco-friendly design', 'Sublime Lounge', 'Tropical gardens', 'Outdoor resort pools'],
    coordinates: { lat: 39.5165, lng: 2.7483 }
  },
 
  // --- AUSTRALIA HOTELS (10) ---
  {
    id: 'park-hyatt-sydney',
    name: 'Park Hyatt Sydney',
    location: 'Sydney',
    city: 'Sydney',
    rating: 9.8,
    ratingLabel: 'Exceptional',
    reviewsCount: 1680,
    description: 'Ultra-exclusive luxury sitting on Sydney Harbour directly opposite the Sydney Opera House.',
    longDescription: 'Positioned dynamically at the edge of Campbell\'s Cove, Park Hyatt Sydney delivers front-row viewing of the world\'s most famous harbor sails. Offers magnificent residential furnishings, hand-woven carpets, private glass balconies, dedicated butler vaults, and a heated rooftop pool looking directly at the Harbour Bridge.',
    stars: 5,
    basePrice: 920.00,
    images: [
      '/assets/images/park_hyatt_sydney_1781023936388.png',
      'https://images.unsplash.com/photo-1524820197278-540916411e20?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Opera House Overlooks', 'Heated Rooftop Pool', 'Bespoke Butler Service', 'Harbour Balconies', 'Spa Sanctuary', 'Historic Rocks walkway'],
    coordinates: { lat: -33.8553, lng: 151.2093 }
  },
  {
    id: 'langham-melbourne',
    name: 'The Langham Melbourne',
    location: 'Melbourne',
    city: 'Melbourne',
    rating: 9.3,
    ratingLabel: 'Wonderful',
    reviewsCount: 2280,
    description: 'Classic luxury along the Southbank riverbank promenade, famous for gold-leaf accents and high tea.',
    longDescription: 'Draped in timeless elegance on the Yarra River bank, The Langham Melbourne is a monument of grand hotel craftsmanship. Guests can scale the spiral marble staircases, swim under the glass-domed conservatory salt-water pool, or enjoy legendary English afternoon tea rituals.',
    stars: 5,
    basePrice: 290.00,
    images: [
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Yarra River Promenade', 'Gold-Leaf High Tea', 'Conservatory Pool', 'Luxury Marble Tubs', 'Melba Fine Dining', 'Day Spa'],
    coordinates: { lat: -37.8203, lng: 144.9654 }
  },
  {
    id: 'calile-brisbane',
    name: 'The Calile Hotel Brisbane',
    location: 'Brisbane',
    city: 'Brisbane',
    rating: 9.5,
    ratingLabel: 'Exceptional',
    reviewsCount: 1890,
    description: 'Breathtaking retro-modern design resort on James Street with marble textures and pool-cabanas.',
    longDescription: 'Heralded globally as Brisbane\'s premier architectural marvel, The Calile Hotel fuses warm minimalist clay and pastel-pink concrete. Standing around an exquisite central pool flanked by custom oak cabanas, it features top-tier Greek dining lanes and quiet leafy corridors.',
    stars: 5,
    basePrice: 340.00,
    images: [
      '/assets/images/calile_brisbane_1781023919791.png',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Pool Cabanas', 'James Street Boutiques', 'Hellenic Tavern', 'Pastel Architectural Design', 'Day Wellness Spa', 'Private balconies'],
    coordinates: { lat: -27.4578, lng: 153.0418 }
  },
  {
    id: 'qt-sydney',
    name: 'QT Sydney Design Stay',
    location: 'Sydney',
    city: 'Sydney',
    rating: 9.1,
    ratingLabel: 'Wonderful',
    reviewsCount: 1540,
    description: 'Gothic-meets-modern design wonderland located in the historic State Theatre building.',
    longDescription: 'Quirky color schemes, custom local bars, retro leather details, and pristine customer attention. QT Sydney mixes the original grand architecture of the State Theatre with futuristic luxury, located deep in Sydney’s shopping and theater precinct.',
    stars: 4,
    basePrice: 205.00,
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Art Deco Rooms', 'Teatro Bistro', 'Central CBD Access', 'Luxury Spa', 'Art Curator service', 'Bespoke Cocktail lounge'],
    coordinates: { lat: -33.8711, lng: 151.2081 }
  },
  {
    id: 'crown-towers-melbourne',
    name: 'Crown Towers Melbourne',
    location: 'Melbourne',
    city: 'Melbourne',
    rating: 9.4,
    ratingLabel: 'Wonderful',
    reviewsCount: 3120,
    description: 'Massive luxury high-rise resort boasting a spectacular indoor pool, overlooking Melbourne CBD.',
    longDescription: 'Pristinely rising above Melbourne\'s Yarra River, Crown Towers represents modern metropolitan architecture at its very finest. Features high-floor suites, custom crystal towers, an enormous thermal pool network, and direct links to Southbank shopping arcades.',
    stars: 5,
    basePrice: 480.00,
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['CBD Skyscraper vistas', 'Enormous Indoor Pool', 'Hydrothermal Spa', 'Gourmet Dining walk', 'Villa Butler Check-in', 'Private Sky Lounge'],
    coordinates: { lat: -37.8227, lng: 144.9598 }
  },
  {
    id: 'ovolo-sydney',
    name: 'Ovolo Woolloomooloo, Sydney',
    location: 'Sydney',
    city: 'Sydney',
    rating: 9.3,
    ratingLabel: 'Wonderful',
    reviewsCount: 1220,
    description: 'Charming maritime heritage stay in a stunningly restored dockside finger-wharf.',
    longDescription: 'Blending historic maritime industrial trusses with modern colorful pop art murals, Ovolo provides a fun waterfront stay on the Sydney Harbour. Features complimentary mini-bars, dynamic social happy hours, vintage board games, and superb waterfront dining lanes.',
    stars: 5,
    basePrice: 275.00,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Historic Finger Wharf', 'Complimentary Mini-bar', 'Plant-based eatery', 'Indoor heated lap pool', 'Daily social lounge Hour', 'Waterfront boardwalk'],
    coordinates: { lat: -33.8681, lng: 151.2215 }
  },
  {
    id: 'rydges-melbourne',
    name: 'Rydges Melbourne City Stay',
    location: 'Melbourne',
    city: 'Melbourne',
    rating: 8.8,
    ratingLabel: 'Very Good',
    reviewsCount: 1650,
    description: 'Refreshed modern design hotel in Melbourne CBD, featuring digital key entry and a sleek rooftop.',
    longDescription: 'Centrally located alongside Melbourne\'s vibrant theater precinct, the newly upgraded Rydges Melbourne offers interactive guest services. Dive into the fresh rooftop layout pool, order fine aged steaks at the Bossley restaurant, or control lights from your smartphone.',
    stars: 4,
    basePrice: 160.00,
    images: [
      'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Rooftop Swimming Pool', 'Bossley Grill Bar', 'Smart App Key Entry', 'Theater Precinct, CBD', 'Express check-out', 'High-speed Wi-Fi'],
    coordinates: { lat: -37.8118, lng: 144.9692 }
  },
  {
    id: 'yha-sydney',
    name: 'Sydney Harbour YHA & Hostel',
    location: 'Sydney',
    city: 'Sydney',
    rating: 8.7,
    ratingLabel: 'Very Good',
    reviewsCount: 2240,
    description: 'High-quality, budget-friendly boutique stay built directly on protected archaeological ruins in The Rocks.',
    longDescription: 'Providing cheap accommodation without compromising scenery, the Sydney Harbour YHA rests atop colonial archaeological sites in The Rocks. Boasts an outstanding rooftop terrace with breathtaking overlooks of the iconic Sydney Opera house.',
    stars: 3,
    basePrice: 79.00,
    images: [
      'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Archaeological Ruins museum', 'Opera House View Roof', 'Communal kitchen', 'Shared & private rooms', 'Underground bar', 'WiFi network'],
    coordinates: { lat: -33.8596, lng: 151.2069 }
  },
  {
    id: 'como-treasury-perth',
    name: 'COMO The Treasury, Perth',
    location: 'Perth',
    city: 'Perth',
    rating: 9.8,
    ratingLabel: 'Exceptional',
    reviewsCount: 540,
    description: 'Multi-award winning contemporary luxury retreat housed inside 19th-century State Buildings.',
    longDescription: 'Recognized as Perth\'s ultimate luxury destination, COMO The Treasury is a historical masterwork. Occupying high-vaulted buildings, it has private travertine marble bathrooms, therapeutic massage oils, and organic Western Australia local dining menus.',
    stars: 5,
    basePrice: 650.00,
    images: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Heritage Architecture', 'Holistic Shambhala Spa', 'Rooftop Wildflower dining', 'Deep soak baths', 'Indoor heated lap pool', 'Personal butler suite'],
    coordinates: { lat: -31.9547, lng: 115.8604 }
  },
  {
    id: 'ritz-perth',
    name: 'The Ritz-Carlton, Perth',
    location: 'Perth',
    city: 'Perth',
    rating: 9.4,
    ratingLabel: 'Wonderful',
    reviewsCount: 920,
    description: 'Splendid waterfront resort on Elizabeth Quay, featuring West Australian sandstone and infinity pools.',
    longDescription: 'Rising elegantly above the Swan River at Elizabeth Quay, The Ritz-Carlton Perth fuses high-rise modernity with rich regional history. Offers premium floor-to-ceiling glass panel rooms, thermal wellness therapies, and local fine wine tasting.',
    stars: 5,
    basePrice: 530.00,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Elizabeth Quay Sights', 'Swan River Infinity Pool', 'Sandstone day spa', 'West Australian dining', 'Champagne deck', 'Floor-to-ceiling windows'],
    coordinates: { lat: -31.9587, lng: 115.8592 }
  }
];

export const CITIES = [
  'Sydney', 'Melbourne', 'Brisbane', 'Perth',
  'Barcelona', 'Madrid', 'Seville', 'Ronda', 'San Sebastian', 'Mallorca'
];

export const ROOM_TYPES = [
  { name: 'Standard Comfort Room', addon: 0, description: 'Cozy boutique styling, premium local organic treat amenities, queen bed, and quiet working zone.' },
  { name: 'Deluxe Executive Suite', addon: 120, description: 'Spacious floorplan with king-size bed, deep marble bathtub, living space with espresso and mini-bar.' },
  { name: 'Presidential Panoramic Suite', addon: 350, description: 'Top-floor penthouse with panoramic private balcony, premium bedding, full dining zone, and master butler service.' }
];
