import React from 'react'
import Hero3D from './components/Hero3D'
import Navbar from './components/Navbar'
import Section, { About, Services, Wardrobe, PickupMap, Pricing, Reviews, LuxuryKYC, Contact } from './components/Sections'

function App() {
  return (
    <div id="home" className="bg-white text-gray-900">
      <Navbar/>
      <Hero3D/>
      <About/>
      <Services/>
      <Wardrobe/>
      <PickupMap/>
      <Pricing/>
      <Reviews/>
      <LuxuryKYC/>
      <Contact/>
      <footer className="py-10 text-center text-sm text-gray-600">
        <div className="max-w-6xl mx-auto px-6">
          © {new Date().getFullYear()} Sirwa — Crafted with a dash of green and a hint of gold.
        </div>
      </footer>
    </div>
  )
}

export default App
