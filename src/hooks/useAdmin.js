// src/hooks/useAdmin.js
import { useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export function useAdmin() {
  const [token,   setToken]   = useState(() => localStorage.getItem('admin_token'))
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const isLoggedIn = !!token

  async function login(username, password) {
    setLoading(true); setError('')
    try {
      const res  = await fetch(`${API}/api/admin/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      localStorage.setItem('admin_token', data.token)
      setToken(data.token)
      return true
    } catch (e) {
      setError(e.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem('admin_token')
    setToken(null)
  }

  // ── apiCall with full error handling ──────────────────────
  async function apiCall(path, options = {}) {
    try {
      const res = await fetch(`${API}${path}`, {
        ...options,
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers,
        },
      })
      if (res.status === 401) { logout(); return null }
      const data = await res.json()
      return data
    } catch (err) {
      console.error('[API Error]', path, err.message)
      return { error: `Network error: ${err.message}` }
    }
  }

  return { token, isLoggedIn, loading, error, login, logout, apiCall }
}