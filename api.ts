import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
if (typeof window !== 'undefined') {
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
  
  // Handle 401 errors
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
      }
      return Promise.reject(error)
    }
  )
}

export interface Event {
  id: number
  title: string
  description?: string
  sport_type?: string
  location?: string
  start_at: string
  end_at?: string
  organizer_id?: number
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  email: string
  full_name?: string
  role: string
  created_at: string
}

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  full_name?: string
  role?: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

export interface Review {
  id: number
  user_id: number
  event_id: number
  rating: number
  comment?: string
  created_at: string
  user?: User
}

export interface Subscription {
  id: number
  user_id: number
  sport_type?: string
  city?: string
  created_at: string
}

export const api = {
  // Auth
  async login(data: LoginData): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/api/auth/login', data)
    return response.data
  },

  async register(data: RegisterData): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>('/api/auth/register', data)
    return response.data
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/api/users/me')
    return response.data
  },

  // Events
  async getEvents(params?: string): Promise<Event[]> {
    const url = params ? `/api/events?${params}` : '/api/events'
    const response = await apiClient.get<Event[]>(url)
    return response.data
  },

  async getEvent(id: number): Promise<Event> {
    const response = await apiClient.get<Event>(`/api/events/${id}`)
    return response.data
  },

  async createEvent(data: Partial<Event>): Promise<Event> {
    const response = await apiClient.post<Event>('/api/events', data)
    return response.data
  },

  async updateEvent(id: number, data: Partial<Event>): Promise<Event> {
    const response = await apiClient.put<Event>(`/api/events/${id}`, data)
    return response.data
  },

  async deleteEvent(id: number): Promise<void> {
    await apiClient.delete(`/api/events/${id}`)
  },

  // Reviews
  async getEventReviews(eventId: number): Promise<Review[]> {
    const response = await apiClient.get<Review[]>(`/api/reviews/event/${eventId}`)
    return response.data
  },

  async getEventReviewStats(eventId: number): Promise<any> {
    const response = await apiClient.get(`/api/reviews/event/${eventId}/stats`)
    return response.data
  },

  async createReview(data: { event_id: number; rating: number; comment?: string }): Promise<Review> {
    const response = await apiClient.post<Review>('/api/reviews', data)
    return response.data
  },

  async updateReview(id: number, data: { rating?: number; comment?: string }): Promise<Review> {
    const response = await apiClient.put<Review>(`/api/reviews/${id}`, data)
    return response.data
  },

  async deleteReview(id: number): Promise<void> {
    await apiClient.delete(`/api/reviews/${id}`)
  },

  // Subscriptions
  async getSubscriptions(): Promise<Subscription[]> {
    const response = await apiClient.get<Subscription[]>('/api/subscriptions')
    return response.data
  },

  async createSubscription(data: { sport_type?: string; city?: string }): Promise<Subscription> {
    const response = await apiClient.post<Subscription>('/api/subscriptions', data)
    return response.data
  },

  async deleteSubscription(id: number): Promise<void> {
    await apiClient.delete(`/api/subscriptions/${id}`)
  },
}

