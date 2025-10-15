// client/src/pages/OrderTracking.jsx
import React, { useState } from 'react';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking data - replace with actual API call
  const mockTrackingData = {
    orderId: 'RNY-2024-00123',
    status: 'in-transit',
    estimatedDelivery: '2024-12-28',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    items: [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        quantity: 1,
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'
      },
      {
        id: 2,
        name: 'Charging Case',
        quantity: 1,
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200'
      }
    ],
    shippingAddress: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States'
    },
    trackingHistory: [
      {
        status: 'delivered',
        description: 'Delivered to customer',
        location: 'New York, NY',
        timestamp: '2024-12-28T14:30:00Z',
        completed: false
      },
      {
        status: 'out-for-delivery',
        description: 'Out for delivery',
        location: 'New York Distribution Center',
        timestamp: '2024-12-28T08:15:00Z',
        completed: false
      },
      {
        status: 'in-transit',
        description: 'In transit to destination',
        location: 'Regional Sorting Facility',
        timestamp: '2024-12-27T20:45:00Z',
        completed: true
      },
      {
        status: 'shipped',
        description: 'Package shipped',
        location: 'Warehouse Facility',
        timestamp: '2024-12-26T09:20:00Z',
        completed: true
      },
      {
        status: 'processing',
        description: 'Order confirmed and processing',
        location: 'Online Store',
        timestamp: '2024-12-25T14:00:00Z',
        completed: true
      }
    ]
  };

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTrackingData(mockTrackingData);
    } catch (error) {
      console.error('Tracking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'processing': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'in-transit': 'bg-yellow-100 text-yellow-800',
      'out-for-delivery': 'bg-orange-100 text-orange-800',
      'delivered': 'bg-green-100 text-green-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const statusTexts = {
      'processing': 'Processing',
      'shipped': 'Shipped',
      'in-transit': 'In Transit',
      'out-for-delivery': 'Out for Delivery',
      'delivered': 'Delivered'
    };
    return statusTexts[status] || status;
  };

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            Track Your Order
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            Follow your package in real-time from our warehouse to your doorstep
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up">
          <form onSubmit={handleTrackOrder} className="bg-white rounded-2xl shadow-soft p-8 border border-neutral-200">
            <h2 className="text-2xl font-bold text-deep-charcoal mb-4">
              Enter Order Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Order ID *
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g., RNY-2024-00123"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                  required
                />
                <p className="text-sm text-neutral-500 mt-2">
                  Find your Order ID in your order confirmation email
                </p>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white font-semibold py-3 rounded-lg transition duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Tracking...
                  </>
                ) : (
                  'Track Order'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Results */}
        {trackingData && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-deep-charcoal mb-2">
                    Order #{trackingData.orderId}
                  </h2>
                  <p className="text-neutral-600">
                    Estimated delivery: <strong>{new Date(trackingData.estimatedDelivery).toLocaleDateString()}</strong>
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full font-medium ${getStatusColor(trackingData.status)}`}>
                  {getStatusText(trackingData.status)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between mb-2 text-sm text-neutral-600">
                  <span>Order Placed</span>
                  <span>Shipped</span>
                  <span>In Transit</span>
                  <span>Out for Delivery</span>
                  <span>Delivered</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: trackingData.status === 'processing' ? '20%' :
                             trackingData.status === 'shipped' ? '40%' :
                             trackingData.status === 'in-transit' ? '60%' :
                             trackingData.status === 'out-for-delivery' ? '80%' : '100%'
                    }}
                  ></div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-deep-charcoal mb-4">Tracking History</h3>
                {trackingData.trackingHistory.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      event.completed ? 'bg-primary-500' : 'bg-neutral-300'
                    }`}></div>
                    <div className={`flex-1 pb-4 ${
                      index !== trackingData.trackingHistory.length - 1 ? 'border-l-2 border-neutral-200' : ''
                    } pl-4`}>
                      <div className="flex justify-between items-start mb-1">
                        <span className={`font-semibold ${
                          event.completed ? 'text-deep-charcoal' : 'text-primary-600'
                        }`}>
                          {getStatusText(event.status)}
                        </span>
                        <span className="text-sm text-neutral-500">
                          {new Date(event.timestamp).toLocaleDateString()} at {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-neutral-600 mb-1">{event.description}</p>
                      <p className="text-sm text-neutral-500">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Items */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-200">
                  <h3 className="text-xl font-bold text-deep-charcoal mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {trackingData.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-neutral-100 last:border-b-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-deep-charcoal">{item.name}</h4>
                          <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary-600">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-200">
                  <h3 className="text-xl font-bold text-deep-charcoal mb-4">Shipping Address</h3>
                  <div className="text-neutral-600 space-y-2">
                    <p>{trackingData.customer.name}</p>
                    <p>{trackingData.shippingAddress.street}</p>
                    <p>
                      {trackingData.shippingAddress.city}, {trackingData.shippingAddress.state} {trackingData.shippingAddress.postalCode}
                    </p>
                    <p>{trackingData.shippingAddress.country}</p>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-2xl p-6 border border-primary-200">
                  <h3 className="text-lg font-bold text-deep-charcoal mb-3">Need Help?</h3>
                  <p className="text-neutral-600 mb-4">
                    If you have any questions about your order, our support team is here to help.
                  </p>
                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 rounded-lg transition duration-300">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results State */}
        {!trackingData && orderId && !isLoading && (
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-soft p-8 border border-neutral-200">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-deep-charcoal mb-4">
                Order Not Found
              </h3>
              <p className="text-neutral-600 mb-6">
                We couldn't find an order with ID: <strong>{orderId}</strong>. Please check your order confirmation email and try again.
              </p>
              <button
                onClick={() => setOrderId('')}
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              >
                Try Another Order ID
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;