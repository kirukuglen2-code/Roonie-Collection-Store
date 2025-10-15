'use client';

import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';

export default function Navbar() {
  const { state } = useAppContext();
  const cartItemCount = state.cart.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-amber-600 transition-colors">
          Ronnie's Store
        </Link>
        
        <div className="flex gap-6 items-center">
          <Link href="/marketplace" className="text-gray-700 hover:text-gray-900 font-medium">
            Shop
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
            Contact
          </Link>
          
          <Link href="/cart" className="relative text-gray-700 hover:text-gray-900 font-medium">
            Cart
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}