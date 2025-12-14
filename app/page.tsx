"use client"

import { useState } from 'react'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import Footer from '@/components/Footer'
import propertiesData from '@/data/properties.json'
import Link from 'next/link'
import { useSearchStore } from '@/store/useSearchStore'

export default function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [showMoreHovered, setShowMoreHovered] = useState(false)
  const { location } = useSearchStore()
  const properties = propertiesData.properties
  
  // Filter properties based on selected category
  const filteredProperties = properties.filter(property => {
    if (selectedFilter === 'All') return true
    
    if (selectedFilter === 'Lakefront') {
      return property.amenities.includes('Lake access') || 
             property.location.toLowerCase().includes('lake')
    }
    if (selectedFilter === 'Cabins') {
      return property.name.toLowerCase().includes('cabin') || 
             property.description.toLowerCase().includes('cabin')
    }
    if (selectedFilter === 'Beachfront') {
      return property.amenities.includes('Beach access') || 
             property.location.toLowerCase().includes('beach')
    }
    if (selectedFilter === 'Amazing views') {
      return property.amenities.includes('Mountain view') || 
             property.amenities.includes('Ocean view')
    }
    
    return true
  })
  
  const filters = ['All', 'Amazing views', 'Lakefront', 'Cabins', 'Beachfront']
  
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with Background Image */}
      <section 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/search-background.png')",
          minHeight: '400px'
        }}
      >
        {/* White overlay gradient from left */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        
        {/* Content */}
        <div className="relative container mx-auto px-6 py-20">
          <h1 className="text-4xl font-bold mb-3 text-gray-900 max-w-2xl">
            Find a <span style={{ color: '#FF8D28' }}>host</span> for every journey
          </h1>
          <p className="text-gray-700 text-base mb-12 max-w-xl">
            Discover the best local rental properties that fits your every travel needs
          </p>
          <SearchBar />
        </div>
      </section>
      
      {/* Property Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Stays nearby: <span className="font-bold">{location || 'Toronto Ontario'}</span>
          </h2>
          
          <div className="flex items-center gap-2">
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white transition"
              style={{ backgroundColor: '#FF8D28' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {filteredProperties.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No properties found for this filter.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                name={property.name}
                location={property.location}
                price={property.price}
                rating={property.rating}
                image={property.image}
              />
            ))}
          </div>
        )}
      </section>

      {/* Show more button section */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-6 flex justify-center">
          <button 
            className="px-10 py-3 rounded-lg font-medium transition-all border-2"
            style={{ 
              color: '#FF8D28',
              borderColor: '#FF8D28',
              backgroundColor: showMoreHovered ? '#FFF5ED' : 'transparent'
            }}
            onMouseEnter={() => setShowMoreHovered(true)}
            onMouseLeave={() => setShowMoreHovered(false)}
          >
            Show more
          </button>
        </div>
      </section>

      {/* Info sections - Support, Hosting, Hostify */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
            {/* Support */}
            <div>
              <h3 className="font-bold text-gray-900 mb-6 text-base">Support</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Help Centre</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">AirCover</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Combating discrimination</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Supporting people with disabilities</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Cancellation options</Link></li>
              </ul>
            </div>
            
            {/* Hosting */}
            <div>
              <h3 className="font-bold text-gray-900 mb-6 text-base">Hosting</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Local home</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Cover for hosts</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Hosting resources</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Community forum</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Hosting responsibly</Link></li>
              </ul>
            </div>
            
            {/* Hostify */}
            <div>
              <h3 className="font-bold text-gray-900 mb-6 text-base">Hostify</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Newsroom</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">New Features</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Careers</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Investires</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Gift cards</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}