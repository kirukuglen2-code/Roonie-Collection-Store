import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-amber-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-600 to-amber-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-900 max-w-2xl mx-auto leading-relaxed">
            Crafting exceptional experiences through premium products and unwavering dedication to quality
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-75"></div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full border border-gray-100">
              <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To redefine online shopping by curating exceptional products that blend craftsmanship, 
                sustainability, and modern elegance. We believe every purchase should be an experience 
                worth celebrating.
              </p>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full border border-gray-100">
              <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl">🌟</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Creating a world where quality triumphs over quantity, and every customer feels 
                the care and attention we put into selecting products that enhance daily life 
                with beauty and purpose.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '💎',
                title: 'Quality First',
                description: 'Every product undergoes rigorous selection to ensure it meets our premium standards.'
              },
              {
                icon: '🌱',
                title: 'Sustainability',
                description: 'We prioritize eco-friendly products and ethical business practices.'
              },
              {
                icon: '🤝',
                title: 'Customer Care',
                description: 'Your satisfaction is our priority, with personalized service at every step.'
              }
            ].map((value, index) => (
              <div 
                key={value.title}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-amber-50 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Ronnie</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The visionary behind our curated collection
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 bg-gradient-to-br from-amber-600 to-amber-400 rounded-full flex items-center justify-center">
                <span className="text-6xl">👑</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ronnie, Founder & Curator</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  With over a decade of experience in product curation and a passion for exceptional 
                  craftsmanship, Ronnie personally selects every item in our collection. His dedication 
                  to quality and customer satisfaction is the foundation of everything we do.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-amber-50 px-4 py-2 rounded-full">
                    <span className="text-amber-700 font-semibold">10+ Years Experience</span>
                  </div>
                  <div className="bg-amber-50 px-4 py-2 rounded-full">
                    <span className="text-amber-700 font-semibold">Product Expert</span>
                  </div>
                  <div className="bg-amber-50 px-4 py-2 rounded-full">
                    <span className="text-amber-700 font-semibold">Quality Advocate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Quality?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have discovered the difference premium products make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/marketplace" 
                className="bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Explore Products
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 inline-block"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}