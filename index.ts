export interface Event {
  id: number
  title: string
  description?: string
  sport_type?: string
  location?: string
  start_at: string
  end_at?: string
  organizer_id?: number
  image_url?: string
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

