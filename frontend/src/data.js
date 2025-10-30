export const USERS = [
  { id: '01', name: 'Retsu', image: '/avatars/avatar01.jpg', placeCount: 3 },
  { id: '02', name: 'Zykken', image: '/avatars/avatar02.jpg', placeCount: 9 },
  { id: '03', name: 'Shadow', image: '/avatars/avatar03.jpg', placeCount: 7 },
  { id: '04', name: 'Amadeus', image: '/avatars/avatar04.jpg', placeCount: 1 },
  { id: '05', name: 'Emilia', image: '/avatars/avatar05.jpg', placeCount: 6 },
];

export const DUMMY_PLACES = [
  {
    id: 'p1',
    imageURL: 'https://images.unsplash.com/photo-1503264116251-35a269479413',
    title: 'Cozy Coffee House',
    description:
      'A small, warm café tucked away in the city center. Perfect for reading and people-watching.',
    address: '123 Main Street, Cairo, Egypt',
    creatorId: '01',
    coordinates: {
      lat: 30.0444,
      lng: 31.2357,
    },
  },
  {
    id: 'p2',
    imageURL: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    title: 'Mountain View Cabin',
    description:
      'A quiet wooden cabin overlooking the snow-capped peaks. Ideal for writers and hikers.',
    address: 'Highland Trail 7, Giza Plateau, Egypt',
    creatorId: '01',
    coordinates: {
      lat: 29.9792,
      lng: 31.1342,
    },
  },
  {
    id: 'p3',
    imageURL: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    title: 'Sunset Beach',
    description:
      'Golden sand and orange skies — this beach is made for long walks and salty breezes.',
    address: 'Blue Coast Road, Alexandria, Egypt',
    creatorId: '02',
    coordinates: {
      lat: 31.2001,
      lng: 29.9187,
    },
  },
  {
    id: 'p4',
    imageURL: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Urban Art Loft',
    description: 'An industrial-style apartment decorated with graffiti murals and neon lights.',
    address: '22 Nile Street, Downtown Cairo, Egypt',
    creatorId: '03',
    coordinates: {
      lat: 30.0561,
      lng: 31.2394,
    },
  },
  {
    id: 'p5',
    imageURL: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511',
    title: 'Ancient Oasis',
    description:
      'A calm spot surrounded by palms and desert dunes — rumored to have hidden springs.',
    address: 'Siwa Oasis, Western Desert, Egypt',
    creatorId: '04',
    coordinates: {
      lat: 29.2032,
      lng: 25.5194,
    },
  },
  {
    id: 'p6',
    imageURL: 'https://images.unsplash.com/photo-1486308510493-aa64833634ef',
    title: 'Tech Hub Workspace',
    description: 'A modern coworking space buzzing with startups, espresso machines, and ideas.',
    address: 'Innovation Park, Smart Village, Giza, Egypt',
    creatorId: '04',
    coordinates: {
      lat: 30.0733,
      lng: 31.0206,
    },
  },
];
