import React, { useState } from 'react';
import { Crown, Calendar, Users, Star, CheckCircle, Wifi, Coffee, Sparkles, MapPin, Key, ChevronRight, Phone } from 'lucide-react';

interface GrandPalaceProps {
  onContactClick?: () => void;
}

export const GrandPalaceHotelRecreation: React.FC<GrandPalaceProps> = ({ onContactClick }) => {
  const [checkIn, setCheckIn] = useState('2026-08-10');
  const [checkOut, setCheckOut] = useState('2026-08-15');
  const [guests, setGuests] = useState('2 Guests');
  const [reservedSuite, setReservedSuite] = useState<string | null>(null);

  const suites = [
    {
      id: 'presidential',
      title: 'The Royal Presidential Suite',
      price: '$1,250 / night',
      size: '180 m² • Ocean View',
      img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
      amenities: ['Private Jacuzzi', 'Personal Butler', 'VIP Lounge Access', 'Helipad Access'],
    },
    {
      id: 'empress',
      title: 'Empress Luxury Suite',
      price: '$850 / night',
      size: '120 m² • Panoramic City Skyline',
      img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800',
      amenities: ['King Feather Bed', 'Marble Bathroom', '24/7 Room Service', 'Spa Access'],
    },
    {
      id: 'executive',
      title: 'Grand Executive Deluxe Room',
      price: '$520 / night',
      size: '75 m² • Garden View',
      img: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800',
      amenities: ['High-speed Wi-Fi', 'Espresso Bar', 'Balcony Deck', 'Infinity Pool Access'],
    },
  ];

  return (
    <div className="bg-[#0D0B09] text-[#E5DFD5] font-serif min-h-screen selection:bg-[#D4AF37] selection:text-[#0D0B09]">
      
      {/* Top Luxury Announcement */}
      <div className="bg-[#1A1612] border-b border-[#2E2720] px-6 py-2 text-[11px] font-sans uppercase tracking-widest text-[#D4AF37] text-center flex items-center justify-center gap-2">
        <Crown className="w-3.5 h-3.5" />
        <span>Voted World's #1 Ultra-Luxury Boutique Resort 2026</span>
      </div>

      {/* Main Header */}
      <header className="px-8 py-6 border-b border-[#26201A] bg-[#0D0B09]/90 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-[#D4AF37] to-[#AA820A] text-[#0D0B09] rounded-xl shadow-lg">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-xl text-white tracking-wider uppercase">Grand Palace</h1>
            <span className="text-[9px] text-[#D4AF37] font-sans tracking-[0.3em] uppercase block">Luxury Hotel & Suites</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-sans uppercase tracking-widest text-[#A69C8F]">
          <a
            href="#grandpalace-suites"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('grandpalace-suites')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-[#D4AF37]"
          >
            Suites
          </a>
          <a
            href="#grandpalace-experience"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('grandpalace-experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-white transition-colors"
          >
            Experience
          </a>
          <a
            href="#grandpalace-concierge"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('grandpalace-concierge')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-white transition-colors"
          >
            Concierge
          </a>
          <a
            href="#grandpalace-hero"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('grandpalace-hero')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-white transition-colors"
          >
            Reservations
          </a>
        </nav>

        <button
          onClick={onContactClick}
          className="bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#0D0B09] font-sans font-bold text-xs uppercase px-6 py-3 rounded-xl shadow-xl hover:brightness-110 transition-all"
        >
          Book Your Stay
        </button>
      </header>

      {/* Hero Showcase */}
      <section id="grandpalace-hero" className="relative py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-sans tracking-[0.4em] uppercase text-[#D4AF37] font-bold block">
            AN EXTRAORDINARY ESCAPE
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
            Refined Elegance & Unmatched Hospitality
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#A69C8F] leading-relaxed">
            Immerse yourself in timeless opulent architecture, Michelin-starred gastronomy, and private sanctuary suites crafted by world-renowned interior designers.
          </p>
        </div>

        {/* Real-time Availability & Search Bar */}
        <div className="bg-[#191511] p-6 rounded-3xl border border-[#332A22] shadow-2xl max-w-4xl mx-auto font-sans text-xs grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[10px] uppercase font-bold text-[#D4AF37] mb-1">Check-In Date</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#26201A] border border-[#3D332B] rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#D4AF37] mb-1">Check-Out Date</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#26201A] border border-[#3D332B] rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-[#D4AF37] mb-1">Guests & Rooms</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-[#26201A] border border-[#3D332B] rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="1 Guest">1 Guest (Single Suite)</option>
              <option value="2 Guests">2 Guests (Couple Suite)</option>
              <option value="4 Guests">4 Guests (Family Villa)</option>
            </select>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('grandpalace-suites');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-[#D4AF37] hover:bg-[#B5932D] text-[#0D0B09] font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-all"
          >
            Search Availability
          </button>
        </div>
      </section>

      {/* Suite Galleries */}
      <section id="grandpalace-suites" className="py-16 px-6 max-w-7xl mx-auto space-y-10 border-t border-[#26201A]">
        <div className="text-center space-y-2">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#D4AF37] font-bold block">SUITES & RESIDENCES</span>
          <h2 className="text-3xl font-bold text-white">Choose Your Private Haven</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {suites.map((suite) => (
            <div key={suite.id} className="bg-[#16120E] rounded-3xl border border-[#2B231C] overflow-hidden hover:border-[#D4AF37] transition-all group flex flex-col justify-between">
              <div>
                <div className="h-64 overflow-hidden relative">
                  <img src={suite.img} alt={suite.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 right-4 bg-[#0D0B09]/80 backdrop-blur-md text-[#D4AF37] font-sans font-bold text-xs px-3 py-1 rounded-full border border-[#D4AF37]/40">
                    {suite.price}
                  </span>
                </div>

                <div className="p-6 space-y-4 font-sans">
                  <div>
                    <span className="text-[10px] text-[#A69C8F] uppercase font-semibold">{suite.size}</span>
                    <h3 className="font-serif font-bold text-xl text-white mt-1">{suite.title}</h3>
                  </div>

                  <ul className="space-y-2 text-xs text-[#C4BCB3]">
                    {suite.amenities.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0 font-sans">
                {reservedSuite === suite.title ? (
                  <div className="bg-emerald-950/60 border border-emerald-500 text-emerald-300 p-3 rounded-xl text-xs text-center font-bold">
                    ✓ Suite Reserved for {checkIn}!
                  </div>
                ) : (
                  <button
                    onClick={() => setReservedSuite(suite.title)}
                    className="w-full bg-[#26201A] hover:bg-[#3D332B] text-[#D4AF37] border border-[#D4AF37]/50 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Reserve Suite Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Concierge & Fine Dining */}
      <section id="grandpalace-concierge" className="py-16 px-6 bg-[#120F0C] border-y border-[#26201A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#D4AF37] font-bold block">
              24/7 PRIVATE CONCIERGE
            </span>
            <h2 className="text-4xl font-bold text-white">Personalized Luxury Beyond Expectation</h2>
            <p className="text-xs font-sans text-[#A69C8F] leading-relaxed">
              From private yacht charters and helicopter airport transfers to custom in-suite dining experiences orchestrated by our Michelin-starred chefs.
            </p>

            <div className="grid grid-cols-2 gap-4 font-sans text-xs">
              <div className="bg-[#1B1612] p-4 rounded-2xl border border-[#2E261F] space-y-1">
                <Key className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="font-bold text-white">Private Butler</h4>
                <p className="text-[11px] text-[#A69C8F]">Dedicated 24/7 personal attendant</p>
              </div>
              <div className="bg-[#1B1612] p-4 rounded-2xl border border-[#2E261F] space-y-1">
                <Coffee className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="font-bold text-white">Imperial Dining</h4>
                <p className="text-[11px] text-[#A69C8F]">3 Michelin Star gourmet cuisine</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-[#3D332B] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
              alt="Grand Palace Dining"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-xs font-sans text-[#786D61] bg-[#0A0807]">
        <p>© 2026 Grand Palace Luxury Hotel & Suites. Engineered by AETORA Technologies.</p>
      </footer>

    </div>
  );
};
