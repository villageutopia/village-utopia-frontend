// import { Link } from 'react-router-dom'
// import Hero from '../components/Hero'
// import RoomCard from '../components/RoomCard'
// import { AMENITIES, TESTIMONIALS } from '../data/rooms'
// import { useState, useEffect, useRef } from 'react'

// // ─── simple intersection-observer hook ───
// function useFadeIn(threshold = 0.15) {
//   const ref = useRef(null)
//   useEffect(() => {
//     const el = ref.current
//     if (!el) return
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) { el.classList.add('opacity-100', 'translate-y-0'); obs.disconnect() } },
//       { threshold }
//     )
//     obs.observe(el)
//     return () => obs.disconnect()
//   }, [threshold])
//   return ref
// }

// const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// export default function Home() {
//   const roomsRef = useFadeIn()
//   const cottagesRef = useFadeIn()
//   const amenitiesRef = useFadeIn()
//   const galleryRef = useFadeIn()
//   const reviewsRef = useFadeIn()
//   const ctaRef = useFadeIn()

//   const [rooms, setRooms] = useState([])
//   const [cottages, setCottages] = useState([])

//   useEffect(() => {
//     fetch(`${API}/api/rooms`)
//       .then(r => r.json())
//       .then(data => {
//         if (data?.rooms) {
//           setRooms(data.rooms.filter(r => r.type === 'ROOM'))
//           setCottages(data.rooms.filter(r => r.type === 'COTTAGE'))
//         }
//       })
//       .catch(() => { })
//   }, [])

//   return (
//     <main>
//       {/* ── Hero ── */}
//       <Hero />

//       {/* ── Two Worlds Intro ── */}
//       <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           <div>
//             <span className="section-label">Our Story</span>
//             <h2 className="section-title">
//               Two worlds,<br />
//               <em className="italic text-gold">one escape</em>
//             </h2>
//             <span className="gold-divider" />
//             <p className="font-body text-ink/60 leading-relaxed mt-2 max-w-md">
//               Village Utopia was born from a single idea — that a stay in Goa should be
//               more than a bed near the beach. Tucked into a green acre, our property
//               gives you two experiences: the warmth of a boutique hotel and the freedom
//               of a private forest cottage.
//             </p>
//             <p className="font-body text-ink/60 leading-relaxed mt-4 max-w-md">
//               A lotus pond, a thatched gazebo, and tall palms form the backdrop
//               to your days here. Evenings are quiet. Mornings are yours.
//             </p>
//             <div className="mt-8 flex gap-4">
//               <Link to="/about" className="btn-primary">Our Story</Link>
//               <Link to="/rooms" className="btn-outline bg-transparent border-forest-mid text-forest-mid hover:bg-forest-mid hover:text-cream">
//                 Explore Stays
//               </Link>
//             </div>
//           </div>

//           {/* Image grid */}
//           <div className="grid grid-cols-2 gap-3 h-[420px]">
//             <div className="row-span-2 overflow-hidden">
//               <img
//                 src="/images/room-2a.jpg"
//                 alt="Classic room balcony"
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//                 onError={e => e.target.src = 'https://placehold.co/400x600/2D4A32/C9A96E?text=Classic+Room'}
//               />
//             </div>
//             <div className="overflow-hidden">
//               <img
//                 src="/images/cottage-2b.jpg"
//                 alt="Forest cottages exterior"
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//                 onError={e => e.target.src = 'https://placehold.co/400x300/162418/C9A96E?text=Forest+Cottage'}
//               />
//             </div>
//             <div className="overflow-hidden">
//               <img
//                 src="/images/garden.jpg"
//                 alt="Property garden"
//                 className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
//                 onError={e => e.target.src = 'https://placehold.co/400x300/4A7A52/FBF5E6?text=Garden'}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── Classic Rooms ── */}
//       <section className="py-20 bg-forest-dark">
//         <div
//           ref={roomsRef}
//           className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-700"
//         >
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
//             <div>
//               <span className="section-label text-gold/70">Room Type 01</span>
//               <h2 className="font-display text-4xl md:text-5xl text-cream font-light">
//                 Classic Rooms
//               </h2>
//               <span className="block w-12 h-[1px] bg-gold mt-4" />
//             </div>
//             <Link to="/rooms?type=room" className="btn-outline self-start md:self-auto whitespace-nowrap">
//               All {rooms.length} Rooms →
//             </Link>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {rooms.slice(0, 2).map(room => (
//               <RoomCard key={room.id} room={room} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Forest Cottages ── */}
//       <section className="py-20 bg-cream">
//         <div
//           ref={cottagesRef}
//           className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-700"
//         >
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
//             <div>
//               <span className="section-label">Room Type 02</span>
//               <h2 className="section-title">
//                 Forest Cottages
//               </h2>
//               <span className="gold-divider" />
//             </div>
//             <Link to="/rooms?type=cottage" className="btn-primary self-start md:self-auto whitespace-nowrap">
//               All {cottages.length} Cottages →
//             </Link>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             {cottages.slice(0, 2).map(cottage => (
//               <RoomCard key={cottage.id} room={cottage} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Amenities ── */}
//       <section
//         ref={amenitiesRef}
//         className="py-16 bg-forest-mid opacity-0 translate-y-8 transition-all duration-700"
//       >
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <div className="text-center mb-10">
//             <span className="section-label text-gold/70">Everything included</span>
//             <h2 className="font-display text-4xl text-cream font-light">Property Amenities</h2>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
//             {AMENITIES.map(({ icon, title }) => (
//               <div key={title} className="flex flex-col items-center gap-2 text-center group">
//                 <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{icon}</span>
//                 <span className="font-body text-[11px] text-cream/70 tracking-wide leading-tight">{title}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Gallery Preview ── */}
//       <section className="py-20 lg:py-28">
//         <div
//           ref={galleryRef}
//           className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-700"
//         >
//           <div className="text-center mb-12">
//             <span className="section-label">Visual Stories</span>
//             <h2 className="section-title">The Property</h2>
//             <span className="gold-divider mx-auto" />
//           </div>

//           {/* Masonry-like grid */}
//           {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-3"> */}
//           <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
//             {[
//               // { src: '/images/room-1a.jpg',      alt: 'Classic room interior',  tall: true },
//               // { src: '/images/cottage-1a.jpg',   alt: 'Cottage bedroom',        tall: false },
//               // { src: '/images/garden.jpg',      alt: 'Garden corridor',        tall: false },
//               // { src: '/images/cottage-2b.jpg',  alt: 'Cottage exterior',       tall: false },
//               // { src: '/images/hero.jpg',        alt: 'Lotus pond & gazebo',    tall: false },
//               // { src: '/images/cottage-1c.jpg',   alt: 'Cottage bathroom',       tall: true },
//               { src: '/images/front.jpg', alt: 'Village Utopia Exterior', tall: true },
//               { src: '/images/cottage-1a.jpg', alt: 'Cottage Bedroom', tall: false },
//               { src: '/images/garden.jpg', alt: 'Garden Corridor', tall: false },
//               { src: '/images/cottage-2b.jpg', alt: 'Cottage Exterior', tall: false },
//               { src: '/images/pool-1.jpg', alt: 'Swimming Pool', tall: false },
//               { src: '/images/pool-2.jpg', alt: 'Pool View', tall: false },
//               { src: '/images/pool-3.jpg', alt: 'Poolside Seating', tall: false },
//               { src: '/images/pool-4.jpg', alt: 'Pool Area', tall: false },
//               { src: '/images/corridor-1.jpg', alt: 'Balcony Corridor', tall: true },
//               { src: '/images/bathroom-2.jpg', alt: 'Premium Bathroom', tall: true },
//             ].map(({ src, alt, tall }) => (
//               <div
//                 key={src}
//                 className={`overflow-hidden ${tall ? 'row-span-2' : ''}`}
//                 style={{ height: tall ? '100%' : '220px' }}
//               >
//                 <img
//                   src={src}
//                   alt={alt}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
//                   onError={e => e.target.src = `https://placehold.co/600x400/2D4A32/C9A96E?text=${encodeURIComponent(alt)}`}
//                 />
//               </div>
//             ))}
//           </div>

//           <div className="text-center mt-8">
//             <Link to="/gallery" className="btn-primary">View Full Gallery</Link>
//           </div>
//         </div>
//       </section>

//       {/* ── Testimonials ── */}
//       <section className="py-20 bg-cream-dark">
//         <div
//           ref={reviewsRef}
//           className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-700"
//         >
//           <div className="text-center mb-12">
//             <span className="section-label">Guest Stories</span>
//             <h2 className="section-title">What They Say</h2>
//             <span className="gold-divider mx-auto" />
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {TESTIMONIALS.map((t, i) => (
//               <div
//                 key={i}
//                 className="bg-white p-7 border border-cream-dark hover:border-gold transition-colors duration-300"
//               >
//                 {/* Stars */}
//                 <div className="flex gap-0.5 mb-4">
//                   {Array.from({ length: t.rating }).map((_, j) => (
//                     <span key={j} className="text-gold text-sm">★</span>
//                   ))}
//                 </div>

//                 {/* Quote */}
//                 <p className="font-display text-lg font-light text-ink/80 leading-relaxed mb-5 italic">
//                   "{t.text}"
//                 </p>

//                 {/* Author */}
//                 <div className="border-t border-cream-dark pt-4">
//                   <div className="font-body font-medium text-sm text-ink">{t.name}</div>
//                   <div className="font-body text-xs text-ink/40 mt-0.5">{t.location} · {t.stay}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CTA ── */}
//       <section
//         ref={ctaRef}
//         className="relative py-32 overflow-hidden opacity-0 translate-y-8 transition-all duration-700"
//       >
//         <div className="absolute inset-0">
//           <img
//             src="/images/hero.jpg"
//             alt="Lotus pond"
//             className="w-full h-full object-cover"
//             onError={e => { e.target.style.display = 'none' }}
//           />
//           <div className="absolute inset-0 bg-forest-dark/80" />
//         </div>

//         <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
//           <span className="section-label text-gold/70">Your retreat awaits</span>
//           <h2 className="font-display text-5xl md:text-6xl text-cream font-light leading-tight mb-6">
//             Ready to unwind<br />
//             <em className="italic text-gold">in the forest?</em>
//           </h2>
//           <p className="font-body text-cream/60 mb-8 leading-relaxed">
//             Book directly for the best rates. No hidden fees, free cancellation up to 48 hours.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link to="/booking" className="btn-gold">Book Your Stay</Link>
//             <Link to="/contact" className="btn-outline">Talk to Us</Link>
//           </div>
//         </div>
//       </section>

//       {/* ── Map ── */}
//       <section className="h-80 w-full">
//         <iframe
//           title="Village Utopia location"
//           src="https://maps.google.com/maps?q=Goa+India&z=13&output=embed"
//           className="w-full h-full grayscale"
//           loading="lazy"
//         />
//       </section>
//     </main>
//   )
// }






















import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import RoomCard from '../components/RoomCard'
import { AMENITIES, TESTIMONIALS } from '../data/rooms'
import { useState, useEffect, useRef } from 'react'

// ─── simple intersection-observer hook ───
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('opacity-100', 'translate-y-0'); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function Home() {
  const roomsRef = useFadeIn()
  const cottagesRef = useFadeIn()
  const amenitiesRef = useFadeIn()
  const galleryRef = useFadeIn()
  const reviewsRef = useFadeIn()
  const ctaRef = useFadeIn()

  const [rooms, setRooms] = useState([])
  const [cottages, setCottages] = useState([])

  useEffect(() => {
    fetch(`${API}/api/rooms`)
      .then(r => r.json())
      .then(data => {
        if (data?.rooms) {
          setRooms(data.rooms.filter(r => r.type === 'ROOM'))
          setCottages(data.rooms.filter(r => r.type === 'COTTAGE'))
        }
      })
      .catch(() => { })
  }, [])

  return (
    <main>
      {/* ── Hero ── */}
      <Hero />

      {/* ── Two Worlds Intro ── */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-label">Our Story</span>
            <h2 className="section-title">
              Two worlds,<br />
              <em className="italic text-gold">one escape</em>
            </h2>
            <span className="gold-divider" />
            <p className="font-body text-ink/60 leading-relaxed mt-2 max-w-md">
              Village Utopia was born from a single idea — that a stay in Goa should be
              more than a bed near the beach. Tucked into a green acre, our property
              gives you two experiences: the warmth of a boutique hotel and the freedom
              of a private forest cottage.
            </p>
            <p className="font-body text-ink/60 leading-relaxed mt-4 max-w-md">
              A lotus pond, a thatched gazebo, and tall palms form the backdrop
              to your days here. Evenings are quiet. Mornings are yours.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/about" className="btn-primary">Our Story</Link>
              <Link to="/rooms" className="btn-outline bg-transparent border-forest-mid text-forest-mid hover:bg-forest-mid hover:text-cream">
                Explore Stays
              </Link>
            </div>
          </div>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-3 h-[420px]">
            <div className="row-span-2 overflow-hidden">
              <img
                src="/images/room-2a.jpg"
                alt="Classic room balcony"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={e => e.target.src = 'https://placehold.co/400x600/2D4A32/C9A96E?text=Classic+Room'}
              />
            </div>
            <div className="overflow-hidden">
              <img
                src="/images/cottage-2b.jpg"
                alt="Forest cottages exterior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={e => e.target.src = 'https://placehold.co/400x300/162418/C9A96E?text=Forest+Cottage'}
              />
            </div>
            <div className="overflow-hidden">
              <img
                src="/images/garden.jpg"
                alt="Property garden"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={e => e.target.src = 'https://placehold.co/400x300/4A7A52/FBF5E6?text=Garden'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Classic Rooms ── */}
      <section className="py-20 bg-forest-dark">
        <div
          ref={roomsRef}
          className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-label text-gold/70">Room Type 01</span>
              <h2 className="font-display text-4xl md:text-5xl text-cream font-light">
                Classic Rooms
              </h2>
              <span className="block w-12 h-[1px] bg-gold mt-4" />
            </div>
            <Link to="/rooms?type=room" className="btn-outline self-start md:self-auto whitespace-nowrap">
              All {rooms.length} Rooms →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {rooms.slice(0, 2).map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Forest Cottages ── */}
      <section className="py-20 bg-cream">
        <div
          ref={cottagesRef}
          className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-label">Room Type 02</span>
              <h2 className="section-title">
                Forest Cottages
              </h2>
              <span className="gold-divider" />
            </div>
            <Link to="/rooms?type=cottage" className="btn-primary self-start md:self-auto whitespace-nowrap">
              All {cottages.length} Cottages →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {cottages.slice(0, 2).map(cottage => (
              <RoomCard key={cottage.id} room={cottage} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Amenities ── */}
      <section
        ref={amenitiesRef}
        className="py-16 bg-forest-mid opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <span className="section-label text-gold/70">Everything included</span>
            <h2 className="font-display text-4xl text-cream font-light">Property Amenities</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {AMENITIES.map(({ icon, title }) => (
              <div key={title} className="flex flex-col items-center gap-2 text-center group">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{icon}</span>
                <span className="font-body text-[11px] text-cream/70 tracking-wide leading-tight">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ── */}
      <section className="py-20 lg:py-28">
        <div
          ref={galleryRef}
          className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="text-center mb-12">
            <span className="section-label">Visual Stories</span>
            <h2 className="section-title">The Property</h2>
            <span className="gold-divider mx-auto" />
          </div>

          {/* Masonry-like grid */}
          {/* <div className="grid grid-cols-2 lg:grid-cols-3 gap-3"> */}
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              // { src: '/images/room-1a.jpg',      alt: 'Classic room interior',  tall: true },
              // { src: '/images/cottage-1a.jpg',   alt: 'Cottage bedroom',        tall: false },
              // { src: '/images/garden.jpg',      alt: 'Garden corridor',        tall: false },
              // { src: '/images/cottage-2b.jpg',  alt: 'Cottage exterior',       tall: false },
              // { src: '/images/hero.jpg',        alt: 'Lotus pond & gazebo',    tall: false },
              // { src: '/images/cottage-1c.jpg',   alt: 'Cottage bathroom',       tall: true },
              { src: '/images/front.jpg', alt: 'Village Utopia Exterior', tall: true },
              { src: '/images/cottage-1a.jpg', alt: 'Cottage Bedroom', tall: false },
              { src: '/images/garden.jpg', alt: 'Garden Corridor', tall: false },
              { src: '/images/cottage-2b.jpg', alt: 'Cottage Exterior', tall: false },
              { src: '/images/pool-1.jpg', alt: 'Swimming Pool', tall: false },
              { src: '/images/pool-2.jpg', alt: 'Pool View', tall: false },
              { src: '/images/pool-3.jpg', alt: 'Poolside Seating', tall: false },
              { src: '/images/pool-4.jpg', alt: 'Pool Area', tall: false },
              { src: '/images/corridor-1.jpg', alt: 'Balcony Corridor', tall: true },
              { src: '/images/bathroom-2.jpg', alt: 'Premium Bathroom', tall: true },
            ].map(({ src, alt, tall }) => (
              <div
                key={src}
                className={`overflow-hidden ${tall ? 'row-span-2' : ''}`}
                style={{ height: tall ? '100%' : '220px' }}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
                  onError={e => e.target.src = `https://placehold.co/600x400/2D4A32/C9A96E?text=${encodeURIComponent(alt)}`}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/gallery" className="btn-primary">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-cream-dark">
        <div
          ref={reviewsRef}
          className="max-w-7xl mx-auto px-6 lg:px-12 opacity-0 translate-y-8 transition-all duration-700"
        >
          <div className="text-center mb-12">
            <span className="section-label">Guest Stories</span>
            <h2 className="section-title">What They Say</h2>
            <span className="gold-divider mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white p-7 border border-cream-dark hover:border-gold transition-colors duration-300"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-gold text-sm">★</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="font-display text-lg font-light text-ink/80 leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>

                {/* Author */}
                <div className="border-t border-cream-dark pt-4">
                  <div className="font-body font-medium text-sm text-ink">{t.name}</div>
                  <div className="font-body text-xs text-ink/40 mt-0.5">{t.location} · {t.stay}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        ref={ctaRef}
        className="relative py-32 overflow-hidden opacity-0 translate-y-8 transition-all duration-700"
      >
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Lotus pond"
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-forest-dark/80" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
          <span className="section-label text-gold/70">Your retreat awaits</span>
          <h2 className="font-display text-5xl md:text-6xl text-cream font-light leading-tight mb-6">
            Ready to unwind<br />
            <em className="italic text-gold">in the forest?</em>
          </h2>
          <p className="font-body text-cream/60 mb-8 leading-relaxed">
            Book directly for the best rates. No hidden fees, free cancellation up to 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-gold">Book Your Stay</Link>
            <Link to="/contact" className="btn-outline">Talk to Us</Link>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="h-80 w-full">
        <iframe
          title="Village Utopia location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.603143124976!2d74.02070499999999!3d15.014719399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbe458f6d5ee2ab%3A0x4753c398da875bdd!2sVillage%20Utopia%20Cottages%2C%20Tropical%20Paradise%20%2CPalolem%20Beach%20%2CSouth%20Goa!5e0!3m2!1sen!2sin!4v1780988381772!5m2!1sen!2sin"
          className="w-full h-full grayscale"
          loading="lazy"
        />
      </section>
    </main>
  )
}