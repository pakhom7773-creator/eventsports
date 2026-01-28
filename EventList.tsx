'use client'

import { Calendar, MapPin, Trophy, Plus, Star } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'
import type { Event } from '@/types'

interface EventListProps {
  events: Event[]
}

export function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="card p-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
          <Trophy className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          Мероприятий не найдено
        </h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Попробуйте изменить параметры поиска или создать новое мероприятие
        </p>
      </div>
    )
  }

  const addToCalendar = (event: Event) => {
    const startDate = new Date(event.start_at)
    const endDate = event.end_at ? new Date(event.end_at) : new Date(startDate.getTime() + 2 * 60 * 60 * 1000)
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(event.description || '')}&location=${encodeURIComponent(event.location || '')}`
    
    window.open(calendarUrl, '_blank')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Link
          key={event.id}
          href={`/events/${event.id}`}
          className="card-hover group overflow-hidden flex flex-col"
        >
          {/* Event Image */}
          {event.image_url && (
            <div className="relative h-48 w-full overflow-hidden bg-slate-200">
              <Image
                src={event.image_url}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized={event.image_url?.includes('unsplash.com')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              {event.sport_type && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-primary-700 text-xs font-bold rounded-full shadow-md border border-primary-200">
                    {event.sport_type}
                  </span>
                </div>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                {event.title}
              </h3>

              {event.description && (
                <p className="text-slate-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                  {event.description}
                </p>
              )}

              <div className="space-y-3 mb-5">
                <div className="flex items-start text-slate-700">
                  <Calendar className="w-5 h-5 mr-3 text-primary-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">
                      {format(new Date(event.start_at), "d MMMM yyyy", { locale: ru })}
                    </div>
                    <div className="text-xs text-slate-500">
                      {format(new Date(event.start_at), "HH:mm")}
                      {event.end_at && ` - ${format(new Date(event.end_at), "HH:mm")}`}
                    </div>
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-start text-slate-700">
                    <MapPin className="w-5 h-5 mr-3 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">{event.location}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-100 mt-auto">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    addToCalendar(event)
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all font-semibold text-sm shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Календарь</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  className="px-5 py-2.5 text-primary-600 hover:bg-primary-50 rounded-lg transition-all text-sm font-semibold border border-primary-200"
                >
                  →
                </button>
              </div>
            </div>
        </Link>
      ))}
    </div>
  )
}

