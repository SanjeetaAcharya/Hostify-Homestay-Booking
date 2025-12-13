import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import propertiesData from '@/data/properties.json'
import PropertyCard from '@/components/PropertyCard'

interface PropertyPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function PropertyDetailsPage({ params }: PropertyPageProps) {
  const { id } = await params
  const property = propertiesData.properties.find(p => p.id === parseInt(id))
  
  if (!property) {
    notFound()
  }
  
  // Get similar properties (exclude current one, show 3)
  const similarProperties = propertiesData.properties
    .filter(p => p.id !== property.id)
    .slice(0, 3)
  
  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-8">
        {/* Property Images */}
        <div className="grid grid-cols-2 gap-4 mb-8 max-h-[500px]">
          {/* Main Image */}
          <div className="relative col-span-1 row-span-2 rounded-l-xl overflow-hidden">
            <Image 
              src={property.image} 
              alt={property.name}
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          </div>
          
          {/* Smaller images grid */}
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(0, 4).map((img, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                <Image 
                  src={img} 
                  alt={`${property.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Property Info */}
        <div className="grid grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="col-span-2">
            {/* Title and basic info */}
            <div className="mb-6 pb-6 border-b">
              <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
              <p className="text-gray-600 mb-4">{property.location}</p>
              
              <div className="flex gap-6 text-gray-700">
                <span>{property.guests} guests</span>
                <span>·</span>
                <span>{property.bedrooms} bedrooms</span>
                <span>·</span>
                <span>{property.beds} beds</span>
                <span>·</span>
                <span>{property.baths} baths</span>
              </div>
            </div>
            
            {/* Host Info */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <p className="font-semibold">Hosted by {property.host.name}</p>
                  <p className="text-sm text-gray-600">{property.host.joinedDate}</p>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="mb-6 pb-6 border-b">
              <h2 className="text-xl font-semibold mb-4">About this home</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>
            
            {/* Amenities */}
            <div className="mb-6 pb-6 border-b">
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xl">✓</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Map Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Where you'll be</h2>
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">📍 Map placeholder - {property.location}</p>
              </div>
            </div>
          </div>
          
          {/* Booking Card */}
          <div className="col-span-1">
            <div className="border border-gray-300 rounded-xl p-6 sticky top-24 shadow-lg">
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold">${property.price}</span>
                <span className="text-gray-600">night</span>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="text-lg">⭐ {property.rating}</span>
              </div>
              
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-colors mb-4">
                Reserve
              </button>
              
              <p className="text-center text-sm text-gray-600">You won't be charged yet</p>
              
              <div className="mt-6 pt-6 border-t space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>${property.price} x 5 nights</span>
                  <span>${property.price * 5}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Cleaning fee</span>
                  <span>$50</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Service fee</span>
                  <span>$100</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-3 border-t">
                  <span>Total</span>
                  <span>${property.price * 5 + 150}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Stays */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Similar stays</h2>
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
    </div>
  )
}