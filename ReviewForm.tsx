'use client'

import { useState } from 'react'
import { Star, Send } from 'lucide-react'
import { api } from '@/lib/api'

interface ReviewFormProps {
  eventId: number
  onReviewCreated: () => void
}

export function ReviewForm({ eventId, onReviewCreated }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      setError('Пожалуйста, выберите оценку')
      return
    }

    setError('')
    setLoading(true)

    try {
      await api.createReview({
        event_id: eventId,
        rating,
        comment: comment || undefined,
      })
      setRating(0)
      setComment('')
      onReviewCreated()
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка при создании отзыва')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg font-medium">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-3">
          Оценка *
        </label>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-yellow-50 px-4 py-2 rounded-lg border-2 border-yellow-200">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transform hover:scale-110 transition-transform"
              >
                <Star
                  className={`w-7 h-7 transition ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-yellow-200 hover:text-yellow-400'
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <span className="ml-3 px-4 py-2 bg-primary-50 text-primary-700 text-sm font-bold rounded-lg border border-primary-200">
              {rating === 1 && 'Ужасно'}
              {rating === 2 && 'Плохо'}
              {rating === 3 && 'Нормально'}
              {rating === 4 && 'Хорошо'}
              {rating === 5 && 'Отлично'}
            </span>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Комментарий
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Расскажите о вашем опыте..."
          className="input-field resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || rating === 0}
        className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
        <span>{loading ? 'Отправка...' : 'Отправить отзыв'}</span>
      </button>
    </form>
  )
}

