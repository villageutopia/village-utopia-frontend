# Village Utopia Cottages — Website

React + Vite frontend for the Village Utopia Cottages booking website.

---

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Image Placement Guide

Place all images in `public/images/` with these exact filenames:

| File                    | What to put               | Your image # |
|-------------------------|---------------------------|--------------|
| `hero.jpg`              | Pond + gazebo outdoor     | Image 8      |
| `room-1.jpg`            | Platform bed room         | Image 1      |
| `room-3.jpg`            | Balcony room              | Image 3      |
| `room-4.jpg`            | Wide angle room           | Image 4      |
| `bath-1.jpg`            | Classic bathroom          | Image 2      |
| `cottage-6.jpg`         | Cottage desk + TV         | Image 6      |
| `cottage-7.jpg`         | Cottage bathroom          | Image 7      |
| `cottage-9.jpg`         | Cottage bedroom           | Image 9      |
| `cottage-10.jpg`        | Cottages exterior         | Image 10     |
| `cottage-11.jpg`        | Cottage wide view         | Image 11     |
| `cottage-12.jpg`        | Cottage porch             | Image 12     |
| `garden.jpg`            | Garden corridor           | Image 5      |
| `pond.jpg`              | Lotus pond                | Image 8      |
| `cottage-exterior.jpg`  | Exterior with palms       | Image 10     |

---

## Pages

| Route        | Page                                      |
|--------------|-------------------------------------------|
| `/`          | Home (hero, rooms preview, gallery, CTA)  |
| `/about`     | About the property                        |
| `/rooms`     | All rooms + cottages with filter/sort     |
| `/gallery`   | Photo gallery with lightbox               |
| `/booking`   | 4-step booking wizard + payment           |
| `/contact`   | Contact + Google Maps                     |
| `/policies`  | Cancellation, check-in, payment terms     |

---

## Razorpay Integration

In `src/pages/BookingPage.jsx`, find the `handlePayment` function and replace the `alert()` with:

```jsx
const handlePayment = async () => {
  // 1. Call your backend to create Razorpay order
  const res = await fetch('/api/booking/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: payNow, room: roomId, form, checkIn, checkOut, addons }),
  })
  const { orderId } = await res.json()

  // 2. Open Razorpay checkout
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: payNow * 100,  // paise
    currency: 'INR',
    name: 'Village Utopia Cottages',
    order_id: orderId,
    handler: (response) => {
      // 3. Verify on backend, then show confirmation
      navigate('/booking/success?ref=' + response.razorpay_payment_id)
    },
    prefill: { name: form.name, email: form.email, contact: form.phone },
    theme: { color: '#C9A96E' },
  }
  const rzp = new window.Razorpay(options)
  rzp.open()
}
```

Add Razorpay script to `index.html`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

---

## Env Variables

Create `.env` in root:
```
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx
VITE_API_URL=https://your-backend.render.com
```

---

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (custom theme)
- **Routing**: React Router v6
- **Dates**: react-datepicker
- **Animations**: CSS keyframes + Intersection Observer
- **Icons**: emoji (no icon lib dependency)
- **Deploy**: Vercel (frontend) + Render.com (backend)

---

## Customization

### Update room data
Edit `src/data/rooms.js`:
- Add actual prices, room names, descriptions
- Update amenities per room
- Add actual image paths

### Update contact info
Edit `src/components/Footer.jsx` and `src/pages/OtherPages.jsx`:
- Phone number
- WhatsApp number
- Email
- Address
- Google Maps embed URL (update to actual property location)
