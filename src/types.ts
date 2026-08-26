export type CategoryId =
  | 'all'
  | 'rice_bowl'
  | 'burger'
  | 'pizza'
  | 'wings'
  | 'fried_chicken'
  | 'pasta'
  | 'french_fries'
  | 'chow_mein_shawarma';

export interface MenuItemOption {
  id: string;
  name: string;
  bengaliName: string;
  price: number;
}

export interface PizzaSizeOption {
  size: '8"' | '10"' | '12"';
  price: number;
  label: string;
}

export interface MenuItem {
  id: string;
  name: string;
  bengaliName: string;
  category: CategoryId;
  price: number; // Base price
  sizeOptions?: PizzaSizeOption[];
  description: string;
  bengaliDescription: string;
  image: string;
  spicyLevel: 0 | 1 | 2 | 3; // 0=mild, 1=spicy, 2=extra spicy, 3=Naga Fire! 🔥
  isPopular?: boolean;
  isVegetarian?: boolean;
  calories?: number;
  prepTimeMinutes: number;
  inStock: boolean;
  options?: MenuItemOption[];
}

export interface CartItem {
  id: string; // Unique cart item instance id
  menuItemId: string;
  name: string;
  bengaliName: string;
  price: number;
  selectedSize?: '8"' | '10"' | '12"';
  selectedOptions: MenuItemOption[];
  quantity: number;
  specialInstructions?: string;
  image: string;
}

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'kitchen_prep'
  | 'quality_check'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface DeliveryRider {
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  currentLocationName: string;
  coordinates: { x: number; y: number }; // Relative map coordinates 0-100%
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  title: string;
  bengaliTitle: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  area: string; // Sylhet area e.g. Zindabazar, Amberkhana, Shibgonj, etc.
  notes?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tip: number;
  total: number;
  paymentMethod: 'bkash' | 'nagad' | 'rocket' | 'card' | 'cod';
  paymentStatus: 'pending' | 'paid';
  transactionId?: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDeliveryMinutes: number;
  rider?: DeliveryRider;
  timeline: OrderTimelineEvent[];
  pointsEarned: number;
}

export type LoyaltyTier = 'Midnight Starter' | 'Night Rider' | 'Fuel VIP' | 'Midnight Legend';

export interface LoyaltyVoucher {
  id: string;
  code: string;
  title: string;
  bengaliTitle: string;
  pointsCost: number;
  discountValue: string;
  minSpend: number;
  claimed: boolean;
  iconName: string;
}

export interface LoyaltyProfile {
  customerName: string;
  phone: string;
  points: number;
  tier: LoyaltyTier;
  pointsToNextTier: number;
  lifetimeOrders: number;
  totalSpent: number;
  vouchers: LoyaltyVoucher[];
}

export interface ReviewItem {
  id: string;
  customerName: string;
  rating: number; // 1-5
  date: string;
  menuItemName: string;
  comment: string;
  tags: string[];
  verifiedOrder: boolean;
  likes: number;
  staffReply?: string;
  avatarUrl?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  bengaliName: string;
  category: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  linkedMenuItemIds: string[];
}

export interface PromoDeal {
  id: string;
  code: string;
  title: string;
  bengaliTitle: string;
  description: string;
  bengaliDescription: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend: number;
  tag: string;
  activeHours: string;
  isFlashDeal: boolean;
  expiresInSeconds?: number;
  bannerGradient: string;
}

export interface NotificationMessage {
  id: string;
  title: string;
  bengaliTitle: string;
  message: string;
  bengaliMessage: string;
  time: string;
  type: 'promo' | 'order' | 'system' | 'loyalty';
  read: boolean;
  linkTab?: string;
}

export type AppLanguage = 'en' | 'bn';
export type AppTheme = 'dark' | 'light';
export type ActiveTab =
  | 'menu'
  | 'tracking'
  | 'loyalty'
  | 'reviews'
  | 'promos'
  | 'staff'
  | 'inventory'
  | 'analytics';
