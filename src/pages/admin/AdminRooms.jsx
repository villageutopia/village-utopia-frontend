// src/pages/admin/AdminRooms.jsx
import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../../hooks/useAdmin'

const EMPTY_ROOM = {
  name: '', type: 'ROOM', price: '', capacity: 2,
  size: '', description: '', badge: '',
  highlights: '', amenities: '', images: '',
}

export default function AdminRooms() {
  const { apiCall } = useAdmin()
  const [rooms,   setRooms]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(null)   // null | 'add' | 'edit'
  const [form,    setForm]    = useState(EMPTY_ROOM)
  const [saving,  setSaving]  = useState(false)
  const [msg,     setMsg]     = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    const data = await apiCall('/api/admin/rooms')
    if (data) setRooms(data.rooms)
    setLoading(false)
  }, [apiCall])

  useEffect(() => { load() }, [load])

  function openAdd() {
    setForm(EMPTY_ROOM)
    setMsg('')
    setModal('add')
  }

  function openEdit(room) {
    setForm({
      ...room,
      highlights: room.highlights?.join('\n') || '',
      amenities:  room.amenities?.join('\n')  || '',
      images:     room.images?.join('\n')      || '',
    })
    setMsg('')
    setModal('edit')
  }

  async function handleSave() {
    setSaving(true); setMsg('')
    const payload = {
      ...form,
      price:      parseInt(form.price),
      capacity:   parseInt(form.capacity),
      highlights: form.highlights.split('\n').map(s => s.trim()).filter(Boolean),
      amenities:  form.amenities.split('\n').map(s => s.trim()).filter(Boolean),
      images:     form.images.split('\n').map(s => s.trim()).filter(Boolean),
      badge:      form.badge || null,
    }

    const res = modal === 'add'
      ? await apiCall('/api/admin/rooms', { method: 'POST', body: JSON.stringify(payload) })
      : await apiCall(`/api/admin/rooms/${form.id}`, { method: 'PUT', body: JSON.stringify(payload) })

    if (res?.room) {
      setMsg('✅ Saved successfully!')
      await load()
      setTimeout(() => { setModal(null); setMsg('') }, 800)
    } else {
      setMsg('❌ ' + (res?.error || 'Something went wrong'))
    }
    setSaving(false)
  }

  async function handleDelete(room) {
    if (!confirm(`Delete "${room.name}"? This cannot be undone.`)) return
    const res = await apiCall(`/api/admin/rooms/${room.id}`, { method: 'DELETE' })
    if (res?.message) await load()
    else alert(res?.error || 'Delete failed')
  }

  async function toggleActive(room) {
    await apiCall(`/api/admin/rooms/${room.id}`, {
      method: 'PUT',
      body: JSON.stringify({ active: !room.active }),
    })
    await load()
  }

  const f = (key, val) => setForm(p => ({ ...p, [key]: val }))

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-forest-dark font-light">Rooms & Cottages</h1>
          <p className="font-body text-sm text-ink/50 mt-1">{rooms.length} total listings</p>
        </div>
        <button onClick={openAdd} className="btn-primary text-xs">
          + Add New
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 font-body text-ink/40">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {rooms.map(room => (
            <div key={room.id}
                 className={`bg-white border p-5 flex gap-5 items-start ${room.active ? 'border-cream-dark' : 'border-red-200 opacity-60'}`}>

              {/* Image */}
              <div className="w-24 h-20 shrink-0 overflow-hidden bg-cream-dark">
                {room.images?.[0] ? (
                  <img src={room.images[0]} alt={room.name}
                       className="w-full h-full object-cover"
                       onError={e => e.target.style.display='none'} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🏠</div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-body font-medium text-sm text-ink">{room.name}</span>
                  <span className={`font-body text-[9px] px-1.5 py-0.5 tracking-wide uppercase ${
                    room.type === 'COTTAGE' ? 'bg-gold/20 text-gold-dark' : 'bg-forest-mid/10 text-forest-mid'
                  }`}>
                    {room.type}
                  </span>
                  {room.badge && (
                    <span className="font-body text-[9px] px-1.5 py-0.5 bg-maroon/10 text-maroon tracking-wide uppercase">
                      {room.badge}
                    </span>
                  )}
                  {!room.active && (
                    <span className="font-body text-[9px] px-1.5 py-0.5 bg-red-100 text-red-600 uppercase">
                      Hidden
                    </span>
                  )}
                </div>
                <div className="flex gap-4 font-body text-xs text-ink/50">
                  <span>👥 {room.capacity} guests</span>
                  <span>📐 {room.size}</span>
                  <span className="font-medium text-forest-mid text-sm">₹{room.price?.toLocaleString('en-IN')}/night</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEdit(room)}
                  className="font-body text-xs px-3 py-1.5 border border-forest-mid text-forest-mid hover:bg-forest-mid hover:text-cream transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleActive(room)}
                  className={`font-body text-xs px-3 py-1.5 border transition-colors ${
                    room.active
                      ? 'border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white'
                      : 'border-green-500 text-green-600 hover:bg-green-500 hover:text-white'
                  }`}
                >
                  {room.active ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleDelete(room)}
                  className="font-body text-xs px-3 py-1.5 border border-red-300 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal — Add / Edit */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-auto">

            {/* Header */}
            <div className="bg-forest-dark px-6 py-4 flex justify-between items-center sticky top-0">
              <h2 className="font-display text-xl text-cream font-light">
                {modal === 'add' ? 'Add New Room / Cottage' : `Edit — ${form.name}`}
              </h2>
              <button onClick={() => setModal(null)} className="text-cream/60 hover:text-cream text-xl">✕</button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">

              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">
                    Room Name *
                  </label>
                  <input value={form.name} onChange={e => f('name', e.target.value)}
                         className="input-field" placeholder="Classic Deluxe Room" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">
                    Type *
                  </label>
                  <select value={form.type} onChange={e => f('type', e.target.value)}
                          className="input-field">
                    <option value="ROOM">Room</option>
                    <option value="COTTAGE">Cottage</option>
                  </select>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">
                    Price / Night (₹) *
                  </label>
                  <input type="number" value={form.price} onChange={e => f('price', e.target.value)}
                         className="input-field" placeholder="3500" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">
                    Capacity (guests) *
                  </label>
                  <input type="number" value={form.capacity} onChange={e => f('capacity', e.target.value)}
                         className="input-field" placeholder="2" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">
                    Size
                  </label>
                  <input value={form.size} onChange={e => f('size', e.target.value)}
                         className="input-field" placeholder="320 sq ft" />
                </div>
              </div>

              {/* Badge */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">
                  Badge (optional)
                </label>
                <input value={form.badge} onChange={e => f('badge', e.target.value)}
                       className="input-field" placeholder="Most Popular / Premium / Best View" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">
                  Description
                </label>
                <textarea value={form.description} onChange={e => f('description', e.target.value)}
                          rows={3} className="input-field resize-none"
                          placeholder="Write a short description of this room..." />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">
                  Highlights (ek line = ek item)
                </label>
                <textarea value={form.highlights} onChange={e => f('highlights', e.target.value)}
                          rows={3} className="input-field resize-none font-mono text-xs"
                          placeholder={"Platform king bed\nMarble flooring\nWall sconces"} />
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">
                  Amenities (ek line = ek item)
                </label>
                <textarea value={form.amenities} onChange={e => f('amenities', e.target.value)}
                          rows={3} className="input-field resize-none font-mono text-xs"
                          placeholder={"AC\nCeiling Fan\nTV\nAttached Bathroom"} />
              </div>

              {/* Images */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">
                  Image Paths (ek line = ek image)
                </label>
                <textarea value={form.images} onChange={e => f('images', e.target.value)}
                          rows={3} className="input-field resize-none font-mono text-xs"
                          placeholder={"/images/room-1a.jpg\n/images/room-1b.jpg"} />
              </div>

              {msg && (
                <p className={`font-body text-sm px-3 py-2 ${msg.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                  {msg}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-forest-mid text-cream font-body text-xs tracking-[0.2em] uppercase
                             py-3 hover:bg-forest-dark transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : modal === 'add' ? 'Create Room' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setModal(null)}
                  className="px-6 border border-ink/20 font-body text-xs text-ink/60 hover:border-ink/40 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
