// src/app/checkout/page.tsx
'use client';

import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';

export default function CheckoutPage() {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit-card'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate order totals
  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method: string) => {
    setFormData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with your payment API (Stripe, M-Pesa, etc.)
      console.log('Processing order with:', formData);
      
      // Clear cart on successful order
      dispatch({ type: 'CLEAR_CART' });
      
      // Redirect to success page
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle empty cart
  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🛒</span>
          </div>
          <h2 className="text-3xl font-bold text-deep-charcoal mb-4">Your cart is empty</h2>
          <p className="text-neutral-600 mb-8">Add some items to your cart before checking out.</p>
          <Link 
            href="/marketplace"
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-beige py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-deep-charcoal mb-4">Checkout</h1>
          <p className="text-lg text-neutral-600">Complete your purchase with confidence</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Checkout Form */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-200">
                  <h2 className="text-2xl font-bold text-deep-charcoal mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-200">
                  <h2 className="text-2xl font-bold text-deep-charcoal mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-200">
                  <h2 className="text-2xl font-bold text-deep-charcoal mb-4">Payment Method</h2>
                  <div className="space-y-4">
                    <div 
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.paymentMethod === 'credit-card' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-neutral-200 hover:border-primary-300'
                      }`}
                      onClick={() => handlePaymentMethodChange('credit-card')}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={formData.paymentMethod === 'credit-card'}
                        onChange={() => handlePaymentMethodChange('credit-card')}
                        className="text-primary-600 focus:ring-primary-500" 
                      />
                      <span className="text-neutral-700 font-medium">Credit Card</span>
                    </div>
                    <div 
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.paymentMethod === 'mpesa' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-neutral-200 hover:border-primary-300'
                      }`}
                      onClick={() => handlePaymentMethodChange('mpesa')}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={formData.paymentMethod === 'mpesa'}
                        onChange={() => handlePaymentMethodChange('mpesa')}
                        className="text-primary-600 focus:ring-primary-500" 
                      />
                      <span className="text-neutral-700 font-medium">M-Pesa</span>
                    </div>
                    <div 
                      className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        formData.paymentMethod === 'paypal' 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-neutral-200 hover:border-primary-300'
                      }`}
                      onClick={() => handlePaymentMethodChange('paypal')}
                    >
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={() => handlePaymentMethodChange('paypal')}
                        className="text-primary-600 focus:ring-primary-500" 
                      />
                      <span className="text-neutral-700 font-medium">PayPal</span>
                    </div>
                  </div>

                  {/* Payment Method Details */}
                  {formData.paymentMethod === 'credit-card' && (
                    <div className="mt-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-neutral-700 mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">CVC</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'mpesa' && (
                    <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
                      <p className="text-primary-700 text-sm">
                        You'll receive an M-Pesa prompt on your phone to complete the payment.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-200 sticky top-8">
                  <h2 className="text-2xl font-bold text-deep-charcoal mb-6">Order Summary</h2>
                  
                  {/* Order Items */}
                  <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                    {state.cart.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4 py-3 border-b border-neutral-100">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-deep-charcoal">{item.name}</h3>
                          <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary-600">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-deep-charcoal">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Secure Checkout */}
                  <div className="bg-primary-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 text-primary-700">
                      <span>🔒</span>
                      <span className="text-sm font-medium">Secure checkout • SSL encrypted</span>
                    </div>
                  </div>

                  {/* Complete Order Button */}
                  <button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 mb-4 flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      'Complete Order'
                    )}
                  </button>

                  {/* Continue Shopping */}
                  <Link 
                    href="/marketplace" 
                    className="block text-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary-600 text-xl">🚚</span>
                      </div>
                      <p className="text-sm text-neutral-600">Free Shipping Over $100</p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary-600 text-xl">↩️</span>
                      </div>
                      <p className="text-sm text-neutral-600">30-Day Returns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}