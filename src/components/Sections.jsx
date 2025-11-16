import React, { useEffect, useState } from 'react'
import { Shirt, WashingMachine, PawPrint, Handshake, MapPin, Sparkles, ShieldCheck, CreditCard } from 'lucide-react'

const brand = {
  green: '#0FA958',
  gold: '#D4AF37'
}

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-20" style={{ background:
    'radial-gradient(1200px 400px at 10% -10%, rgba(15,169,88,0.05), transparent),'+
    'radial-gradient(1000px 300px at 90% 0%, rgba(212,175,55,0.06), transparent)'}}>
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
        <span style={{color: brand.green}}>{title.split(' ')[0]} </span>
        <span className="text-gray-900">{title.split(' ').slice(1).join(' ')}</span>
      </h2>
      {subtitle && <p className="text-gray-700 mt-2 max-w-2xl">{subtitle}</p>}
      <div className="mt-8">{children}</div>
    </div>
  </section>
)

export const About = () => (
  <Section id="about" title="About Sirwa" subtitle="Fashion-tech meets playful luxury.">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4 text-gray-700">
        <p>We blend premium vibes with practical magic: share wardrobes, schedule laundry pickups, rent a cuddle-worthy pet, or even book a friendly hang — all in one place.</p>
        <p>Built for the modern city explorer who loves convenience, sustainability, and a little gold sparkle.</p>
      </div>
      <div className="rounded-2xl p-6 border bg-white shadow-[0_20px_60px_rgba(212,175,55,0.15)]">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#0FA958]/10">
            <Shirt className="mx-auto" color={brand.green}/>
            <p className="mt-2 font-semibold">Wardrobe</p>
          </div>
          <div className="p-4 rounded-xl bg-[#D4AF37]/10">
            <WashingMachine className="mx-auto" color={brand.gold}/>
            <p className="mt-2 font-semibold">Laundry</p>
          </div>
          <div className="p-4 rounded-xl bg-[#0FA958]/10">
            <PawPrint className="mx-auto" color={brand.green}/>
            <p className="mt-2 font-semibold">Pets</p>
          </div>
        </div>
      </div>
    </div>
  </Section>
)

export const Services = () => (
  <Section id="services" title="Signature Services" subtitle="Pick your adventure.">
    <div className="grid md:grid-cols-4 gap-6">
      {[{icon: Shirt, title: 'Wardrobe Sharing', desc:'Borrow or share outfits for every mood.'},
        {icon: WashingMachine, title: 'Laundry Pickup', desc:'On-demand pickup with map pin.'},
        {icon: PawPrint, title: 'Pet Rental', desc:'Premium time with friendly companions.'},
        {icon: Handshake, title: 'Rent a Friend', desc:'Book a vetted buddy for events.'}].map((s) => (
        <div key={s.title} className="p-6 rounded-2xl border bg-white hover:shadow-xl transition group">
          <s.icon color={brand.green} />
          <h3 className="mt-4 font-bold text-lg">{s.title}</h3>
          <p className="text-gray-600">{s.desc}</p>
          <div className="mt-4 text-sm text-[#D4AF37] font-semibold group-hover:translate-x-1 transition">Explore →</div>
        </div>
      ))}
    </div>
  </Section>
)

export const Wardrobe = () => {
  const [items, setItems] = useState([])
  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/wardrobe`)
        const j = await r.json()
        setItems(j)
      } catch(e) { /* ignore */ }
    }
    load()
  }, [])
  return (
    <Section id="wardrobe" title="Wardrobe Gallery" subtitle="Community-powered fits with premium flair.">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.length === 0 && (
          <div className="col-span-full text-gray-500">No items yet — be the first to upload via API.</div>
        )}
        {items.map((it) => (
          <div key={it.id} className="rounded-2xl overflow-hidden border bg-white hover:shadow-2xl transition">
            {it.image_url ? (
              <img src={it.image_url} alt={it.title} className="h-48 w-full object-cover"/>
            ) : (
              <div className="h-48 w-full bg-gradient-to-br from-[#0FA958]/15 to-[#D4AF37]/20" />
            )}
            <div className="p-4">
              <h4 className="font-bold">{it.title}</h4>
              <p className="text-sm text-gray-600">{it.description}</p>
              <div className="mt-2 text-[#D4AF37] font-semibold">{it.price_per_day ? `$${it.price_per_day}/day` : 'On request'}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export const PickupMap = () => {
  const [coords, setCoords] = useState({ lat: 40.7128, lng: -74.0060 })
  const [address, setAddress] = useState('')
  const [service, setService] = useState('laundry')

  const submit = async (e) => {
    e.preventDefault()
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pickup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Guest', email: 'guest@sirwa.app', address, latitude: coords.lat, longitude: coords.lng, service })
    })
    alert('Pickup request sent!')
  }

  return (
    <Section id="pickup" title="Maps-based Pickup" subtitle="Drop a pin. We handle the rest.">
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="aspect-video w-full rounded-2xl overflow-hidden border">
          <iframe
            title="map"
            className="w-full h-full"
            src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=14&output=embed`}
            loading="lazy"
          />
        </div>
        <form onSubmit={submit} className="p-6 rounded-2xl border bg-white grid gap-3">
          <label className="text-sm font-semibold">Address</label>
          <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Enter pickup address" className="border rounded-xl px-4 py-2"/>
          <label className="text-sm font-semibold mt-2">Service</label>
          <select value={service} onChange={e=>setService(e.target.value)} className="border rounded-xl px-4 py-2">
            <option value="laundry">Laundry</option>
            <option value="wardrobe">Wardrobe</option>
            <option value="pets">Pets</option>
            <option value="friend">Rent a Friend</option>
          </select>
          <button className="mt-4 bg-[#0FA958] text-white px-4 py-2 rounded-xl font-semibold">Request Pickup</button>
        </form>
      </div>
    </Section>
  )
}

export const Pricing = () => (
  <Section id="pricing" title="Pricing" subtitle="Simple, transparent, gilded.">
    <div className="grid md:grid-cols-3 gap-6">
      {[{t:'Essentials',p:'$19/mo',f:['Laundry pickups','Basic wardrobe access','Standard support']},
        {t:'Gold',p:'$49/mo',f:['Premium wardrobe tiers','Priority pickup','Pet rentals 2x/mo']},
        {t:'Royal',p:'$149/mo',f:['Unlimited access','Concierge pickups','Rent-a-friend credits']}].map((plan,i)=>(
        <div key={plan.t} className={`p-6 rounded-2xl border bg-white ${i===1?'shadow-2xl scale-[1.02] border-[#D4AF37]':''}`}>
          <div className="text-2xl font-bold">{plan.t}</div>
          <div className="text-3xl mt-2 font-extrabold" style={{color: brand.gold}}>{plan.p}</div>
          <ul className="mt-4 text-gray-600 space-y-2 list-disc pl-5">
            {plan.f.map(x=> <li key={x}>{x}</li>)}
          </ul>
          <button className="mt-6 w-full bg-[#0FA958] text-white py-2 rounded-xl font-semibold">Choose {plan.t}</button>
        </div>
      ))}
    </div>
  </Section>
)

export const Reviews = () => {
  const [reviews, setReviews] = useState([])
  useEffect(()=>{(async()=>{
    try{ const r = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`); setReviews(await r.json()) }catch(e){}
  })()},[])
  return (
    <Section id="reviews" title="User Reviews" subtitle="Loved by our stylish community.">
      <div className="grid md:grid-cols-3 gap-6">
        {reviews.length===0 && <div className="text-gray-500">No reviews yet.</div>}
        {reviews.map((rv)=> (
          <div key={rv.id} className="p-6 rounded-2xl border bg-white">
            <div className="font-bold">{rv.name}</div>
            <div className="text-[#D4AF37]">{'★'.repeat(rv.rating)}{'☆'.repeat(5-rv.rating)}</div>
            <p className="text-gray-700 mt-2">{rv.comment}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export const LuxuryKYC = () => {
  const [form, setForm] = useState({ full_name:'', email:'', phone:'', government_id_type:'', government_id_number:'', social_handles:'', purpose:'', consent:false })
  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({...prev, [name]: type==='checkbox'? checked : value }))
  }
  const submit = async (e) => {
    e.preventDefault()
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/luxury-kyc`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    alert('KYC submitted! Our concierge will reach out.')
    setForm({ full_name:'', email:'', phone:'', government_id_type:'', government_id_number:'', social_handles:'', purpose:'', consent:false })
  }
  return (
    <Section id="kyc" title="Luxury KYC" subtitle="A quick verification for premium experiences.">
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 p-6 rounded-2xl border bg-white">
        {['full_name','email','phone','government_id_type','government_id_number','social_handles','purpose'].map((f)=>(
          <div key={f} className="grid gap-1">
            <label className="text-sm font-semibold capitalize">{f.replaceAll('_',' ')}</label>
            <input name={f} value={form[f]} onChange={onChange} className="border rounded-xl px-4 py-2" placeholder={`Your ${f.replaceAll('_',' ')}`}/>
          </div>
        ))}
        <label className="md:col-span-2 inline-flex items-center gap-2 text-sm">
          <input type="checkbox" name="consent" checked={form.consent} onChange={onChange} />
          I consent to secure verification and privacy-first handling.
        </label>
        <button className="md:col-span-2 bg-[#0FA958] text-white py-3 rounded-xl font-semibold">Submit KYC</button>
      </form>
    </Section>
  )
}

export const Contact = () => (
  <Section id="contact" title="Contact" subtitle="Concierge at your service.">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 rounded-2xl border bg-white">
        <div className="font-bold">Email</div>
        <div className="text-gray-700">hello@sirwa.app</div>
        <div className="mt-4 font-bold">Social</div>
        <div className="text-gray-700">@sirwa.lux</div>
      </div>
      <div className="p-6 rounded-2xl border bg-white">
        <div className="font-bold">Partner with us</div>
        <p className="text-gray-700">Designers, laundries, shelters, and community leaders — join the Sirwa ecosystem.</p>
        <button className="mt-3 bg-[#D4AF37] text-white px-4 py-2 rounded-xl font-semibold">Get in touch</button>
      </div>
    </div>
  </Section>
)

export default Section
