// Centralized Mock Data for SOUNDWOLVES
// This file serves as the single source of truth for all mock data

import { v4 as uuidv4 } from 'uuid';

// ============================================
// DJ DATA
// ============================================
export const djs = [
  {
    id: 1,
    name: 'DJ OM',
    tagline: 'Mixing Culture & Bass',
    specialty: 'Bollywood • EDM • Hip Hop',
    genres: ['Bollywood', 'EDM', 'Hip Hop'],
    image: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
    coverImage: 'https://images.unsplash.com/photo-1764510383709-14be6ec28548',
    followers: '25.3K',
    followersCount: 25300,
    upcomingShows: 15,
    verified: true,
    bio: 'NYC-based DJ OM is known for explosive Bollywood and EDM fusion sets that pack dance floors across the tri-state area. Regular performer at Brooklyn Bowl, Sony Hall, and major venues.',
    cities: ['New York', 'Brooklyn', 'Philadelphia'],
    socialMedia: {
      instagram: '@the.dj.om',
      instagramUrl: 'https://instagram.com/the.dj.om'
    },
    priceRange: '$3,800 - $7,500',
    rating: 4.9,
    totalBookings: 342,
    totalReviews: 156,
    musicSamples: [
      { id: 1, title: 'Bollywood Vibes Mix', duration: '3:45', plays: 12400 },
      { id: 2, title: 'EDM Fusion Set', duration: '5:20', plays: 8900 },
      { id: 3, title: 'Diwali Special 2024', duration: '4:15', plays: 15600 }
    ],
    availability: {
      '2025-02': [14, 15, 21, 22, 28],
      '2025-03': [7, 8, 14, 15, 21, 22, 28, 29],
      '2025-04': [4, 5, 11, 12, 18, 19, 25, 26]
    },
    reviews: [
      { id: 1, user: 'Priya S.', rating: 5, comment: 'Amazing energy! DJ OM kept the crowd dancing all night.', date: '2024-11-15' },
      { id: 2, user: 'Rahul M.', rating: 5, comment: 'Best Bollywood DJ in NYC hands down!', date: '2024-10-28' },
      { id: 3, user: 'Anita K.', rating: 4, comment: 'Great music selection and professional service.', date: '2024-10-12' }
    ]
  },
  {
    id: 2,
    name: 'DJ KYA',
    tagline: 'The Punjabi Powerhouse',
    specialty: 'Punjabi • Bhangra • Trap',
    genres: ['Punjabi', 'Bhangra', 'Trap'],
    image: 'https://images.unsplash.com/photo-1654031424664-e0e6174fbd26?crop=entropy&cs=srgb&fm=jpg&q=85',
    coverImage: 'https://images.unsplash.com/photo-1744314080490-ed41f6319475',
    followers: '18.7K',
    followersCount: 18700,
    upcomingShows: 12,
    verified: true,
    bio: 'DJ KYA brings high-energy Punjabi and bhangra beats to the tri-state nightlife scene. Known for explosive sets that blend traditional dhol with modern trap beats.',
    cities: ['New Jersey', 'Newark', 'New York'],
    socialMedia: {
      instagram: '@kyathedj',
      instagramUrl: 'https://instagram.com/kyathedj'
    },
    priceRange: '$3,200 - $6,800',
    rating: 4.9,
    totalBookings: 298,
    totalReviews: 134,
    musicSamples: [
      { id: 1, title: 'Bhangra Beats 2024', duration: '4:10', plays: 9800 },
      { id: 2, title: 'Punjabi Party Mix', duration: '6:00', plays: 11200 },
      { id: 3, title: 'Trap x Dhol Fusion', duration: '3:55', plays: 7600 }
    ],
    availability: {
      '2025-02': [7, 8, 14, 21, 22],
      '2025-03': [1, 7, 8, 14, 15, 21, 22, 28],
      '2025-04': [5, 11, 12, 18, 19, 26]
    },
    reviews: [
      { id: 1, user: 'Singh Family', rating: 5, comment: 'Made our wedding reception unforgettable!', date: '2024-11-20' },
      { id: 2, user: 'Manpreet D.', rating: 5, comment: 'The dhol drops are insane! Always a party.', date: '2024-11-05' },
      { id: 3, user: 'Jasmine K.', rating: 5, comment: 'Best Punjabi DJ in Jersey!', date: '2024-10-22' }
    ]
  },
  {
    id: 3,
    name: 'DJ PANDA',
    tagline: 'Side Quest Master',
    specialty: 'EDM • Bollywood • House',
    genres: ['EDM', 'Bollywood', 'House'],
    image: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
    coverImage: 'https://images.unsplash.com/photo-1763630054569-0e012e52616d',
    followers: '22.1K',
    followersCount: 22100,
    upcomingShows: 14,
    verified: true,
    bio: 'DJ PANDA specializes in progressive house and Bollywood remixes. Known for creating unique musical journeys that keep crowds moving all night. Featured at major festivals and premier nightclubs.',
    cities: ['New York', 'Philadelphia', 'Jersey City'],
    socialMedia: {
      instagram: '@sidequestpanda',
      instagramUrl: 'https://instagram.com/sidequestpanda'
    },
    priceRange: '$3,500 - $7,200',
    rating: 4.9,
    totalBookings: 315,
    totalReviews: 142,
    musicSamples: [
      { id: 1, title: 'House Journey Vol.3', duration: '5:30', plays: 13500 },
      { id: 2, title: 'Bollywood Remix Pack', duration: '4:45', plays: 10200 },
      { id: 3, title: 'Festival Vibes 2024', duration: '6:15', plays: 8400 }
    ],
    availability: {
      '2025-02': [1, 7, 8, 15, 21, 22, 28],
      '2025-03': [6, 7, 14, 15, 21, 28, 29],
      '2025-04': [4, 5, 12, 18, 19, 25, 26]
    },
    reviews: [
      { id: 1, user: 'Event Masters NYC', rating: 5, comment: 'Professional, punctual, and absolutely fire sets!', date: '2024-11-18' },
      { id: 2, user: 'Neha P.', rating: 5, comment: 'The house music transitions are seamless.', date: '2024-11-02' },
      { id: 3, user: 'Club XYZ', rating: 4, comment: 'Great crowd engagement and energy.', date: '2024-10-15' }
    ]
  }
];

// ============================================
// EVENTS DATA
// ============================================
export const events = [
  // 2025 Events
  {
    id: 1,
    title: "Valentine's Bollywood Bash",
    artist: 'DJ OM',
    artistId: 1,
    venue: 'Brooklyn Bowl',
    address: '61 Wythe Ave, Brooklyn, NY 11249',
    city: 'New York',
    date: 'Feb 14, 2025',
    dateISO: '2025-02-14T21:00:00',
    time: '9:00 PM',
    endTime: '2:00 AM',
    image: 'https://images.unsplash.com/photo-1744313930610-1649242d1fcd?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$85',
    priceNum: 85,
    vipPrice: '$175',
    vipPriceNum: 175,
    tags: ['VIP Tables', 'Couples Special', 'Limited'],
    attendees: 342,
    capacity: 500,
    trending: true,
    category: 'bollywood',
    description: "Celebrate love with the hottest Valentine's Day party in NYC! DJ OM brings his signature Bollywood x EDM fusion for an unforgettable night of romance and dance.",
    highlights: [
      'Live DJ Performance by DJ OM',
      'Couples Special Entry Package',
      'VIP Tables with Bottle Service',
      'Rose for Every Guest',
      'Complimentary Welcome Drink',
      'Professional Photography'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: ['Priya S.', 'Rahul M.', 'Anita K.'],
    ageRestriction: '21+'
  },
  {
    id: 2,
    title: 'Holi Color Festival 2025',
    artist: 'DJ KYA',
    artistId: 2,
    venue: 'The Wellmont Theater',
    address: '5 Seymour St, Montclair, NJ 07042',
    city: 'New Jersey',
    date: 'Mar 14, 2025',
    dateISO: '2025-03-14T18:00:00',
    time: '6:00 PM',
    endTime: '11:00 PM',
    image: 'https://images.unsplash.com/photo-1744314080490-ed41f6319475?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$65',
    priceNum: 65,
    vipPrice: '$140',
    vipPriceNum: 140,
    tags: ['Festival', 'All Ages', 'Food'],
    attendees: 589,
    capacity: 800,
    trending: true,
    category: 'special',
    description: 'The biggest Holi celebration in New Jersey! Join us for a colorful day of music, dance, food, and festivities with DJ KYA headlining.',
    highlights: [
      'Organic Color Powders',
      'DJ KYA Live Performance',
      'Food Truck Festival',
      'Family Friendly Zone',
      'Water Station',
      'Color Splash Countdown'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: ['Manpreet D.', 'Singh Family'],
    ageRestriction: 'All Ages'
  },
  {
    id: 3,
    title: 'Spring Punjabi Night',
    artist: 'DJ PANDA',
    artistId: 3,
    venue: 'Liberty Hall',
    address: '1085 John F Kennedy Blvd, Jersey City, NJ 07305',
    city: 'Jersey City',
    date: 'Apr 19, 2025',
    dateISO: '2025-04-19T22:00:00',
    time: '10:00 PM',
    endTime: '3:00 AM',
    image: 'https://images.unsplash.com/photo-1763630054569-0e012e52616d?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$55',
    priceNum: 55,
    vipPrice: '$125',
    vipPriceNum: 125,
    tags: ['Backstage Pass', 'VIP Bar'],
    attendees: 367,
    capacity: 450,
    trending: false,
    category: 'punjabi',
    description: 'Welcome spring with the hottest Punjabi beats! DJ PANDA brings his unique house x Bollywood fusion for an epic night out.',
    highlights: [
      'DJ PANDA Live Set',
      'Backstage Meet & Greet',
      'VIP Bar Access',
      'Spring Special Cocktails',
      'Late Night After Party'
    ],
    ticketLink: 'https://www.ticketmaster.com',
    friendsAttending: ['Neha P.'],
    ageRestriction: '21+'
  },
  {
    id: 4,
    title: 'Memorial Day Weekend Bash',
    artist: 'DJ OM & DJ KYA',
    artistId: 1,
    venue: 'Sony Hall',
    address: '235 W 46th St, New York, NY 10036',
    city: 'New York',
    date: 'May 24, 2025',
    dateISO: '2025-05-24T21:00:00',
    time: '9:00 PM',
    endTime: '3:00 AM',
    image: 'https://images.unsplash.com/photo-1643981693404-d76e58594bbf?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$80',
    priceNum: 80,
    vipPrice: '$165',
    vipPriceNum: 165,
    tags: ['Live Performance', 'VIP Tables'],
    attendees: 478,
    capacity: 600,
    trending: true,
    category: 'bollywood',
    description: 'Kick off summer with a bang! Two legendary DJs, one epic night. DJ OM and DJ KYA go back-to-back for Memorial Day Weekend.',
    highlights: [
      'DJ OM & DJ KYA B2B Set',
      'VIP Tables Available',
      'Summer Kickoff Party',
      'Photo Booth',
      'Complimentary Shots at Midnight'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: ['Priya S.', 'Rahul M.', 'Jasmine K.'],
    ageRestriction: '21+'
  },
  {
    id: 5,
    title: 'Summer Punjabi Nights',
    artist: 'DJ PANDA',
    artistId: 3,
    venue: 'Sony Hall',
    address: '235 W 46th St, New York, NY 10036',
    city: 'New York',
    date: 'Jun 21, 2025',
    dateISO: '2025-06-21T22:00:00',
    time: '10:00 PM',
    endTime: '4:00 AM',
    image: 'https://images.unsplash.com/photo-7715528/pexels-photo-7715528.jpeg',
    price: '$55',
    priceNum: 55,
    vipPrice: '$130',
    vipPriceNum: 130,
    tags: ['EDM', 'Open Bar'],
    attendees: 423,
    capacity: 550,
    trending: true,
    category: 'punjabi',
    description: 'Summer solstice celebration! The longest day deserves the longest party. DJ PANDA brings fire to the dance floor.',
    highlights: [
      'DJ PANDA Extended Set',
      '2-Hour Open Bar (9-11PM)',
      'Summer Themed Decor',
      'Rooftop Access',
      'After Party Until 4AM'
    ],
    ticketLink: 'https://www.ticketmaster.com',
    friendsAttending: ['Neha P.', 'Event Masters NYC'],
    ageRestriction: '21+'
  },
  {
    id: 6,
    title: 'Independence Day Desi Party',
    artist: 'DJ OM & DJ KYA',
    artistId: 1,
    venue: 'The Fillmore Philadelphia',
    address: '29 E Allen St, Philadelphia, PA 19123',
    city: 'Philadelphia',
    date: 'Jul 4, 2025',
    dateISO: '2025-07-04T20:00:00',
    time: '8:00 PM',
    endTime: '2:00 AM',
    image: 'https://images.unsplash.com/photo-1454321717968-d243ade71663?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$75',
    priceNum: 75,
    vipPrice: '$160',
    vipPriceNum: 160,
    tags: ['Festival', 'Food Trucks', 'All Ages'],
    attendees: 512,
    capacity: 700,
    trending: false,
    category: 'special',
    description: 'Celebrate Independence Day with desi style! Food trucks, fireworks views, and the best Bollywood x Punjabi music all night.',
    highlights: [
      'DJ OM & DJ KYA Headlining',
      'Food Truck Festival',
      'Fireworks Viewing Area',
      'Family Friendly Until 10PM',
      'Patriotic Photo Booth'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: ['Singh Family', 'Anita K.'],
    ageRestriction: 'All Ages (21+ after 10PM)'
  },
  {
    id: 7,
    title: 'Bollywood vs EDM Night',
    artist: 'DJ PANDA',
    artistId: 3,
    venue: 'PRYSM Nightclub',
    address: '18 Park Pl, Newark, NJ 07102',
    city: 'Newark',
    date: 'Aug 15, 2025',
    dateISO: '2025-08-15T23:00:00',
    time: '11:00 PM',
    endTime: '4:00 AM',
    image: 'https://images.unsplash.com/photo-1744313930610-1649242d1fcd?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$60',
    priceNum: 60,
    vipPrice: '$135',
    vipPriceNum: 135,
    tags: ['EDM', 'VIP Tables'],
    attendees: 398,
    capacity: 500,
    trending: false,
    category: 'edm',
    description: 'The ultimate battle! Bollywood classics vs modern EDM bangers. DJ PANDA drops the hottest mashups all night.',
    highlights: [
      'Bollywood vs EDM Battle',
      'DJ PANDA Live',
      'VIP Tables with Sparklers',
      'LED Light Show',
      'Guest DJ Appearances'
    ],
    ticketLink: 'https://www.ticketmaster.com',
    friendsAttending: [],
    ageRestriction: '21+'
  },
  {
    id: 8,
    title: 'Labor Day Weekend Celebration',
    artist: 'DJ OM',
    artistId: 1,
    venue: 'Brooklyn Bowl',
    address: '61 Wythe Ave, Brooklyn, NY 11249',
    city: 'New York',
    date: 'Aug 30, 2025',
    dateISO: '2025-08-30T21:00:00',
    time: '9:00 PM',
    endTime: '3:00 AM',
    image: 'https://images.unsplash.com/photo-1643981693404-d76e58594bbf?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$70',
    priceNum: 70,
    vipPrice: '$150',
    vipPriceNum: 150,
    tags: ['VIP Tables', 'After Party'],
    attendees: 445,
    capacity: 550,
    trending: true,
    category: 'bollywood',
    description: 'End summer with a bang! DJ OM brings the heat for the final summer party of the year.',
    highlights: [
      'DJ OM 4-Hour Set',
      'VIP Tables Available',
      'After Party Until 3AM',
      'Summer Send-Off Theme',
      'Photo Booth'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: ['Priya S.', 'Rahul M.'],
    ageRestriction: '21+'
  },
  {
    id: 9,
    title: 'Navratri Garba Nights',
    artist: 'DJ PANDA',
    artistId: 3,
    venue: 'Prudential Center',
    address: '25 Lafayette St, Newark, NJ 07102',
    city: 'Newark',
    date: 'Oct 3, 2025',
    dateISO: '2025-10-03T19:00:00',
    time: '7:00 PM',
    endTime: '1:00 AM',
    image: 'https://images.unsplash.com/photo-7715528/pexels-photo-7715528.jpeg',
    price: '$50',
    priceNum: 50,
    vipPrice: '$115',
    vipPriceNum: 115,
    tags: ['Traditional', 'All Ages', 'Food'],
    attendees: 782,
    capacity: 1200,
    trending: true,
    category: 'special',
    description: 'The biggest Navratri celebration in the tri-state! Traditional garba meets modern beats with DJ PANDA.',
    highlights: [
      'Traditional Garba Raas',
      'DJ PANDA Special Set',
      'Traditional Indian Food',
      'Dandiya Sticks Provided',
      'Traditional Attire Encouraged',
      'Family Friendly Event'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: ['Singh Family', 'Manpreet D.', 'Jasmine K.'],
    ageRestriction: 'All Ages'
  },
  {
    id: 10,
    title: 'Diwali Spectacular 2025',
    artist: 'DJ OM',
    artistId: 1,
    venue: 'Brooklyn Bowl',
    address: '61 Wythe Ave, Brooklyn, NY 11249',
    city: 'New York',
    date: 'Nov 1, 2025',
    dateISO: '2025-11-01T21:00:00',
    time: '9:00 PM',
    endTime: '3:00 AM',
    image: 'https://images.unsplash.com/photo-1454321717968-d243ade71663?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$90',
    priceNum: 90,
    vipPrice: '$185',
    vipPriceNum: 185,
    tags: ['VIP Tables', 'After Party', 'Exclusive'],
    attendees: 634,
    capacity: 750,
    trending: true,
    category: 'bollywood',
    description: 'The grandest Diwali celebration in NYC! DJ OM headlines this spectacular Festival of Lights party.',
    highlights: [
      'DJ OM Headlining',
      'Traditional Diwali Decor',
      'VIP Tables with Sparklers',
      'Complimentary Sweets',
      'Diya Lighting Ceremony',
      'After Party Until 3AM'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: ['Priya S.', 'Rahul M.', 'Anita K.', 'Neha P.'],
    ageRestriction: '21+'
  },
  {
    id: 11,
    title: 'Thanksgiving Bhangra Bash',
    artist: 'DJ KYA',
    artistId: 2,
    venue: 'The Fillmore Philadelphia',
    address: '29 E Allen St, Philadelphia, PA 19123',
    city: 'Philadelphia',
    date: 'Nov 27, 2025',
    dateISO: '2025-11-27T22:00:00',
    time: '10:00 PM',
    endTime: '3:00 AM',
    image: 'https://images.unsplash.com/photo-1744314080490-ed41f6319475?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$65',
    priceNum: 65,
    vipPrice: '$140',
    vipPriceNum: 140,
    tags: ['Bhangra', 'VIP Bar'],
    attendees: 523,
    capacity: 650,
    trending: false,
    category: 'punjabi',
    description: 'Burn off that Thanksgiving meal with non-stop bhangra! DJ KYA brings the energy post-turkey day.',
    highlights: [
      'DJ KYA Live Performance',
      'Bhangra Dance Competition',
      'VIP Bar Access',
      'Thanksgiving Late Night Party',
      'Best Dressed Contest'
    ],
    ticketLink: 'https://www.ticketmaster.com',
    friendsAttending: ['Manpreet D.'],
    ageRestriction: '21+'
  },
  {
    id: 12,
    title: 'New Year Eve Bash 2026',
    artist: 'DJ OM, DJ KYA & DJ PANDA',
    artistId: 1,
    venue: 'Prudential Center',
    address: '25 Lafayette St, Newark, NJ 07102',
    city: 'Newark',
    date: 'Dec 31, 2025',
    dateISO: '2025-12-31T20:00:00',
    time: '8:00 PM',
    endTime: '4:00 AM',
    image: 'https://images.unsplash.com/photo-1763630054569-0e012e52616d?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$200',
    priceNum: 200,
    vipPrice: '$450',
    vipPriceNum: 450,
    tags: ['VIP Tables', 'Champagne', 'Exclusive', 'Limited'],
    attendees: 892,
    capacity: 1500,
    trending: true,
    category: 'special',
    description: 'The biggest NYE celebration in the tri-state! All three legendary DJs together for one epic night.',
    highlights: [
      'DJ OM, DJ KYA & DJ PANDA',
      'Midnight Champagne Toast',
      'Ball Drop Live Stream',
      'VIP Tables with Bottles',
      '8 Hours of Non-Stop Music',
      'Premium Photo Booth',
      'Party Favors for All'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: ['Priya S.', 'Rahul M.', 'Anita K.', 'Manpreet D.', 'Neha P.', 'Jasmine K.'],
    ageRestriction: '21+'
  },
  // 2026 Events
  {
    id: 13,
    title: 'Winter Bollywood Night',
    artist: 'DJ OM',
    artistId: 1,
    venue: 'Sony Hall',
    address: '235 W 46th St, New York, NY 10036',
    city: 'New York',
    date: 'Jan 24, 2026',
    dateISO: '2026-01-24T21:00:00',
    time: '9:00 PM',
    endTime: '2:00 AM',
    image: 'https://images.unsplash.com/photo-1744313930610-1649242d1fcd?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$75',
    priceNum: 75,
    vipPrice: '$155',
    vipPriceNum: 155,
    tags: ['VIP Tables', 'Open Bar'],
    attendees: 412,
    capacity: 500,
    trending: false,
    category: 'bollywood',
    description: 'Beat the winter blues with the hottest Bollywood party! DJ OM brings the fire to warm up your January.',
    highlights: [
      'DJ OM Live Performance',
      'Winter Wonderland Theme',
      'VIP Tables Available',
      '2-Hour Open Bar',
      'Coat Check Included'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: [],
    ageRestriction: '21+'
  },
  {
    id: 14,
    title: "Valentine's Love Festival 2026",
    artist: 'DJ KYA',
    artistId: 2,
    venue: 'Brooklyn Bowl',
    address: '61 Wythe Ave, Brooklyn, NY 11249',
    city: 'New York',
    date: 'Feb 14, 2026',
    dateISO: '2026-02-14T21:00:00',
    time: '9:00 PM',
    endTime: '3:00 AM',
    image: 'https://images.unsplash.com/photo-1744314080490-ed41f6319475?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$90',
    priceNum: 90,
    vipPrice: '$180',
    vipPriceNum: 180,
    tags: ['Couples Special', 'VIP Tables', 'Romantic'],
    attendees: 356,
    capacity: 500,
    trending: false,
    category: 'special',
    description: "Celebrate love with DJ KYA's special Valentine's set! Couples packages and romantic vibes all night.",
    highlights: [
      'DJ KYA Live Performance',
      'Couples Photo Booth',
      'Rose for Every Guest',
      'VIP Couples Tables',
      'Champagne Toast at Midnight'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: [],
    ageRestriction: '21+'
  },
  {
    id: 15,
    title: 'Holi Mega Festival 2026',
    artist: 'DJ PANDA',
    artistId: 3,
    venue: 'Prudential Center',
    address: '25 Lafayette St, Newark, NJ 07102',
    city: 'Newark',
    date: 'Mar 6, 2026',
    dateISO: '2026-03-06T18:00:00',
    time: '6:00 PM',
    endTime: '11:00 PM',
    image: 'https://images.unsplash.com/photo-1643981693404-d76e58594bbf?crop=entropy&cs=srgb&fm=jpg&q=85',
    price: '$70',
    priceNum: 70,
    vipPrice: '$145',
    vipPriceNum: 145,
    tags: ['Festival', 'All Ages', 'Food', 'Colors'],
    attendees: 723,
    capacity: 1200,
    trending: false,
    category: 'special',
    description: 'The biggest Holi celebration returns! DJ PANDA headlines this colorful festival of joy and music.',
    highlights: [
      'DJ PANDA Live Performance',
      'Organic Color Powders',
      'Food Festival',
      'Family Friendly',
      'Color Splash Zone',
      'Water Stations'
    ],
    ticketLink: 'https://www.eventbrite.com',
    friendsAttending: [],
    ageRestriction: 'All Ages'
  }
];

// ============================================
// CITIES DATA
// ============================================
export const cities = ['New York', 'New Jersey', 'Philadelphia', 'Newark', 'Jersey City', 'Brooklyn'];

// ============================================
// CATEGORIES DATA
// ============================================
export const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'trending', name: 'Trending' },
  { id: 'bollywood', name: 'Bollywood' },
  { id: 'punjabi', name: 'Punjabi' },
  { id: 'edm', name: 'EDM' },
  { id: 'special', name: 'Special Events' }
];

// ============================================
// MEMBERSHIP TIERS
// ============================================
export const membershipTiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Browse all events',
      'Follow favorite DJs',
      'Basic event reminders',
      'Community access'
    ]
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 9.99,
    features: [
      'All Free features',
      'Early access to tickets',
      'Exclusive discounts (10%)',
      'Priority customer support',
      'Monthly newsletter'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 19.99,
    popular: true,
    features: [
      'All Silver features',
      'VIP early access (48hrs)',
      'Exclusive discounts (20%)',
      'Free guest list entries',
      'Backstage meet & greets',
      'Exclusive merch drops'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 49.99,
    features: [
      'All Gold features',
      'Complimentary VIP upgrades',
      'Personal concierge service',
      'Exclusive members-only events',
      'Annual VIP table credit',
      'Direct DJ booking access'
    ]
  }
];

// ============================================
// MOCK USER DATA
// ============================================
export const mockUser = {
  id: 'user_001',
  name: 'Arjun Patel',
  email: 'arjun.patel@email.com',
  avatar: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85',
  location: 'New York, NY',
  memberSince: 'Jan 2024',
  tier: 'Gold',
  stats: {
    eventsAttended: 24,
    following: 8,
    referrals: 3,
    points: 1240
  },
  preferences: {
    genres: ['Bollywood', 'EDM', 'Punjabi'],
    cities: ['New York', 'Brooklyn', 'New Jersey']
  },
  favoriteEvents: [1, 4, 10, 12],
  followingDJs: [1, 2, 3],
  bookingHistory: [
    { eventId: 10, ticketType: 'VIP', purchaseDate: '2024-10-15', status: 'upcoming' },
    { eventId: 4, ticketType: 'General', purchaseDate: '2024-09-20', status: 'upcoming' }
  ],
  friends: [
    { id: 'user_002', name: 'Priya S.', avatar: 'https://images.unsplash.com/photo-1654031424664-e0e6174fbd26?crop=entropy&cs=srgb&fm=jpg&q=85' },
    { id: 'user_003', name: 'Rahul M.', avatar: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85' },
    { id: 'user_004', name: 'Anita K.', avatar: 'https://images.unsplash.com/photo-1654031424664-e0e6174fbd26?crop=entropy&cs=srgb&fm=jpg&q=85' },
    { id: 'user_005', name: 'Manpreet D.', avatar: 'https://images.unsplash.com/photo-1764014482589-14845f224990?crop=entropy&cs=srgb&fm=jpg&q=85' }
  ],
  reminders: [
    { eventId: 1, reminderTime: '2025-02-14T17:00:00', enabled: true },
    { eventId: 4, reminderTime: '2025-05-24T17:00:00', enabled: true }
  ]
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export const getDJById = (id) => djs.find(dj => dj.id === parseInt(id));
export const getEventById = (id) => events.find(event => event.id === parseInt(id));
export const getEventsByDJ = (djId) => events.filter(event => event.artistId === parseInt(djId));
export const getEventsByCity = (city) => events.filter(event => event.city === city);
export const getEventsByCategory = (category) => category === 'all' 
  ? events 
  : category === 'trending' 
    ? events.filter(e => e.trending) 
    : events.filter(e => e.category === category);
export const getTrendingEvents = () => events.filter(event => event.trending);
export const getUpcomingEvents = () => {
  const now = new Date();
  return events.filter(event => new Date(event.dateISO) > now).sort((a, b) => new Date(a.dateISO) - new Date(b.dateISO));
};

// Calculate time remaining until event
export const getTimeRemaining = (dateISO) => {
  const now = new Date();
  const eventDate = new Date(dateISO);
  const diff = eventDate - now;
  
  if (diff <= 0) return { expired: true };
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, expired: false };
};

// Get recommended events based on user preferences
export const getRecommendedEvents = (userPreferences) => {
  return events.filter(event => {
    const matchesGenre = userPreferences.genres.some(genre => 
      event.category.toLowerCase().includes(genre.toLowerCase()) ||
      event.tags.some(tag => tag.toLowerCase().includes(genre.toLowerCase()))
    );
    const matchesCity = userPreferences.cities.includes(event.city);
    return matchesGenre || matchesCity;
  }).slice(0, 6);
};
