// nextjs-client/src/app/cart/page.tsx
'use client';

import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { state, dispatch } = useAppContext();
  
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity: newQuantity }
    });
  };
  
  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = 200; // Fixed shipping fee for Kenya
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
          {state.cart.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Clear Cart
            </button>
          )}
        </div>
        
        {state.cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <p className="text-gray-400 mb-8">Add some products to get started</p>
            <Link 
              href="/marketplace" 
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.cart.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md p-6 flex items-center">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 bg-gray-200 rounded mr-6 flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-amber-600 font-bold text-lg">KSh {item.price.toLocaleString()}</p>
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 mx-6">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <span className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"}>−</span>
                    </button>
                    <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-600">+</span>
                    </button>
                  </div>
                  
                  {/* Item Total */}
                  <div className="text-right mx-6">
                    <p className="text-lg font-semibold text-gray-900">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({state.cart.reduce((count, item) => count + item.quantity, 0)} items)</span>
                  <span>KSh {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>KSh {shippingFee.toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-amber-600">KSh {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link 
                  href="/checkout" 
                  className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors text-center block"
                >
                  Proceed to Checkout
                </Link>
                
                <Link 
                  href="/marketplace" 
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
              
              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure checkout · 100% guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}