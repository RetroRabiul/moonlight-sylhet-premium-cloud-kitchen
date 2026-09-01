import {
  MenuItem,
  InventoryItem,
  PromoDeal,
  ReviewItem,
  LoyaltyProfile,
  Order,
  NotificationMessage
} from '../types';

export const SYLHET_AREAS = [
  { id: 'zindabazar', name: 'Zindabazar', bengaliName: 'জিন্দাবাজার', deliveryFee: 40, etaMin: 20 },
  { id: 'amberkhana', name: 'Amberkhana', bengaliName: 'আম্বরখানা', deliveryFee: 40, etaMin: 25 },
  { id: 'shibgonj', name: 'Shibgonj', bengaliName: 'শিবগঞ্জ', deliveryFee: 50, etaMin: 25 },
  { id: 'uposhohor', name: 'Shahjalal Uposhohor', bengaliName: 'শাহজালাল উপশহর', deliveryFee: 45, etaMin: 25 },
  { id: 'tilagarh', name: 'Tilagarh', bengaliName: 'টিলাগড়', deliveryFee: 60, etaMin: 35 },
  { id: 'kumarpara', name: 'Kumarpara', bengaliName: 'কুমারপাড়া', deliveryFee: 40, etaMin: 20 },
  { id: 'lamabazar', name: 'Lamabazar', bengaliName: 'লামাবাজার', deliveryFee: 45, etaMin: 25 },
  { id: 'chowhatta', name: 'Chowhatta', bengaliName: 'চৌহাট্টা', deliveryFee: 40, etaMin: 20 },
  { id: 'akhalia', name: 'Akhalia (SUST Gate)', bengaliName: 'আখালিয়া (সাস্ট গেট)', deliveryFee: 60, etaMin: 35 },
  { id: 'subidbazar', name: 'Subidbazar', bengaliName: 'সুবিদবাজার', deliveryFee: 45, etaMin: 25 },
  { id: 'pathantula', name: 'Pathantula', bengaliName: 'পাঠানটুলা', deliveryFee: 50, etaMin: 30 },
  { id: 'mirabazar', name: 'Mirabazar', bengaliName: 'মিরাবাজার', deliveryFee: 40, etaMin: 20 },
  { id: 'baghbari', name: 'Baghbari', bengaliName: 'বাগবাড়ি', deliveryFee: 50, etaMin: 30 }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // --- RICE BOWL ---
  {
    id: 'rb-1',
    name: 'Midnight Crispy Bowl',
    bengaliName: 'মিডনাইট ক্রিস্পি বাউল',
    category: 'rice_bowl',
    price: 220,
    description: 'Crispy golden seasoned chicken chunks on fragrant butter-fried rice with special secret night sauce and pickled greens.',
    bengaliDescription: 'সুগন্ধি বাটার ফ্রাইড রাইস এবং সিক্রেট নাইট সস সাথে স্পেশাল মুচমুচে ক্রিস্পি চিকেন।',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    isPopular: true,
    calories: 580,
    prepTimeMinutes: 15,
    inStock: true,
    options: [
      { id: 'opt-cheese', name: 'Extra Melted Cheese', bengaliName: 'অতিরিক্ত চিজ', price: 35 },
      { id: 'opt-sauce', name: 'Extra MoonLight Sauce', bengaliName: 'এক্সট্রা স্পেশাল সস', price: 20 },
      { id: 'opt-egg', name: 'Fried Sunny Egg', bengaliName: 'সানিসাইড ডিম', price: 25 }
    ]
  },
  {
    id: 'rb-2',
    name: 'Naga Fire Bowl',
    bengaliName: 'নাগা ফায়ার বাউল',
    category: 'rice_bowl',
    price: 210,
    description: 'Intense authentic Sylheti Naga morich spiced chicken tossed with spicy fragrant rice, capsicum, and flame glaze.',
    bengaliDescription: 'আসল খাঁটি সিলেটের কাঁচা নাগা মরিচের আগুনে ঝাল চিকেন এবং ফ্লেভারফুল রাইস।',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 3,
    isPopular: true,
    calories: 610,
    prepTimeMinutes: 16,
    inStock: true,
    options: [
      { id: 'opt-naga', name: 'Extreme Naga Booster 🔥🔥', bengaliName: 'এক্সট্রিম নাগা বুস্টার', price: 25 },
      { id: 'opt-cheese', name: 'Cooling Mozzarella Cheese', bengaliName: 'মোজারেলা চিজ', price: 35 }
    ]
  },
  {
    id: 'rb-3',
    name: 'Mexican Flame Bowl',
    bengaliName: 'মেক্সিকান ফ্লেম বাউল',
    category: 'rice_bowl',
    price: 230,
    description: 'Zesty Mexican herb marinated chicken cubes, sweet corn, salsa dressing, and spicy seasoned rice.',
    bengaliDescription: 'মেক্সিকান হার্ব চিকেন কিউব, সুইট কর্ন ও সালসা ড্রেসিং সমেত রাইস।',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    calories: 590,
    prepTimeMinutes: 15,
    inStock: true
  },
  {
    id: 'rb-4',
    name: 'Smoky BBQ Bowl',
    bengaliName: 'স্মোকি বারবিকিউ বাউল',
    category: 'rice_bowl',
    price: 200,
    description: 'Char-grilled chicken infused in rich hickory smoky BBQ glaze served over buttery fried rice.',
    bengaliDescription: 'হিকরি স্মোকি বারবিকিউ গ্লেজ চিকেন ও স্পেশাল ফ্রাইড রাইস।',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    calories: 560,
    prepTimeMinutes: 14,
    inStock: true
  },

  // --- BURGER ---
  {
    id: 'bg-1',
    name: 'Naga Blast Burger',
    bengaliName: 'নাগা ব্লাস্ট বার্গার',
    category: 'burger',
    price: 200,
    description: 'Signature crispy chicken patty drenched in raw Sylheti Naga chili magma sauce, melted cheddar, lettuce & toasted sesame bun.',
    bengaliDescription: 'খাঁটি নাগা মরিচের ব্লাস্ট সস, ক্রিস্পি চিকেন প্যাটি ও চিজি বান।',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 3,
    isPopular: true,
    calories: 640,
    prepTimeMinutes: 12,
    inStock: true,
    options: [
      { id: 'opt-double-patty', name: 'Double Chicken Patty', bengaliName: 'ডাবল প্যাটি', price: 70 },
      { id: 'opt-cheese-slice', name: 'Extra Cheddar Slice', bengaliName: 'এক্সট্রা চিডার চিজ', price: 30 }
    ]
  },
  {
    id: 'bg-2',
    name: 'Smoky Beef Burger',
    bengaliName: 'স্মোকি বিফ বার্গার',
    category: 'burger',
    price: 270,
    description: 'Juicy 100% prime beef patty, caramelized sweet onions, smoked BBQ sauce, sharp cheddar & fresh pickles.',
    bengaliDescription: 'প্রাইম জুসি বিফ প্যাটি, ক্যারামেলাইজড পেঁয়াজ এবং স্মোকড সস।',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    isPopular: true,
    calories: 720,
    prepTimeMinutes: 15,
    inStock: true,
    options: [
      { id: 'opt-extra-beef', name: 'Extra Beef Patty', bengaliName: 'এক্সট্রা বিফ প্যাটি', price: 90 },
      { id: 'opt-cheese-slice', name: 'Extra Cheddar Slice', bengaliName: 'এক্সট্রা চিজ', price: 30 }
    ]
  },
  {
    id: 'bg-3',
    name: 'Flame Grilled Burger',
    bengaliName: 'ফ্লেম গ্রিলড বার্গার',
    category: 'burger',
    price: 210,
    description: 'Open-fire grilled tender chicken breast, smoked chipotle mayo, crispy iceberg lettuce & tomato.',
    bengaliDescription: 'ওপেন ফায়ার গ্রিলড চিকেন ব্রেস্ট ও চিপটল মেয়ো বার্গার।',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    calories: 590,
    prepTimeMinutes: 14,
    inStock: true
  },
  {
    id: 'bg-4',
    name: 'Crispy Night Burger',
    bengaliName: 'ক্রিস্পি নাইট বার্গার',
    category: 'burger',
    price: 190,
    description: 'Ultra-crunchy crumbed chicken fillet with signature garlic mayo and crisp cabbage slaw.',
    bengaliDescription: 'আল্ট্রা ক্রাঞ্চি চিকেন ফিলেট এবং গার্লিক মেয়ো।',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    calories: 610,
    prepTimeMinutes: 12,
    inStock: true
  },
  {
    id: 'bg-5',
    name: 'Double Fuel Burger',
    bengaliName: 'ডাবল ফুয়েল বার্গার',
    category: 'burger',
    price: 280,
    description: 'Two thick crispy patties, double layered cheese, fried egg, and overflowing secret MoonLight sauce.',
    bengaliDescription: 'জোড়া চিকেন প্যাটি, ডাবল চিজ লেয়ার ও স্পেশাল নাইটফুয়েল সস।',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3e99?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    isPopular: true,
    calories: 890,
    prepTimeMinutes: 16,
    inStock: true
  },
  {
    id: 'bg-6',
    name: 'Classic Fuel Burger',
    bengaliName: 'ক্লাসিক ফুয়েল বার্গার',
    category: 'burger',
    price: 170,
    description: 'Simple, timeless delicious chicken burger with honey mustard, crisp lettuce and cheddar.',
    bengaliDescription: 'সুস্বাদু ক্লাসিক চিকেন বার্গার হানি মাস্টার্ড ও চিজ সহ।',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0,
    calories: 510,
    prepTimeMinutes: 10,
    inStock: true
  },

  // --- PIZZA (8", 10", 12") ---
  {
    id: 'pz-1',
    name: 'Golden Margherita',
    bengaliName: 'গোল্ডেন মার্গারিটা পিৎজা',
    category: 'pizza',
    price: 280,
    sizeOptions: [
      { size: '8"', price: 280, label: '8" Personal (4 Slices)' },
      { size: '10"', price: 400, label: '10" Medium (6 Slices)' },
      { size: '12"', price: 520, label: '12" Large (8 Slices)' }
    ],
    description: 'Slow-simmered San Marzano tomato sauce, double premium mozzarella layer, fragrant basil & olive drizzle.',
    bengaliDescription: 'প্রিমিয়াম মোজারেলা চিজ ও স্পেশাল টমেটো সস সমৃদ্ধ ক্লাসিক মার্গারিটা।',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0,
    isVegetarian: true,
    calories: 780,
    prepTimeMinutes: 20,
    inStock: true,
    options: [
      { id: 'opt-cheese-crust', name: 'Cheese Burst Crust', bengaliName: 'চিজ বার্স্ট ক্রাস্ট', price: 60 }
    ]
  },
  {
    id: 'pz-2',
    name: 'Smoky BBQ Chicken Pizza',
    bengaliName: 'স্মোকি বারবিকিউ চিকেন পিৎজা',
    category: 'pizza',
    price: 380,
    sizeOptions: [
      { size: '8"', price: 380, label: '8" Personal (4 Slices)' },
      { size: '10"', price: 520, label: '10" Medium (6 Slices)' },
      { size: '12"', price: 650, label: '12" Large (8 Slices)' }
    ],
    description: 'Smoky roasted chicken chunks, red onions, bell peppers, BBQ swirl drizzle, and rich stringy mozzarella.',
    bengaliDescription: 'স্মোকি চিকেন, ক্যাপসিকাম, বারবিকিউ সস ও মোজারেলা চিজ পিৎজা।',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    isPopular: true,
    calories: 880,
    prepTimeMinutes: 22,
    inStock: true,
    options: [
      { id: 'opt-cheese-crust', name: 'Cheese Burst Crust', bengaliName: 'চিজ বার্স্ট ক্রাস্ট', price: 60 },
      { id: 'opt-extra-chicken', name: 'Extra BBQ Chicken Topping', bengaliName: 'অতিরিক্ত বারবিকিউ চিকেন', price: 50 }
    ]
  },
  {
    id: 'pz-3',
    name: 'Supreme Night Pizza',
    bengaliName: 'সুপ্রিম নাইট পিৎজা',
    category: 'pizza',
    price: 390,
    sizeOptions: [
      { size: '8"', price: 390, label: '8" Personal' },
      { size: '10"', price: 530, label: '10" Medium' },
      { size: '12"', price: 660, label: '12" Large' }
    ],
    description: 'Loaded with chicken sausages, beef pepperoni, mushrooms, black olives, capsicum, and molten cheese.',
    bengaliDescription: 'চিকেন সসেজ, বিফ পেপারোনি, মাশরুম, ব্ল্যাক অলিভ ও ক্যাপসিকাম সমৃদ্ধ সুপ্রিম পিৎজা।',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    isPopular: true,
    calories: 940,
    prepTimeMinutes: 22,
    inStock: true
  },
  {
    id: 'pz-4',
    name: 'Mexican Fire Pizza',
    bengaliName: 'মেক্সিকান ফায়ার পিৎজা',
    category: 'pizza',
    price: 390,
    sizeOptions: [
      { size: '8"', price: 390, label: '8" Personal' },
      { size: '10"', price: 540, label: '10" Medium' },
      { size: '12"', price: 670, label: '12" Large' }
    ],
    description: 'Spicy seasoned Mexican chicken, sliced jalapenos, red chili flakes, crushed garlic & fire sauce drizzle.',
    bengaliDescription: 'ঝাল মেক্সিকান চিকেন, হালাপিনো ও ফায়ার সস সমৃদ্ধ স্পাইসি পিৎজা।',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 3,
    calories: 890,
    prepTimeMinutes: 20,
    inStock: true
  },
  {
    id: 'pz-5',
    name: 'Imperial Beef Feast',
    bengaliName: 'ইম্পেরিয়াল বিফ ফিস্ট পিৎজা',
    category: 'pizza',
    price: 450,
    sizeOptions: [
      { size: '8"', price: 450, label: '8" Personal' },
      { size: '10"', price: 590, label: '10" Medium' },
      { size: '12"', price: 750, label: '12" Large' }
    ],
    description: 'Rich spiced minced beef keema, beef strips, roasted garlic, caramelized onions and generous triple cheese.',
    bengaliDescription: 'স্পেশাল কিমা বিফ, রোস্টেড গার্লিক ও ট্রিপল চিজ সমৃদ্ধ মহারাজকীয় পিৎজা।',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    isPopular: true,
    calories: 1050,
    prepTimeMinutes: 24,
    inStock: true
  },

  // --- WINGS ---
  {
    id: 'wg-1',
    name: 'Fire Wings (6 pcs)',
    bengaliName: 'ফায়ার উইংস (৬ পিস)',
    category: 'wings',
    price: 260,
    description: 'Crispy fried chicken wings glazed in lethal Naga and hot habanero sauce with garlic ranch dip.',
    bengaliDescription: 'নাগা ও হট চিলি সসে টস করা ৬ পিস মুচমুচে ফায়ার উইংস সাথে স্পেশাল ডিপ।',
    image: 'https://images.unsplash.com/photo-1527477321005-4d45d724b8c4?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 3,
    isPopular: true,
    calories: 520,
    prepTimeMinutes: 15,
    inStock: true,
    options: [
      { id: 'opt-dip-ranch', name: 'Garlic Ranch Dip', bengaliName: 'গার্লিক র‍্যাঞ্চ ডিপ', price: 25 },
      { id: 'opt-dip-cheese', name: 'Cheddar Cheese Dip', bengaliName: 'চিডার চিজ ডিপ', price: 30 }
    ]
  },
  {
    id: 'wg-2',
    name: 'Smoky BBQ Wings (6 pcs)',
    bengaliName: 'স্মোকি বারবিকিউ উইংস (৬ পিস)',
    category: 'wings',
    price: 250,
    description: 'Tender wings coated in thick caramelized honey BBQ sauce topped with toasted white sesame.',
    bengaliDescription: 'হানি বারবিকিউ গ্লেজ সমৃদ্ধ ৬ পিস স্বাদের জুসি উইংস।',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    calories: 490,
    prepTimeMinutes: 14,
    inStock: true
  },

  // --- FRIED CHICKEN ---
  {
    id: 'fc-1',
    name: 'Golden Drumsticks (2 pcs)',
    bengaliName: 'গোল্ডেন ড্রামস্টিক (২ পিস)',
    category: 'fried_chicken',
    price: 280,
    description: 'Massive juicy chicken drumsticks in secret herb-crusted 12-spice batter, fried to golden perfection.',
    bengaliDescription: '১২টি সিক্রেট হার্বস ও স্পাইসের ক্রিস্পি গোল্ডেন ফ্রাইড ড্রামস্টিক।',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    calories: 540,
    prepTimeMinutes: 16,
    inStock: true,
    options: [
      { id: 'opt-naga-dust', name: 'Naga Spicy Dusting', bengaliName: 'নাগা স্পাইসি ডাস্টিং', price: 20 }
    ]
  },
  {
    id: 'fc-2',
    name: 'Crispy Night Wings (2 pcs)',
    bengaliName: 'ক্রিস্পি নাইট উইংস (২ পিস)',
    category: 'fried_chicken',
    price: 220,
    description: 'Jumbo size fried chicken wings with an extraordinarily loud crunch and tender steaming interior.',
    bengaliDescription: 'বিশাল সাইজের আল্ট্রা ক্রিস্পি ফ্রাইড উইংস।',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    calories: 480,
    prepTimeMinutes: 14,
    inStock: true
  },

  // --- PASTA ---
  {
    id: 'ps-1',
    name: 'Creamy Oven Baked Pasta',
    bengaliName: 'ক্রিমি ওভেন বেকড পাস্তা',
    category: 'pasta',
    price: 240,
    description: 'Penne pasta tossed in thick garlic cream sauce, chicken shreds, capsicum and golden blistered cheese roof.',
    bengaliDescription: 'গার্লিক ক্রিম সস, চিকেন কুচি ও গোল্ডেন বেকড মোজারেলা চিজ পাস্তা।',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0,
    isPopular: true,
    calories: 710,
    prepTimeMinutes: 18,
    inStock: true,
    options: [
      { id: 'opt-extra-cheese-bake', name: 'Double Baked Cheese Top', bengaliName: 'ডাবল বেকড চিজ', price: 40 }
    ]
  },
  {
    id: 'ps-2',
    name: 'Smoky BBQ Baked Pasta',
    bengaliName: 'স্মোকি বারবিকিউ বেকড পাস্তা',
    category: 'pasta',
    price: 260,
    description: 'Rich barbecue marinara blended pasta with roasted chicken, mushrooms, and savory cheese crust.',
    bengaliDescription: 'বারবিকিউ মারিনারা সস, রোস্টেড চিকেন ও মাশরুম বেকড পাস্তা।',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    calories: 680,
    prepTimeMinutes: 18,
    inStock: true
  },
  {
    id: 'ps-3',
    name: 'Naga Blaze Pasta',
    bengaliName: 'নাগা ব্লেজ পাস্তা',
    category: 'pasta',
    price: 260,
    description: 'Extreme heat pasta infused with fiery Sylhet naga chili essence, sautéed chicken, bell peppers, and cheese.',
    bengaliDescription: 'সিলেটের খাঁটি নাগা মরিচ দিয়ে তৈরি চরম ঝাল ও সুস্বাদু নাগা ব্লেজ পাস্তা।',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 3,
    calories: 730,
    prepTimeMinutes: 18,
    inStock: true
  },

  // --- FRENCH FRIES ---
  {
    id: 'ff-1',
    name: 'Golden Fries',
    bengaliName: 'গোল্ডেন ফ্রেঞ্চ ফ্রাইজ',
    category: 'french_fries',
    price: 140,
    description: 'Crispy salted potato fries served piping hot with signature MoonLight dip.',
    bengaliDescription: 'মুচমুচে সোনালী পটেটো ফ্রাইজ সাথে ডিপ।',
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 0,
    isVegetarian: true,
    calories: 340,
    prepTimeMinutes: 8,
    inStock: true
  },
  {
    id: 'ff-2',
    name: 'Spicy Night Fries',
    bengaliName: 'স্পাইসি নাইট ফ্রাইজ',
    category: 'french_fries',
    price: 160,
    description: 'Tossed in signature peri-peri & smoky naga seasoning blend with melted cheese drizzle option.',
    bengaliDescription: 'পেরি-পেরি ও নাগা মসলায় মাখানো স্পাইসি নাইট ফ্রাইজ।',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 2,
    isVegetarian: true,
    isPopular: true,
    calories: 370,
    prepTimeMinutes: 8,
    inStock: true,
    options: [
      { id: 'opt-cheese-sauce', name: 'Liquid Cheese Pour', bengaliName: 'লিকুইড চিজ ঢালা', price: 30 }
    ]
  },

  // --- CHOW MEIN & CHICKEN SHAWARMA ---
  {
    id: 'cs-1',
    name: 'MoonLight Chow Mein',
    bengaliName: 'নাইটফুয়েল চাউমিন',
    category: 'chow_mein_shawarma',
    price: 200,
    description: 'Wok-tossed noodles with succulent chicken strips, fresh spring veggies, soy reduction and chili aroma.',
    bengaliDescription: 'উচ্চ আঁচে ভাজা চিকেন ও তাজা ভেজিটেবল সমেত স্পেশাল চাউমিন।',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    isPopular: true,
    calories: 550,
    prepTimeMinutes: 14,
    inStock: true
  },
  {
    id: 'cs-2',
    name: 'Loaded Chicken Shawarma',
    bengaliName: 'লোডেড চিকেন শর্মা',
    category: 'chow_mein_shawarma',
    price: 180,
    description: 'Fluffy freshly rolled flatbread packed with spiced shredded rotisserie chicken, garlic tahini, and fries inside.',
    bengaliDescription: 'স্পেশাল রোটি রুটিতে স্পাইসি চিকেন, গার্লিক সস ও ফ্রাইজ ভর্তি শর্মা।',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&q=80',
    spicyLevel: 1,
    isPopular: true,
    calories: 490,
    prepTimeMinutes: 10,
    inStock: true,
    options: [
      { id: 'opt-extra-chicken-shawarma', name: 'Double Loaded Meat', bengaliName: 'এক্সট্রা মাংস', price: 40 },
      { id: 'opt-cheese-shawarma', name: 'Melted Mozzarella Inside', bengaliName: 'ভেতরে চিজ', price: 25 }
    ]
  }
];

export const INITIAL_PROMOS: PromoDeal[] = [
  {
    id: 'prm-1',
    code: 'MIDNIGHT20',
    title: 'Midnight Rush 20% OFF',
    bengaliTitle: 'মিডনাইট ২০% ছাড়',
    description: 'Get 20% discount on all orders above 500 TK between 11 PM and 3 AM!',
    bengaliDescription: 'রাত ১১টা থেকে ৩টা পর্যন্ত ৫০০ টাকার অর্ডারে ২০% ছাড় পান!',
    discountPercent: 20,
    minSpend: 500,
    tag: 'SURGE DEAL',
    activeHours: '11:00 PM - 03:30 AM',
    isFlashDeal: true,
    expiresInSeconds: 7420,
    bannerGradient: 'from-amber-600 via-orange-600 to-red-600'
  },
  {
    id: 'prm-2',
    code: 'NAGABLAST',
    title: 'Naga Cravers - 50 TK OFF',
    bengaliTitle: 'নাগা প্রেমী - ৫০ টাকা ছাড়',
    description: 'Flat 50 TK discount on any Naga item order above 350 TK.',
    bengaliDescription: 'যে কোনো নাগা আইটেম অর্ডারে ফ্ল্যাট ৫০ টাকা ছাড়।',
    discountAmount: 50,
    minSpend: 350,
    tag: 'SPICY FAVORITE',
    activeHours: '8:00 PM - 4:00 AM',
    isFlashDeal: false,
    bannerGradient: 'from-red-600 via-rose-700 to-amber-700'
  },
  {
    id: 'prm-3',
    code: 'SYLHETFREE',
    title: 'Free Delivery Across Sylhet',
    bengaliTitle: 'পুরো সিলেটে ফ্রি ডেলিভারি',
    description: 'Free doorstep midnight delivery on all orders over 700 TK.',
    bengaliDescription: '৭০০ টাকার বেশি অর্ডারে ফ্রী ডেলিভারি।',
    discountAmount: 45,
    minSpend: 700,
    tag: 'FREE SHIPPING',
    activeHours: '8:00 PM - 4:00 AM',
    isFlashDeal: false,
    bannerGradient: 'from-emerald-600 via-teal-700 to-cyan-800'
  }
];

export const INITIAL_LOYALTY: LoyaltyProfile = {
  customerName: 'Shahriar Ahmed',
  phone: '+880 1712 345678',
  points: 480,
  tier: 'Night Rider',
  pointsToNextTier: 220,
  lifetimeOrders: 14,
  totalSpent: 4800,
  vouchers: [
    {
      id: 'vch-1',
      code: 'FREEWINGS6',
      title: 'Free 6pcs Fire Wings',
      bengaliTitle: 'ফ্রি ৬ পিস ফায়ার উইংস',
      pointsCost: 300,
      discountValue: 'Free Dish (260 TK Value)',
      minSpend: 400,
      claimed: false,
      iconName: 'Flame'
    },
    {
      id: 'vch-2',
      code: 'LOYALTY100',
      title: '100 TK Discount Voucher',
      bengaliTitle: '১০০ টাকা ছাড় ভাউচার',
      pointsCost: 200,
      discountValue: '100 TK OFF',
      minSpend: 450,
      claimed: false,
      iconName: 'Ticket'
    },
    {
      id: 'vch-3',
      code: 'FREEFRIES',
      title: 'Free Spicy Night Fries',
      bengaliTitle: 'ফ্রি স্পাইসি নাইট ফ্রাইজ',
      pointsCost: 150,
      discountValue: 'Free Side (160 TK Value)',
      minSpend: 300,
      claimed: true,
      iconName: 'Gift'
    }
  ]
};

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    customerName: 'Tanvir Hossain (Zindabazar)',
    rating: 5,
    date: 'Yesterday at 1:45 AM',
    menuItemName: 'Naga Blast Burger + Fire Wings',
    comment: 'The absolute best late night food in Sylhet! The Naga chili kick was crazy real, bun was fresh and it arrived piping hot in 20 minutes at 2 AM. MoonLight saved our gaming night!',
    tags: ['Super Spicy 🔥', 'Fast Delivery 🚀', 'Hot & Fresh'],
    verifiedOrder: true,
    likes: 24,
    staffReply: 'Thank you Tanvir bhai! Keeping the late-night Sylhet gamers fueled is our passion! 🔥🌙'
  },
  {
    id: 'rev-2',
    customerName: 'Nafisa Rahman (Amberkhana)',
    rating: 5,
    date: '2 days ago at 12:15 AM',
    menuItemName: '12" Supreme Night Pizza',
    comment: 'Cheese pull was insane! The crust had that perfect oven crispiness and the toppings were generous. bKash payment was seamless. Highly recommend!',
    tags: ['Cheesy 🧀', 'Crispy Crust', 'Easy Payment'],
    verifiedOrder: true,
    likes: 18
  },
  {
    id: 'rev-3',
    customerName: 'Farhan Kabir (SUST Campus, Akhalia)',
    rating: 5,
    date: '3 days ago at 3:10 AM',
    menuItemName: 'Midnight Crispy Bowl',
    comment: 'Ordering food at 3 AM to SUST campus used to be impossible before MoonLight. Portion size is huge for 220 TK. Rider was very courteous.',
    tags: ['Huge Portion', 'Late Night Lifesaver', 'Pocket Friendly'],
    verifiedOrder: true,
    likes: 31,
    staffReply: 'Much love to the SUST family! We deliver all the way till 4:00 AM every single night!'
  },
  {
    id: 'rev-4',
    customerName: 'Siam Chowdhury (Shibgonj)',
    rating: 4,
    date: '4 days ago at 11:30 PM',
    menuItemName: 'Creamy Oven Baked Pasta',
    comment: 'Creamy and rich! Would love an option for extra mushrooms, but the cheese layer was top notch.',
    tags: ['Creamy', 'Rich Flavor'],
    verifiedOrder: true,
    likes: 9
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'Fresh Sylhet Naga Morich Paste',
    bengaliName: 'খাঁটি সিলেটী নাগা মরিচ পেস্ট',
    category: 'Spices & Sauces',
    currentStock: 18,
    unit: 'Jars (500g)',
    minThreshold: 5,
    status: 'in_stock',
    linkedMenuItemIds: ['rb-2', 'bg-1', 'pz-4', 'wg-1', 'ps-3', 'ff-2']
  },
  {
    id: 'inv-2',
    name: 'Brioche Burger Buns',
    bengaliName: 'বার্গার বান',
    category: 'Bakery',
    currentStock: 42,
    unit: 'Pcs',
    minThreshold: 15,
    status: 'in_stock',
    linkedMenuItemIds: ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5', 'bg-6']
  },
  {
    id: 'inv-3',
    name: 'Mozzarella Cheese Block (Diced)',
    bengaliName: 'মোজারেলা চিজ ব্লক',
    category: 'Dairy',
    currentStock: 8.5,
    unit: 'Kg',
    minThreshold: 4,
    status: 'in_stock',
    linkedMenuItemIds: ['pz-1', 'pz-2', 'pz-3', 'pz-4', 'pz-5', 'ps-1', 'ps-2', 'ps-3']
  },
  {
    id: 'inv-4',
    name: 'Fresh Chicken Wings (Jumbo Cut)',
    bengaliName: 'চিকেন উইংস',
    category: 'Poultry',
    currentStock: 12,
    unit: 'Kg',
    minThreshold: 6,
    status: 'in_stock',
    linkedMenuItemIds: ['wg-1', 'wg-2', 'fc-2']
  },
  {
    id: 'inv-5',
    name: 'Prime Beef Minced Keema & Patties',
    bengaliName: 'বিফ কিমা ও প্যাটি',
    category: 'Meat',
    currentStock: 6,
    unit: 'Kg',
    minThreshold: 5,
    status: 'low_stock',
    linkedMenuItemIds: ['bg-2', 'pz-5']
  },
  {
    id: 'inv-6',
    name: 'Imported French Fries (Cut)',
    bengaliName: 'ফ্রেঞ্চ ফ্রাইজ কাট',
    category: 'Frozen',
    currentStock: 25,
    unit: 'Packs (1kg)',
    minThreshold: 8,
    status: 'in_stock',
    linkedMenuItemIds: ['ff-1', 'ff-2']
  },
  {
    id: 'inv-7',
    name: 'MoonLight Thermal Insulated Boxes',
    bengaliName: 'থার্মাল ডেলিভারি বক্স',
    category: 'Packaging',
    currentStock: 140,
    unit: 'Boxes',
    minThreshold: 30,
    status: 'in_stock',
    linkedMenuItemIds: []
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'NF-8921',
    customerName: 'Jamil Hasan',
    phone: '+880 1798 112233',
    address: 'Flat 4B, Green View Tower, Shibgonj Point',
    area: 'Shibgonj',
    notes: 'Please call before knocking, roommate is sleeping.',
    items: [
      {
        id: 'ci-1',
        menuItemId: 'bg-1',
        name: 'Naga Blast Burger',
        bengaliName: 'নাগা ব্লাস্ট বার্গার',
        price: 200,
        selectedOptions: [{ id: 'opt-cheese-slice', name: 'Extra Cheddar Slice', bengaliName: 'এক্সট্রা চিজ', price: 30 }],
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'ci-2',
        menuItemId: 'wg-1',
        name: 'Fire Wings (6 pcs)',
        bengaliName: 'ফায়ার উইংস (৬ পিস)',
        price: 260,
        selectedOptions: [],
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1527477321005-4d45d724b8c4?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 720,
    discount: 50,
    deliveryFee: 50,
    tip: 20,
    total: 740,
    paymentMethod: 'bkash',
    paymentStatus: 'paid',
    transactionId: 'BK9A872635X',
    status: 'out_for_delivery',
    createdAt: '12 minutes ago',
    estimatedDeliveryMinutes: 14,
    rider: {
      name: 'Rashedul Karim',
      phone: '+880 1823 445566',
      vehicle: 'Yamaha FZ (Sylhet-Ha-11-2094)',
      rating: 4.9,
      currentLocationName: 'Crossing Kumarpara Bridge towards Shibgonj',
      coordinates: { x: 62, y: 48 }
    },
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed',
        bengaliTitle: 'অর্ডার জমা হয়েছে',
        description: 'Payment verified via bKash',
        timestamp: '12 min ago',
        completed: true
      },
      {
        status: 'kitchen_prep',
        title: 'Kitchen Cooking',
        bengaliTitle: 'রান্না চলছে',
        description: 'Chef is grilling fresh patties & glazing wings',
        timestamp: '9 min ago',
        completed: true
      },
      {
        status: 'quality_check',
        title: 'Thermal Pack & Sealed',
        bengaliTitle: 'কোয়ালিটি চেক ও সিলিং',
        description: 'Insulated hot pouch sealed',
        timestamp: '4 min ago',
        completed: true
      },
      {
        status: 'out_for_delivery',
        title: 'Out for Delivery',
        bengaliTitle: 'ডেলিভারিতে বের হয়েছে',
        description: 'Rider Rashedul is on the way (ETA 14 min)',
        timestamp: '2 min ago',
        completed: true
      },
      {
        status: 'delivered',
        title: 'Delivered',
        bengaliTitle: 'ডেলিভারি সম্পন্ন',
        description: 'Delivered to customer',
        timestamp: 'Pending',
        completed: false
      }
    ],
    pointsEarned: 74
  },
  {
    id: 'ord-102',
    orderNumber: 'NF-8922',
    customerName: 'Anika Tabassum',
    phone: '+880 1611 998877',
    address: 'House 12, Road 4, Shahjalal Uposhohor Block C',
    area: 'Shahjalal Uposhohor',
    items: [
      {
        id: 'ci-3',
        menuItemId: 'pz-2',
        name: 'Smoky BBQ Chicken Pizza',
        bengaliName: 'স্মোকি বারবিকিউ চিকেন পিৎজা',
        price: 520,
        selectedSize: '10"',
        selectedOptions: [{ id: 'opt-cheese-crust', name: 'Cheese Burst Crust', bengaliName: 'চিজ বার্স্ট', price: 60 }],
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 580,
    discount: 0,
    deliveryFee: 45,
    tip: 0,
    total: 625,
    paymentMethod: 'nagad',
    paymentStatus: 'paid',
    transactionId: 'NG77192803B',
    status: 'kitchen_prep',
    createdAt: '6 minutes ago',
    estimatedDeliveryMinutes: 22,
    timeline: [
      {
        status: 'placed',
        title: 'Order Placed',
        bengaliTitle: 'অর্ডার গৃহীত',
        description: 'Paid via Nagad',
        timestamp: '6 min ago',
        completed: true
      },
      {
        status: 'kitchen_prep',
        title: 'In Brick Oven',
        bengaliTitle: 'ওভেনে বেক হচ্ছে',
        description: 'Stone oven baking at 400°C',
        timestamp: '3 min ago',
        completed: true
      },
      {
        status: 'quality_check',
        title: 'Quality Packing',
        bengaliTitle: 'প্যাকিং',
        description: 'Awaiting boxing',
        timestamp: 'Upcoming',
        completed: false
      },
      {
        status: 'out_for_delivery',
        title: 'Rider Pickup',
        bengaliTitle: 'রাইডার পিকআপ',
        description: 'Rider assigning',
        timestamp: 'Upcoming',
        completed: false
      },
      {
        status: 'delivered',
        title: 'Delivered',
        bengaliTitle: 'ডেলিভারি',
        description: 'Doorstep dropoff',
        timestamp: 'Upcoming',
        completed: false
      }
    ],
    pointsEarned: 62
  }
];

export const INITIAL_NOTIFICATIONS: NotificationMessage[] = [
  {
    id: 'nt-1',
    title: '🔥 Midnight Surge Deal Active!',
    bengaliTitle: '🔥 মিডনাইট ধামাকা অফার শুরু!',
    message: 'Use code MIDNIGHT20 to get 20% OFF until 3:30 AM across Sylhet!',
    bengaliMessage: 'কোড MIDNIGHT20 ব্যবহার করে পান ২০% পর্যন্ত ছাড় রাত ৩:৩০ পর্যন্ত!',
    time: '5 min ago',
    type: 'promo',
    read: false,
    linkTab: 'promos'
  },
  {
    id: 'nt-2',
    title: '🛵 Order NF-8921 Dispatched',
    bengaliTitle: '🛵 অর্ডার NF-8921 বের হয়েছে',
    message: 'Rider Rashedul is navigating to Shibgonj.',
    bengaliMessage: 'রাইডার রাশেদুল শিবগঞ্জের পথে আছেন।',
    time: '2 min ago',
    type: 'order',
    read: false,
    linkTab: 'menu'
  },
  {
    id: 'nt-3',
    title: '🎁 74 Fuel Points Credited',
    bengaliTitle: '🎁 ৭৪ ফুয়েল পয়েন্ট জমা হয়েছে',
    message: 'You are only 220 points away from unlocking Fuel VIP status!',
    bengaliMessage: 'ফুয়েল ভিআইপি স্ট্যাটাস আনলক করতে আর মাত্র ২২০ পয়েন্ট প্রয়োজন!',
    time: '12 min ago',
    type: 'loyalty',
    read: true,
    linkTab: 'loyalty'
  }
];

export const ANALYTICS_DATA = {
  topSellingItems: [
    { name: 'Sylheti Naga Fire Wings', count: 342, revenue: 88920 },
    { name: 'Smoky BBQ Chicken Pizza', count: 284, revenue: 107920 },
    { name: 'Naga Monster Double Burger', count: 260, revenue: 75400 },
    { name: 'Naga Smoky Chicken Rice Bowl', count: 245, revenue: 61250 },
    { name: 'Cheesy Oven Baked Pasta', count: 198, revenue: 51480 },
  ],
  areaDistribution: [
    { area: 'Zindabazar Hub', percentage: 28 },
    { area: 'Amberkhana Point', percentage: 22 },
    { area: 'Shahjalal Uposhohor', percentage: 18 },
    { area: 'Shibgonj & Tilagarh', percentage: 16 },
    { area: 'Akhalia (SUST Campus Gate)', percentage: 12 },
    { area: 'Kumarpara & Lamabazar', percentage: 4 },
  ],
  hourlyTrends: [
    { hour: '8 PM', orders: 18 },
    { hour: '9 PM', orders: 32 },
    { hour: '10 PM', orders: 48 },
    { hour: '11 PM', orders: 58 },
    { hour: '12 AM', orders: 54 },
    { hour: '1 AM', orders: 42 },
    { hour: '2 AM', orders: 36 },
    { hour: '3 AM', orders: 25 },
  ],
};

