"use client"

import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'

export default function Header() {
  const { isLoggedIn, user, logout } = useAuthStore()
  
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏠</span>
            <span className="text-2xl font-bold text-orange-500">HOSTIFY</span>
          </Link>
          
          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Stays
            </Link>
            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Become a host
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">Hi, {user?.email}</span>
                <button 
                  onClick={logout}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
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