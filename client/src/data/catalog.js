// Static storefront catalog used by the Home, Category and Product Detail pages.
const IMG = '/img/shop/';

export const categories = [
  { slug: 'phones', name: 'Phones', icon: 'fas fa-mobile-alt' },
  { slug: 'smart-watches', name: 'Smart Watches', icon: 'far fa-clock' },
  { slug: 'cameras', name: 'Cameras', icon: 'fas fa-camera' },
  { slug: 'headphones', name: 'Headphones', icon: 'fas fa-headphones' },
  { slug: 'computers', name: 'Computers', icon: 'fas fa-desktop' },
  { slug: 'gaming', name: 'Gaming', icon: 'fas fa-gamepad' },
];

const phoneSpecs = (screen, cpu, cores, main, front, battery) => [
  { icon: 'fas fa-mobile-alt', label: 'Screen size', value: screen },
  { icon: 'fas fa-microchip', label: 'CPU', value: cpu },
  { icon: 'fas fa-layer-group', label: 'Number of Cores', value: cores },
  { icon: 'fas fa-camera', label: 'Main camera', value: main },
  { icon: 'fas fa-camera-retro', label: 'Front camera', value: front },
  { icon: 'fas fa-battery-three-quarters', label: 'Battery capacity', value: battery },
];

const phoneDetails = (diag, res, hz, ppi, type, cpu, cores) => [
  {
    title: 'Screen',
    rows: [
      ['Screen diagonal', diag],
      ['The screen resolution', res],
      ['The screen refresh rate', hz],
      ['The pixel density', ppi],
      ['Screen type', type],
      ['Additionally', ['Dynamic Island', 'Always-On display', 'HDR display', 'True Tone', 'Wide color (P3)']],
    ],
  },
  { title: 'CPU', rows: [['CPU', cpu], ['Number of cores', cores]] },
  {
    title: 'Connectivity',
    rows: [['Network', '5G'], ['Wi-Fi', 'Wi-Fi 6'], ['Bluetooth', '5.3'], ['NFC', 'Yes']],
  },
];

const genericDetails = (rows) => [{ title: 'Specifications', rows }];

const raw = [
  // ---------- Phones ----------
  {
    name: 'Apple iPhone 14 Pro Max 128GB Deep Purple (MQ9T3)', brand: 'Apple', category: 'phones',
    price: 1399, oldPrice: 1499, image: 'iphone-purple.jpg', gallery: ['iphone-purple.jpg', 'iphone-silver.jpg', 'iphone-gold.jpg', 'iphone-black.jpg'],
    colors: ['#000000', '#781DBC', '#E10000', '#E1B000', '#E8E8E8'], storage: ['128GB', '256GB', '512GB', '1TB'],
    specs: phoneSpecs('6.7"', 'Apple A16 Bionic', '6', '48-12-12 MP', '12 MP', '4323 mAh'),
    details: phoneDetails('6.7"', '2796x1290', '120 Hz', '460 ppi', 'OLED', 'A16 Bionic', '6'),
    rating: 4.8, reviews: 125, tags: ['new', 'featured'],
  },
  {
    name: 'Apple iPhone 14 Pro 512GB Gold (MQ233)', brand: 'Apple', category: 'phones',
    price: 1437, oldPrice: 1599, image: 'iphone-gold.jpg', gallery: ['iphone-gold.jpg', 'iphone-purple.jpg', 'iphone-silver.jpg'],
    colors: ['#E1B000', '#000000', '#E8E8E8'], storage: ['128GB', '256GB', '512GB', '1TB'],
    specs: phoneSpecs('6.1"', 'Apple A16 Bionic', '6', '48-12-12 MP', '12 MP', '3200 mAh'),
    details: phoneDetails('6.1"', '2556x1179', '120 Hz', '460 ppi', 'OLED', 'A16 Bionic', '6'),
    rating: 4.7, reviews: 98, tags: ['bestseller', 'discount'],
  },
  {
    name: 'Apple iPhone 14 Pro 1TB Silver (MQ2V3)', brand: 'Apple', category: 'phones',
    price: 1499, image: 'iphone-silver.jpg', gallery: ['iphone-silver.jpg', 'iphone-gold.jpg'],
    colors: ['#E8E8E8', '#000000'], storage: ['256GB', '512GB', '1TB'],
    specs: phoneSpecs('6.1"', 'Apple A16 Bionic', '6', '48-12-12 MP', '12 MP', '3200 mAh'),
    details: phoneDetails('6.1"', '2556x1179', '120 Hz', '460 ppi', 'OLED', 'A16 Bionic', '6'),
    rating: 4.6, reviews: 64, tags: ['new'],
  },
  {
    name: 'Apple iPhone 14 Pro 256GB Space Black (MQ0T3)', brand: 'Apple', category: 'phones',
    price: 1399, image: 'iphone-black.jpg', gallery: ['iphone-black.jpg', 'iphone-silver.jpg'],
    colors: ['#000000', '#E8E8E8', '#781DBC'], storage: ['128GB', '256GB', '512GB'],
    specs: phoneSpecs('6.1"', 'Apple A16 Bionic', '6', '48-12-12 MP', '12 MP', '3200 mAh'),
    details: phoneDetails('6.1"', '2556x1179', '120 Hz', '460 ppi', 'OLED', 'A16 Bionic', '6'),
    rating: 4.7, reviews: 77, tags: ['bestseller'],
  },
  {
    name: 'Apple iPhone 13 mini 128GB Pink (MLK23)', brand: 'Apple', category: 'phones',
    price: 850, oldPrice: 920, image: 'iphone-pink.jpg', gallery: ['iphone-pink.jpg'],
    colors: ['#F7C8D0', '#E8E8E8', '#000000'], storage: ['128GB', '256GB'],
    specs: phoneSpecs('5.4"', 'Apple A15 Bionic', '6', '12-12 MP', '12 MP', '2438 mAh'),
    details: phoneDetails('5.4"', '2340x1080', '60 Hz', '476 ppi', 'OLED', 'A15 Bionic', '6'),
    rating: 4.5, reviews: 51, tags: ['discount'],
  },
  {
    name: 'Samsung Galaxy S23 Ultra 256GB Phantom Black', brand: 'Samsung', category: 'phones',
    price: 1199, oldPrice: 1299, image: 'galaxy-phone.jpg', gallery: ['galaxy-phone.jpg'],
    colors: ['#000000', '#2F4F3E', '#E8E8E8'], storage: ['256GB', '512GB', '1TB'],
    specs: phoneSpecs('6.8"', 'Snapdragon 8 Gen 2', '8', '200-12-10 MP', '12 MP', '5000 mAh'),
    details: phoneDetails('6.8"', '3088x1440', '120 Hz', '500 ppi', 'Dynamic AMOLED 2X', 'Snapdragon 8 Gen 2', '8'),
    rating: 4.6, reviews: 88, tags: ['featured', 'bestseller'],
  },
  {
    name: 'Apple iPhone 16 Pro Max 256GB Desert Titanium', brand: 'Apple', category: 'phones',
    price: 1799, image: '/img/6.png', gallery: ['/img/6.png'],
    colors: ['#C8834B', '#000000', '#E8E8E8'], storage: ['256GB', '512GB', '1TB'],
    specs: phoneSpecs('6.9"', 'Apple A18 Pro', '6', '48-48-12 MP', '12 MP', '4685 mAh'),
    details: phoneDetails('6.9"', '2868x1320', '120 Hz', '460 ppi', 'OLED', 'A18 Pro', '6'),
    rating: 4.8, reviews: 39, tags: ['new', 'featured'],
  },
  {
    name: 'Samsung Galaxy S24 Ultra 256GB Titanium Gray', brand: 'Samsung', category: 'phones',
    price: 1299, oldPrice: 1419, image: '/img/4.png', gallery: ['/img/4.png', 'galaxy-phone.jpg'],
    colors: ['#8E8A85', '#000000', '#C9B9E0'], storage: ['256GB', '512GB', '1TB'],
    specs: phoneSpecs('6.8"', 'Snapdragon 8 Gen 3', '8', '200-50-12 MP', '12 MP', '5000 mAh'),
    details: phoneDetails('6.8"', '3120x1440', '120 Hz', '505 ppi', 'Dynamic AMOLED 2X', 'Snapdragon 8 Gen 3', '8'),
    rating: 4.7, reviews: 86, tags: ['bestseller', 'discount'],
  },

  // ---------- Smart Watches ----------
  {
    name: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium Case', brand: 'Apple', category: 'smart-watches',
    price: 399, oldPrice: 499, image: 'watch.jpg', gallery: ['watch.jpg', 'smartwatch-orange.jpg'],
    colors: ['#E8E8E8', '#000000', '#E10000'], storage: ['41mm', '45mm'],
    specs: [
      { icon: 'fas fa-mobile-alt', label: 'Display', value: '1.9" Retina' },
      { icon: 'fas fa-microchip', label: 'Chip', value: 'Apple S9 SiP' },
      { icon: 'fas fa-tint', label: 'Water resistance', value: '50 m' },
      { icon: 'fas fa-heartbeat', label: 'Sensors', value: 'ECG, SpO2' },
      { icon: 'fas fa-wifi', label: 'Connectivity', value: 'GPS' },
      { icon: 'fas fa-battery-three-quarters', label: 'Battery life', value: '18 hours' },
    ],
    details: genericDetails([['Case size', '41 mm'], ['Display', 'Always-On Retina'], ['Chip', 'S9 SiP'], ['Water resistance', 'WR50']]),
    rating: 4.8, reviews: 143, tags: ['new', 'discount'],
  },
  {
    name: 'Apple Watch SE 44mm Sport Band Orange', brand: 'Apple', category: 'smart-watches',
    price: 279, oldPrice: 309, image: 'smartwatch-orange.jpg', gallery: ['smartwatch-orange.jpg', 'watch.jpg'],
    colors: ['#F58220', '#E8E8E8'], storage: ['40mm', '44mm'],
    specs: [
      { icon: 'fas fa-mobile-alt', label: 'Display', value: '1.78" Retina' },
      { icon: 'fas fa-microchip', label: 'Chip', value: 'Apple S8 SiP' },
      { icon: 'fas fa-tint', label: 'Water resistance', value: '50 m' },
      { icon: 'fas fa-heartbeat', label: 'Sensors', value: 'Heart rate' },
      { icon: 'fas fa-wifi', label: 'Connectivity', value: 'GPS' },
      { icon: 'fas fa-battery-three-quarters', label: 'Battery life', value: '18 hours' },
    ],
    details: genericDetails([['Case size', '44 mm'], ['Display', 'Retina LTPO OLED'], ['Chip', 'S8 SiP']]),
    rating: 4.3, reviews: 33, tags: ['discount'],
  },

  // ---------- Cameras ----------
  {
    name: 'Blackmagic Pocket Cinema Camera 6k', brand: 'Blackmagic', category: 'cameras',
    price: 2535, image: 'camera.jpg', gallery: ['camera.jpg'],
    colors: ['#000000'], storage: ['Body', 'Kit'],
    specs: [
      { icon: 'fas fa-camera', label: 'Sensor', value: 'Super 35' },
      { icon: 'fas fa-film', label: 'Video', value: '6K 50fps' },
      { icon: 'fas fa-compress', label: 'Mount', value: 'EF' },
      { icon: 'fas fa-mobile-alt', label: 'Screen', value: '5" Touch' },
      { icon: 'fas fa-sd-card', label: 'Media', value: 'CFast 2.0' },
      { icon: 'fas fa-battery-three-quarters', label: 'Battery', value: 'NP-F570' },
    ],
    details: genericDetails([['Sensor size', '23.10 x 12.99 mm'], ['Dynamic range', '13 stops'], ['ISO', 'Dual native 400 / 3200']]),
    rating: 4.7, reviews: 22, tags: ['new', 'featured'],
  },

  // ---------- Headphones ----------
  {
    name: 'AirPods Max Silver', brand: 'Apple', category: 'headphones',
    price: 549, oldPrice: 599, image: 'airpods-max.jpg', gallery: ['airpods-max.jpg', '/img/3.png'],
    colors: ['#E8E8E8', '#2F4F3E', '#000000'], storage: ['Standard'],
    specs: [
      { icon: 'fas fa-headphones', label: 'Type', value: 'Over-ear' },
      { icon: 'fas fa-microchip', label: 'Chip', value: 'Apple H1' },
      { icon: 'fas fa-volume-mute', label: 'ANC', value: 'Yes' },
      { icon: 'fas fa-music', label: 'Spatial audio', value: 'Yes' },
      { icon: 'fab fa-bluetooth-b', label: 'Bluetooth', value: '5.0' },
      { icon: 'fas fa-battery-three-quarters', label: 'Battery life', value: '20 hours' },
    ],
    details: genericDetails([['Driver', '40 mm dynamic'], ['Weight', '384.8 g'], ['Charging', 'Lightning']]),
    rating: 4.6, reviews: 110, tags: ['new', 'discount'],
  },
  {
    name: 'Galaxy Buds FE Graphite', brand: 'Samsung', category: 'headphones',
    price: 99.99, image: 'earbuds.jpg', gallery: ['earbuds.jpg'],
    colors: ['#3A3A3A', '#E8E8E8'], storage: ['Standard'],
    specs: [
      { icon: 'fas fa-headphones', label: 'Type', value: 'In-ear' },
      { icon: 'fas fa-volume-mute', label: 'ANC', value: 'Yes' },
      { icon: 'fab fa-bluetooth-b', label: 'Bluetooth', value: '5.2' },
      { icon: 'fas fa-tint', label: 'Water', value: 'IPX2' },
      { icon: 'fas fa-microphone', label: 'Mics', value: '3 per bud' },
      { icon: 'fas fa-battery-three-quarters', label: 'Battery life', value: '21 hours' },
    ],
    details: genericDetails([['Driver', '12 mm'], ['Weight', '5.6 g per bud']]),
    rating: 4.2, reviews: 47, tags: ['new', 'bestseller'],
  },
  {
    name: 'Apple AirPods Pro 2 with MagSafe Case (USB-C)', brand: 'Apple', category: 'headphones',
    price: 249, oldPrice: 279, image: '/img/3.png', gallery: ['/img/3.png'],
    colors: ['#FFFFFF'], storage: ['Standard'],
    specs: [
      { icon: 'fas fa-headphones', label: 'Type', value: 'In-ear' },
      { icon: 'fas fa-microchip', label: 'Chip', value: 'Apple H2' },
      { icon: 'fas fa-volume-mute', label: 'ANC', value: 'Yes' },
      { icon: 'fas fa-music', label: 'Spatial audio', value: 'Yes' },
      { icon: 'fas fa-tint', label: 'Water', value: 'IP54' },
      { icon: 'fas fa-battery-three-quarters', label: 'Battery life', value: '30 hours' },
    ],
    details: genericDetails([['Charging', 'USB-C, MagSafe, Qi'], ['Weight', '5.3 g per bud']]),
    rating: 4.7, reviews: 158, tags: ['featured', 'bestseller', 'discount'],
  },

  // ---------- Computers ----------
  {
    name: 'Apple iPad Pro 12.9" 128GB Wi-Fi Silver (MHNG3)', brand: 'Apple', category: 'computers',
    price: 1098, oldPrice: 1199, image: 'ipad.jpg', gallery: ['ipad.jpg'],
    colors: ['#E8E8E8', '#3A3A3A'], storage: ['128GB', '256GB', '512GB', '1TB'],
    specs: [
      { icon: 'fas fa-tablet-alt', label: 'Screen size', value: '12.9"' },
      { icon: 'fas fa-microchip', label: 'CPU', value: 'Apple M2' },
      { icon: 'fas fa-layer-group', label: 'Number of Cores', value: '8' },
      { icon: 'fas fa-camera', label: 'Main camera', value: '12-10 MP' },
      { icon: 'fas fa-camera-retro', label: 'Front camera', value: '12 MP' },
      { icon: 'fas fa-battery-three-quarters', label: 'Battery life', value: '10 hours' },
    ],
    details: genericDetails([['Display', 'Liquid Retina XDR'], ['Refresh rate', '120 Hz ProMotion'], ['Chip', 'M2']]),
    rating: 4.8, reviews: 91, tags: ['featured', 'new'],
  },
  {
    name: 'MacBook Pro 16" M1 Pro 512GB Silver', brand: 'Apple', category: 'computers',
    price: 1999, image: '/img/1.png', gallery: ['/img/1.png'],
    colors: ['#E8E8E8', '#3A3A3A'], storage: ['512GB', '1TB', '2TB'],
    specs: [
      { icon: 'fas fa-laptop', label: 'Screen size', value: '16.2"' },
      { icon: 'fas fa-microchip', label: 'CPU', value: 'Apple M1 Pro' },
      { icon: 'fas fa-layer-group', label: 'Number of Cores', value: '10' },
      { icon: 'fas fa-memory', label: 'Memory', value: '18 GB' },
      { icon: 'fas fa-hdd', label: 'Storage', value: '512 GB SSD' },
      { icon: 'fas fa-battery-three-quarters', label: 'Battery life', value: '18 hours' },
    ],
    details: genericDetails([['Display', 'Liquid Retina XDR'], ['Ports', '3x Thunderbolt 4, HDMI, SD'], ['Weight', '1.61 kg']]),
    rating: 4.9, reviews: 132, tags: ['featured'],
  },
  {
    name: 'Dell Inspiron 15 3511 Core i5 8GB 512GB SSD', brand: 'Dell', category: 'computers',
    price: 649, oldPrice: 729, image: '/img/5.png', gallery: ['/img/5.png'],
    colors: ['#1E1E1E'], storage: ['256GB', '512GB'],
    specs: [
      { icon: 'fas fa-laptop', label: 'Screen size', value: '15.6"' },
      { icon: 'fas fa-microchip', label: 'CPU', value: 'Intel i5-1135G7' },
      { icon: 'fas fa-layer-group', label: 'Number of Cores', value: '4' },
      { icon: 'fas fa-memory', label: 'Memory', value: '8 GB' },
      { icon: 'fas fa-hdd', label: 'Storage', value: '512 GB SSD' },
      { icon: 'fas fa-battery-three-quarters', label: 'Battery', value: '41 Wh' },
    ],
    details: genericDetails([['Display', 'FHD 1920x1080'], ['OS', 'Windows 11'], ['Weight', '1.8 kg']]),
    rating: 4.7, reviews: 104, tags: ['bestseller', 'discount'],
  },
  // ---------- Gaming ----------
  {
    name: 'ASUS ROG Strix G16 RTX 4070 Gaming Laptop', brand: 'ASUS', category: 'gaming',
    price: 1649, image: 'laptop-gaming.jpg', gallery: ['laptop-gaming.jpg'],
    colors: ['#3A3A3A'], storage: ['512GB', '1TB'],
    specs: [
      { icon: 'fas fa-laptop', label: 'Screen size', value: '16"' },
      { icon: 'fas fa-microchip', label: 'CPU', value: 'Intel i9-13980HX' },
      { icon: 'fas fa-layer-group', label: 'Number of Cores', value: '24' },
      { icon: 'fas fa-memory', label: 'Memory', value: '16 GB' },
      { icon: 'fas fa-tv', label: 'GPU', value: 'RTX 4070' },
      { icon: 'fas fa-battery-three-quarters', label: 'Battery', value: '90 Wh' },
    ],
    details: genericDetails([['Display', '240 Hz IPS'], ['Weight', '2.5 kg']]),
    rating: 4.5, reviews: 41, tags: ['bestseller', 'featured'],
  },
  {
    name: 'Fresh 43" Full HD Smart TV with Game Mode', brand: 'Fresh', category: 'gaming',
    price: 329, oldPrice: 389, image: '/img/2.png', gallery: ['/img/2.png'],
    colors: ['#000000'], storage: ['43"', '50"', '55"'],
    specs: [
      { icon: 'fas fa-tv', label: 'Screen size', value: '43"' },
      { icon: 'fas fa-expand', label: 'Resolution', value: '1920x1080' },
      { icon: 'fas fa-film', label: 'Refresh rate', value: '60 Hz' },
      { icon: 'fas fa-gamepad', label: 'Game mode', value: 'ALLM' },
      { icon: 'fas fa-wifi', label: 'Smart', value: 'Android TV' },
      { icon: 'fas fa-volume-up', label: 'Audio', value: '2 x 10W' },
    ],
    details: genericDetails([['Panel', 'LED'], ['HDMI ports', '3'], ['USB ports', '2']]),
    rating: 4.2, reviews: 36, tags: ['discount'],
  },
];

const slugify = (s) =>
  s.toLowerCase().replace(/["|()]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const resolve = (src) => (src.startsWith('/') ? src : IMG + src);

export const products = raw.map((p, i) => ({
  ...p,
  id: String(i + 1),
  slug: slugify(p.name),
  image: resolve(p.image),
  gallery: p.gallery.map(resolve),
  description:
    p.description ||
    'Enhanced capabilities thanks to an enlarged display and all-day battery life. Incredible performance in a refined, durable design built to keep up with everything you do - work, play and create without compromise.',
}));

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug);
export const getCategory = (slug) => categories.find((c) => c.slug === slug);
export const byTag = (tag) => products.filter((p) => p.tags.includes(tag));

export const formatPrice = (n) =>
  '$' + (Number.isInteger(n) ? n.toLocaleString('en-US') : n.toFixed(2));

export const IMG_FALLBACK = IMG + 'placeholder.svg';