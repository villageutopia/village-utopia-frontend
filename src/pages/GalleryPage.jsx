import { useState } from 'react'

const GALLERY_ITEMS = [
  { src: '/images/room-1a.jpg',   alt: 'Classic Deluxe Room',       cat: 'rooms' },
  { src: '/images/room-2a.jpg',   alt: 'Room with balcony view',    cat: 'rooms' },
  { src: '/images/room-1b.jpg',   alt: 'Classic room wide angle',   cat: 'rooms' },
  { src: '/images/room-1c.jpg',   alt: 'Classic room bathroom',     cat: 'rooms' },
  { src: '/images/cottage-1b.jpg',   alt: 'Cottage desk & TV area',    cat: 'cottages' },
  { src: '/images/cottage-1c.jpg',   alt: 'Cottage bathroom',          cat: 'cottages' },
  { src: '/images/cottage-1a.jpg',   alt: 'Cottage bedroom',           cat: 'cottages' },
  { src: '/images/cottage-2b.jpg',  alt: 'Cottages exterior',         cat: 'cottages' },
  { src: '/images/cottage-2a.jpg',  alt: 'Cottage wide view',         cat: 'cottages' },
  { src: '/images/cottage-1d.jpg',  alt: 'Cottage porch',             cat: 'cottages' },
  { src: '/images/garden.jpg',   alt: 'Garden corridor',           cat: 'property' },
  { src: '/images/hero.jpg',   alt: 'Lotus pond & gazebo',       cat: 'property' },
  { src: '/images/front.jpg', alt: 'Village Utopia Main Building', cat: 'property' },
  { src: '/images/pool-1.jpg', alt: 'Swimming Pool View', cat: 'property' },
  { src: '/images/pool-2.jpg', alt: 'Poolside Seating', cat: 'property' },
  { src: '/images/pool-3.jpg', alt: 'Pool Area', cat: 'property' },
  { src: '/images/bathroom-2.jpg', alt: 'Modern Bathroom', cat: 'property' },
  { src: '/images/corridor-1.jpg', alt: 'Garden Corridor', cat: 'property' },
  { src: '/images/pool-4.jpg', alt: 'Property Exterior', cat: 'property' },
]

const CATS = [
  { val: 'all',      label: 'All' },
  { val: 'rooms',    label: 'Classic Rooms' },
  { val: 'cottages', label: 'Forest Cottages' },
  { val: 'property', label: 'Property, Grounds & Amenities' },
]

export default function GalleryPage() {
  const [cat, setCat]           = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const items = cat === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.cat === cat)

  const prev = () => setLightbox(i => (i - 1 + items.length) % items.length)
  const next = () => setLightbox(i => (i + 1) % items.length)

  return (
    <main className="pt-20" onKeyDown={e => { if(e.key==='ArrowLeft') prev(); if(e.key==='ArrowRight') next(); if(e.key==='Escape') setLightbox(null) }} tabIndex={-1}>

      {/* Header */}
      <section className="bg-forest-dark py-24 text-center">
        <span className="section-label text-gold/70">Visual Stories</span>
        <h1 className="font-display text-5xl md:text-6xl text-cream font-light">Gallery</h1>
        <span className="block w-12 h-[1px] bg-gold mx-auto mt-5" />
      </section>

      {/* Filter tabs */}
      <section className="bg-cream border-b border-cream-dark sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex gap-3 flex-wrap">
          {CATS.map(({ val, label }) => (
            <button
              key={val}
              onClick={() => setCat(val)}
              className={`font-body text-xs tracking-[0.12em] uppercase px-4 py-2 border transition-all duration-200 ${
                cat === val
                  ? 'bg-forest-mid text-cream border-forest-mid'
                  : 'border-ink/20 text-ink/60 hover:border-forest-mid hover:text-forest-mid'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.src + idx}
              className="break-inside-avoid overflow-hidden cursor-pointer relative group"
              onClick={() => setLightbox(idx)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={e => {
                  e.target.src = `https://placehold.co/400x300/2D4A32/C9A96E?text=${encodeURIComponent(item.alt)}`
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-forest-dark/0 group-hover:bg-forest-dark/30 transition-all duration-300 flex items-center justify-center">
                <span className="text-cream text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">⊕</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/10 text-cream
                       flex items-center justify-center text-2xl hover:bg-cream/20 transition-colors"
          >‹</button>

          <img
            src={items[lightbox].src}
            alt={items[lightbox].alt}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={e => e.stopPropagation()}
            onError={e => e.target.src = `https://placehold.co/800x600/2D4A32/C9A96E?text=${encodeURIComponent(items[lightbox].alt)}`}
          />

          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/10 text-cream
                       flex items-center justify-center text-2xl hover:bg-cream/20 transition-colors"
          >›</button>

          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-cream/10 text-cream hover:bg-cream/20 transition-colors flex items-center justify-center text-xl"
          >✕</button>

          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="font-body text-xs text-cream/50 tracking-wide">{items[lightbox].alt}</p>
            <p className="font-body text-xs text-cream/30 mt-1">{lightbox + 1} / {items.length}</p>
          </div>
        </div>
      )}
    </main>
  )
}