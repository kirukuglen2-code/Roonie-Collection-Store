"use client";

import React from "react";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-soft-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-deep-charcoal mb-8">Our Products</h1>
        <p className="text-neutral-600 mb-8">Products page is loading...</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Simple product cards without useSearchParams */}
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
              alt="Premium Headphones"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-deep-charcoal mb-2">Premium Headphones</h3>
              <p className="text-neutral-600 mb-4">High-quality sound with noise cancellation.</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary-600">$299.99</span>
                <Link href="/products/1" className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
