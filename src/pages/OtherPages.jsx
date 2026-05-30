// ─── About Page ───────────────────────────────
export function About() {
  return (
    <main className="pt-20">
      <section className="bg-forest-dark py-24 text-center">
        <span className="section-label text-gold/70">Our Story</span>
        <h1 className="font-display text-5xl md:text-6xl text-cream font-light">About Us</h1>
        <span className="block w-12 h-[1px] bg-gold mx-auto mt-5" />
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <span className="section-label">The Idea</span>
            <h2 className="section-title text-3xl leading-snug">
              Born from a love of<br />Goa's quieter side
            </h2>
            <span className="gold-divider" />
            <p className="font-body text-ink/60 leading-relaxed mt-2">
              Village Utopia began as a family dream — to create a retreat that felt
              like coming home. Not the crowded Goa of nightclubs and taxis, but the
              older, greener, quieter Goa of palm groves and lotus ponds.
            </p>
            <p className="font-body text-ink/60 leading-relaxed mt-4">
              Over the years, 9 boutique rooms were carefully built with warm
              maroon-and-gold interiors, and 4 forest cottages were crafted from
              pine wood with soaring A-frame ceilings. Each space was designed to
              feel personal, not generic.
            </p>
          </div>
          <div className="overflow-hidden">
            <img
              src="/images/garden.jpg"
              alt="Village Utopia garden"
              className="w-full object-cover hover:scale-105 transition-transform duration-700"
              onError={e => e.target.src = 'https://placehold.co/500x400/2D4A32/C9A96E?text=Garden'}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 border-t border-cream-dark pt-16">
          {[
            { n: '13', l: 'Unique stays' },
            { n: '1 acre', l: 'Of green grounds' },
            { n: '4.9★', l: 'Average rating' },
          ].map(({ n, l }) => (
            <div key={l} className="text-center">
              <div className="font-display text-5xl text-forest-mid font-light">{n}</div>
              <div className="font-body text-xs tracking-[0.2em] uppercase text-ink/40 mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

// ─── Contact Page ──────────────────────────────
export function Contact() {
  return (
    <main className="pt-20">
      <section className="bg-forest-dark py-24 text-center">
        <span className="section-label text-gold/70">Get in Touch</span>
        <h1 className="font-display text-5xl md:text-6xl text-cream font-light">Contact Us</h1>
        <span className="block w-12 h-[1px] bg-gold mx-auto mt-5" />
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-12 py-20 grid md:grid-cols-2 gap-16">
        <div>
          <span className="section-label">Reach Us</span>
          <h2 className="font-display text-3xl text-forest-dark font-light mb-6">We'd love to hear from you</h2>
          <div className="space-y-5">
            {[
              { icon: '📞', label: 'Phone', value: '+91 8468960995', href: 'tel:+91 8468960995' },
              { icon: '💬', label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/918468960995' },
              { icon: '✉️', label: 'Email', value: 'villageutopia.in@gmail.com', href: 'mailto:villageutopia.in@gmail.com' },
              { icon: '📍', label: 'Address', value: 'Village Utopia Cottages, Goa — 403001', href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="flex gap-4 items-start">
                <span className="text-2xl mt-0.5">{icon}</span>
                <div>
                  <p className="font-body text-xs tracking-[0.15em] uppercase text-ink/40">{label}</p>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                      className="font-body text-sm text-forest-mid hover:text-gold transition-colors mt-0.5 block">
                      {value}
                    </a>
                  ) : (
                    <p className="font-body text-sm text-ink/70 mt-0.5">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="w-full h-64 bg-cream-dark mb-6">
            <iframe
              title="Village Utopia map"
              src="https://maps.google.com/maps?q=Goa+India&z=13&output=embed"
              className="w-full h-full grayscale"
              loading="lazy"
            />
          </div>
          <p className="font-body text-sm text-ink/50">
            We're located in a quiet area of Goa, away from the tourist hustle.
            Exact directions will be shared upon booking confirmation.
          </p>
        </div>
      </section>
    </main>
  )
}

// ─── Policies Page ─────────────────────────────
export function Policies() {
  return (
    <main className="pt-20">
      <section className="bg-forest-dark py-24 text-center">
        <span className="section-label text-gold/70">Legal & Terms</span>
        <h1 className="font-display text-5xl md:text-6xl text-cream font-light">Policies</h1>
        <span className="block w-12 h-[1px] bg-gold mx-auto mt-5" />
      </section>

      <section className="max-w-3xl mx-auto px-6 lg:px-12 py-20 space-y-12">
        {[
          {
            title: 'Cancellation Policy',
            items: [
              'Free cancellation up to 48 hours before check-in date.',
              '50% refund for cancellations between 24–48 hours before check-in.',
              'No refund for cancellations within 24 hours of check-in.',
              'In case of a no-show, the full booking amount is charged.',
            ],
          },
          {
            title: 'Check-in & Check-out',
            items: [
              'Check-in: 12:00 PM (noon). Early check-in subject to availability.',
              'Check-out: 11:00 AM. Late check-out available for an additional charge.',
              'Valid government photo ID required at check-in.',
            ],
          },
          {
            title: 'Payment Terms',
            items: [
              'Online payments accepted via UPI, Credit/Debit Card, Net Banking (Razorpay).',
              'Partial payment (30%) secures the booking; balance due on arrival.',
              'Offline payments (cash, bank transfer) accepted. Receipt provided.',
              'GST and applicable taxes are included in the displayed price.',
            ],
          },
          {
            title: 'Property Rules',
            items: [
              'Smoking is not permitted inside rooms or cottages.',
              'Pets are not allowed on the property.',
              'Noise must be kept to a minimum after 10:00 PM.',
              'Guests are responsible for any damage caused during their stay.',
              'Management reserves the right to refuse service at their discretion.',
            ],
          },
          {
            title: 'Privacy Policy',
            items: [
              'Guest information is collected solely for booking and communication purposes.',
              'We do not share your data with third parties except for payment processing.',
              'We use Razorpay for secure payment processing. Your card details are never stored on our servers.',
            ],
          },
        ].map(({ title, items }) => (
          <div key={title}>
            <h2 className="font-display text-2xl text-forest-dark font-light mb-4">{title}</h2>
            <span className="gold-divider" />
            <ul className="space-y-2 mt-4">
              {items.map((item, i) => (
                <li key={i} className="flex gap-3 font-body text-sm text-ink/70 leading-relaxed">
                  <span className="text-gold mt-1 shrink-0">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  )
}
