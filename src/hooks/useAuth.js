import { useState, useEffect, createContext, useContext } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [token,   setToken]   = useState(() => localStorage.getItem('auth_token'))
  const [loading, setLoading] = useState(true)

  // Load user on mount if token exists
  useEffect(() => {
    if (!token) { setLoading(false); return }
    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        if (data?.user) setUser(data.user)
        else { localStorage.removeItem('auth_token'); setToken(null) }
      })
      .catch(() => { localStorage.removeItem('auth_token'); setToken(null) })
      .finally(() => setLoading(false))
  }, [token])

  async function login(email, password) {
    const res  = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')
    localStorage.setItem('auth_token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  async function register(name, email, phone, password) {
    const res  = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Registration failed')
    localStorage.setItem('auth_token', data.token)
    setToken(data.token)
    setUser(data.user)
    return data.user
  }

  function logout() {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}