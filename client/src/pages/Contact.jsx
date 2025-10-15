// client/src/pages/Contact.jsx
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'support@ronnieshop.com',
      description: 'Send us an email anytime'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Start Chat',
      description: '24/7 customer support'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      details: '123 Commerce St, City',
      description: 'Showroom appointments'
    }
  ];

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all unused items in original packaging.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to over 50 countries worldwide with calculated shipping costs.'
    }
  ];

  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-500 to-accent-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
            Get In Touch
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            We're here to help! Reach out to us with any questions, feedback, or concerns.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl font-bold text-deep-charcoal mb-6">
                Contact Information
              </h2>
              <p className="text-neutral-600 mb-8">
                Choose your preferred method to reach out. Our team is ready to 
                assist you with any questions or concerns.
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <div 
                  key={method.title}
                  className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-200 animate-fade-in-up hover:shadow-elevated transition duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{method.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-deep-charcoal mb-1">
                        {method.title}
                      </h3>
                      <p className="text-primary-600 font-medium mb-1">
                        {method.details}
                      </p>
                      <p className="text-neutral-600 text-sm">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-beige rounded-2xl p-6 mt-8 animate-fade-in-up animation-delay-500">
              <h3 className="text-xl font-bold text-deep-charcoal mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-neutral-300 pb-4 last:border-b-0">
                    <h4 className="font-semibold text-deep-charcoal mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-soft p-8 border border-neutral-200 animate-fade-in-up">
              <h2 className="text-3xl font-bold text-deep-charcoal mb-6">
                Send us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl text-green-600">✓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-deep-charcoal mb-4">
                    Message Sent!
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                        placeholder="Your full name"
                      />
                    </div>
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
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-200 resize-vertical"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-400 text-white font-semibold py-4 rounded-lg transition duration-300 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-200">
                <h3 className="text-lg font-bold text-deep-charcoal mb-2">
                  Response Time
                </h3>
                <p className="text-neutral-600">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
              <div className="bg-accent-50 rounded-2xl p-6 border border-accent-200">
                <h3 className="text-lg font-bold text-deep-charcoal mb-2">
                  Business Hours
                </h3>
                <p className="text-neutral-600">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Weekend: Emergency Support Only
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;