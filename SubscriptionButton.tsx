'use client'

import { useState, useEffect } from 'react'
import { Bell, BellOff } from 'lucide-react'
import { api } from '@/lib/api'

interface SubscriptionButtonProps {
  sportType?: string
  city?: string
}

export function SubscriptionButton({ sportType, city }: SubscriptionButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkSubscription()
  }, [sportType, city])

  const checkSubscription = async () => {
    try {
      const subscriptions = await api.getSubscriptions()
      const existing = subscriptions.find(
        (sub) => sub.sport_type === sportType && sub.city === city
      )
      if (existing) {
        setIsSubscribed(true)
        setSubscriptionId(existing.id)
      }
    } catch (error) {
      console.error('Failed to check subscription:', error)
    }
  }

  const handleToggle = async () => {
    setLoading(true)
    try {
      if (isSubscribed && subscriptionId) {
        await api.deleteSubscription(subscriptionId)
        setIsSubscribed(false)
        setSubscriptionId(null)
      } else {
        const subscription = await api.createSubscription({
          sport_type: sportType || undefined,
          city: city || undefined,
        })
        setIsSubscribed(true)
        setSubscriptionId(subscription.id)
      }
    } catch (error: any) {
      console.error('Failed to toggle subscription:', error)
      alert(error.response?.data?.detail || 'Ошибка при изменении подписки')
    } finally {
      setLoading(false)
    }
  }

  if (!sportType && !city) return null

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition font-semibold shadow-md hover:shadow-lg ${
        isSubscribed
          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-2 border-slate-300'
          : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isSubscribed ? (
        <>
          <BellOff className="w-5 h-5" />
          <span>Отписаться</span>
        </>
      ) : (
        <>
          <Bell className="w-5 h-5" />
          <span>Подписаться</span>
        </>
      )}
    </button>
  )
}

