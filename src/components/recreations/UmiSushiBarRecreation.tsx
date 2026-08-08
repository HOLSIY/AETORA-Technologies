import React, { useState } from 'react';
import { ShoppingCart, Menu as MenuIcon, ChevronRight, Compass, Shield, Award } from 'lucide-react';

interface UmiProps {
  onContactClick?: () => void;
}

export const UmiSushiBarRecreation: React.FC<UmiProps> = ({ onContactClick }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { name: 'Omakase Box', price: '$85', qty: 1 }
  ]);

  const menuHighlights = [
    { name: 'TUNA TATAKI', desc: 'Seared bluefin tuna, ponzu sauce, avocado.', price: '$28', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=500' },
    { name: 'OMAKASE BOX', desc: "Chef's daily selection of 10 signature pieces.", price: '$85', img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&q=80&w=500' },
    { name: 'CRISPY RICE', desc: 'Spicy tuna tartare, yuzu kosho, micro cilantro.', price: '$24', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=500' },
  ];

  return (
    <div className="bg-[#121417] text-[#E0E2E5] font-sans min-h-screen">
      {/* Top Navbar */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-white/10 sticky top-0 z-40 bg-[#121417]/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-serif text-2xl font-light tracking-[0.25em] text-white">UMI</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#8C95A1] block font-sans">SUSHI BAR</span>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => setCartOpen(true)} className="relative p-2 text-[#A0A8B0] hover:text-white">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-0 right-0 bg-[#2D5A88] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartItems.length}
            </span>
          </button>
          <button className="p-2 text-[#A0A8B0] hover:text-white">
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="umi-home" className="relative min-h-[75vh] flex items-center px-8 py-16 bg-[#0E1012] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1000"
              alt="UMI Sushi Board"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl font-serif font-light tracking-widest text-white uppercase leading-tight">
              UMI <br />
              <span className="text-xs tracking-[0.4em] font-sans block text-[#8C95A1] mt-1">SUSHI BAR</span>
            </h1>

            <h2 className="text-sm font-semibold tracking-[0.2em] text-[#B0B8C0] uppercase">
              EXQUISITE ARTISTRY. PUREST OCEAN FLAVORS.
            </h2>

            <p className="text-xs text-[#8C95A1] font-light leading-relaxed max-w-md">
              Experience contemporary Japanese dining, where traditional precision meets exceptional ingredients in a sophisticated atmosphere.
            </p>

            <button
              onClick={() => document.getElementById('umi-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="bg-[#1C3B5E] hover:bg-[#254B78] text-white text-xs font-semibold tracking-[0.2em] uppercase px-8 py-3.5 rounded shadow transition-all"
            >
              VIEW MENU
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-8 max-w-7xl mx-auto border-t border-white/10">
        <h3 className="text-center font-serif text-sm tracking-[0.3em] text-[#8C95A1] uppercase mb-10">FEATURES</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#181B20] rounded-xl border border-white/5 space-y-2 text-center">
            <Compass className="w-6 h-6 text-[#4A7BB0] mx-auto mb-2" />
            <h4 className="font-serif tracking-widest text-sm text-white">PREMIUM CATCH</h4>
            <p className="text-xs text-[#8C95A1]">Daily arrivals from sustainable fisheries worldwide.</p>
          </div>
          <div className="p-6 bg-[#181B20] rounded-xl border border-white/5 space-y-2 text-center">
            <Award className="w-6 h-6 text-[#4A7BB0] mx-auto mb-2" />
            <h4 className="font-serif tracking-widest text-sm text-white">MASTER ARTISTRY</h4>
            <p className="text-xs text-[#8C95A1]">Expertly crafted by our seasoned Japanese omakase chefs.</p>
          </div>
          <div className="p-6 bg-[#181B20] rounded-xl border border-white/5 space-y-2 text-center">
            <Shield className="w-6 h-6 text-[#4A7BB0] mx-auto mb-2" />
            <h4 className="font-serif tracking-widest text-sm text-white">MODERN FLAVORS</h4>
            <p className="text-xs text-[#8C95A1]">Innovative dishes with a minimalist approach to dining.</p>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="umi-menu" className="py-16 px-8 max-w-7xl mx-auto bg-[#0E1012] border-t border-white/10">
        <h3 className="text-center font-serif text-sm tracking-[0.3em] text-[#8C95A1] uppercase mb-10">MENU HIGHLIGHTS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuHighlights.map((item, i) => (
            <div key={i} className="bg-[#181B20] rounded-xl p-4 border border-white/5 space-y-3">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <h4 className="font-serif tracking-wider text-sm font-bold text-white">{item.name}</h4>
                <span className="text-xs text-[#4A7BB0] font-bold">{item.price}</span>
              </div>
              <p className="text-xs text-[#8C95A1] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Craft */}
      <section id="umi-craft" className="py-20 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="font-serif text-3xl font-light tracking-widest text-white uppercase">OUR CRAFT</h3>
          <p className="text-xs text-[#8C95A1] leading-relaxed max-w-md">
            UMI delivers an elevated sushi experience, celebrating freshness and meticulous technique in the heart of the city.
          </p>
          <button
            onClick={() => document.getElementById('umi-craft')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="bg-[#1C3B5E] text-white text-xs tracking-widest uppercase px-8 py-3 rounded"
          >
            OUR STORY
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80&w=800"
            alt="Chef Counter"
            className="w-full h-[320px] object-cover"
          />
        </div>
      </section>

      {/* Footer */}
      <footer id="umi-contact" className="py-8 px-8 border-t border-white/10 text-xs text-[#8C95A1] flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-serif tracking-widest text-white">UMI SUSHI BAR</div>
        <div className="flex gap-6 uppercase tracking-wider">
          <a
            href="#umi-home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('umi-home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Home
          </a>
          <a
            href="#umi-menu"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('umi-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Menu
          </a>
          <a
            href="#umi-craft"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('umi-craft')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Craft
          </a>
          <a
            href="#umi-craft"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('umi-craft')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            Gallery
          </a>
        </div>
        <button onClick={onContactClick} className="text-[#4A7BB0] font-bold uppercase tracking-widest">
          Customize This Design →
        </button>
      </footer>
    </div>
  );
};
