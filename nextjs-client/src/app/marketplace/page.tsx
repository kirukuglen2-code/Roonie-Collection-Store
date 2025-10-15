import { storeAPI } from '@/lib/api';
import ProductCard from '@/components/ui/ProductCard';
import { Suspense } from 'react';
import { Product } from '@/type'; // Import the shared type

// Loading component for better UX
function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="premium-card animate-pulse">
          <div className="h-72 bg-gradient-to-br from-beige to-muted-gold"></div>
          <div className="p-6 space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            <div className="flex justify-between items-center pt-4">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Enhanced filtering and sorting component
function MarketplaceControls() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 p-6 bg-white rounded-2xl shadow-soft border border-opacity-10 border-gray-200">
      <div>
        <h2 className="text-2xl font-bold text-deep-charcoal">Curated Collection</h2>
        <p className="text-gray-600 mt-1">Handpicked items for the discerning customer</p>
      </div>
      
      <div className="flex flex-wrap gap-4 mt-4 sm:mt-0">
        <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-muted-gold focus:border-transparent bg-white">
          <option>All Categories</option>
          <option>Beverages</option>
          <option>Home & Living</option>
          <option>Personal Care</option>
        </select>
        
        <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-muted-gold focus:border-transparent bg-white">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
        </select>
      </div>
    </div>
  );
}

export default async function MarketplacePage() {
  // Initialize with proper typing using the shared Product type
  let products: Product[] = [];
  
  try {
    const response = await storeAPI.products.getAll();
    // Transform the API response to ensure description is always a string
    products = (response.data || []).map((product: any) => ({
      ...product,
      description: product.description || 'No description available', // Ensure description is never undefined
    })) as Product[];
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-soft-white to-beige">
      {/* Premium Hero Section */}
      <section className="relative bg-gradient-to-r from-warm-brown to-muted-gold text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Premium Finds,
            <br />
            <span className="text-deep-charcoal">Exceptional Quality</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-deep-charcoal max-w-2xl mx-auto leading-relaxed">
            Discover carefully curated products that blend craftsmanship with modern elegance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-deep-charcoal text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-all duration-300 transform hover:scale-105">
              Explore Collection
            </button>
            <button className="border-2 border-deep-charcoal text-deep-charcoal px-8 py-4 rounded-xl font-semibold hover:bg-deep-charcoal hover:text-white transition-all duration-300">
              Learn Our Story
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-muted-gold rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-warm-brown rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 -mt-10 relative z-10">
        <MarketplaceControls />
        
        <Suspense fallback={<ProductGridSkeleton />}>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, index) => (
                <div 
                  key={product._id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-beige to-muted-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We're curating an exceptional collection of premium products. 
                Check back soon for our exclusive launch.
              </p>
            </div>
          )}
        </Suspense>

        {/* AI Recommendations Placeholder */}
        <section className="mt-20 p-8 bg-white rounded-2xl shadow-soft border border-opacity-10 border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Recommendations</h3>
            <p className="text-gray-600 mb-6">
              Our AI is learning your preferences to bring you perfectly matched products
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-warm-brown to-muted-gold mx-auto rounded-full"></div>
          </div>
        </section>
      </div>
    </div>
  );
}