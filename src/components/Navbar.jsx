import React, { useState } from 'react'
import { Menu, X, Star, Shirt, PawPrint, WashingMachine, Handshake, MapPin, BadgeCheck } from 'lucide-react'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#wardrobe', label: 'Wardrobe' },
  { href: '#pickup', label: 'Pickup Map' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#kyc', label: 'Luxury KYC' },
  { href: '#contact', label: 'Contact' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50">
      <div className="backdrop-blur bg-white/70 border-b border-white/60 shadow-[0_2px_30px_rgba(15,169,88,0.08)]">
        <nav className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#home" className="font-extrabold text-xl tracking-tight"><span className="text-[#0FA958]">Sirwa</span><span className="text-[#D4AF37]">.lux</span></a>
          <div className="hidden md:flex gap-6 items-center">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="text-gray-700 hover:text-[#0FA958] transition font-medium">{n.label}</a>
            ))}
            <a href="#kyc" className="ml-2 inline-flex items-center gap-2 bg-[#0FA958] text-white px-4 py-2 rounded-full font-semibold shadow-md hover:brightness-110">
              <BadgeCheck size={18}/> Luxury KYC
            </a>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-xl border text-gray-700">
            {open ? <X/> : <Menu/>}
          </button>
        </nav>
        {open && (
          <div className="md:hidden px-6 pb-4 grid gap-2">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="py-2 border-b" onClick={() => setOpen(false)}>{n.label}</a>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
