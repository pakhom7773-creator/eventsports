'use client'

import { User, LogOut, Menu, X, Trophy, Shield } from 'lucide-react'
import { useState } from 'react'
import type { User as UserType } from '@/types'

interface HeaderProps {
  user: UserType | null
  onLogout: () => void
}

export function Header({ user, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 block leading-tight">СпортСобытия</span>
              <span className="text-xs text-slate-500 font-medium">Информационная система</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <a
                    href="/admin"
                    className="flex items-center space-x-2 px-4 py-2 text-purple-700 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-all font-medium"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Админ-панель</span>
                  </a>
                )}
                <a
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-all font-medium"
                >
                  <User className="w-5 h-5" />
                  <span>{user.full_name || user.email}</span>
                  {user.role === 'organizer' && (
                    <span className="px-2.5 py-0.5 bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 text-xs font-bold rounded-full border border-primary-200">
                      Организатор
                    </span>
                  )}
                  {user.role === 'admin' && (
                    <span className="px-2.5 py-0.5 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200">
                      Админ
                    </span>
                  )}
                </a>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Выйти</span>
                </button>
              </>
            ) : (
              <span className="text-slate-500 text-sm">Войдите для доступа к функциям</span>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            {user ? (
              <div className="space-y-2">
                {user.role === 'admin' && (
                  <a
                    href="/admin"
                    className="flex items-center space-x-2 px-4 py-2 text-purple-700 hover:bg-purple-50 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Shield className="w-5 h-5" />
                    <span>Админ-панель</span>
                  </a>
                )}
                <a
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>{user.full_name || user.email}</span>
                </a>
                <button
                  onClick={() => {
                    onLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Выйти</span>
                </button>
              </div>
            ) : (
              <p className="px-4 text-slate-500 text-sm">Войдите для доступа к функциям</p>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

