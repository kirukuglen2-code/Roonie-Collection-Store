"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// Mock products data
const mockProducts = [
  {
    _id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    description: "High-quality sound with noise cancellation technology.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    ],
    features: ["Noise Cancellation", "Wireless", "Long Battery"],
    inStock: true,
    rating: 4.8,
    reviewCount: 124,
    category: "electronics"
  },
  {
    _id: "2", 
    name: "Smart Watch",
    price: 199.99,
    description: "Advanced smartwatch with health tracking.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    ],
    features: ["Health Tracking", "Water Resistant", "Smart Notifications"],
    inStock: true,
    rating: 4.5,
    reviewCount: 89,
    category: "electronics"
  }
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('id');
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Check if we're viewing a specific product
  useEffect(() => {
    if (productId) {
      const product = mockProducts.find(p => p._id === productId);
      setSelectedProduct(product || null);
    } else {
      setSelectedProduct(null);
    }
  }, [productId]);

  const handleAddToCart = (product) => {
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleViewProduct = (productId) => {
    router.push(`/products?id=${productId}`);
  };

  const handleBackToList = () => {
    router.push('/products');
  };

  // If viewing a specific product, show product detail
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-soft-white py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-neutral-600">
              <li><Link href="/" className="hover:text-primary-500 transition duration-200">Home</Link></li>
              <li>→</li>
              <li>
                <button 
                  onClick={handleBackToList}
                  className="hover:text-primary-500 transition duration-200"
                >
                  Products
                </button>
              </li>
              <li>→</li>
              <li className="text-primary-500 font-medium truncate max-w-xs">
                {selectedProduct.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
                <img
                  src={selectedProduct.images?.[selectedImage] || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 object-cover"
                />
              </div>

              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="flex space-x-4 overflow-x-auto">
                  {selectedProduct.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-primary-500" : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${selectedProduct.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-deep-charcoal mb-2">{selectedProduct.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(selectedProduct.rating) ? "text-accent-400" : "text-neutral-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <span className="ml-2 text-neutral-600">
                      {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
                    </span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedProduct.inStock
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-primary-600">${selectedProduct.price}</span>
                <span className="text-neutral-500 line-through">${(selectedProduct.price * 1.2).toFixed(2)}</span>
                <span className="bg-accent-100 text-accent-800 px-2 py-1 rounded text-sm font-medium">
                  20% OFF
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-deep-charcoal mb-2">Description</h3>
                <p className="text-neutral-600 leading-relaxed">{selectedProduct.description}</p>
              </div>

              {selectedProduct.features && (
                <div>
                  <h3 className="text-lg font-semibold text-deep-charcoal mb-3">Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-neutral-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-deep-charcoal font-medium">Quantity:</label>
                  <div className="flex items-center border border-neutral-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-neutral-600 hover:text-primary-600 transition duration-200"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-l border-r border-neutral-300 min-w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-neutral-600 hover:text-primary-600 transition duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAddToCart(selectedProduct)}
                    disabled={!selectedProduct.inStock}
                    className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-soft flex items-center justify-center"
                  >
                    {selectedProduct.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button className="px-6 py-3 border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-semibold rounded-lg transition duration-300">
                    ?
                  </button>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm text-neutral-600">
                  <div>
                    <span className="font-medium text-deep-charcoal">Category:</span> {selectedProduct.category}
                  </div>
                  <div>
                    <span className="font-medium text-deep-charcoal">SKU:</span> {selectedProduct._id}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, show product listing
  return (
    <div className="min-h-screen bg-soft-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-deep-charcoal mb-8">Our Products</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-deep-charcoal mb-2">{product.name}</h3>
                <p className="text-neutral-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                  <button
                    onClick={() => handleViewProduct(product._id)}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
