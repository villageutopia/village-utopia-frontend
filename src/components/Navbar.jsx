import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthModal from './AuthModal'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/rooms', label: 'Rooms & Cottages' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState(false)
  const [authTab, setAuthTab] = useState('login')
  const [dropdown, setDropdown] = useState(false)
  const dropRef = useRef(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false); setDropdown(false) }, [pathname])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropdown(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const transparent = isHome && !scrolled

  function openLogin() { setAuthTab('login'); setAuthModal(true) }
  function openRegister() { setAuthTab('register'); setAuthModal(true) }

  function handleLogout() {
    logout()
    setDropdown(false)
    navigate('/')
  }

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${transparent ? 'bg-transparent' : 'bg-cream/95 backdrop-blur-sm shadow-sm'
        }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className={`font-display text-2xl font-light tracking-wide transition-colors duration-300 ${transparent ? 'text-cream' : 'text-forest-dark'}`}>
              Village Utopia
            </span>
            <span className={`text-[10px] font-body tracking-[0.3em] uppercase transition-colors duration-300 ${transparent ? 'text-gold' : 'text-gold-dark'}`}>
              Cottages · Goa
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'}
                className={({ isActive }) =>
                  `font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200 pb-0.5
                   ${isActive ? 'border-b border-gold text-gold' : ''}
                   ${transparent
                    ? isActive ? '' : 'text-cream/80 hover:text-cream'
                    : isActive ? '' : 'text-ink/70 hover:text-ink'}`}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {isLoggedIn ? (
              /* User dropdown */
              <div className="relative" ref={dropRef}>
                <button onClick={() => setDropdown(v => !v)}
                  className={`flex items-center gap-2 font-body text-xs tracking-wide transition-colors ${transparent ? 'text-cream/80 hover:text-cream' : 'text-ink/70 hover:text-ink'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${transparent ? 'bg-cream/20 text-cream' : 'bg-forest-mid text-cream'}`}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span className="hidden xl:block">{user?.name?.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-60">{dropdown ? '▲' : '▼'}</span>
                </button>

                {dropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg border border-cream-dark z-50">
                    <div className="px-4 py-3 border-b border-cream-dark">
                      <p className="font-body text-sm font-medium text-ink truncate">{user?.name}</p>
                      <p className="font-body text-xs text-ink/40 truncate">{user?.email}</p>
                    </div>
                    <Link to="/my-bookings"
                      className="flex items-center gap-2 px-4 py-2.5 font-body text-sm text-ink/70
                                 hover:bg-cream hover:text-forest-dark transition-colors">
                      📋 My Bookings
                    </Link>
                    <button onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2.5 w-full font-body text-sm
                                 text-red-500 hover:bg-red-50 transition-colors border-t border-cream-dark">
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login/Register */
              <button onClick={openLogin}
                className={`font-body text-xs tracking-[0.15em] uppercase transition-colors ${transparent ? 'text-cream/70 hover:text-cream' : 'text-ink/60 hover:text-ink'}`}>
                Sign In
              </button>
            )}

            {/* Book Now */}
            <Link to="/booking"
              className={`font-body text-xs tracking-[0.2em] uppercase px-6 py-2.5 border transition-all duration-300 ${transparent
                  ? 'border-cream/60 text-cream hover:bg-cream hover:text-forest-dark'
                  : 'border-forest-mid text-forest-mid hover:bg-forest-mid hover:text-cream'}`}>
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden flex flex-col gap-1.5 p-1 transition-colors ${transparent ? 'text-cream' : 'text-forest-dark'}`}
            onClick={() => setMenuOpen(v => !v)}>
            <span className={`block w-6 h-[1.5px] bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-forest-dark flex flex-col justify-center items-center gap-7
                       transition-all duration-500 lg:hidden
                       ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/'}
            className={({ isActive }) =>
              `font-display text-4xl text-cream/80 hover:text-gold transition-colors ${isActive ? 'text-gold' : ''}`}>
            {label}
          </NavLink>
        ))}

        {isLoggedIn ? (
          <>
            <Link to="/my-bookings" className="font-body text-sm text-cream/60 hover:text-gold transition-colors">
              📋 My Bookings
            </Link>
            <button onClick={handleLogout} className="font-body text-sm text-red-400 hover:text-red-300 transition-colors">
              🚪 Logout
            </button>
          </>
        ) : (
          <div className="flex gap-4 mt-2">
            <button onClick={() => { openLogin(); setMenuOpen(false) }}
              // className="font-body text-sm text-cream/60 btn-gold text-xs hover:text-gold transition-colors underline">
              className="btn-gold text-xs">
              Sign In
            </button>
            <button onClick={() => { openRegister(); setMenuOpen(false) }}
              className="btn-gold text-xs">
              Register
            </button>
          </div>
        )}

        <Link to="/booking" onClick={() => setMenuOpen(false)} className="mt-2 btn-gold">
          Book Now
        </Link>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModal}
        onClose={() => setAuthModal(false)}
        defaultTab={authTab}
        onSuccess={() => { }}
      />
    </>
  )
}