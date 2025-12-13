"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuthStore } from '@/store/useAuthStore'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    confirmPassword?: string
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
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    // Success - simulate signup and login
    login(email)
    router.push('/')
  }
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://picsum.photos/seed/auth-bg/1920/1080')"
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl">🏠</span>
            <span className="text-3xl font-bold text-orange-500">HOSTIFY</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Sign up to start your journey</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
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
          
          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                setErrors({...errors, confirmPassword: undefined})
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Sign up
          </button>
        </form>
        
        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
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
        
        {/* Login Link */}
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-500 font-semibold hover:text-orange-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}