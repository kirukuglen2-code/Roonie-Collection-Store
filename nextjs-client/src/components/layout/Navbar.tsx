"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-soft border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/ronnie-logo.jpg" 
              alt="Ronnie's Collection Store"
              width={160}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-deep-charcoal hover:text-primary-500 transition duration-200 font-medium">
              Home
            </Link>
            <Link href="/products" className="text-deep-charcoal hover:text-primary-500 transition duration-200 font-medium">
              Products
            </Link>
            <Link href="/marketplace" className="text-deep-charcoal hover:text-primary-500 transition duration-200 font-medium">
              Marketplace
            </Link>
            <Link href="/about" className="text-deep-charcoal hover:text-primary-500 transition duration-200 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-deep-charcoal hover:text-primary-500 transition duration-200 font-medium">
              Contact
            </Link>
          </div>

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login" className="text-deep-charcoal hover:text-primary-500 transition duration-200">
              Login
            </Link>
            <Link href="/auth/register" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium">
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-deep-charcoal hover:bg-neutral-100 transition duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-deep-charcoal hover:text-primary-500 transition duration-200 font-medium">
                Home
              </Link>
              <Link href="/products" className="text-deep-charcoal hover:text-primary-500 transition duration-200 font-medium">
                Products
              </Link>
              <Link href="/marketplace" className="text-deep-charcoal hover:text-primary-500 transition duration-200 font-medium">
                Marketplace
              </Link>
              <Link href="/about" className="text-deep-charcoal hover:text-primary-500 transition duration-200 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-deep-charcoal hover:text-primary-500 transition duration-200 font-medium">
                Contact
              </Link>
              <div className="pt-4 border-t border-neutral-200">
                <Link href="/auth/login" className="block text-deep-charcoal hover:text-primary-500 transition duration-200 mb-2">
                  Login
                </Link>
                <Link href="/auth/register" className="block bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium text-center">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
