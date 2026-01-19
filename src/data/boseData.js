/**
 * Bose 网站静态数据
 * 包含导航菜单结构和产品数据
 */

export const navigationData = {
  shop: [
    {
      title: 'New & Exclusive',
      items: ['Exclusive Drops', 'Color Collections', 'Lunar Blue Collection']
    },
    {
      title: 'Headphones',
      items: ['Noise Cancelling Headphones', 'Spatial Audio Headphones', 'Headphone Accessories', 'Headphone Sets']
    },
    {
      title: 'Earbuds',
      items: ['In Ear Earbuds', 'Open Ear Earbuds', 'Noise Cancelling Earbuds', 'Earbud Accessories', 'Earbuds Sets']
    },
    {
      title: 'Speakers',
      items: ['Bluetooth Speakers', 'SoundLink Portable Speakers', 'Home Audio Speakers', 'Outdoor Speakers', 'Waterproof Speakers', 'Party Speakers', 'Stereo Speakers', 'Amplifiers', 'Speaker Accessories', 'Speaker Sets']
    },
    {
      title: 'Home Theater',
      items: ['Soundbars', 'Subwoofers', 'Surround Sound Speakers', 'Dolby Atmos Systems', 'Home Theater Accessories', 'Home Theater Sets']
    }
  ],
  explore: [
    'Home', 'Work', 'On The Go', 'Fitness', 'TV & Movies', 'Collabs', 'Turn The Dial: Laufey', 'Bose Stories'
  ],
  support: [
    'Help Center', 'My Orders', 'My Products', 'Contact Us', 'Troubleshooting'
  ]
};

export const products = [
  {
    id: 'qc-headphones',
    name: 'Bose QuietComfort Headphones',
    price: 199.00,
    originalPrice: 359.00,
    image: '/images/bose/qc-headphones-green.avif',
    category: 'Headphones',
    color: 'Cypress Green',
    rating: 4.5,
    reviewCount: 2453,
    features: ['Legendary Noise Cancellation', 'Modes for any musical moment', 'High-fidelity audio'],
    description: 'Take charge of your music and stride along to the beat. High-fidelity audio and legendary noise cancellation work their magic by sealing you in, eliminating distractions, and letting you dive deep into your own rhythm.'
  },
  {
    id: 'qc-ultra-headphones',
    name: 'Bose QuietComfort Ultra Headphones',
    price: 399.00,
    originalPrice: 449.00,
    image: '/images/bose/qc-ultra-headphones-gold.avif',
    category: 'Headphones',
    color: 'Desert Gold',
    rating: 4.8,
    reviewCount: 1892,
    features: ['World-class noise cancellation', 'Breakthrough spatialized audio', 'Luxurious comfort'],
    description: 'World-class noise cancellation, quieter than ever before. Breakthrough spatialized audio for more immersive listening. CustomTune technology for personalized sound. And a design that feels as good as it looks.'
  },
  {
    id: 'ultra-open-earbuds',
    name: 'Bose Ultra Open Earbuds',
    price: 199.00,
    originalPrice: 299.00,
    image: '/images/bose/ultra-open-earbuds-sunset.avif',
    category: 'Earbuds',
    color: 'Sunset Iridescent',
    rating: 4.6,
    reviewCount: 4310,
    features: ['OpenAudio technology', 'Immersive Audio', 'All-day comfort'],
    description: 'A brilliant combination of innovative OpenAudio technology, incredible immersive sound, and all-day comfort. You’ll never want to take them off.'
  },
  {
    id: 'soundlink-flex-2',
    name: 'Bose SoundLink Flex Portable Speaker (2nd Gen)',
    price: 119.00,
    originalPrice: 159.00,
    image: '/images/bose/soundlink-flex-2.avif',
    category: 'Speakers',
    color: 'Black',
    isExclusive: true,
    rating: 4.7,
    reviewCount: 978,
    features: ['Waterproof and dustproof (IP67)', 'PositionIQ technology', 'Up to 12 hours battery life'],
    description: 'The SoundLink Flex Bluetooth speaker is the perfect musical sidekick, with a rugged design capable of withstanding water, dust, and a few bumps and bruises along the way.'
  }
];

export const heroData = {
  title: 'Winter Sale',
  subtitle: 'LIMITED-TIME OFFER',
  description: 'Warm up with hot deals on amazing sound this season and save up to $150 on speakers, headphones, and soundbars.',
  image: '/images/bose/Multi-Product_HP_Hero_Winter-Sale_Desktop_3840x2160.avif',
  ctaText: 'SHOP',
  ctaLink: '/c/sale'
};
