"use client"

import { Search } from 'lucide-react'
import { useSearchStore } from '@/store/useSearchStore'

export default function SearchBar() {
  const { location, checkIn, checkOut, guests, setLocation, setCheckIn, setCheckOut, setGuests } = useSearchStore()
  
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-2 flex items-stretch gap-2 w-full">
      <div className="flex-[2] bg-white rounded-md px-5 py-3 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            Accommodation
          </label>
          <input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </div>
      
      <div className="flex-1 bg-white rounded-md px-5 py-3 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            Check-in
          </label>
          <input
            type="text"
            placeholder="Add date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            onFocus={(e) => e.target.type = 'date'}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = 'text'
            }}
            className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <div className="flex-1 bg-white rounded-md px-5 py-3 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            Check-out
          </label>
          <input
            type="text"
            placeholder="Add date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            onFocus={(e) => e.target.type = 'date'}
            onBlur={(e) => {
              if (!e.target.value) e.target.type = 'text'
            }}
            className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      
      <div className="flex-1 bg-white rounded-md px-5 py-3 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            Guest
          </label>
          <input
            type="number"
            min="1"
            value={guests || ''}
            onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
            placeholder="1"
            className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      
      <button 
        className="text-white px-10 rounded-md font-semibold transition-colors flex items-center justify-center gap-2"
        style={{ backgroundColor: '#FF8D28' }}
      >
        <Search className="w-5 h-5" />
        <span>Search</span>
      </button>
    </div>
  )
}