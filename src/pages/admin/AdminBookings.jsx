// src/pages/admin/AdminBookings.jsx
import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../../hooks/useAdmin'

const STATUS_STYLES = {
  PENDING:   'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
}

export default function AdminBookings() {
  const { apiCall } = useAdmin()
  const [bookings, setBookings] = useState([])
  const [total,    setTotal]    = useState(0)
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('all')
  const [updating, setUpdating] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    const q    = filter !== 'all' ? `?status=${filter}` : ''
    const data = await apiCall(`/api/admin/bookings${q}`)
    if (data) { setBookings(data.bookings); setTotal(data.total) }
    setLoading(false)
  }, [filter, apiCall])

  useEffect(() => { load() }, [load])

  async function updateStatus(id, status) {
    setUpdating(id)
    await apiCall(`/api/admin/bookings/${id}/status`, {
      method: 'PUT',
      body:   JSON.stringify({ status }),
    })
    await load()
    setUpdating(null)
  }

  const FILTERS = ['all', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl text-forest-dark font-light">Bookings</h1>
        <p className="font-body text-sm text-ink/50 mt-1">{total} total bookings</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`font-body text-xs tracking-wide uppercase px-4 py-2 border transition-all ${
              filter === f
                ? 'bg-forest-mid text-cream border-forest-mid'
                : 'border-ink/20 text-ink/60 hover:border-forest-mid hover:text-forest-mid'
            }`}
          >
            {f === 'all' ? 'All' : f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 font-body text-ink/40">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-white border border-cream-dark">
          <p className="font-body text-ink/40">No bookings found</p>
        </div>
      ) : (
        <div className="bg-white border border-cream-dark overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-6 px-5 py-3 bg-cream-dark border-b border-cream-dark">
            {['Ref', 'Guest', 'Room', 'Dates', 'Amount', 'Status / Actions'].map(h => (
              <div key={h} className="font-body text-[9px] tracking-[0.2em] uppercase text-ink/50 font-semibold">
                {h}
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-cream-dark">
            {bookings.map(b => (
              <div key={b.id} className="grid grid-cols-6 px-5 py-4 items-center hover:bg-cream/30 transition-colors">
                <div className="font-body text-xs text-forest-mid font-medium">{b.bookingRef}</div>
                <div>
                  <div className="font-body text-sm text-ink">{b.guestName}</div>
                  <div className="font-body text-xs text-ink/40">{b.guestPhone}</div>
                </div>
                <div className="font-body text-xs text-ink/70">{b.room?.name}</div>
                <div className="font-body text-xs text-ink/70">
                  {new Date(b.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} →{' '}
                  {new Date(b.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  <div className="text-ink/40">{b.nights} nights · {b.guests} guests</div>
                </div>
                <div className="font-body text-sm font-medium text-ink">
                  Rs. {b.totalAmount?.toLocaleString('en-IN')}
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className={`font-body text-[10px] px-2 py-0.5 self-start ${STATUS_STYLES[b.status]}`}>
                    {b.status}
                  </span>
                  {/* Quick action buttons */}
                  <div className="flex gap-1">
                    {b.status === 'PENDING' && (
                      <>
                        <button
                          onClick={() => updateStatus(b.id, 'CONFIRMED')}
                          disabled={updating === b.id}
                          className="font-body text-[9px] px-2 py-1 bg-green-500 text-white hover:bg-green-600 transition-colors disabled:opacity-50"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(b.id, 'CANCELLED')}
                          disabled={updating === b.id}
                          className="font-body text-[9px] px-2 py-1 bg-red-400 text-white hover:bg-red-500 transition-colors disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {b.status === 'CONFIRMED' && (
                      <button
                        onClick={() => updateStatus(b.id, 'COMPLETED')}
                        disabled={updating === b.id}
                        className="font-body text-[9px] px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
