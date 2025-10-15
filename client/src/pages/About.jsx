// client/src/pages/About.jsx
import React from 'react';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      description: 'Passionate about creating exceptional shopping experiences.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      description: 'Curates the finest products with uncompromising quality standards.'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      description: 'Ensures every customer feels valued and supported.'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '500+', label: 'Premium Products' },
    { number: '50+', label: 'Brand Partners' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const values = [
    {
      icon: '⭐',
      title: 'Quality First',
      description: 'Every product is carefully selected for exceptional quality and craftsmanship.'
    },
    {
      icon: '🌱',
      title: 'Sustainable Sourcing',
      description: 'We prioritize eco-friendly materials and ethical production practices.'
    },
    {
      icon: '💎',
      title: 'Premium Experience',
      description: 'From browsing to delivery, we ensure a seamless luxury experience.'
    },
    {
      icon: '🤝',
      title: 'Community Focus',
      description: 'We build lasting relationships with our customers and partners.'
    }
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            Our Story
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            We're redefining online shopping with carefully curated products, 
            exceptional quality, and a commitment to sustainable luxury.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold text-deep-charcoal mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                Founded in 2020, we set out to create a shopping experience that 
                combines the convenience of e-commerce with the personalized touch 
                of boutique shopping. Every product in our collection is chosen for 
                its quality, design, and positive impact.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                We believe that shopping should be an enjoyable, meaningful experience 
                that connects you with products you'll love for years to come.
              </p>
            </div>
            <div className="animate-fade-in-up animation-delay-200">
              <div className="bg-white rounded-2xl shadow-soft p-8 border border-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600"
                  alt="Our workspace"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <h3 className="text-2xl font-bold text-deep-charcoal mb-4">
                  Crafting Excellence
                </h3>
                <p className="text-neutral-600">
                  Our team works tirelessly to ensure every detail meets our 
                  high standards of quality and sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-beige">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-deep-charcoal text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-200 text-center animate-fade-in-up hover:shadow-elevated transition duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-deep-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-deep-charcoal text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                className="bg-white rounded-2xl shadow-soft overflow-hidden animate-fade-in-up hover:shadow-elevated transition duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-deep-charcoal mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-neutral-600">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-deep-charcoal mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            Experience the difference of premium shopping with personalized service 
            and exceptional products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-soft">
              Start Shopping
            </button>
            <button className="border-2 border-primary-500 text-primary-500 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;