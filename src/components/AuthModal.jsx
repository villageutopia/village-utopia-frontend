// src/components/AuthModal.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function AuthModal({ isOpen, onClose, onSuccess, defaultTab = 'login' }) {
  const { login, register, loading, error, clearError } = useAuth()
  const [tab, setTab] = useState(defaultTab)

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [regForm,   setRegForm]   = useState({ name: '', email: '', phone: '', password: '', confirm: '' })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (isOpen) { setTab(defaultTab); setFormError(''); clearError() }
  }, [isOpen, defaultTab])

  useEffect(() => { setFormError(error) }, [error])

  // Close on ESC
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  async function handleLogin(e) {
    e.preventDefault()
    setFormError('')
    if (!loginForm.email || !loginForm.password) { setFormError('Sab fields bharein'); return }
    const res = await login(loginForm.email, loginForm.password)
    if (res.success) { onSuccess?.(); onClose() }
  }

  async function handleRegister(e) {
    e.preventDefault()
    setFormError('')
    if (!regForm.name || !regForm.email || !regForm.phone || !regForm.password) {
      setFormError('Sab fields bharein'); return
    }
    if (regForm.password !== regForm.confirm) { setFormError('Passwords match nahi kar rahe'); return }
    if (regForm.password.length < 6) { setFormError('Password kam se kam 6 characters ka ho'); return }
    const res = await register(regForm.name, regForm.email, regForm.phone, regForm.password)
    if (res.success) { onSuccess?.(); onClose() }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
         onClick={e => { if (e.target === e.currentTarget) onClose() }}>

      {/* Backdrop */}
      <div className="absolute inset-0 bg-forest-dark/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-cream w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="bg-forest-dark px-7 py-5 flex items-center justify-between">
          <div>
            <div className="font-display text-xl text-cream font-light">Village Utopia</div>
            <div className="font-body text-[9px] tracking-[0.3em] uppercase text-gold mt-0.5">
              {tab === 'login' ? 'Welcome back' : 'Create account'}
            </div>
          </div>
          <button onClick={onClose}
            className="text-cream/50 hover:text-cream transition-colors text-xl w-8 h-8 flex items-center justify-center">
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-cream-dark">
          {['login', 'register'].map(t => (
            <button key={t} onClick={() => { setTab(t); setFormError(''); clearError() }}
              className={`flex-1 py-3 font-body text-xs tracking-[0.15em] uppercase transition-colors ${
                tab === t
                  ? 'text-forest-dark border-b-2 border-gold font-medium'
                  : 'text-ink/40 hover:text-ink/70'
              }`}>
              {t === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <div className="p-7">

          {/* Error */}
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-600 font-body text-sm px-4 py-2.5 mb-5">
              {formError}
            </div>
          )}

          {/* ── Login Form ── */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1.5">
                  Email
                </label>
                <input type="email" value={loginForm.email} autoFocus
                  onChange={e => setLoginForm(f => ({ ...f, email: e.target.value }))}
                  className="input-field" placeholder="rahul@email.com" />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1.5">
                  Password
                </label>
                <input type="password" value={loginForm.password}
                  onChange={e => setLoginForm(f => ({ ...f, password: e.target.value }))}
                  className="input-field" placeholder="••••••••" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-forest-mid text-cream font-body text-xs tracking-[0.2em] uppercase
                           py-3.5 hover:bg-forest-dark transition-colors disabled:opacity-50">
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <p className="text-center font-body text-xs text-ink/50">
                Account nahi hai?{' '}
                <button type="button" onClick={() => setTab('register')}
                  className="text-forest-mid hover:text-gold transition-colors underline">
                  Register karo
                </button>
              </p>
            </form>
          )}

          {/* ── Register Form ── */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1.5">
                  Full Name
                </label>
                <input type="text" value={regForm.name} autoFocus
                  onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))}
                  className="input-field" placeholder="Rahul Sharma" />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1.5">
                  Email
                </label>
                <input type="email" value={regForm.email}
                  onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))}
                  className="input-field" placeholder="rahul@email.com" />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1.5">
                  Phone
                </label>
                <input type="tel" value={regForm.phone}
                  onChange={e => setRegForm(f => ({ ...f, phone: e.target.value }))}
                  className="input-field" placeholder="+91 98765 43210" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1.5">
                    Password
                  </label>
                  <input type="password" value={regForm.password}
                    onChange={e => setRegForm(f => ({ ...f, password: e.target.value }))}
                    className="input-field" placeholder="Min 6 chars" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1.5">
                    Confirm
                  </label>
                  <input type="password" value={regForm.confirm}
                    onChange={e => setRegForm(f => ({ ...f, confirm: e.target.value }))}
                    className="input-field" placeholder="Repeat" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-forest-mid text-cream font-body text-xs tracking-[0.2em] uppercase
                           py-3.5 hover:bg-forest-dark transition-colors disabled:opacity-50">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
              <p className="text-center font-body text-xs text-ink/50">
                Already registered?{' '}
                <button type="button" onClick={() => setTab('login')}
                  className="text-forest-mid hover:text-gold transition-colors underline">
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}