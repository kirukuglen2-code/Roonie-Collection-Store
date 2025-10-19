// src/components/ui/AddToCartButton.tsx
"use client";

import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";

interface AddToCartButtonProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
    inStock: boolean;
  };
  quantity?: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
  showIcon?: boolean;
  className?: string;
}

export default function AddToCartButton({ 
  product, 
  quantity = 1,
  size = "md",
  variant = "primary",
  showIcon = true,
  className = ""
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { dispatch } = useAppContext();

  const handleAddToCart = async () => {
    if (!product.inStock) return;
    
    setIsLoading(true);
    
    // Simulate API call/processing
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Add to cart logic
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        inStock: product.inStock
      }
    });
    
    setIsLoading(false);
    setIsAdded(true);
    
    // Reset added state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base", 
    lg: "px-8 py-4 text-lg"
  };

  // Variant classes
  const variantClasses = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white shadow-soft hover:shadow-lg",
    secondary: "bg-accent-400 hover:bg-accent-500 text-white shadow-soft hover:shadow-lg",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 bg-transparent"
  };

  // Base classes
  const baseClasses = "font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2";

  return (
    <button
      onClick={handleAddToCart}
      disabled={!product.inStock || isLoading}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${isAdded ? 'bg-green-500 hover:bg-green-600 border-green-500' : ''}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Adding...</span>
        </>
      ) : isAdded ? (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Added to Cart!</span>
        </>
      ) : !product.inStock ? (
        <span>Out of Stock</span>
      ) : (
        <>
          {showIcon && (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          )}
          <span>Add to Cart</span>
          {size !== "sm" && (
            <span className="opacity-90">• ${product.price}</span>
          )}
        </>
      )}
    </button>
  );
}
