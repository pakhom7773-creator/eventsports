import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import type { User } from '@/types'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      loadUser(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const loadUser = async (authToken: string) => {
    try {
      // Set token in API client before making request
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', authToken)
      }
      const userData = await api.getCurrentUser()
      setUser(userData)
    } catch (error: any) {
      console.error('Failed to load user:', error)
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
      }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login({ email, password })
      localStorage.setItem('token', response.access_token)
      setToken(response.access_token)
      await loadUser(response.access_token)
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const register = async (email: string, password: string, fullName?: string, role?: string) => {
    try {
      const response = await api.register({ email, password, full_name: fullName, role: role || 'user' })
      if (response.access_token) {
        localStorage.setItem('token', response.access_token)
        setToken(response.access_token)
        await loadUser(response.access_token)
        return true
      }
      return false
    } catch (error: any) {
      console.error('Registration failed:', error)
      const errorMessage = error.response?.data?.detail || 'Ошибка регистрации'
      console.error('Error details:', errorMessage)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return {
    user,
    token,
    loading,
    login,
    register,
    logout,
  }
}

