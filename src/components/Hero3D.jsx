import React from 'react'
import Spline from '@splinetool/react-spline'

const Hero3D = () => {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(15,169,88,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(212,175,55,0.18),transparent_40%),linear-gradient(180deg,#ffffff,rgba(255,255,255,0.6))]">
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 opacity-60">
        <Spline scene="https://prod.spline.design/5gJgQ5rA2N3CClBq/scene.splinecode" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="backdrop-blur-md/40 bg-white/50 rounded-3xl p-8 shadow-[0_10px_60px_rgba(15,169,88,0.15)] border border-white/40">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0FA958] to-[#D4AF37]">Sirwa</span>
            <span className="block text-gray-900 mt-2">Wardrobe. Laundry. Pets. Friends.</span>
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl">
            A playful luxury platform to borrow fits, schedule laundry pickups, rent adorable companions, and even book a hang with a trusted friend.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#services" className="px-5 py-3 rounded-full text-white font-semibold shadow-lg bg-[#0FA958] hover:brightness-110 transition">Explore Services</a>
            <a href="#wardrobe" className="px-5 py-3 rounded-full font-semibold shadow-lg border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition">Wardrobe Gallery</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero3D
