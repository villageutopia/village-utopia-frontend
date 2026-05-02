// src/pages/admin/AdminLogin.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../hooks/useAdmin'

export default function AdminLogin() {
  const { login, loading, error } = useAdmin()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(form.username, form.password)
    if (ok) navigate('/admin/dashboard')
  }

  return (
    <div className="min-h-screen bg-forest-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="font-display text-3xl text-cream font-light">Village Utopia</div>
          <div className="font-body text-[10px] tracking-[0.35em] uppercase text-gold mt-1">
            Admin Panel
          </div>
        </div>

        {/* Card */}
        <div className="bg-cream p-8">
          <h2 className="font-display text-2xl text-forest-dark font-light mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase font-body text-forest-mid font-semibold mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="input-field"
                placeholder="admin"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase font-body text-forest-mid font-semibold mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="font-body text-xs text-red-600 bg-red-50 px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-forest-mid text-cream font-body text-xs tracking-[0.2em] uppercase
                         py-3.5 hover:bg-forest-dark transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center font-body text-xs text-cream/30 mt-6">
          Village Utopia Cottages · Admin
        </p>
      </div>
    </div>
  )
}
