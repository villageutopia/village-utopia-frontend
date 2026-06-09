import { useState, useEffect, useCallback } from 'react'
import { useAdmin } from '../../hooks/useAdmin'

const CLOUDINARY_CLOUD  = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME    || ''
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''

const EMPTY = {
  name: '', type: 'ROOM', price: '', capacity: 2,
  size: '', description: '', badge: '',
  highlights: '', amenities: '', images: '',
}

export default function AdminRooms() {
  const { apiCall } = useAdmin()
  const [rooms,     setRooms]     = useState([])
  const [loading,   setLoading]   = useState(true)
  const [modal,     setModal]     = useState(null)
  const [form,      setForm]      = useState(EMPTY)
  const [saving,    setSaving]    = useState(false)
  const [uploading, setUploading] = useState(false)
  const [msg,       setMsg]       = useState('')
  const [loadError, setLoadError] = useState('')

  // ── Load rooms ─────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true)
    setLoadError('')
    try {
      const data = await apiCall('/api/admin/rooms')
      if (data?.rooms) {
        setRooms(data.rooms)
      } else {
        setLoadError(data?.error || 'Rooms load failed')
        setRooms([])
      }
    } catch (err) {
      setLoadError('Network error: ' + err.message)
      setRooms([])
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  useEffect(() => { load() }, [load])

  const f = (k, v) => setForm(p => ({ ...p, [k]: v }))

  function openAdd() { setForm(EMPTY); setMsg(''); setModal('add') }
  function openEdit(room) {
    setForm({
      ...room,
      highlights: (room.highlights || []).join('\n'),
      amenities:  (room.amenities  || []).join('\n'),
      images:     (room.images     || []).join('\n'),
    })
    setMsg(''); setModal('edit')
  }

  // ── Cloudinary upload ──────────────────────────────────────
  async function handleImageUpload(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return
    if (!CLOUDINARY_CLOUD || !CLOUDINARY_PRESET) {
      setMsg('⚠️ Cloudinary env vars missing. Vercel mein add karo.')
      return
    }
    setUploading(true)
    const uploaded = []
    for (const file of files) {
      try {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('upload_preset', CLOUDINARY_PRESET)
        fd.append('folder', 'village-utopia')
        const res  = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`, {
          method: 'POST', body: fd,
        })
        const data = await res.json()
        if (data.secure_url) uploaded.push(data.secure_url)
      } catch { /* skip */ }
    }
    if (uploaded.length) {
      setForm(p => ({
        ...p,
        images: [...p.images.split('\n').filter(Boolean), ...uploaded].join('\n'),
      }))
      setMsg(`✅ ${uploaded.length} photo(s) uploaded!`)
    }
    setUploading(false)
    e.target.value = ''
  }

  // ── Save ──────────────────────────────────────────────────
  async function handleSave() {
    if (!form.name.trim() || !form.price || !form.capacity) {
      setMsg('❌ Name, price aur capacity required hain')
      return
    }
    setSaving(true); setMsg('')
    try {
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
        setMsg('✅ Saved!')
        await load()
        setTimeout(() => { setModal(null); setMsg('') }, 800)
      } else {
        setMsg('❌ ' + (res?.error || 'Save failed'))
      }
    } catch (err) {
      setMsg('❌ ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  // ── Delete ─────────────────────────────────────────────────
  async function handleDelete(room) {
    if (!confirm(`"${room.name}" permanently delete karo?`)) return
    try {
      const res = await apiCall(`/api/admin/rooms/${room.id}`, { method: 'DELETE' })
      if (res?.message) {
        await load()
      } else {
        alert(res?.error || 'Delete failed')
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  // ── Toggle active ──────────────────────────────────────────
  async function toggleActive(room) {
    await apiCall(`/api/admin/rooms/${room.id}`, {
      method: 'PUT',
      body: JSON.stringify({ active: !room.active }),
    })
    await load()
  }

  const imageList = form.images.split('\n').map(s => s.trim()).filter(Boolean)

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl lg:text-3xl text-forest-dark font-light">Rooms & Cottages</h1>
          <p className="font-body text-sm text-ink/50 mt-0.5">{rooms.length} total listings</p>
        </div>
        <button onClick={openAdd}
          className="bg-forest-mid text-cream font-body text-xs tracking-[0.15em] uppercase
                     px-4 py-2.5 hover:bg-forest-dark transition-colors whitespace-nowrap">
          + Add New
        </button>
      </div>

      {/* Error */}
      {loadError && (
        <div className="bg-red-50 border border-red-200 text-red-700 font-body text-sm px-4 py-3 mb-6 rounded">
          {loadError}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">
          <div className="font-body text-ink/40 text-sm">Loading rooms...</div>
        </div>
      ) : rooms.length === 0 && !loadError ? (
        <div className="text-center py-20 bg-white border border-cream-dark">
          <p className="font-body text-ink/40">No rooms found.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {rooms.map(room => (
            <div key={room.id}
              className={`bg-white border rounded p-4 flex gap-3 items-start
                ${room.active !== false ? 'border-cream-dark' : 'border-red-200 opacity-60'}`}>

              {/* Thumbnail */}
              <div className="w-16 h-14 shrink-0 overflow-hidden bg-cream-dark rounded">
                {room.images?.[0]
                  ? <img src={room.images[0]} alt={room.name}
                         className="w-full h-full object-cover"
                         onError={e => { e.target.style.display = 'none' }} />
                  : <div className="w-full h-full flex items-center justify-center text-xl">🏠</div>
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                  <span className="font-body font-medium text-sm text-ink truncate">{room.name}</span>
                  <span className={`font-body text-[8px] px-1.5 py-0.5 tracking-wide uppercase shrink-0 ${
                    room.type === 'COTTAGE' ? 'bg-gold/20 text-gold-dark' : 'bg-forest-mid/10 text-forest-mid'}`}>
                    {room.type}
                  </span>
                  {room.active === false && (
                    <span className="font-body text-[8px] px-1.5 py-0.5 bg-red-100 text-red-600 uppercase">Hidden</span>
                  )}
                </div>
                <div className="font-body text-xs text-forest-mid font-medium">
                  Rs. {room.price?.toLocaleString('en-IN')}/night
                </div>
                <div className="font-body text-[10px] text-ink/40 mt-0.5">
                  👥 {room.capacity} · 📐 {room.size}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1.5 shrink-0">
                <button onClick={() => openEdit(room)}
                  className="font-body text-[10px] px-3 py-1 border border-forest-mid text-forest-mid
                             hover:bg-forest-mid hover:text-cream transition-colors text-center">
                  Edit
                </button>
                <button onClick={() => toggleActive(room)}
                  className={`font-body text-[10px] px-3 py-1 border transition-colors text-center ${
                    room.active !== false
                      ? 'border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white'
                      : 'border-green-500 text-green-600 hover:bg-green-500 hover:text-white'}`}>
                  {room.active !== false ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => handleDelete(room)}
                  className="font-body text-[10px] px-3 py-1 border border-red-300 text-red-500
                             hover:bg-red-500 hover:text-white transition-colors text-center">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-2xl max-h-[95vh] overflow-auto flex flex-col rounded-t-2xl sm:rounded-none">

            {/* Header */}
            <div className="bg-forest-dark px-5 py-4 flex justify-between items-center sticky top-0 z-10 rounded-t-2xl sm:rounded-none">
              <h2 className="font-display text-lg text-cream font-light">
                {modal === 'add' ? 'Add New Room / Cottage' : `Edit — ${form.name}`}
              </h2>
              <button onClick={() => setModal(null)}
                className="text-cream/60 hover:text-cream text-2xl leading-none w-8 h-8 flex items-center justify-center">
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-auto pb-8">

              {/* Name + Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">Room Name *</label>
                  <input value={form.name} onChange={e => f('name', e.target.value)}
                    className="input-field" placeholder="Classic Deluxe Room" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">Type *</label>
                  <select value={form.type} onChange={e => f('type', e.target.value)} className="input-field">
                    <option value="ROOM">Room</option>
                    <option value="COTTAGE">Cottage</option>
                  </select>
                </div>
              </div>

              {/* Price + Capacity + Size */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">Price/Night (Rs.) *</label>
                  <input type="number" value={form.price} onChange={e => f('price', e.target.value)}
                    className="input-field" placeholder="3500" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">Guests *</label>
                  <input type="number" value={form.capacity} onChange={e => f('capacity', e.target.value)}
                    className="input-field" placeholder="2" />
                </div>
                <div>
                  <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">Size</label>
                  <input value={form.size} onChange={e => f('size', e.target.value)}
                    className="input-field" placeholder="320 sq ft" />
                </div>
              </div>

              {/* Badge */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">Badge (optional)</label>
                <input value={form.badge} onChange={e => f('badge', e.target.value)}
                  className="input-field" placeholder="Most Popular / Premium / Best View" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-1">Description</label>
                <textarea value={form.description} onChange={e => f('description', e.target.value)}
                  rows={3} className="input-field resize-none" placeholder="Write a short description..." />
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

              {/* Photos */}
              <div>
                <label className="block text-[9px] tracking-[0.2em] uppercase font-body text-forest-mid font-semibold mb-2">Photos</label>

                <label className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed
                  cursor-pointer transition-colors font-body text-sm rounded
                  ${uploading ? 'border-gold/30 text-ink/30 cursor-not-allowed'
                              : 'border-forest-mid/30 text-forest-mid hover:border-forest-mid hover:bg-forest-mid/5'}`}>
                  {uploading ? <><span className="animate-spin inline-block">⏳</span> Uploading...</>
                             : <><span>📷</span> Click to upload photos</>}
                  <input type="file" accept="image/*" multiple className="hidden"
                    onChange={handleImageUpload} disabled={uploading} />
                </label>

                {/* Image previews */}
                {imageList.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-3">
                    {imageList.map((url, i) => (
                      <div key={i} className="relative group w-16 h-12 rounded overflow-hidden">
                        <img src={url} alt="" className="w-full h-full object-cover"
                          onError={e => { e.target.src = 'https://placehold.co/64x48/2D4A32/C9A96E?text=IMG' }} />
                        <button
                          onClick={() => f('images', imageList.filter((_, idx) => idx !== i).join('\n'))}
                          className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[9px]
                                     flex items-center justify-center opacity-0 group-hover:opacity-100
                                     transition-opacity rounded-full">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <textarea value={form.images} onChange={e => f('images', e.target.value)}
                  rows={2} className="input-field resize-none font-mono text-xs mt-2"
                  placeholder="do manually paste URLs..." />
              </div>

              {/* Message */}
              {msg && (
                <div className={`font-body text-sm px-3 py-2 rounded ${
                  msg.startsWith('✅') ? 'bg-green-50 text-green-700 border border-green-200' :
                  msg.startsWith('⚠️') ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                         'bg-red-50 text-red-600 border border-red-200'}`}>
                  {msg}
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3">
                <button onClick={handleSave} disabled={saving}
                  className="flex-1 bg-forest-mid text-cream font-body text-xs tracking-[0.2em] uppercase
                             py-3 hover:bg-forest-dark transition-colors disabled:opacity-50 rounded">
                  {saving ? 'Saving...' : modal === 'add' ? 'Create Room' : 'Save Changes'}
                </button>
                <button onClick={() => setModal(null)}
                  className="px-5 border border-ink/20 font-body text-xs text-ink/60
                             hover:border-ink/40 transition-colors rounded">
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