export const ROOMS = [
  {
    id: 'classic-1',
    type: 'room',
    name: 'Classic Deluxe Room',
    slug: 'classic-deluxe',
    price: 3500,
    capacity: 2,
    size: '320 sq ft',
    images: [
      '/images/room-1a.jpg',
      '/images/room-1b.jpg',
      '/images/room-1c.jpg',
    ],
    amenities: ['AC', 'Ceiling Fan', 'TV', 'Attached Bathroom', 'Work Desk', 'Room Service'],
    description: 'Warmly appointed with rich maroon and gold accents, the Classic Deluxe Room offers a spacious platform bed, elegant wall sconces, and an attached bathroom with modern fittings. Select rooms open to a private balcony overlooking our lush garden.',
    highlights: ['Platform king bed', 'Marble flooring', 'Wall sconces', 'Mirror alcove'],
    badge: 'Most Popular',
  },
  {
    id: 'classic-2',
    type: 'room',
    name: 'Classic Garden View',
    slug: 'classic-garden',
    price: 3000,
    capacity: 2,
    size: '300 sq ft',
    images: [
      '/images/room-2a.jpg',
      '/images/room-1c.jpg',  // shared bathroom (same room type)
    ],
    amenities: ['AC', 'Ceiling Fan', 'TV', 'Attached Bathroom', 'Work Desk'],
    description: 'Light-filled rooms facing our palm-lined garden corridor. French windows frame the greenery, bringing nature indoors while you unwind in comfort.',
    highlights: ['Garden-facing balcony', 'King or twin beds', 'Custom curtains'],
    badge: null,
  },
]

export const COTTAGES = [
  {
    id: 'cottage-1',
    type: 'cottage',
    name: 'Forest Cottage',
    slug: 'forest-cottage',
    price: 5500,
    capacity: 2,
    size: '450 sq ft',
    images: [
      '/images/cottage-1a.jpg',
      '/images/cottage-1b.jpg',
      '/images/cottage-1c.jpg',
      '/images/cottage-1d.jpg',
    ],
    amenities: ['AC', 'LED TV', 'Mini Fridge', 'Work Desk', 'Wardrobe', 'Private Porch', 'Premium Bathroom'],
    description: 'Step into your own corner of Goa\'s forest. Soaring pine A-frame ceilings, warm wooden walls, and sweeping marble floors make the Forest Cottage an unforgettable retreat. Each cottage has a private verandah with a rattan lounge chair and direct garden access.',
    highlights: ['A-frame pine ceiling', 'Private verandah', 'Floating vanity bathroom', 'Mini fridge + kettle'],
    badge: 'Premium',
  },
  {
    id: 'cottage-2',
    type: 'cottage',
    name: 'Pond View Cottage',
    slug: 'pond-view-cottage',
    price: 6000,
    capacity: 2,
    size: '480 sq ft',
    images: [
      '/images/cottage-2a.jpg',
      '/images/cottage-2b.jpg',
      '/images/cottage-1c.jpg',  // shared bathroom shot
      '/images/cottage-1d.jpg',  // shared porch shot
    ],
    amenities: ['AC', 'LED TV', 'Mini Fridge', 'Work Desk', 'Wardrobe', 'Private Porch', 'Premium Bathroom', 'Pond View'],
    description: 'Overlooking our serene lotus pond and the thatched gazebo, the Pond View Cottage pairs rustic wooden architecture with thoughtful luxury. Fall asleep to the sounds of Goa\'s night and wake up to shimmering water through your window.',
    highlights: ['Direct pond view', 'Gazebo access', 'A-frame ceiling', 'Large glass windows'],
    badge: 'Best View',
  },
]

export const ALL_UNITS = [...ROOMS, ...COTTAGES]

export const ADDONS = [
  { id: 'breakfast', label: 'Breakfast (per person)', price: 350, icon: '☕' },
  { id: 'dinner',    label: 'Dinner (per person)',    price: 550, icon: '🍽️' },
  { id: 'pickup',    label: 'Airport / Station Pickup', price: 800, icon: '🚗' },
  { id: 'drop',      label: 'Airport / Station Drop',   price: 800, icon: '🚗' },
  { id: 'extra-bed', label: 'Extra Bed',               price: 700, icon: '🛏️' },
]

export const AMENITIES = [
  { icon: '🌿', title: 'Lotus Pond & Gazebo' },
  { icon: '🌳', title: 'Garden Walks' },
  { icon: '🍳', title: 'In-house Dining' },
  { icon: '🚗', title: 'Pickup & Drop' },
  { icon: '📶', title: 'Free Wi-Fi' },
  { icon: '❄️', title: 'Air Conditioning' },
  { icon: '🔒', title: '24/7 Security' },
  { icon: '🅿️', title: 'Free Parking' },
]

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma', location: 'Mumbai', rating: 5,
    text: 'The Forest Cottage was everything we hoped for. Pine ceilings, a private porch, and absolute silence — pure magic. We\'re already planning our next trip.',
    stay: 'Forest Cottage · 3 nights',
  },
  {
    name: 'Rahul & Anjali', location: 'Bengaluru', rating: 4.5,
    text: 'Woke up to a lotus pond view every morning. The staff was warm and the property is exactly like the photos — lush, peaceful, and beautiful.',
    stay: 'Pond View Cottage · 4 nights',
  },
  {
    name: 'Vikram Nair', location: 'Delhi', rating: 5,
    text: 'Finally found a place in Goa that\'s away from the chaos. The Classic Room was spotless and cosy. Great value for the experience.',
    stay: 'Classic Deluxe Room · 2 nights',
  },
]