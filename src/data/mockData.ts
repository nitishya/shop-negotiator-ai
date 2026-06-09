export interface ProductStore {
  storeName: 'Amazon' | 'Flipkart' | 'Croma';
  price: number;
  originalPrice: number;
  deliveryDays: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  link: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  stores: ProductStore[];
  negotiatedPrice?: number;
  negotiationSavings?: number;
  negotiationStatus?: 'idle' | 'scanning' | 'negotiating' | 'completed';
  rating?: number;
  aiRecommendationScore?: number;
  historicalPrices?: number[];
  bestBuyingTime?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  description: string;
  minSpend: number;
}

export interface NegotiationStep {
  id: number;
  speaker: 'agent' | 'user' | 'store_bot' | 'system';
  speakerName: string;
  avatarUrl?: string;
  message: string;
  timestamp: string;
  statusLabel?: string;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Audio',
    description: 'Industry leading noise canceling wireless headphones with Auto NC Optimizer, crystal clear hands-free calling, and Alexa Voice Control.',
    imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop',
    stores: [
      {
        storeName: 'Amazon',
        price: 29990,
        originalPrice: 34990,
        deliveryDays: 1,
        rating: 4.6,
        reviewsCount: 1540,
        inStock: true,
        link: 'https://amazon.in'
      },
      {
        storeName: 'Flipkart',
        price: 28499,
        originalPrice: 34990,
        deliveryDays: 2,
        rating: 4.5,
        reviewsCount: 980,
        inStock: true,
        link: 'https://flipkart.com'
      },
      {
        storeName: 'Croma',
        price: 29900,
        originalPrice: 34990,
        deliveryDays: 1,
        rating: 4.4,
        reviewsCount: 420,
        inStock: true,
        link: 'https://croma.com'
      }
    ],
    negotiatedPrice: 25500,
    negotiationSavings: 4490,
    negotiationStatus: 'completed',
    rating: 4.8,
    aiRecommendationScore: 95,
    historicalPrices: [34990, 32990, 29990, 31990, 29990, 28499],
    bestBuyingTime: 'Buy Now - Historical Low'
  },
  {
    id: 'macbook-pro-m3',
    name: 'Apple MacBook Pro M3 (14-inch)',
    category: 'Computers',
    description: 'Apple M3 chip with 8-core CPU and 10-core GPU, 8GB Unified Memory, 512GB SSD storage, 14-inch Liquid Retina XDR Display.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop',
    stores: [
      {
        storeName: 'Amazon',
        price: 159900,
        originalPrice: 169900,
        deliveryDays: 2,
        rating: 4.8,
        reviewsCount: 230,
        inStock: true,
        link: 'https://amazon.in'
      },
      {
        storeName: 'Flipkart',
        price: 162500,
        originalPrice: 169900,
        deliveryDays: 3,
        rating: 4.7,
        reviewsCount: 115,
        inStock: true,
        link: 'https://flipkart.com'
      },
      {
        storeName: 'Croma',
        price: 157900,
        originalPrice: 169900,
        deliveryDays: 1,
        rating: 4.6,
        reviewsCount: 85,
        inStock: true,
        link: 'https://croma.com'
      }
    ],
    negotiatedPrice: 148500,
    negotiationSavings: 11400,
    negotiationStatus: 'completed',
    rating: 4.9,
    aiRecommendationScore: 88,
    historicalPrices: [169900, 169900, 164900, 159900, 162500, 157900],
    bestBuyingTime: 'Wait - Expected to drop next week'
  },
  {
    id: 'ipad-air-m2',
    name: 'Apple iPad Air M2 (11-inch)',
    category: 'Tablets',
    description: '11-inch Liquid Retina Display, 128GB, Wi-Fi 6E, 12MP Front/Back Camera, Touch ID, All-day Battery Life.',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop',
    stores: [
      {
        storeName: 'Amazon',
        price: 59900,
        originalPrice: 59900,
        deliveryDays: 1,
        rating: 4.7,
        reviewsCount: 340,
        inStock: true,
        link: 'https://amazon.in'
      },
      {
        storeName: 'Flipkart',
        price: 58900,
        originalPrice: 59900,
        deliveryDays: 2,
        rating: 4.6,
        reviewsCount: 210,
        inStock: true,
        link: 'https://flipkart.com'
      },
      {
        storeName: 'Croma',
        price: 59499,
        originalPrice: 59900,
        deliveryDays: 1,
        rating: 4.5,
        reviewsCount: 95,
        inStock: true,
        link: 'https://croma.com'
      }
    ],
    negotiatedPrice: 54000,
    negotiationSavings: 5900,
    negotiationStatus: 'completed',
    rating: 4.7,
    aiRecommendationScore: 92,
    historicalPrices: [59900, 59900, 59900, 59900, 58900, 58900],
    bestBuyingTime: 'Buy Now - High Demand'
  },
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra (256GB)',
    category: 'Phones',
    description: 'Titanium Gray, 12GB RAM, AI Features (Circle to Search, Live Translate, Note Assist), 200MP Zoom Camera.',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop',
    stores: [
      {
        storeName: 'Amazon',
        price: 129999,
        originalPrice: 134999,
        deliveryDays: 1,
        rating: 4.6,
        reviewsCount: 780,
        inStock: true,
        link: 'https://amazon.in'
      },
      {
        storeName: 'Flipkart',
        price: 127999,
        originalPrice: 134999,
        deliveryDays: 3,
        rating: 4.5,
        reviewsCount: 450,
        inStock: true,
        link: 'https://flipkart.com'
      },
      {
        storeName: 'Croma',
        price: 128499,
        originalPrice: 134999,
        deliveryDays: 1,
        rating: 4.6,
        reviewsCount: 220,
        inStock: true,
        link: 'https://croma.com'
      }
    ],
    negotiatedPrice: 119000,
    negotiationSavings: 10999,
    negotiationStatus: 'completed',
    rating: 4.8,
    aiRecommendationScore: 98,
    historicalPrices: [134999, 134999, 129999, 128999, 128499, 127999],
    bestBuyingTime: 'Buy Now - Excellent Deal'
  }
];

export const MOCK_COUPONS: Coupon[] = [
  {
    code: 'NEGOTIATOR15',
    discountType: 'percentage',
    value: 15,
    description: 'Negotiator Launch Special: Extra 15% off service fee.',
    minSpend: 0
  },
  {
    code: 'WELCOME20',
    discountType: 'fixed',
    value: 2000,
    description: 'Welcome Promo: ₹2,000 flat discount on final price.',
    minSpend: 15000
  },
  {
    code: 'FIRSTDEAL',
    discountType: 'fixed',
    value: 500,
    description: 'First Deal Bonus: Flat ₹500 off on checkout.',
    minSpend: 5000
  }
];

export const NEGOTIATION_SCRIPT: NegotiationStep[] = [
  {
    id: 1,
    speaker: 'system',
    speakerName: 'System',
    message: 'Establishing encrypted channel to AI Negotiator Bot...',
    timestamp: '00:01',
    statusLabel: 'Connecting'
  },
  {
    id: 2,
    speaker: 'agent',
    speakerName: 'Negotiator Agent',
    message: 'Hello! I am connected to your browser and ready to negotiate the best deal. I see you are looking at the Sony WH-1000XM5 Headphones. Standard retail price is ₹29,990. Let me run a live scan across major platforms.',
    timestamp: '00:05',
    statusLabel: 'Scanning Stores'
  },
  {
    id: 3,
    speaker: 'system',
    speakerName: 'System',
    message: 'Scanned stores: Amazon (₹29,990), Flipkart (₹28,499), Croma (₹29,900). Lowest active listing found on Flipkart.',
    timestamp: '00:12',
    statusLabel: 'Scan Complete'
  },
  {
    id: 4,
    speaker: 'agent',
    speakerName: 'Negotiator Agent',
    message: 'Okay, Flipkart is currently leading at ₹28,499. I will ping Croma API chatbot and Amazon vendor support console using API credit tokens to match or beat this.',
    timestamp: '00:18',
    statusLabel: 'Negotiating (Croma)'
  },
  {
    id: 5,
    speaker: 'store_bot',
    speakerName: 'Croma Vendor Assistant',
    message: 'Hello, I represent Croma. Under our price-match guarantee and active bank promotions, we can offer an instant clearance code worth ₹1,500 off our listed price. This brings Croma price down to ₹27,490.',
    timestamp: '00:27',
    statusLabel: 'Counter Offer Received'
  },
  {
    id: 6,
    speaker: 'agent',
    speakerName: 'Negotiator Agent',
    message: 'We got Croma down to ₹27,490. Let me feed this back to Flipkart B2B chatbot and prompt them with a volume-purchase clearance argument. Let us see if Flipkart will cut further to secure this transaction immediately.',
    timestamp: '00:35',
    statusLabel: 'Negotiating (Flipkart)'
  },
  {
    id: 7,
    speaker: 'store_bot',
    speakerName: 'Flipkart Merchant API',
    message: 'Request analyzed. To match volume threshold and clear warehouse stock, we have generated a merchant promotional code bringing the final checkout value to ₹25,500. Offer valid for 15 minutes.',
    timestamp: '00:48',
    statusLabel: 'Final Price Locked'
  },
  {
    id: 8,
    speaker: 'agent',
    speakerName: 'Negotiator Agent',
    message: 'Boom! We did it! The price of the Sony WH-1000XM5 has been negotiated down to ₹25,500. This saves you ₹2,999 from the best online price (and ₹4,490 off the original list price). Click "Lock Deal" to add it to your cart and claim this discount!',
    timestamp: '00:54',
    statusLabel: 'Completed'
  }
];
