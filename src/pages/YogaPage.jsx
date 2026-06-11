import { Link } from 'react-router-dom'

const YOGA_IMAGES = [
  { src: '/images/yoga-1.jpg',  alt: 'Morning yoga class at Village Utopia' },
  { src: '/images/yoga-2.jpg',  alt: 'Yoga shala beside the wetland' },
  { src: '/images/yoga-3.jpg',  alt: 'Hatha yoga practice' },
  { src: '/images/yoga-4.jpg',  alt: 'Yoga session in nature' },
  { src: '/images/yoga-5.jpg',  alt: 'Group yoga class Goa' },
  { src: '/images/yoga-6.jpg',  alt: 'Yoga at Village Utopia' },
  { src: '/images/yoga-7.jpg',  alt: 'Yoga shala side view' },
  { src: '/images/yoga-8.jpg',  alt: 'Pond near yoga shala' },
  
]

const SCHEDULE = [
  { time: '7:00 AM',  title: 'Morning Hatha',     desc: 'Start the day with breath, alignment and stillness. Suitable for all levels.' },
  { time: '8:30 AM',  title: 'Beginner Flow',     desc: 'Gentle introduction to postures, breathing and body awareness.' },
  { time: '5:00 PM',  title: 'Evening Yin',       desc: 'Slow, meditative practice to close the day. Deep stretches, long holds.' },
]

export default function YogaPage() {
  return (
    <main className="pt-20">

      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <img src="/images/yoga-1.jpg" alt="Yoga at Village Utopia"
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display='none' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <span className="section-label text-gold/80">Yoga at Village Utopia</span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream font-light leading-tight">
            Still the mind.<br />
            <em className="italic text-gold">Move the body.</em>
          </h1>
          <span className="block w-12 h-[1px] bg-gold mt-6" />
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="section-label">The Practice</span>
          <h2 className="section-title mb-4">
            Yoga beside<br />
            <em className="italic text-gold">the lotus pond</em>
          </h2>
          <span className="gold-divider" />
          <p className="font-body text-ink/70 leading-relaxed mt-4">
            Our open-air yoga shala sits at the edge of the wetland — surrounded by the sounds of birdsong, rustling palms, and water. Classes here are not about performance. They are about attention.
          </p>
          <p className="font-body text-ink/70 leading-relaxed mt-4">
            We offer Iyengar-influenced Hatha yoga — precise, methodical, and genuinely attentive to how your body works. Whether you are a complete beginner or a seasoned practitioner, there is space here for you.
          </p>
          <p className="font-body text-ink/70 leading-relaxed mt-4">
            It is a quiet place. That is intentional.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link to="/booking" className="btn-primary">Book a Stay + Yoga</Link>
            <a href="https://www.yogamandirgoa.com" target="_blank" rel="noreferrer"
              className="btn-outline bg-transparent border-forest-mid text-forest-mid hover:bg-forest-mid hover:text-cream">
              Yoga Mandir Goa ↗
            </a>
          </div>
        </div>

        {/* Image grid */}
        <div className="grid grid-cols-2 gap-3">
          {YOGA_IMAGES.slice(0, 4).map((img, i) => (
            <div key={i} className={`overflow-hidden ${i === 0 ? 'row-span-2 h-full' : 'h-44'}`}>
              <img src={img.src} alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={e => e.target.src=`https://placehold.co/400x300/2D4A32/C9A96E?text=Yoga`} />
            </div>
          ))}
        </div>
      </section>

      {/* ── What to expect ── */}
      <section className="bg-forest-dark py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="section-label text-gold/70">The Experience</span>
            <h2 className="font-display text-4xl text-cream font-light">What to Expect</h2>
            <span className="block w-12 h-[1px] bg-gold mx-auto mt-5" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🌿', title: 'Open-Air Shala', desc: 'Practice in a thatched bamboo shala open to the wetland. No walls — just trees, birds, and sky.' },
              { icon: '🧘', title: 'Hatha Yoga', desc: 'Iyengar-influenced approach. Each posture explored with care — alignment, breath, and awareness.' },
              { icon: '🌅', title: 'All Levels Welcome', desc: 'Whether it is your first time on a mat or you have been practicing for years — there is a class for you.' },
              { icon: '🐦', title: 'Nature Setting', desc: 'Birdsong, the occasional langur overhead, and the sound of water. Goa\'s quiet side, every morning.' },
              { icon: '👤', title: 'Small Groups', desc: 'Limited class sizes ensure each student gets genuine attention. Not a performance — a practice.' },
              { icon: '🕯', title: 'Evening Yin', desc: 'Long holds, deep stretches, silence. The best way to end a day in Goa.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-forest-mid/40 p-6 border border-cream/10 hover:border-gold/30 transition-colors">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-display text-lg text-cream font-light mb-2">{title}</h3>
                <p className="font-body text-sm text-cream/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schedule ── */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
        <div className="text-center mb-12">
          <span className="section-label">Daily Schedule</span>
          <h2 className="section-title">Class Timings</h2>
          <span className="gold-divider mx-auto" />
        </div>
        <div className="space-y-4">
          {SCHEDULE.map(({ time, title, desc }) => (
            <div key={title} className="flex gap-6 items-start bg-white border border-cream-dark p-6 hover:border-gold transition-colors">
              <div className="shrink-0 text-right">
                <div className="font-display text-xl text-gold font-light">{time}</div>
                <div className="font-body text-[10px] tracking-widest uppercase text-ink/40">daily</div>
              </div>
              <div className="w-[1px] bg-cream-dark self-stretch" />
              <div>
                <h3 className="font-display text-lg text-forest-dark font-light">{title}</h3>
                <p className="font-body text-sm text-ink/60 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="font-body text-xs text-ink/40 text-center mt-6">
          Schedule may vary · Please confirm timings at check-in · Classes subject to weather
        </p>
      </section>

      {/* ── Photo gallery ── */}
      <section className="bg-cream-dark py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <span className="section-label">From the Shala</span>
            <h2 className="section-title">Yoga Gallery</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {YOGA_IMAGES.map((img, i) => (
              <div key={i} className="overflow-hidden h-52 cursor-pointer group">
                <img src={img.src} alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => e.target.src=`https://placehold.co/400x300/2D4A32/C9A96E?text=Yoga`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero.jpg" alt=""
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display='none' }} />
          <div className="absolute inset-0 bg-forest-dark/80" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
          <span className="section-label text-gold/70">Begin your practice</span>
          <h2 className="font-display text-4xl md:text-5xl text-cream font-light leading-tight mb-4">
            Stay, practice,<br />
            <em className="italic text-gold">breathe.</em>
          </h2>
          <p className="font-body text-cream/60 mb-8 leading-relaxed max-w-md mx-auto">
            Book a room or cottage and start each morning with yoga beside the lotus pond.
            No agenda. Just practice.
          </p>
          <Link to="/booking" className="btn-gold">Book Your Stay</Link>
        </div>
      </section>

    </main>
  )
}