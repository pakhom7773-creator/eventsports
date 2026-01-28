'use client'

import { useState } from 'react'
import { X, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface LoginModalProps {
  onLogin: (email: string, password: string) => Promise<boolean>
}

export function LoginModal({ onLogin }: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('user')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let success = false
      if (isLogin) {
        success = await onLogin(email, password)
      } else {
        success = await register(email, password, fullName, role)
      }

      if (success) {
        setIsOpen(false)
        setEmail('')
        setPassword('')
        setFullName('')
        setRole('user')
        setError('')
        // Reload page to update UI
        window.location.reload()
      } else {
        setError(isLogin ? 'Неверный email или пароль' : 'Ошибка регистрации. Возможно, email уже используется.')
      }
    } catch (err: any) {
      console.error('Registration/Login error:', err)
      const errorMsg = err?.response?.data?.detail || (isLogin ? 'Неверный email или пароль' : 'Ошибка регистрации')
      setError(errorMsg === 'Email already registered' ? 'Email уже зарегистрирован' : errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary inline-flex items-center space-x-2"
      >
        <LogIn className="w-5 h-5" />
        <span>Войти или зарегистрироваться</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full p-8 shadow-strong">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Вход в систему' : 'Регистрация'}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      ФИО
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Роль
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="input-field"
                    >
                      <option value="user">Пользователь</option>
                      <option value="organizer">Организатор</option>
                      <option value="admin">Администратор</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin)
                  setError('')
                }}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                {isLogin ? (
                  <>
                    <UserPlus className="w-4 h-4 inline mr-1" />
                    Нет аккаунта? Зарегистрироваться
                  </>
                ) : (
                  'Уже есть аккаунт? Войти'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

