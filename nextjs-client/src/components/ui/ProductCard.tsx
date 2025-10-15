'use client';

import { useAppContext } from '@/context/AppContext';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/type';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useAppContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Simulate premium interaction feedback
    setTimeout(() => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: 1
        }
      });
      setIsAdding(false);
    }, 300);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in">
      {/* Premium Image Container */}
      <div className="relative h-72 w-full bg-gradient-to-br from-amber-50 to-amber-200 overflow-hidden">
        {product.image ? (
          <>
            {/* Loading Skeleton */}
            <div className={`absolute inset-0 bg-white transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex items-center justify-center h-full">
                <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            
            {/* Product Image */}
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              onLoad={() => setImageLoaded(true)}
              priority={false}
            />
          </>
        ) : (
          /* Fallback when no image */
          <div className="flex items-center justify-center h-full text-gray-400">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-400 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-sm">Image Coming Soon</p>
            </div>
          </div>
        )}
        
        {/* Premium Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-amber-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Premium
          </span>
        </div>
        
        {/* Quick Add Button - Appears on Hover */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="bg-white text-amber-600 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
            aria-label="Add to cart"
          >
            {isAdding ? (
              <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-6">
        {/* Category */}
        {product.category && (
          <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-2">
            {product.category}
          </p>
        )}
        
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-amber-600 transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-amber-600">
              KSh {product.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">Inclusive of taxes</span>
          </div>
          
          {/* Main Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-3 rounded-lg hover:bg-amber-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Adding...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm">Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}