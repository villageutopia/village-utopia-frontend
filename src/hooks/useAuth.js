// src/hooks/useAuth.js — pure JS, no JSX
import { useState, useCallback } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('user_token'))
  const [user,  setUser]  = useState(() => {
    try { return JSON.parse(localStorage.getItem('user_data')) } catch { return null }
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const isLoggedIn = !!token

  async function register(name, email, phone, password) {
    setLoading(true); setError('')
    try {
      const res  = await fetch(`${API}/api/auth/register`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, phone, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      _save(data.token, data.user)
      return { success: true }
    } catch (e) {
      setError(e.message)
      return { success: false, error: e.message }
    } finally { setLoading(false) }
  }

  async function login(email, password) {
    setLoading(true); setError('')
    try {
      const res  = await fetch(`${API}/api/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      _save(data.token, data.user)
      return { success: true }
    } catch (e) {
      setError(e.message)
      return { success: false, error: e.message }
    } finally { setLoading(false) }
  }

  function logout() {
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_data')
    setToken(null)
    setUser(null)
  }

  const authFetch = useCallback(async (path, options = {}) => {
    const t = localStorage.getItem('user_token')
    try {
      const res = await fetch(`${API}${path}`, {
        ...options,
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${t}`,
          ...options.headers,
        },
      })
      if (res.status === 401) { logout(); return null }
      return res.json()
    } catch (err) {
      return { error: err.message }
    }
  }, [])

  function _save(t, u) {
    localStorage.setItem('user_token', t)
    localStorage.setItem('user_data',  JSON.stringify(u))
    setToken(t); setUser(u)
  }

  function clearError() { setError('') }

  return { token, user, isLoggedIn, loading, error, login, register, logout, authFetch, clearError }
}