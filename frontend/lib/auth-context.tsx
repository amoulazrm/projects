'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { User } from './types'
import { login as apiLogin, register as apiRegister, getUserProfile } from './api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      getUserProfile()
        .then((userData) => {
          setUser(userData)
        })
        .catch(() => {
          Cookies.remove('token')
          setUser(null)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { token, user: userData } = await apiLogin(email, password)
      Cookies.set('token', token, { expires: 7 }) // Token expires in 7 days
      setUser(userData)
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      throw error
    }
  }

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { token, user: userData } = await apiRegister(email, password, firstName, lastName)
      Cookies.set('token', token, { expires: 7 }) // Token expires in 7 days
      setUser(userData)
      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    Cookies.remove('token')
    setUser(null)
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 