"use client"

import { Search } from 'lucide-react'
import { useSearchStore } from '@/store/useSearchStore'

export default function SearchBar() {
  const { location, checkIn, checkOut, guests, setLocation, setCheckIn, setCheckOut, setGuests } = useSearchStore()
  
  return (
    <div className="bg-white border border-gray-300 rounded-full shadow-lg p-2 flex items-center gap-4 max-w-4xl">
      {/* Location */}
      <div className="flex-1 px-6 py-3 border-r border-gray-300">
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
      
      {/* Check In */}
      <div className="flex-1 px-6 py-3 border-r border-gray-300">
        <label className="block text-xs font-semibold text-gray-900 mb-1">
          Check in
        </label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="w-full text-sm text-gray-600 outline-none bg-transparent"
        />
      </div>
      
      {/* Check Out */}
      <div className="flex-1 px-6 py-3 border-r border-gray-300">
        <label className="block text-xs font-semibold text-gray-900 mb-1">
          Check out
        </label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="w-full text-sm text-gray-600 outline-none bg-transparent"
        />
      </div>
      
      {/* Guests */}
      <div className="flex-1 px-6 py-3">
        <label className="block text-xs font-semibold text-gray-900 mb-1">
          Guest
        </label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          placeholder="Add guests"
          className="w-full text-sm text-gray-600 placeholder-gray-400 outline-none bg-transparent"
        />
      </div>
      
      {/* Search Button */}
      <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full transition-colors">
        <Search className="w-5 h-5" />
      </button>
    </div>
  )
}