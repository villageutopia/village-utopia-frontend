import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar  from './components/Navbar'
import Footer  from './components/Footer'

// Pages
import Home        from './pages/Home'
import RoomsPage   from './pages/Rooms'
import GalleryPage from './pages/GalleryPage'
import BookingPage from './pages/BookingPage'
import { About, Contact, Policies } from './pages/OtherPages'

function ScrollToTop() {
  // Hook equivalent using effect — simple implementation
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/"         element={<Home />} />
            <Route path="/about"    element={<About />} />
            <Route path="/rooms"    element={<RoomsPage />} />
            <Route path="/gallery"  element={<GalleryPage />} />
            <Route path="/booking"  element={<BookingPage />} />
            <Route path="/contact"  element={<Contact />} />
            <Route path="/policies" element={<Policies />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
