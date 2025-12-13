"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { usePropertyStore } from '@/store/usePropertyStore'

interface PropertyCardProps {
  id: number
  name: string
  location: string
  price: number
  rating: number
  image: string
}

export default function PropertyCard({ 
  id, 
  name, 
  location, 
  price, 
  rating, 
  image 
}: PropertyCardProps) {
  const { isLiked, toggleLike } = usePropertyStore()
  
  return (
    <div className="group cursor-pointer">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl mb-3">
        <Link href={`/property/${id}`}>
          <Image 
            src={image} 
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>
        
        {/* Like Button */}
        <button 
          onClick={(e) => {
            e.preventDefault()
            toggleLike(id)
          }}
          className="absolute top-3 right-3 z-10 p-2 hover:scale-110 transition-transform"
        >
          <Heart 
            className={`w-6 h-6 ${
              isLiked(id) 
                ? 'fill-red-500 text-red-500' 
                : 'fill-white/70 text-white stroke-2'
            }`}
          />
        </button>
      </div>
      
      {/* Property Info */}
      <Link href={`/property/${id}`}>
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-900 text-base">{name}</h3>
          <div className="flex items-center gap-1">
            <span className="text-sm">⭐</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-1">{location}</p>
        
        <p className="text-gray-900">
          <span className="font-semibold">${price}</span>
          <span className="text-gray-600 font-normal"> night</span>
        </p>
      </Link>
    </div>
  )
}