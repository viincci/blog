// lib/api.js - API integration utilities for FastAPI backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

// Generic API client
export class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = queryString ? `${endpoint}?${queryString}` : endpoint
    
    return this.request(url, {
      method: 'GET',
    })
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    })
  }
}

// Create API client instance
export const apiClient = new ApiClient()

// Blog/Article related API calls
export const blogApi = {
  // Get all articles with pagination and filtering
  async getArticles(page = 1, limit = 10, category = null, tags = null) {
    const params = { page, limit }
    if (category) params.category = category
    if (tags) params.tags = tags
    
    return apiClient.get('/api/v1/articles', params)
  },

  // Get single article by slug
  async getArticle(slug) {
    return apiClient.get(`/api/v1/articles/${slug}`)
  },

  // Get featured articles
  async getFeaturedArticles(limit = 5) {
    return apiClient.get('/api/v1/articles/featured', { limit })
  },

  // Get articles by category
  async getArticlesByCategory(category, page = 1, limit = 10) {
    return apiClient.get(`/api/v1/articles/category/${category}`, { page, limit })
  },

  // Get articles by tag
  async getArticlesByTag(tag, page = 1, limit = 10) {
    return apiClient.get(`/api/v1/articles/tag/${tag}`, { page, limit })
  },

  // Search articles
  async searchArticles(query, page = 1, limit = 10) {
    return apiClient.get('/api/v1/articles/search', { q: query, page, limit })
  },

  // Get all categories
  async getCategories() {
    return apiClient.get('/api/v1/categories')
  },

  // Get all tags
  async getTags() {
    return apiClient.get('/api/v1/tags')
  }
}

// Species database API calls
export const speciesApi = {
  // Get all species with filtering
  async getSpecies(page = 1, limit = 20, family = null, genus = null, conservation_status = null) {
    const params = { page, limit }
    if (family) params.family = family
    if (genus) params.genus = genus
    if (conservation_status) params.conservation_status = conservation_status
    
    return apiClient.get('/api/v1/species', params)
  },

  // Get single species by ID or scientific name
  async getSpecies(identifier) {
    return apiClient.get(`/api/v1/species/${identifier}`)
  },

  // Search species
  async searchSpecies(query, page = 1, limit = 20) {
    return apiClient.get('/api/v1/species/search', { q: query, page, limit })
  },

  // Get species by family
  async getSpeciesByFamily(family, page = 1, limit = 20) {
    return apiClient.get(`/api/v1/species/family/${family}`, { page, limit })
  },

  // Get endemic species
  async getEndemicSpecies(region = null, page = 1, limit = 20) {
    const params = { page, limit }
    if (region) params.region = region
    
    return apiClient.get('/api/v1/species/endemic', params)
  },

  // Get threatened species
  async getThreatenedSpecies(page = 1, limit = 20) {
    return apiClient.get('/api/v1/species/threatened', { page, limit })
  },

  // Get all plant families
  async getFamilies() {
    return apiClient.get('/api/v1/families')
  }
}

// Conservation projects API calls
export const projectsApi = {
  // Get all projects
  async getProjects(page = 1, limit = 10, status = null, region = null) {
    const params = { page, limit }
    if (status) params.status = status
    if (region) params.region = region
    
    return apiClient.get('/api/v1/projects', params)
  },

  // Get single project
  async getProject(id) {
    return apiClient.get(`/api/v1/projects/${id}`)
  },

  // Get active projects
  async getActiveProjects(limit = 10) {
    return apiClient.get('/api/v1/projects/active', { limit })
  },

  // Get projects by region
  async getProjectsByRegion(region, page = 1, limit = 10) {
    return apiClient.get(`/api/v1/projects/region/${region}`, { page, limit })
  }
}

// Regions/Biomes API calls
export const regionsApi = {
  // Get all biomes/regions
  async getRegions() {
    return apiClient.get('/api/v1/regions')
  },

  // Get single region with details
  async getRegion(id) {
    return apiClient.get(`/api/v1/regions/${id}`)
  },

  // Get species in a region
  async getRegionSpecies(id, page = 1, limit = 20) {
    return apiClient.get(`/api/v1/regions/${id}/species`, { page, limit })
  },

  // Get projects in a region
  async getRegionProjects(id, page = 1, limit = 10) {
    return apiClient.get(`/api/v1/regions/${id}/projects`, { page, limit })
  }
}

// Newsletter subscription
export const newsletterApi = {
  async subscribe(email, name = null) {
    return apiClient.post('/api/v1/newsletter/subscribe', { email, name })
  },

  async unsubscribe(email) {
    return apiClient.post('/api/v1/newsletter/unsubscribe', { email })
  }
}

// Contact form
export const contactApi = {
  async submitContact(data) {
    return apiClient.post('/api/v1/contact', data)
  }
}

// Statistics/Analytics
export const statsApi = {
  async getSiteStats() {
    return apiClient.get('/api/v1/stats')
  },

  async getSpeciesStats() {
    return apiClient.get('/api/v1/stats/species')
  },

  async getConservationStats() {
    return apiClient.get('/api/v1/stats/conservation')
  }
}

// Image/Media handling
export const mediaApi = {
  async uploadImage(file, alt_text = '', caption = '') {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('alt_text', alt_text)
    formData.append('caption', caption)

    return apiClient.request('/api/v1/media/upload', {
      method: 'POST',
      body: formData,
      headers: {} // Remove Content-Type to let browser set it for FormData
    })
  },

  async getImage(id) {
    return apiClient.get(`/api/v1/media/${id}`)
  }
}

// Error handling wrapper for React components
export const withErrorHandling = (apiCall) => {
  return async (...args) => {
    try {
      return await apiCall(...args)
    } catch (error) {
      console.error('API Error:', error)
      
      // You can customize error handling here
      if (error.message.includes('404')) {
        throw new Error('Resource not found')
      } else if (error.message.includes('500')) {
        throw new Error('Server error. Please try again later.')
      } else if (error.message.includes('network')) {
        throw new Error('Network error. Please check your connection.')
      }
      
      throw error
    }
  }
        }
