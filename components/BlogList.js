// components/BlogList.js
import { useState, useEffect } from 'react'

export default function BlogList() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data for development (replace with API calls when FastAPI is ready)
  const mockArticles = [
    {
      id: 1,
      title: 'The King Protea: South Africa\'s Floral Emblem',
      slug: 'king-protea-conservation',
      excerpt: 'Exploring the biology, cultural significance, and conservation needs of Protea cynaroides.',
      content: 'Full article content...',
      author: 'Dr. Sarah Williams',
      published_date: '2025-01-15T10:00:00Z',
      category: 'Conservation',
      tags: ['protea', 'fynbos', 'endemic-species'],
      featured_image: '/static/images/king-protea.jpg',
      reading_time: 8,
      featured: true
    },
    {
      id: 2,
      title: 'Discovering New Cycad Species in Mpumalanga',
      slug: 'new-cycad-species-mpumalanga',
      excerpt: 'Recent field work reveals previously unknown cycad populations in the Barberton Greenstone Belt.',
      content: 'Full article content...',
      author: 'Prof. Michael Johnson',
      published_date: '2025-01-10T14:30:00Z',
      category: 'Research',
      tags: ['cycads', 'taxonomy', 'mpumalanga'],
      featured_image: '/static/images/cycad-discovery.jpg',
      reading_time: 12,
      featured: false
    },
    {
      id: 3,
      title: 'Traditional Uses of Buchu: Ethnobotanical Insights',
      slug: 'buchu-traditional-uses',
      excerpt: 'Indigenous knowledge systems and medicinal plant conservation in the Western Cape.',
      content: 'Full article content...',
      author: 'Dr. Nomsa Mbeki',
      published_date: '2025-01-05T09:15:00Z',
      category: 'Ethnobotany',
      tags: ['buchu', 'traditional-medicine', 'indigenous-knowledge'],
      featured_image: '/static/images/buchu-plants.jpg',
      reading_time: 10,
      featured: true
    },
    {
      id: 4,
      title: 'Fynbos Fire Ecology: Nature\'s Renewal Process',
      slug: 'fynbos-fire-ecology',
      excerpt: 'Understanding the crucial role of fire in maintaining fynbos biodiversity.',
      content: 'Full article content...',
      author: 'Dr. James van der Merwe',
      published_date: '2025-01-01T08:00:00Z',
      category: 'Ecology',
      tags: ['fynbos', 'fire-ecology', 'biodiversity'],
      featured_image: '/static/images/fynbos-fire.jpg',
      reading_time: 6,
      featured: false
    },
    {
      id: 5,
      title: 'Karoo Succulents: Masters of Water Conservation',
      slug: 'karoo-succulents-water-conservation',
      excerpt: 'Exploring the remarkable adaptations of Karoo succulents to arid conditions.',
      content: 'Full article content...',
      author: 'Dr. Lisa Koekemoer',
      published_date: '2024-12-28T11:30:00Z',
      category: 'Research',
      tags: ['karoo', 'succulents', 'adaptation', 'drought'],
      featured_image: '/static/images/karoo-succulents.jpg',
      reading_time: 9,
      featured: false
    },
    {
      id: 6,
      title: 'Grassland Restoration in the Highveld',
      slug: 'grassland-restoration-highveld',
      excerpt: 'Community-based efforts to restore degraded grassland ecosystems.',
      content: 'Full article content...',
      author: 'Prof. Thabo Mthembu',
      published_date: '2024-12-25T14:45:00Z',
      category: 'Conservation',
      tags: ['grasslands', 'restoration', 'community', 'highveld'],
      featured_image: '/static/images/grassland-restoration.jpg',
      reading_time: 11,
      featured: true
    }
  ]

  const mockCategories = ['Conservation', 'Research', 'Ethnobotany', 'Ecology', 'Taxonomy']
  const mockTags = ['protea', 'fynbos', 'cycads', 'endemic-species', 'traditional-medicine', 'buchu', 'karoo', 'grasslands', 'fire-ecology', 'succulents', 'restoration']

  useEffect(() => {
    loadArticles()
    loadCategories()
    loadTags()
  }, [currentPage, selectedCategory, selectedTag])

  const loadArticles = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // For development, use mock data with filtering
      setTimeout(() => {
        let filteredArticles = mockArticles
        
        if (selectedCategory) {
          filteredArticles = filteredArticles.filter(article => article.category === selectedCategory)
        }
        
        if (selectedTag) {
          filteredArticles = filteredArticles.filter(article => article.tags.includes(selectedTag))
        }
        
        if (searchQuery) {
          filteredArticles = filteredArticles.filter(article => 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          )
        }
        
        // Simple pagination
        const articlesPerPage = 9
        const startIndex = (currentPage - 1) * articlesPerPage
        const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage)
        
        setArticles(paginatedArticles)
        setTotalPages(Math.ceil(filteredArticles.length / articlesPerPage))
        setLoading(false)
      }, 500)
      
    } catch (err) {
      setError('Failed to load articles. Please try again.')
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      setCategories(mockCategories)
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }

  const loadTags = async () => {
    try {
      setTags(mockTags)
    } catch (err) {
      console.error('Failed to load tags:', err)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    loadArticles()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const clearFilters = () => {
    setSelectedCategory('')
    setSelectedTag('')
    setSearchQuery('')
    setCurrentPage(1)
  }

  const handleNavigation = (path) => {
    // In a real Next.js app, this would use Next/link or router.push
    console.log(`Navigate to: ${path}`)
    // window.location.href = path // Uncomment when implementing
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button 
            onClick={() => loadArticles()} 
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Plant Articles & Research</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our collection of botanical research, conservation stories, and plant discoveries from across South Africa
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setCurrentPage(1)
            }}
            className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => {
              setSelectedTag(e.target.value)
              setCurrentPage(1)
            }}
            className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          {(selectedCategory || selectedTag || searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <p className="mt-2 text-gray-600">Loading articles...</p>
        </div>
      )}

      {/* Articles Grid */}
      {!loading && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {articles.map((article) => (
              <div 
                key={article.id}
                onClick={() => handleNavigation(`/blog/${article.slug}`)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group"
              >
                <div className="h-48 bg-gradient-to-br from-green-300 to-emerald-400 group-hover:from-green-400 group-hover:to-emerald-500 transition-colors duration-300 flex items-center justify-center">
                  <div className="text-6xl">🌿</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-green-600 font-medium">{article.category}</span>
                    {article.featured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Featured</span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(article.published_date)}</span>
                    <span>{article.reading_time} min read</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === i + 1
                      ? 'bg-green-600 text-white border-green-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          )}

          {/* No Results */}
          {articles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No articles found.</div>
              <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
    }
