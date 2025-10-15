// client/src/pages/ProductDetails.jsx
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, products } = useContext(AppContext);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find product by ID - in real app, this would be from API
  const product = products.find(p => p.id === parseInt(id)) || {
    id: 1,
    name: "Premium Product",
    price: 99.99,
    description: "A beautifully crafted premium product with exceptional quality and design.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    ],
    features: ["Premium Materials", "Eco-Friendly", "Lifetime Warranty", "Fast Shipping"],
    inStock: true,
    rating: 4.8,
    reviewCount: 124
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    // Show success message or redirect
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">Product Not Found</h2>
          <p className="text-neutral-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-neutral-600">
            <li>Home</li>
            <li>→</li>
            <li>Marketplace</li>
            <li>→</li>
            <li className="text-primary-500 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary-500' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-deep-charcoal mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-accent-400' : 'text-neutral-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="ml-2 text-neutral-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-primary-600">${product.price}</span>
              <span className="text-neutral-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
              <span className="bg-accent-100 text-accent-800 px-2 py-1 rounded text-sm font-medium">
                20% OFF
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-deep-charcoal mb-2">Description</h3>
              <p className="text-neutral-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-deep-charcoal mb-3">Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-neutral-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-deep-charcoal font-medium">Quantity:</label>
                <div className="flex items-center border border-neutral-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-neutral-600 hover:text-primary-600"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-l border-r border-neutral-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-neutral-600 hover:text-primary-600"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-soft"
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button className="px-6 py-3 border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-semibold rounded-lg transition duration-300">
                  ♡
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;