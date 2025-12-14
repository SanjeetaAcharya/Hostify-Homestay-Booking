"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import Footer from '@/components/Footer'
import propertiesData from '@/data/properties.json'
import Link from 'next/link'
import { useSearchStore } from '@/store/useSearchStore'

export default function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState('default')
  const [showMoreHovered, setShowMoreHovered] = useState(false)
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const { location, checkIn, checkOut, guests } = useSearchStore()
  const properties = propertiesData.properties
  
  const locations = Array.from(new Set(properties.map(p => p.location)))
  
  // Enhanced filtering logic
  const filteredProperties = properties
    .filter(property => {
      // Location filter
      if (location && location !== 'All Locations') {
        if (!property.location.toLowerCase().includes(location.toLowerCase())) {
          return false
        }
      }
      
      // Guest filter
      if (guests && property.guests < guests) {
        return false
      }
      
      return true
    })
    .sort((a, b) => {
      if (selectedFilter === 'low-to-high') {
        return a.price - b.price
      }
      if (selectedFilter === 'high-to-low') {
        return b.price - a.price
      }
      return 0
    })
  
  const getFilterText = () => {
    const locationText = location || 'Ontario'
    const count = filteredProperties.length
    
    let text = `${count} ${count === 1 ? 'property' : 'properties'}`
    
    if (location) {
      text += ` in ${locationText}`
    }
    
    if (guests) {
      text += ` • ${guests} ${guests === 1 ? 'guest' : 'guests'}`
    }
    
    switch(selectedFilter) {
      case 'low-to-high':
        text += ' • Price: Low to High'
        break
      case 'high-to-low':
        text += ' • Price: High to Low'
        break
    }
    
    return text
  }
  
  return (
    <div className="bg-white min-h-screen">
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/search-background.png')",
          minHeight: '300px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-gray-900 max-w-2xl"
          >
            Find a <span style={{ color: '#FF8D28' }}>host</span> for every journey
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-gray-700 text-sm sm:text-base mb-8 sm:mb-12 max-w-xl"
          >
            Discover the best local rental properties that fits your every travel needs
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </motion.section>
      
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="hidden sm:block w-1 h-8 rounded-full" style={{ backgroundColor: '#FF8D28' }}></div>
            <div>
              <p className="text-gray-900 font-semibold text-base sm:text-lg">
                {getFilterText()}
              </p>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <button
                  onClick={() => useSearchStore.setState({ location: '' })}
                  className={`text-xs sm:text-sm px-3 py-1 rounded-full transition ${
                    !location
                      ? 'bg-orange-100 text-orange-700 font-medium'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Locations
                </button>
                {locations.slice(0, 3).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => useSearchStore.setState({ location: loc })}
                    className={`text-xs sm:text-sm px-3 py-1 rounded-full transition ${
                      location === loc
                        ? 'bg-orange-100 text-orange-700 font-medium'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition bg-white shadow-sm"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="text-sm font-medium text-gray-700">Filter</span>
                <svg className={`w-4 h-4 text-gray-600 transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showFilterMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowFilterMenu(false)}
                  ></div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  >
                    <button
                      onClick={() => {
                        setSelectedFilter('default')
                        setShowFilterMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition flex items-center justify-between ${
                        selectedFilter === 'default' ? 'bg-orange-50' : ''
                      }`}
                    >
                      <span className={selectedFilter === 'default' ? 'font-semibold text-gray-900' : 'text-gray-700'}>
                        Default Order
                      </span>
                      {selectedFilter === 'default' && (
                        <svg className="w-5 h-5" style={{ color: '#FF8D28' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    
                    <div className="border-t border-gray-100 my-1"></div>
                    
                    <button
                      onClick={() => {
                        setSelectedFilter('low-to-high')
                        setShowFilterMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition flex items-center justify-between ${
                        selectedFilter === 'low-to-high' ? 'bg-orange-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                        <span className={selectedFilter === 'low-to-high' ? 'font-semibold text-gray-900' : 'text-gray-700'}>
                          Price: Low to High
                        </span>
                      </div>
                      {selectedFilter === 'low-to-high' && (
                        <svg className="w-5 h-5" style={{ color: '#FF8D28' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedFilter('high-to-low')
                        setShowFilterMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition flex items-center justify-between ${
                        selectedFilter === 'high-to-low' ? 'bg-orange-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                        <span className={selectedFilter === 'high-to-low' ? 'font-semibold text-gray-900' : 'text-gray-700'}>
                          Price: High to Low
                        </span>
                      </div>
                      {selectedFilter === 'high-to-low' && (
                        <svg className="w-5 h-5" style={{ color: '#FF8D28' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  </motion.div>
                </>
              )}
            </div>

            <button className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition flex-shrink-0 shadow-sm bg-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </button>
          </div>
        </motion.div>
        
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No properties found matching your search criteria.
            </p>
            <button
              onClick={() => {
                useSearchStore.setState({ location: '', checkIn: '', checkOut: '', guests: 1 })
                setSelectedFilter('default')
              }}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <PropertyCard
                  id={property.id}
                  name={property.name}
                  location={property.location}
                  price={property.price}
                  rating={property.rating}
                  image={property.image}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white py-8 sm:py-10">
        <div className="container mx-auto px-4 sm:px-6 flex justify-center">
          <button 
            className="px-8 sm:px-10 py-2.5 sm:py-3 rounded-lg font-medium transition-all border-2 text-sm sm:text-base"
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

      <section className="bg-gray-100 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 sm:mb-6 text-base">Support</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Help Centre</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">AirCover</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Combating discrimination</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Supporting people with disabilities</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Cancellation options</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4 sm:mb-6 text-base">Hosting</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Local home</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Cover for hosts</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Hosting resources</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Community forum</Link></li>
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition text-sm">Hosting responsibly</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-4 sm:mb-6 text-base">Hostify</h3>
              <ul className="space-y-2 sm:space-y-3">
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