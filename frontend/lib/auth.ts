"use client";

import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export function getToken(): string | null {
  return Cookies.get('auth_token') || null
}

export async function getSession() {
  const token = getToken()
  if (!token) return null

  try {
    const response = await fetch(`${API_URL}/api/users/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    })

    if (!response.ok) {
      return null
    }

    const user = await response.json()
    return { user, token }
  } catch (error) {
    console.error('Failed to get session:', error)
    return null
  }
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/api/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  const data = await response.json()
  if (data.token) {
    Cookies.set('auth_token', data.token, { expires: 7 }) // Token expires in 7 days
  }
  return data
}

export async function register(email: string, password: string, first_name: string, last_name: string) {
  const response = await fetch(`${API_URL}/api/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password, first_name, last_name }),
  })

  if (!response.ok) {
    throw new Error('Registration failed')
  }

  const data = await response.json()
  if (data.token) {
    Cookies.set('auth_token', data.token, { expires: 7 }) // Token expires in 7 days
  }
  return data
}

export async function logout() {
  const response = await fetch(`${API_URL}/api/auth/logout/`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }
  
  Cookies.remove('auth_token')
}
