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

    if (!data.products) {
      return NextResponse.json({ products: [] });
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
