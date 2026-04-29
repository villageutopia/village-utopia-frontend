import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',         label: 'Home' },
  { to: '/about',    label: 'About' },
  { to: '/rooms',    label: 'Rooms & Cottages' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/contact',  label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { pathname }              = useLocation()
  const isHome                    = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const transparent = isHome && !scrolled

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          transparent
            ? 'bg-transparent'
            : 'bg-cream/95 backdrop-blur-sm shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span
              className={`font-display text-2xl font-light tracking-wide transition-colors duration-300 ${
                transparent ? 'text-cream' : 'text-forest-dark'
              }`}
            >
              Village Utopia
            </span>
            <span
              className={`text-[10px] font-body tracking-[0.3em] uppercase transition-colors duration-300 ${
                transparent ? 'text-gold' : 'text-gold-dark'
              }`}
            >
              Cottages · Goa
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200 pb-0.5
                   ${isActive ? 'border-b border-gold text-gold' : ''}
                   ${transparent
                     ? isActive ? '' : 'text-cream/80 hover:text-cream'
                     : isActive ? '' : 'text-ink/70 hover:text-ink'
                   }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Book now CTA */}
          <div className="hidden lg:block">
            <Link
              to="/booking"
              className={`font-body text-xs tracking-[0.2em] uppercase px-6 py-2.5 border transition-all duration-300 ${
                transparent
                  ? 'border-cream/60 text-cream hover:bg-cream hover:text-forest-dark'
                  : 'border-forest-mid text-forest-mid hover:bg-forest-mid hover:text-cream'
              }`}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden flex flex-col gap-1.5 p-1 transition-colors ${
              transparent ? 'text-cream' : 'text-forest-dark'
            }`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1.5px] bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-forest-dark flex flex-col justify-center items-center gap-8
                    transition-all duration-500 lg:hidden
                    ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `font-display text-4xl text-cream/80 hover:text-gold transition-colors duration-200 ${
                isActive ? 'text-gold' : ''
              }`
            }
          >
            {label}
          </NavLink>
        ))}
        <Link
          to="/booking"
          className="mt-4 btn-gold"
        >
          Book Now
        </Link>
      </div>
    </>
  )
}
