// client/src/pages/Marketplace.jsx
import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Marketplace = () => {
  const { addToCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Mock categories - replace with your actual categories
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Living' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'sports', name: 'Sports' },
  ];

  // Mock products data - replace with your API call
  useEffect(() => {
    const mockProducts = [
      {
        _id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        category: 'electronics',
        description: 'High-quality sound with noise cancellation',
        rating: 4.8,
        reviewCount: 124,
        inStock: true,
        featured: true
      },
      {
        _id: '2',
        name: 'Designer Watch Collection',
        price: 459.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        category: 'fashion',
        description: 'Luxury timepiece with premium materials',
        rating: 4.9,
        reviewCount: 89,
        inStock: true,
        featured: true
      },
      {
        _id: '3',
        name: 'Organic Skincare Set',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500',
        category: 'beauty',
        description: 'Natural ingredients for radiant skin',
        rating: 4.7,
        reviewCount: 203,
        inStock: true,
        featured: false
      },
      {
        _id: '4',
        name: 'Smart Home Assistant',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?w=500',
        category: 'electronics',
        description: 'Voice-controlled home automation',
        rating: 4.5,
        reviewCount: 167,
        inStock: true,
        featured: false
      },
      {
        _id: '5',
        name: 'Yoga Mat Premium',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500',
        category: 'sports',
        description: 'Non-slip eco-friendly yoga mat',
        rating: 4.6,
        reviewCount: 98,
        inStock: true,
        featured: false
      },
      {
        _id: '6',
        name: 'Artisan Coffee Set',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
        category: 'home',
        description: 'Premium coffee brewing equipment',
        rating: 4.9,
        reviewCount: 67,
        inStock: false,
        featured: true
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setLoading(false);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = products;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured first, then by name
        result = [...result].sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.name.localeCompare(b.name);
        });
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
    // You can add a toast notification here
    console.log(`Added ${product.name} to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            Premium Marketplace
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
            Discover curated products with exceptional quality and design
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-fade-in-up animation-delay-500">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white shadow-soft'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow-soft'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-4">
            <label className="text-neutral-700 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="featured">Featured</option>
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-elevated transition duration-300 animate-fade-in-up group"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                />
                {product.featured && (
                  <div className="absolute top-4 left-4 bg-accent-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-white text-neutral-800 px-4 py-2 rounded-lg font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-deep-charcoal line-clamp-2">
                    {product.name}
                  </h3>
                  <span className="text-2xl font-bold text-primary-600 ml-2">
                    ${product.price}
                  </span>
                </div>

                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-accent-400' : 'text-neutral-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <span className="text-sm text-neutral-600 ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ${
                    product.inStock
                      ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-glow'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="w-24 h-24 text-neutral-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
            </svg>
            <h3 className="text-2xl font-semibold text-neutral-600 mb-2">
              No products found
            </h3>
            <p className="text-neutral-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;