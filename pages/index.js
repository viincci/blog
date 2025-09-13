import Link from 'next/link'
import { useState } from 'react'

export default function HRMFHomePage() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const featuredBiomes = [
    {
      name: 'Fynbos',
      description: 'The world\'s smallest and richest floral kingdom',
      image: '/static/images/fynbos.jpg',
      species: '8,500+ species',
      endemic: '68% endemic',
      location: 'Western & Eastern Cape'
    },
    {
      name: 'Succulent Karoo',
      description: 'The world\'s most succulent-rich desert',
      image: '/static/images/karoo.jpg',
      species: '6,350+ species',
      endemic: '40% endemic',
      location: 'Northern & Western Cape'
    },
    {
      name: 'Grasslands',
      description: 'Vast temperate grasslands of the interior',
      image: '/static/images/grasslands.jpg',
      species: '3,000+ species',
      endemic: '30% endemic',
      location: 'Highveld Plateau'
    }
  ]

  const quickStats = [
    { label: 'Plant Species', value: '22,000+' },
    { label: 'Endemic Species', value: '15,000+' },
    { label: 'Projects Active', value: '25' },
    { label: 'Research Papers', value: '150+' }
  ]

  const recentArticles = [
    {
      title: 'The King Protea: Conservation Challenges and Opportunities',
      excerpt: 'Exploring the conservation needs of South Africa\'s national flower.',
      date: '2025-01-15',
      category: 'Conservation',
      slug: 'king-protea-conservation'
    },
    {
      title: 'Discovering New Cycad Species in Mpumalanga',
      excerpt: 'Recent field work reveals previously unknown cycad populations.',
      date: '2025-01-10',
      category: 'Research',
      slug: 'new-cycad-species'
    },
    {
      title: 'Traditional Uses of Buchu: Ethnobotanical Insights',
      excerpt: 'Indigenous knowledge systems and medicinal plant conservation.',
      date: '2025-01-05',
      category: 'Ethnobotany',
      slug: 'buchu-traditional-uses'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-900 to-emerald-800">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
              Heritage Road Map Foundation
            </h1>
            <p className="text-xl sm:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Preserving South Africa's Botanical Heritage Through Research, Conservation, and Education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-900 bg-white hover:bg-green-50 transition-colors duration-300">
                Explore Plant Articles
              </Link>
              <Link href="/species" className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-green-900 transition-colors duration-300">
                Species Database
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-50 to-transparent"></div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-800 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Biomes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            South Africa's Biodiversity Hotspots
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the unique ecosystems that make South Africa one of the world's most biodiverse countries
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredBiomes.map((biome, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
                hoveredCard === index ? 'ring-2 ring-green-500' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="h-48 bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                <div className="text-6xl">🌿</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{biome.name}</h3>
                <p className="text-gray-600 mb-4">{biome.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Species:</span>
                    <span className="text-sm font-medium">{biome.species}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Endemism:</span>
                    <span className="text-sm font-medium">{biome.endemic}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Location:</span>
                    <span className="text-sm font-medium">{biome.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Latest Research & Articles
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay updated with our latest botanical research, conservation efforts, and field discoveries
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {recentArticles.map((article, index) => (
              <Link 
                key={index} 
                href={`/blog/${article.slug}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-green-300 to-emerald-400 flex items-center justify-center group-hover:from-green-400 group-hover:to-emerald-500 transition-colors duration-300">
                  <div className="text-5xl">📝</div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-green-600 font-medium mb-2">
                    {article.category}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  <div className="text-xs text-gray-500">{article.date}</div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-800 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Join Our Conservation Mission
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Help us preserve South Africa's unique botanical heritage for future generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleNavigation('/about')}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-800 bg-white hover:bg-green-50 transition-colors duration-300 cursor-pointer"
            >
              Learn About HRMF
            </button>
            <button 
              onClick={() => handleNavigation('/contact')}
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-green-700 transition-colors duration-300 cursor-pointer"
            >
              Get Involved
            </button>
          </div>
        </div>
      </div>
    </div>
  )
        }
