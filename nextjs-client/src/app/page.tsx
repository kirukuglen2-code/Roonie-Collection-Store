// nextjs-client/src/app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <div className="flex gap-6">
            <Link href="/marketplace" className="text-gray-700 hover:text-gray-900">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900">
              Contact
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-gray-900">
              Cart
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to Ronnie's Store
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover premium products with exceptional quality and service. 
          Your satisfaction is our priority.
        </p>
        <Link 
          href="/marketplace" 
          className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
        >
          Start Shopping
        </Link>
      </section>
    </main>
  )
}