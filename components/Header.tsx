"use client"

import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'

export default function Header() {
  const { isLoggedIn, user, logout } = useAuthStore()
  
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/hostify-logo.png" 
              alt="Hostify" 
              className="h-10"
            />
          </Link>
          
          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Home
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Stays
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium transition">
              Become a host
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Hi, {user?.email}</span>
                <button 
                  onClick={logout}
                  className="text-gray-700 hover:text-gray-900 font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="text-white px-6 py-2 rounded-lg font-medium transition-all hover:opacity-90"
                style={{ backgroundColor: '#FF8D28' }}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}