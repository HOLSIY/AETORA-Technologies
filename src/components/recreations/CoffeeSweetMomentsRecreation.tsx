import React, { useState } from 'react';
import { Search, User, ShoppingBag, Check, ShieldCheck, Truck, Clock, Heart } from 'lucide-react';

interface CoffeeSweetProps {
  onContactClick?: () => void;
}

export const CoffeeSweetMomentsRecreation: React.FC<CoffeeSweetProps> = ({ onContactClick }) => {
  const [cartCount, setCartCount] = useState(1);

  const treats = [
    { name: 'Aatis', sub: 'Pistachio Bliss', desc: 'Rich. Nutty. Irresistible.', img: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=400' },
    { name: 'Lermi', sub: 'Chocolate Dream', desc: 'Decadent. Smooth. Heavenly.', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400' },
    { name: 'Flitre', sub: 'Berry Delight', desc: 'Fruity. Fresh. Delightful.', img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="bg-[#FAF6EF] text-[#2D241E] font-serif min-h-screen">
      {/* Top Navbar */}
      <header className="px-8 py-5 border-b border-[#E8DFC8] flex items-center justify-between sticky top-0 z-40 bg-[#FAF6EF]/90 backdrop-blur-md">
        <h1 className="font-serif text-2xl font-bold text-[#2D241E]">Coffeë</h1>

        <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-medium text-[#6B5A4E]">
          <a
            href="#coffee-home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('coffee-home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-[#2D241E] font-bold border-b-2 border-[#2D241E]"
          >
            Home
          </a>
          <a
            href="#coffee-cosset"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('coffee-cosset')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-[#2D241E] transition-colors"
          >
            Cosset
          </a>
          <a
            href="#coffee-confect"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('coffee-confect')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-[#2D241E] transition-colors"
          >
            Confect
          </a>
          <a
            href="#coffee-special"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('coffee-special')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-[#2D241E] transition-colors"
          >
            Abouts
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-[#6B5A4E]"><Search className="w-4 h-4" /></button>
          <button className="p-2 text-[#6B5A4E]"><User className="w-4 h-4" /></button>
          <button onClick={() => setCartCount(cartCount + 1)} className="relative p-2 text-[#6B5A4E]">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute top-0 right-0 bg-[#1D3528] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section id="coffee-home" className="py-16 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-sm font-sans italic text-[#A88567]">Life Happens, Coffee Helps</span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#2D241E] leading-tight">
            Sweet Moments <br />
            <span className="italic font-light text-[#8C6B52]">Start Here.</span>
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#6B5A4E] max-w-md leading-relaxed">
            Indulge in handcrafted coffee and delicious treats made to brighten your day and warm your heart.
          </p>
          <button className="bg-[#1D3528] hover:bg-[#2A4B3A] text-white text-xs font-sans uppercase tracking-widest font-bold px-8 py-3.5 rounded-full shadow-md">
            EXPLORE MORE &gt;
          </button>
        </div>

        <div className="relative rounded-full overflow-hidden border-8 border-white shadow-2xl aspect-square max-w-md mx-auto">
          <img
            src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800"
            alt="Coffee with Heart Art"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3 Pastries */}
      <section id="coffee-cosset" className="py-16 px-8 max-w-7xl mx-auto border-t border-[#E8DFC8]">
        <div id="coffee-confect" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {treats.map((t, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition-all border border-[#E8DFC8] space-y-3">
              <div className="aspect-square rounded-2xl overflow-hidden mb-3">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#2D241E]">{t.name}</h3>
              <p className="text-xs font-sans italic text-[#A88567]">{t.sub}</p>
              <p className="text-xs font-sans text-[#6B5A4E]">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Müil Coffee */}
      <section id="coffee-special" className="py-16 px-8 bg-[#1D3528] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D4C2B0] font-sans">Our Special</span>
            <h2 className="text-3xl font-serif">Müil Coffee</h2>
            <p className="text-xs font-sans text-[#D4C2B0] max-w-md leading-relaxed">
              A perfect blend of bold flavors and smooth taste, crafted to give you a moment of pure bliss.
            </p>
            <div className="space-y-2 text-xs font-sans pt-2">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D4C2B0]" /> 100% Arabica Beans</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D4C2B0]" /> Medium Dark Roast</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#D4C2B0]" /> Rich Aroma & Smooth Finish</div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-video">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" alt="Müil Coffee" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-[#E8DFC8] text-xs font-sans text-[#6B5A4E] flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2026 Coffeë. All rights reserved.</p>
        <button onClick={onContactClick} className="text-[#1D3528] font-bold uppercase underline">
          Customize This Design →
        </button>
      </footer>
    </div>
  );
};
