'use client'

import { Search, Filter } from 'lucide-react'
import { useState } from 'react'

interface FiltersProps {
  filters: {
    sport: string
    city: string
    from: string
    to: string
    q: string
  }
  onChange: (filters: FiltersProps['filters']) => void
  onSearch: () => void
}

export function Filters({ filters, onChange, onSearch }: FiltersProps) {
  const updateFilter = (key: keyof typeof filters, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Filter className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Фильтры поиска</h3>
          <p className="text-xs text-slate-500">Найдите нужное мероприятие</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Поиск по названию
          </label>
          <input
            type="text"
            placeholder="Введите название..."
            value={filters.q}
            onChange={(e) => updateFilter('q', e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Вид спорта
          </label>
          <input
            type="text"
            placeholder="Например: футбол, бег..."
            value={filters.sport}
            onChange={(e) => updateFilter('sport', e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Город
          </label>
          <input
            type="text"
            placeholder="Введите город..."
            value={filters.city}
            onChange={(e) => updateFilter('city', e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Дата начала
          </label>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => updateFilter('from', e.target.value)}
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Дата окончания
          </label>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => updateFilter('to', e.target.value)}
            className="input-field"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={onSearch}
          className="btn-primary flex items-center space-x-2"
        >
          <Search className="w-5 h-5" />
          <span>Найти мероприятия</span>
        </button>
      </div>
    </div>
  )
}

