"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})
  
  const router = useRouter()
  const { login } = useAuthStore()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    const newErrors: typeof errors = {}
    
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Success - simulate login
    login(email)
    router.push('/')
  }
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://picsum.photos/seed/auth-bg2/1920/1080')"
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">🏠</span>
            <span className="text-3xl font-bold text-orange-500">HOSTIFY</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
          <p className="text-gray-600 mt-2">Welcome back! Please sign in to continue</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors({...errors, email: undefined})
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Link href="/" className="text-sm text-orange-500 hover:text-orange-600">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setErrors({...errors, password: undefined})
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Sign in
          </button>
        </form>
        
        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign in with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <span className="text-xl">🔵</span>
            </button>
            <button className="flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <span className="text-xl">🍎</span>
            </button>
            <button className="flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <span className="text-xl">G</span>
            </button>
          </div>
        </div>
        
        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-orange-500 font-semibold hover:text-orange-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}