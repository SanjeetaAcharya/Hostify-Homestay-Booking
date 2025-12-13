"use client"

import { useState } from 'react'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import propertiesData from '@/data/properties.json'

export default function HomePage() {
  const [selectedFilter, setSelectedFilter] = useState('All')
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
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-2 text-gray-900">
            Find a <span style={{ color: '#FF8D28' }}>host</span> for every journey
          </h1>
          <p className="text-gray-600 text-base mb-8">
            Discover the best local rental properties for an escape most nearby
          </p>
          <SearchBar />
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex gap-4 overflow-x-auto">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === filter 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={selectedFilter === filter ? { backgroundColor: '#FF8D28' } : {}}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Property Grid */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Stays nearby Toronto, Ontario
        </h2>
        
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
    </div>
  )
}