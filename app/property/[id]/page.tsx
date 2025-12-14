"use client"

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import propertiesData from '@/data/properties.json'
import PropertyCard from '@/components/PropertyCard'
import Footer from '@/components/Footer'
import { Heart, MapPin, Star, Wifi, Utensils, Car, Waves, Thermometer } from 'lucide-react'

export default function PropertyDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [showMore, setShowMore] = useState(false)
  
  const property = propertiesData.properties.find(p => p.id === parseInt(id))
  
  if (!property) {
    notFound()
  }
  
  // Get similar properties (exclude current one, show 3)
  const similarProperties = propertiesData.properties
    .filter(p => p.id !== property.id)
    .slice(0, 3)
  
  return (
    <div className="bg-white min-h-screen overflow-x-auto">
      <div className="min-w-[1200px] mx-auto px-6 py-8 max-w-[1400px]">
        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-12">
          {/* Left Column - Photos, About, Amenities */}
          <div className="col-span-2">
            {/* Property Images */}
            <div className="grid grid-cols-4 gap-2 mb-8 h-[420px]">
              {/* Main Large Image */}
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden">
                <Image 
                  src={property.image} 
                  alt={property.name}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />
              </div>
              
              {/* Grid of smaller images */}
              <div className="col-span-2 grid grid-cols-2 grid-rows-2 gap-2">
                {property.images.slice(0, 4).map((img, index) => (
                  <div key={index} className={`relative overflow-hidden ${index === 1 ? 'rounded-tr-2xl' : ''} ${index === 3 ? 'rounded-br-2xl' : ''}`}>
                    <Image 
                      src={img} 
                      alt={`${property.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                    {index === 3 && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition">
                        <span className="text-white font-bold text-lg">+360</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* About this home */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">About this home</h2>
              <div className="text-gray-700 leading-relaxed space-y-3 text-base">
                <p>
                  Welcome to Brightwoods Cabin, your idyllic retreat nestled in the heart of Bridlepath, Ontario! Our cozy cabin, surrounded by the tranquility of nature, is designed to provide the ultimate rustic elegance and modern comfort.
                </p>
                <p className="font-semibold text-gray-900">Living Space:</p>
                <p>
                  This charming cabin boasts a spacious living area adorned with rustic decor and modern amenities. Enjoy the warmth of the wood-burning fireplace, relax on the plush sofas, and make yourself at home with our entertainment center featuring a flat-screen TV, WiFi, and more.
                </p>
                {showMore && (
                  <>
                    <p className="font-semibold text-gray-900">Bedrooms:</p>
                    <p>
                      With 3 beautifully appointed bedrooms, our cabin comfortably accommodates up to [number of guests]. Each bedroom is designed for your comfort and privacy, featuring cozy bedding and ample storage space.
                    </p>
                  </>
                )}
              </div>
              <button 
                onClick={() => setShowMore(!showMore)}
                className="text-orange-500 font-semibold hover:underline mt-3 text-sm"
              >
                {showMore ? 'Show less' : 'Show more'}
              </button>
            </div>
            
            {/* Amenities */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3">
                  <Waves className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700 text-sm">Lakeside</span>
                </div>
                <div className="flex items-center gap-3">
                  <Utensils className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700 text-sm">Kitchen</span>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700 text-sm">Wifi</span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700 text-sm">Free parking</span>
                </div>
                <div className="flex items-center gap-3">
                  <Thermometer className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700 text-sm">Hot water</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="text-gray-700 text-sm">Shampoo</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-gray-700 text-sm">Freezer</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700 text-sm">Coffee Maker</span>
                </div>
              </div>
              <button className="mt-5 px-5 py-2.5 border border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition text-sm">
                Show all amenities
              </button>
            </div>
          </div>
          
          {/* Right Column - Name, Welcome, Booking, Host, Features, Map */}
          <div className="col-span-1">
            <div className="space-y-6">
              {/* Property Header */}
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Brightwoods Cabin</h1>
                    <p className="text-gray-600 mb-2 text-sm">Bridlepath, Ontario, Canada</p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold">5.0</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-orange-500 cursor-pointer hover:text-orange-600 transition text-sm">200 Reviews</span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-full transition">
                    <Heart className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="pb-4 mb-4 border-b border-gray-200">
                <p className="text-gray-700 leading-relaxed text-sm">
                  Welcome to our cozy cabin retreat nestled in the heart of Bridlepath, Ontario! Surrounded by lush landscapes and tranquil trails, this charming getaway offers the perfect blend of rustic elegance and modern comfort.
                </p>
              </div>

              {/* Booking Details */}
              <div>
                {/* Price Section */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">${property.price}</span>
                      <span className="text-gray-600 text-base">/night</span>
                    </div>
                    <div className="flex items-center gap-1 text-orange-500 text-sm">
                      <span>🔧</span>
                      <span className="font-medium">Best time to Book</span>
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="mb-4">
                  <button 
                    className="w-full text-white py-3 rounded-lg font-bold transition-all text-base"
                    style={{ backgroundColor: '#FF8D28' }}
                  >
                    Book this home
                  </button>
                </div>

                {/* Host Info */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-xs font-medium text-gray-500 mb-3">Hosted by:</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base font-bold">M</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">Michelle Ward</p>
                      <p className="text-xs text-gray-500">Joined in May 2021</p>
                    </div>
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-full">
                      <span className="text-orange-500 text-sm">🏆</span>
                      <span className="text-xs font-semibold text-orange-600">Superhost</span>
                    </div>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="space-y-3">
                  <div className="flex gap-3 items-start p-3 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Dedicated workspace</h4>
                      <p className="text-xs text-gray-600">A private room equipped with WiFi</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start p-3 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Self check-in</h4>
                      <p className="text-xs text-gray-600">Check in with just your phone</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start p-3 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-0.5">Free cancellation</h4>
                      <p className="text-xs text-gray-600">Cancel anytime</p>
                    </div>
                  </div>
                </div>

                {/* Where you'll be */}
                <div className="mb-6 mt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-bold text-gray-900">Where you'll be</h2>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-lg">☀️</span>
                      <span className="font-semibold">20°C</span>
                      <span className="text-gray-600">Broken clouds</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-gray-700" />
                    <span className="text-gray-700 text-xs font-medium">The Bridle Path</span>
                  </div>
                  <div className="h-56 rounded-lg overflow-hidden border border-gray-200">
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Stays */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Similar stays</h2>
            <Link href="/" className="text-orange-500 font-semibold hover:underline text-sm">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {similarProperties.map(similarProperty => (
              <PropertyCard
                key={similarProperty.id}
                id={similarProperty.id}
                name={similarProperty.name}
                location={similarProperty.location}
                price={similarProperty.price}
                rating={similarProperty.rating}
                image={similarProperty.image}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Info sections - Support, Hosting, Hostify */}
      <section className="bg-gray-50 py-12 mt-16">
        <div className="min-w-[1200px] mx-auto px-6 max-w-[1400px]">
          <div className="grid grid-cols-3 gap-12 mb-8">
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