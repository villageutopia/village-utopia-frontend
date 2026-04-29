import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import { ROOMS, COTTAGES, ALL_UNITS } from '../data/rooms'

export default function RoomsPage() {
  const [searchParams] = useSearchParams()
  const typeParam      = searchParams.get('type') || 'all'

  const [filter, setFilter]     = useState(typeParam)
  const [sortBy, setSortBy]     = useState('default')
  const [guests, setGuests]     = useState(0)

  useEffect(() => {
    setFilter(typeParam)
  }, [typeParam])

  let units = filter === 'room' ? ROOMS : filter === 'cottage' ? COTTAGES : ALL_UNITS
  if (guests > 0) units = units.filter(u => u.capacity >= guests)
  if (sortBy === 'price-asc')  units = [...units].sort((a, b) => a.price - b.price)
  if (sortBy === 'price-desc') units = [...units].sort((a, b) => b.price - a.price)

  return (
    <main className="pt-20">

      {/* Page header */}
      <section className="relative bg-forest-dark py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/cottage-10.jpg"
            alt=""
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-forest-dark/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="section-label text-gold/70">9 Rooms + 4 Cottages</span>
          <h1 className="font-display text-5xl md:text-6xl text-cream font-light">
            Choose Your Stay
          </h1>
          <span className="block w-12 h-[1px] bg-gold mx-auto mt-5" />
        </div>
      </section>

      {/* Filters bar */}
      <section className="sticky top-20 z-30 bg-cream/95 backdrop-blur-sm border-b border-cream-dark shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-wrap gap-4 items-center justify-between">

          {/* Type filters */}
          <div className="flex gap-2">
            {[
              { val: 'all',     label: 'All Stays (13)' },
              { val: 'room',    label: 'Rooms (9)' },
              { val: 'cottage', label: 'Cottages (4)' },
            ].map(({ val, label }) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                className={`font-body text-xs tracking-[0.12em] uppercase px-4 py-2 border transition-all duration-200 ${
                  filter === val
                    ? 'bg-forest-mid text-cream border-forest-mid'
                    : 'bg-transparent text-ink/60 border-ink/20 hover:border-forest-mid hover:text-forest-mid'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right side filters */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="font-body text-xs text-ink/50 tracking-wide">Guests</label>
              <select
                value={guests}
                onChange={e => setGuests(Number(e.target.value))}
                className="font-body text-xs border border-ink/20 px-2 py-1 bg-transparent focus:outline-none focus:border-forest-mid"
              >
                <option value={0}>Any</option>
                {[1,2,3,4].map(n => <option key={n} value={n}>{n}+</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-body text-xs text-ink/50 tracking-wide">Sort</label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="font-body text-xs border border-ink/20 px-2 py-1 bg-transparent focus:outline-none focus:border-forest-mid"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        {units.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-3xl text-ink/30 font-light">No stays match your filters.</p>
          </div>
        ) : (
          <>
            <p className="font-body text-sm text-ink/40 mb-6">
              Showing {units.length} {units.length === 1 ? 'stay' : 'stays'}
            </p>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {units.map(unit => (
                <RoomCard key={unit.id} room={unit} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}
