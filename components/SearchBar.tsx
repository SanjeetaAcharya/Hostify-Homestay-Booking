"use client"

import { Search } from 'lucide-react'
import { useSearchStore } from '@/store/useSearchStore'

export default function SearchBar() {
  const { location, checkIn, checkOut, guests, setLocation, setCheckIn, setCheckOut, setGuests } = useSearchStore()
  
  return (
    <div className="bg-white border border-gray-200 rounded-full shadow-md p-2 flex items-center gap-0 max-w-4xl">
      {/* Location */}
      <div className="flex-1 px-6 py-3">
        <label className="block text-xs font-semibold text-gray-900 mb-1">
          Location
        </label>
        <input
          type="text"
          placeholder="Where are you going?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
        />
      </div>
      
      {/* Divider */}
      <div className="h-12 w-px bg-gray-200"></div>
      
      {/* Check In */}
      <div className="flex-1 px-6 py-3">
        <label className="block text-xs font-semibold text-gray-900 mb-1">
          Check in
        </label>
        <input
          type="text"
          placeholder="mm/dd/yyyy"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          onFocus={(e) => e.target.type = 'date'}
          onBlur={(e) => e.target.type = 'text'}
          className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
        />
      </div>
      
      {/* Divider */}
      <div className="h-12 w-px bg-gray-200"></div>
      
      {/* Check Out */}
      <div className="flex-1 px-6 py-3">
        <label className="block text-xs font-semibold text-gray-900 mb-1">
          Check out
        </label>
        <input
          type="text"
          placeholder="mm/dd/yyyy"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          onFocus={(e) => e.target.type = 'date'}
          onBlur={(e) => e.target.type = 'text'}
          className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
        />
      </div>
      
      {/* Divider */}
      <div className="h-12 w-px bg-gray-200"></div>
      
      {/* Guests */}
      <div className="flex-1 px-6 py-3">
        <label className="block text-xs font-semibold text-gray-900 mb-1">
          Guest
        </label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
          placeholder="1"
          className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
        />
      </div>
      
      {/* Search Button */}
      <button 
        className="text-white p-4 rounded-full transition-colors ml-2"
        style={{ backgroundColor: '#FF8D28' }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E67E24'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF8D28'}
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  )
}