import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import propertiesData from '@/data/properties.json'

export default function HomePage() {
  const properties = propertiesData.properties
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Find a <span className="text-orange-500">host</span> for every journey
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Discover the best local rental properties for an escape most nearby
          </p>
          <SearchBar />
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex gap-4 overflow-x-auto">
            <button className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium whitespace-nowrap">
              All
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 whitespace-nowrap">
              Amazing views
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 whitespace-nowrap">
              Lakefront
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 whitespace-nowrap">
              Cabins
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 whitespace-nowrap">
              Beachfront
            </button>
          </div>
        </div>
      </section>
      
      {/* Property Grid */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">
          Stays nearby Toronto, Ontario
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
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
      </section>
    </div>
  )
}