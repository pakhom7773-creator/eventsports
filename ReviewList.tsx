'use client'

import { Star, User, MessageSquare } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import type { Review } from '@/types'

interface ReviewListProps {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
          <MessageSquare className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-slate-600 font-medium">Пока нет отзывов. Будьте первым!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="card p-6 hover:shadow-medium transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900">
                  {review.user?.full_name || 'Анонимный пользователь'}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {format(new Date(review.created_at), "d MMMM yyyy", { locale: ru })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-200">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-yellow-200'
                  }`}
                />
              ))}
              <span className="ml-2 text-xs font-bold text-yellow-700">{review.rating}</span>
            </div>
          </div>
          {review.comment && (
            <p className="text-slate-700 leading-relaxed pl-16">{review.comment}</p>
          )}
        </div>
      ))}
    </div>
  )
}

