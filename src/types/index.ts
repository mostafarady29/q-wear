export type Category = 'all' | 'hoodies' | 'outerwear' | 'tees' | 'pants' | 'footwear' | 'accessories';

export type Language = 'en' | 'ar';

export type CurrencyCode = 'EGP';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number;
  name: string;
}

export interface ProductColor {
  name: string;
  nameAr?: string;
  hex: string;
  image?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  fitRating: 'runs-small' | 'true-to-size' | 'runs-large';
  userHeight?: string;
  userWeight?: string;
  sizePurchased: string;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  nameAr?: string;
  subtitle: string;
  subtitleAr?: string;
  price: number;
  originalPrice?: number;
  category: Category;
  categoryAr?: string;
  gsm?: number; // Fabric weight in GSM
  material: string;
  materialAr?: string;
  origin: string;
  originAr?: string;
  fit: 'Oversized Boxy' | 'Relaxed Tailored' | 'Straight Cut' | 'Architectural Loose';
  fitAr?: string;
  releaseDrop: string;
  releaseDropAr?: string;
  tags: string[];
  tagsAr?: string[];
  isNew?: boolean;
  isLimited?: boolean;
  isSoldOut?: boolean;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  description: string;
  descriptionAr?: string;
  features: string[];
  featuresAr?: string[];
  careInstructions: string[];
  careInstructionsAr?: string[];
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export interface DropCollection {
  id: string;
  name: string;
  season: string;
  code: string;
  releaseDate: string;
  status: 'live' | 'upcoming' | 'vault';
  heroImage: string;
  description: string;
  itemCount: number;
}

export interface SizeRecommendation {
  recommendedSize: string;
  confidence: number;
  fitNotes: string;
  dimensions: {
    chestCm: number;
    lengthCm: number;
    shoulderCm: number;
  };
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  currency: CurrencyCode;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
  };
  paymentMethod: string;
  date: string;
  trackingCode: string;
}

export interface User {
  id: string;
  clientId: string;
  name: string;
  email: string;
  city?: string;
  country?: string;
  tier: 'CLIENT' | 'OBSIDIAN VIP' | 'FOUNDER ARCHIVE';
  joinedDate: string;
  ordersCount?: number;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}
