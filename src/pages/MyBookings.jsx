import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const STATUS_STYLE = {
  PENDING:   'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
}

export default function MyBookings() {
  const { isLoggedIn, user, authFetch } = useAuth()
  const navigate  = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading,  setLoading]  = useState(true)

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) navigate('/')
  }, [isLoggedIn])

  useEffect(() => {
    if (!isLoggedIn) return
    authFetch('/api/bookings/my')
      .then(data => { if (data?.bookings) setBookings(data.bookings) })
      .finally(() => setLoading(false))
  }, [isLoggedIn])

  return (
    <main className="pt-20 min-h-screen bg-cream">

      {/* Header */}
      <section className="bg-forest-dark py-20 text-center">
        <span className="section-label text-gold/70">Your account</span>
        <h1 className="font-display text-5xl text-cream font-light">My Bookings</h1>
        <span className="block w-12 h-[1px] bg-gold mx-auto mt-5" />
        {user && (
          <p className="font-body text-sm text-cream/50 mt-4">
            Welcome, {user.name}
          </p>
        )}
      </section>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-14">

        {loading ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-ink/20 animate-pulse font-light">Loading...</p>
          </div>

        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white border border-cream-dark">
            <div className="text-5xl mb-4">🏡</div>
            <p className="font-display text-2xl text-ink/30 font-light mb-2">No bookings yet</p>
            <p className="font-body text-sm text-ink/40 mb-6">
              Aapne abhi tak koi booking nahi ki hai
            </p>
            <Link to="/rooms" className="btn-primary">Explore Stays</Link>
          </div>

        ) : (
          <div className="space-y-4">
            <p className="font-body text-sm text-ink/40 mb-6">
              {bookings.length} booking{bookings.length > 1 ? 's' : ''}
            </p>

            {bookings.map(b => (
              <div key={b.id} className="bg-white border border-cream-dark p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                  {/* Room image + info */}
                  <div className="flex gap-4">
                    <div className="w-20 h-16 shrink-0 overflow-hidden bg-cream-dark">
                      {b.room?.images?.[0] ? (
                        <img src={b.room.images[0]} alt={b.room.name}
                          className="w-full h-full object-cover"
                          onError={e => { e.target.style.display = 'none' }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">🏠</div>
                      )}
                    </div>
                    <div>
                      <p className="font-display text-lg text-forest-dark font-light">{b.room?.name}</p>
                      <p className="font-body text-xs text-ink/50 mt-0.5">
                        Ref: <span className="font-medium text-forest-mid">{b.bookingRef}</span>
                      </p>
                      <div className="flex gap-3 mt-2 font-body text-xs text-ink/60">
                        <span>
                          📅 {new Date(b.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          {' → '}
                          {new Date(b.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex gap-3 mt-1 font-body text-xs text-ink/50">
                        <span>🌙 {b.nights} nights</span>
                        <span>👥 {b.guests} guests</span>
                      </div>
                    </div>
                  </div>

                  {/* Right — amount + status */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className={`font-body text-[10px] px-2.5 py-1 uppercase tracking-wide ${STATUS_STYLE[b.status] || 'bg-gray-100 text-gray-600'}`}>
                      {b.status}
                    </span>
                    <div className="text-right">
                      <p className="font-display text-xl text-forest-mid font-light">
                        ₹{b.totalAmount?.toLocaleString('en-IN')}
                      </p>
                      <p className="font-body text-[10px] text-ink/40">Total amount</p>
                    </div>
                    {b.paidAmount > 0 && b.paidAmount < b.totalAmount && (
                      <p className="font-body text-xs text-amber-600">
                        ₹{(b.totalAmount - b.paidAmount).toLocaleString('en-IN')} due on arrival
                      </p>
                    )}
                  </div>
                </div>

                {/* Special requests */}
                {b.specialRequest && (
                  <div className="mt-4 pt-4 border-t border-cream-dark">
                    <p className="font-body text-xs text-ink/40">Special request: <span className="text-ink/70">{b.specialRequest}</span></p>
                  </div>
                )}

                {/* Booked on */}
                <div className="mt-3 pt-3 border-t border-cream-dark">
                  <p className="font-body text-[10px] text-ink/30">
                    Booked on {new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/rooms" className="btn-primary">Book Another Stay</Link>
        </div>
      </div>
    </main>
  )
}