import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const HERO_IMG = '/images/hero.jpg'

export default function Hero() {
  const navigate = useNavigate()
  const today = new Date()
  const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1)

  const [checkIn, setCheckIn] = useState(today)
  const [checkOut, setCheckOut] = useState(tomorrow)
  const [guests, setGuests] = useState(2)
  const [type, setType] = useState('all')

  const nights = Math.max(1, Math.ceil((checkOut - checkIn) / 86400000))

  const handleSearch = () => {
    const params = new URLSearchParams({
      checkin: checkIn.toISOString().split('T')[0],
      checkout: checkOut.toISOString().split('T')[0],
      guests, type,
    })
    navigate(`/booking?${params}`)
  }

  return (
    <section className="relative h-screen min-h-[580px] flex flex-col overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Village Utopia"
          className="w-full h-full object-cover"
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-dark/65 via-forest-dark/35 to-forest-dark/80" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center
                      max-w-7xl mx-auto w-full px-6 lg:px-12 pt-16 pb-2">

        <span className="font-body text-[9px] tracking-[0.28em] uppercase text-gold/80 block mb-2">
          Goa, India
        </span>

        {/* Tighter heading — fits normal window */}
        <h1 className="font-display text-cream font-light leading-[1.0] mb-3">
          <span className="block text-[42px] md:text-5xl lg:text-6xl">Where the</span>
          <span className="block text-[42px] md:text-5xl lg:text-6xl italic text-gold">Forest Meets</span>
          <span className="block text-[42px] md:text-5xl lg:text-6xl">Luxury</span>
        </h1>

        <div className="w-10 h-[1px] bg-gold mb-3" />

        <p className="text-cream/70 font-body font-light text-sm leading-relaxed max-w-md mb-4">
          9 boutique rooms & 4 forest cottages nestled in Goa's lush greenery.
          A lotus pond, private verandahs, and unhurried silence — just for you.
        </p>

        {/* Stats — compact */}
        <div className="flex gap-7">
          {[
            { n: '13', label: 'Stays' },
            { n: '1 acre', label: 'Property' },
            { n: '4.9★', label: 'Rating' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div className="font-display text-lg text-gold font-light leading-none">{n}</div>
              <div className="font-body text-[9px] tracking-[0.18em] uppercase text-cream/50 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Widget — pinned bottom */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-6">
        <div className="bg-cream/95 backdrop-blur-md shadow-2xl" style={{ borderTop: '2px solid #C9A96E' }}>

          {/* Label bar */}
          <div className="bg-forest-dark px-5 py-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-gold/80">
              Check Availability
            </span>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-forest-mid/15">

            {/* Check-in */}
            <div className="px-4 py-3 col-span-1 hover:bg-cream-dark/40 transition-colors">
              <label className="block text-[8px] tracking-[0.25em] uppercase font-body text-forest-mid font-semibold mb-1">
                ✦ Check-in
              </label>
              <DatePicker
                selected={checkIn}
                onChange={date => {
                  setCheckIn(date)
                  if (date >= checkOut) {
                    const n = new Date(date); n.setDate(date.getDate() + 1)
                    setCheckOut(n)
                  }
                }}
                minDate={today}
                dateFormat="dd MMM yyyy"
                className="w-full bg-transparent font-body text-sm text-ink font-medium focus:outline-none cursor-pointer"
                popperPlacement="top-start"
              />
            </div>

            {/* Check-out */}
            <div className="px-4 py-3 col-span-1 hover:bg-cream-dark/40 transition-colors">
              <label className="block text-[8px] tracking-[0.25em] uppercase font-body text-forest-mid font-semibold mb-1">
                ✦ Check-out
              </label>
              <DatePicker
                selected={checkOut}
                onChange={setCheckOut}
                minDate={new Date(checkIn.getTime() + 86400000)}
                dateFormat="dd MMM yyyy"
                className="w-full bg-transparent font-body text-sm text-ink font-medium focus:outline-none cursor-pointer"
                popperPlacement="top-start"
              />
            </div>

            {/* Nights auto-counter */}
            <div className="px-4 py-3 col-span-1 hidden lg:flex flex-col justify-center items-center bg-forest-mid/5">
              <div className="font-display text-2xl text-forest-mid font-light leading-none">{nights}</div>
              <div className="font-body text-[8px] tracking-[0.2em] uppercase text-ink/40 mt-0.5">
                Night{nights > 1 ? 's' : ''}
              </div>
            </div>

            {/* Guests */}
            <div className="px-4 py-3 col-span-1 hover:bg-cream-dark/40 transition-colors">
              <label className="block text-[8px] tracking-[0.25em] uppercase font-body text-forest-mid font-semibold mb-1">
                ✦ Guests
              </label>
              <select
                value={guests}
                onChange={e => setGuests(e.target.value)}
                className="w-full bg-transparent font-body text-sm text-ink font-medium focus:outline-none cursor-pointer appearance-none"
              >
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
              </select>
            </div>

            {/* CTA */}
            <div className="col-span-2 lg:col-span-1">
              <button
                onClick={handleSearch}
                className="w-full h-full min-h-[58px] bg-forest-dark text-cream font-body text-[10px]
                           tracking-[0.22em] uppercase flex flex-col items-center justify-center gap-1
                           hover:bg-forest-mid transition-colors duration-300 group/btn"
              >
                <span className="text-gold text-sm group-hover/btn:scale-110 transition-transform duration-200">⟡</span>
                <span>Check Availability</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-1.5 text-cream/30">
        <span className="font-body text-[8px] tracking-[0.3em] uppercase"
          style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="w-[1px] h-10 bg-cream/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gold animate-bounce" />
        </div>
      </div>

    </section>
  )
}