// src/pages/admin/AdminLayout.jsx
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
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) navigate('/admin')
  }, [isLoggedIn])

  const handleLogout = () => {
    logout()
    navigate('/admin')
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* Sidebar */}
      <aside className="w-56 bg-forest-dark flex flex-col shrink-0">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-cream/10">
          <div className="font-display text-xl text-cream font-light">Village Utopia</div>
          <div className="font-body text-[9px] tracking-[0.25em] uppercase text-gold mt-0.5">
            Admin Panel
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 font-body text-sm transition-colors duration-150
                 ${isActive
                   ? 'bg-forest-mid text-cream'
                   : 'text-cream/60 hover:bg-cream/10 hover:text-cream'
                 }`
              }
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-cream/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 w-full font-body text-sm
                       text-cream/50 hover:text-red-400 transition-colors duration-150"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
