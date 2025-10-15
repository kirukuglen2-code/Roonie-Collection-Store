// client/src/pages/Cart.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity: newQuantity }
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: productId
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const subtotal = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  const continueShopping = () => {
    navigate('/marketplace');
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-soft-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <svg
              className="w-32 h-32 text-neutral-400 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-3xl font-bold text-deep-charcoal mb-4">
              Your cart is empty
            </h2>
            <p className="text-neutral-600 mb-8">
              Discover our premium products and add something special to your cart.
            </p>
            <button
              onClick={continueShopping}
              className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-soft"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-deep-charcoal">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-soft p-6 flex items-center space-x-6 animate-fade-in"
              >
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-deep-charcoal mb-2">
                    {item.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary-600">
                    ${item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-lg hover:bg-neutral-50 transition duration-200"
                  >
                    <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  
                  <span className="w-12 text-center text-lg font-semibold text-deep-charcoal">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-neutral-300 rounded-lg hover:bg-neutral-50 transition duration-200"
                  >
                    <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-xl font-bold text-deep-charcoal mb-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-deep-charcoal mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                
                <hr className="border-neutral-300" />
                
                <div className="flex justify-between items-center text-lg">
                  <span className="font-bold text-deep-charcoal">Total</span>
                  <span className="font-bold text-primary-600">${total.toFixed(2)}</span>
                </div>

                {shipping === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-green-700 text-sm text-center">
                      🎉 Free shipping on orders over $100!
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-6 rounded-lg transition duration-300 shadow-soft hover:shadow-glow"
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={continueShopping}
                  className="w-full border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-semibold py-4 px-6 rounded-lg transition duration-300"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-center space-x-6 text-neutral-500">
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span className="text-xs">Secure Payment</span>
                  </div>
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="text-xs">Free Returns</span>
                  </div>
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs">Price Match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;