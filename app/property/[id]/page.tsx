"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import propertiesData from '@/data/properties.json'
import Footer from '@/components/Footer'
import { Heart, MapPin, Star, Briefcase, Key, XCircle, Wifi, Coffee, Car, Waves, Thermometer, Snowflake, Utensils, Wind, Tv, Flame, Camera, ShowerHead, FireExtinguisher, TreePine } from 'lucide-react'

export default function PropertyDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [showMore, setShowMore] = useState(false)
  
  const property = propertiesData.properties.find(p => p.id === parseInt(id))
  
  if (!property) {
    notFound()
  }
  
  const similarProperties = propertiesData.properties
    .filter(p => p.id !== property.id)
    .slice(0, 3)
  
  const getFeatureIcon = (iconName: string) => {
    switch(iconName) {
      case 'workspace':
        return <Briefcase className="w-6 h-6" />
      case 'checkin':
        return <Key className="w-6 h-6" />
      case 'cancel':
        return <XCircle className="w-6 h-6" />
      default:
        return <Briefcase className="w-6 h-6" />
    }
  }

  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase()
    
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) {
      return <Wifi className="w-5 h-5" />
    }
    if (lowerAmenity.includes('kitchen')) {
      return <Utensils className="w-5 h-5" />
    }
    if (lowerAmenity.includes('parking')) {
      return <Car className="w-5 h-5" />
    }
    if (lowerAmenity.includes('hot water') || lowerAmenity.includes('water')) {
      return <Thermometer className="w-5 h-5" />
    }
    if (lowerAmenity.includes('coffee')) {
      return <Coffee className="w-5 h-5" />
    }
    if (lowerAmenity.includes('lake') || lowerAmenity.includes('beach') || lowerAmenity.includes('pool')) {
      return <Waves className="w-5 h-5" />
    }
    if (lowerAmenity.includes('freezer') || lowerAmenity.includes('fridge')) {
      return <Snowflake className="w-5 h-5" />
    }
    if (lowerAmenity.includes('air conditioning') || lowerAmenity.includes('heating')) {
      return <Wind className="w-5 h-5" />
    }
    if (lowerAmenity.includes('tv') || lowerAmenity.includes('smart tv')) {
      return <Tv className="w-5 h-5" />
    }
    if (lowerAmenity.includes('fireplace') || lowerAmenity.includes('fire pit')) {
      return <Flame className="w-5 h-5" />
    }
    if (lowerAmenity.includes('camera') || lowerAmenity.includes('security')) {
      return <Camera className="w-5 h-5" />
    }
    if (lowerAmenity.includes('shower')) {
      return <ShowerHead className="w-5 h-5" />
    }
    if (lowerAmenity.includes('extinguisher')) {
      return <FireExtinguisher className="w-5 h-5" />
    }
    if (lowerAmenity.includes('garden') || lowerAmenity.includes('outdoor') || lowerAmenity.includes('patio')) {
      return <TreePine className="w-5 h-5" />
    }
    
    return (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    )
  }

  const amenitiesPerColumn = 4
  const amenityColumns = []
  for (let i = 0; i < Math.min(12, property.amenities.length); i += amenitiesPerColumn) {
    amenityColumns.push(property.amenities.slice(i, i + amenitiesPerColumn))
  }
  
  return (
    <div className="bg-white min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 py-4 sm:py-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 mb-8">
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative rounded-t-2xl overflow-hidden h-[250px] sm:h-[400px] mb-2">
                <img 
                  src={property.image} 
                  alt={property.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {property.images.slice(0, 4).map((img, index) => (
                  <div key={index} className={`relative overflow-hidden h-[80px] sm:h-[100px] ${index === 0 ? 'rounded-bl-2xl' : ''}`}>
                    <img 
                      src={img} 
                      alt={`${property.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
                <div className="relative overflow-hidden h-[80px] sm:h-[100px] rounded-br-2xl bg-gray-900 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition">
                  <span className="text-white font-bold text-sm sm:text-base">360</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:sticky lg:top-8"
            >
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm h-full flex flex-col">
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
                    <button className="p-2 hover:bg-gray-50 rounded-full transition">
                      <Heart className="w-6 h-6 text-gray-900" />
                    </button>
                  </div>
                  <p className="text-gray-600 mb-3 text-base">{property.location}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">{property.rating}</span>
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <Link href="#" className="text-orange-500 hover:underline text-base underline">
                      {property.reviews} Reviews
                    </Link>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {property.shortDescription}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-gray-900">${property.price}</span>
                        <span className="text-gray-600 text-lg">/night</span>
                      </div>
                      <div className="flex items-center gap-2 text-orange-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold text-base">Best time to Book</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="w-full text-white py-4 rounded-xl font-bold transition-all text-lg mb-6"
                    style={{ backgroundColor: '#FF8D28' }}
                  >
                    Book this home
                  </button>

                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-4">Hosted by:</p>
                    <div className="w-full h-px bg-gray-200 mb-4"></div>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xl font-bold">{property.host.initial}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">{property.host.name}</p>
                        <p className="text-sm text-gray-500">{property.host.joinedDate}</p>
                      </div>
                      {property.host.superhost && (
                        <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
                          <span className="text-orange-500 text-base">🏆</span>
                          <span className="text-sm font-bold text-orange-600">Superhost</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 mb-8"
        >
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">About this home</h2>
            <div className="text-gray-700 leading-relaxed space-y-4 text-base">
              <p>{property.aboutHome.intro}</p>
              <p>
                <span className="font-bold text-gray-900">Living Space:</span> {property.aboutHome.livingSpace}
              </p>
              {showMore && (
                <>
                  <p>
                    <span className="font-bold text-gray-900">Bedrooms:</span> {property.aboutHome.bedrooms}
                  </p>
                  {property.aboutHome.kitchen && (
                    <p>
                      <span className="font-bold text-gray-900">Kitchen:</span> {property.aboutHome.kitchen}
                    </p>
                  )}
                  {property.aboutHome.outdoor && (
                    <p>
                      <span className="font-bold text-gray-900">Outdoor Space:</span> {property.aboutHome.outdoor}
                    </p>
                  )}
                  {property.aboutHome.location && (
                    <p>
                      <span className="font-bold text-gray-900">Location:</span> {property.aboutHome.location}
                    </p>
                  )}
                  {property.aboutHome.additional && (
                    <p>{property.aboutHome.additional}</p>
                  )}
                </>
              )}
            </div>
            <button 
              onClick={() => setShowMore(!showMore)}
              className="text-orange-500 font-semibold hover:underline mt-3 text-base"
            >
              {showMore ? 'Show less' : 'Show more'}
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6">
              {property.features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
                      {getFeatureIcon(feature.icon)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="w-full h-px bg-gray-200 mb-8"></div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12"
        >
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {amenityColumns.map((column, colIndex) => (
                <div key={colIndex} className="space-y-4">
                  {column.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="text-gray-900 flex-shrink-0">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="text-gray-900 text-base">{amenity}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {property.amenities.length > 12 && (
              <button className="mt-6 px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition text-base">
                Show all amenities
              </button>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Where you'll be</h2>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-2xl">{property.weather.icon}</span>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{property.weather.temp}</div>
                  <div className="text-gray-600 text-xs">{property.weather.condition}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-gray-900" />
              <span className="text-gray-900 text-sm font-medium">{property.location}</span>
            </div>
            <div className="h-[320px] rounded-xl overflow-hidden border border-gray-200">
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
        </motion.div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 sm:mt-16"
        >
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Similar stays</h2>
            <Link href="/" className="text-orange-500 font-semibold hover:underline text-sm">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {similarProperties.map((similarProperty, index) => (
              <motion.div
                key={similarProperty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <Link 
                  href={`/property/${similarProperty.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex h-full">
                    <div className="relative w-[45%] flex-shrink-0">
                      <img 
                        src={similarProperty.image} 
                        alt={similarProperty.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {similarProperty.host.superhost && (
                        <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <span className="text-orange-500 text-sm">⚡</span>
                          <span className="text-xs font-semibold text-gray-900">Superhost</span>
                        </div>
                      )}
                      <button 
                        className="absolute top-3 right-3 p-2 bg-white rounded-full hover:scale-110 transition-transform shadow-sm"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                      >
                        <Heart className="w-5 h-5 text-gray-900" />
                      </button>
                    </div>
                    
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1.5 text-lg leading-tight">
                          {similarProperty.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">{similarProperty.location}</p>
                        
                        <div className="flex items-center gap-1.5 mb-4">
                          <span className="text-lg font-bold text-gray-900">{similarProperty.rating}</span>
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </div>
                      </div>
                      
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-orange-500">${similarProperty.price}</span>
                        <span className="text-gray-600 text-sm">/night</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <section className="bg-gray-50 py-8 sm:py-12 mt-12 sm:mt-16">
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