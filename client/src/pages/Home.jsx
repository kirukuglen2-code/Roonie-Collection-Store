// client/src/pages/Home.jsx
import React from 'react';

const Home = () => {
  const appName = import.meta.env.VITE_APP_NAME;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">{appName}</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your premium shopping destination with curated products and exceptional service.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default Home;