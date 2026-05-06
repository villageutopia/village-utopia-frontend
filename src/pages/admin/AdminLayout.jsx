import { useState } from 'react'
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { useAdmin } from '../../hooks/useAdmin'
import { useEffect } from 'react'

const NAV = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/rooms',     icon: '🛏️', label: 'Rooms & Cottages' },
  { to: '/admin/bookings',  icon: '📋', label: 'Bookings' },
]

export default function AdminLayout() {
  const { isLoggedIn, logout } = useAdmin()
  const navigate  = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) navigate('/admin')
  }, [isLoggedIn])

  const handleLogout = () => { logout(); navigate('/admin') }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden bg-forest-dark flex items-center justify-between px-4 py-3 sticky top-0 z-40">
        <div>
          <div className="font-display text-lg text-cream font-light leading-none">Village Utopia</div>
          <div className="font-body text-[8px] tracking-[0.2em] uppercase text-gold">Admin Panel</div>
        </div>
        <button onClick={() => setOpen(o => !o)}
          className="text-cream/70 hover:text-cream p-1">
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* ── Mobile dropdown nav ── */}
      {open && (
        <div className="lg:hidden bg-forest-dark border-t border-cream/10 z-30">
          {NAV.map(({ to, icon, label }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 font-body text-sm border-b border-cream/5
                 ${isActive ? 'text-gold bg-forest-mid' : 'text-cream/60 hover:text-cream'}`}>
              <span>{icon}</span><span>{label}</span>
            </NavLink>
          ))}
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-5 py-3 w-full font-body text-sm text-red-400 hover:text-red-300">
            <span>🚪</span><span>Logout</span>
          </button>
        </div>
      )}

      {/* ── Desktop sidebar ── */}
      <aside className="hidden lg:flex w-56 bg-forest-dark flex-col shrink-0 min-h-screen">
        <div className="px-6 py-6 border-b border-cream/10">
          <div className="font-display text-xl text-cream font-light">Village Utopia</div>
          <div className="font-body text-[9px] tracking-[0.25em] uppercase text-gold mt-0.5">Admin Panel</div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ to, icon, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 font-body text-sm transition-colors
                 ${isActive ? 'bg-forest-mid text-cream' : 'text-cream/60 hover:bg-cream/10 hover:text-cream'}`}>
              <span>{icon}</span><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-cream/10">
          <button onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full font-body text-sm
                       text-cream/50 hover:text-red-400 transition-colors">
            <span>🚪</span><span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-auto min-h-0">
        <Outlet />
      </main>
    </div>
  )
}