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
    <div className="group cursor-pointer bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link href={`/property/${id}`}>
          <Image 
            src={image} 
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>
        
        {id === 1 && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
            <span className="text-orange-500 text-sm">🔥</span>
            <span className="text-xs font-semibold text-gray-900">Superhost</span>
          </div>
        )}
        
        <button 
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleLike(id)
          }}
          className="absolute top-4 right-4 z-10 hover:scale-110 transition-transform bg-white rounded-full p-2 shadow-sm"
        >
          <Heart 
            className={`w-5 h-5 ${
              isLiked(id) 
                ? 'fill-red-500 stroke-red-500' 
                : 'fill-none stroke-gray-900'
            } stroke-2`}
          />
        </button>
      </div>
      
      <Link href={`/property/${id}`}>
        <div className="p-5 space-y-1.5">
          <div className="flex justify-between items-start gap-3">
            <h3 className="font-bold text-gray-900 text-lg leading-tight">
              {name}
            </h3>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-base font-semibold text-gray-900">{rating}</span>
              <svg className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          
          <p className="text-gray-500 text-base">{location}</p>
          
          <div className="flex items-baseline gap-1 pt-1">
            <span className="text-gray-900 font-bold text-xl">${price}</span>
            <span className="text-gray-500 text-base">/night</span>
          </div>
        </div>
      </Link>
    </div>
  )
}