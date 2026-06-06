import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function RoomCard({ room, showBadge = true }) {
  const [imgIdx, setImgIdx] = useState(0)
  const { id, type, name, price, capacity, size, images, amenities, description, highlights, badge, slug } = room

  const nights = 1
  const breakPerNight = Math.round(price / 10) * 10

  return (
    <div className="room-card group bg-white border border-cream-dark hover:shadow-lg transition-shadow duration-300">

      {/* Image with hover reveal */}
      <div className="relative overflow-hidden h-72">
        <img
          src={images[imgIdx]}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={e => {
            e.target.src = `https://placehold.co/600x400/2D4A32/FBF5E6?text=${encodeURIComponent(name)}`
          }}
        />

        {/* Dot nav for multiple images */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={e => { e.preventDefault(); setImgIdx(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === imgIdx ? 'bg-gold w-4' : 'bg-cream/60'
                  }`}
              />
            ))}
          </div>
        )}

        {/* Badge */}
        {showBadge && badge && (
          <div className="absolute top-4 left-4 bg-gold text-forest-dark font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1">
            {badge}
          </div>
        )}

        {/* Type tag */}
        <div className="absolute top-4 right-4 bg-forest-dark/80 text-cream/80 font-body text-[9px] tracking-[0.2em] uppercase px-2 py-1 backdrop-blur-sm">
          {type === 'ROOM' || type === 'room' ? 'Room' : 'Cottage'}
        </div>

        {/* Quick navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={e => { e.preventDefault(); setImgIdx(i => (i - 1 + images.length) % images.length) }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-forest-dark/50 text-cream
                         flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         hover:bg-forest-dark/80 text-lg"
            >‹</button>
            <button
              onClick={e => { e.preventDefault(); setImgIdx(i => (i + 1) % images.length) }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-forest-dark/50 text-cream
                         flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         hover:bg-forest-dark/80 text-lg"
            >›</button>
          </>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-xl font-light text-forest-dark leading-tight">{name}</h3>
          <div className="text-right shrink-0 ml-4">
            <span className="font-display text-2xl text-forest-mid">₹{price.toLocaleString()}</span>
            <span className="block font-body text-[10px] text-ink/40 tracking-wide">/ night</span>
          </div>
        </div>

        {/* Capacity + size */}
        <div className="flex gap-4 mb-3">
          <span className="font-body text-xs text-ink/50">👥 {capacity} Guests</span>
          <span className="font-body text-xs text-ink/50">📐 {size}</span>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-ink/60 leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-5">
          {highlights.slice(0, 3).map(h => (
            <span key={h} className="font-body text-[10px] tracking-wide text-forest-mid border border-forest-mid/30 px-2 py-0.5">
              {h}
            </span>
          ))}
        </div>

        {/* Amenities strip */}
        <div className="flex gap-3 flex-wrap border-t border-cream-dark pt-4 mb-5">
          {amenities.slice(0, 4).map(a => (
            <span key={a} className="font-body text-[10px] text-ink/50 tracking-wide">{a}</span>
          ))}
          {amenities.length > 4 && (
            <span className="font-body text-[10px] text-gold">+{amenities.length - 4} more</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            to={`/rooms/${slug || id}`}
            className="flex-1 text-center font-body text-xs tracking-[0.15em] uppercase py-2.5
                       border border-forest-mid text-forest-mid
                       hover:bg-forest-mid hover:text-cream transition-all duration-300"
          >
            View Details
          </Link>
          <Link
            to={`/booking?room=${id}`}
            className="flex-1 text-center font-body text-xs tracking-[0.15em] uppercase py-2.5
                       bg-forest-mid text-cream
                       hover:bg-forest-dark transition-colors duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}