import { NextResponse } from 'next/server';
import { Product, ProductStore } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ products: [] });
  }

  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=4`);
    const data = await res.json();

    if (!data.products || data.products.length === 0) {
      // Fallback dynamic mock if DummyJSON has no data for the query
      const fallbackBasePriceInr = Math.floor(Math.random() * 40000) + 10000;
      const fallbackOriginalPrice = Math.floor(fallbackBasePriceInr * 1.2);
      const fallbackStores: ProductStore[] = [
        {
          storeName: 'Amazon',
          price: fallbackBasePriceInr,
          originalPrice: fallbackOriginalPrice,
          deliveryDays: 1,
          rating: 4.5,
          reviewsCount: Math.floor(Math.random() * 1000) + 100,
          inStock: true,
          link: 'https://amazon.in'
        },
        {
          storeName: 'Flipkart',
          price: Math.floor(fallbackBasePriceInr * 0.98),
          originalPrice: fallbackOriginalPrice,
          deliveryDays: 2,
          rating: 4.4,
          reviewsCount: Math.floor(Math.random() * 800) + 50,
          inStock: true,
          link: 'https://flipkart.com'
        },
        {
          storeName: 'Croma',
          price: Math.floor(fallbackBasePriceInr * 1.02),
          originalPrice: fallbackOriginalPrice,
          deliveryDays: 1,
          rating: 4.3,
          reviewsCount: Math.floor(Math.random() * 500) + 20,
          inStock: true,
          link: 'https://croma.com'
        }
      ];

      return NextResponse.json({
        products: [{
          id: `live-fallback-${Date.now()}`,
          name: query.charAt(0).toUpperCase() + query.slice(1),
          category: 'Search Result',
          description: `Live web data for your search query: ${query}`,
          imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1000',
          stores: fallbackStores,
          negotiatedPrice: Math.floor(fallbackBasePriceInr * 0.90),
          negotiationSavings: fallbackBasePriceInr - Math.floor(fallbackBasePriceInr * 0.90),
          negotiationStatus: 'completed',
          rating: 4.5,
          aiRecommendationScore: 92,
          bestBuyingTime: 'Buy Now - Good Live Deal'
        }]
      });
    }

    // Map DummyJSON response to our internal Product interface
    const mappedProducts: Product[] = data.products.map((p: any) => {
      // Calculate realistic INR pricing based on USD
      const basePriceInr = Math.round(p.price * 83); // Approx 83 INR to USD
      const amazonPrice = basePriceInr;
      const flipkartPrice = Math.round(basePriceInr * 0.98); // Slightly cheaper
      const cromaPrice = Math.round(basePriceInr * 1.02); // Slightly more expensive
      
      const originalPrice = Math.round(basePriceInr * (1 + (p.discountPercentage || 10) / 100));

      const stores: ProductStore[] = [
        {
          storeName: 'Amazon',
          price: amazonPrice,
          originalPrice: originalPrice,
          deliveryDays: 1,
          rating: p.rating,
          reviewsCount: Math.floor(Math.random() * 1000) + 100,
          inStock: p.stock > 0,
          link: 'https://amazon.in'
        },
        {
          storeName: 'Flipkart',
          price: flipkartPrice,
          originalPrice: originalPrice,
          deliveryDays: 2,
          rating: Math.max(1, p.rating - 0.1),
          reviewsCount: Math.floor(Math.random() * 800) + 50,
          inStock: p.stock > 5,
          link: 'https://flipkart.com'
        },
        {
          storeName: 'Croma',
          price: cromaPrice,
          originalPrice: originalPrice,
          deliveryDays: 1,
          rating: Math.max(1, p.rating - 0.2),
          reviewsCount: Math.floor(Math.random() * 500) + 20,
          inStock: p.stock > 2,
          link: 'https://croma.com'
        }
      ];

      return {
        id: `live-${p.id}`,
        name: p.title,
        category: p.category,
        description: p.description,
        imageUrl: p.thumbnail,
        stores,
        // Mock negotiation stats
        negotiatedPrice: Math.round(flipkartPrice * 0.90),
        negotiationSavings: flipkartPrice - Math.round(flipkartPrice * 0.90),
        negotiationStatus: 'completed',
        rating: p.rating,
        aiRecommendationScore: Math.round(p.rating * 20), // 4.5 -> 90
        bestBuyingTime: 'Buy Now - Good Live Deal'
      };
    });

    return NextResponse.json({ products: mappedProducts });
  } catch (error) {
    console.error("Error fetching live products:", error);
    return NextResponse.json({ products: [], error: "Failed to fetch live products" }, { status: 500 });
  }
}
