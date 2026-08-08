import React, { useState } from 'react';
import { Coffee, Heart, Clock, Phone, MapPin, Globe, Check, Award, Sparkles } from 'lucide-react';

interface BrewBlissProps {
  onContactClick?: () => void;
}

export const BrewBlissCafeRecreation: React.FC<BrewBlissProps> = ({ onContactClick }) => {
  const [claimed, setClaimed] = useState(false);

  const mostLovedDrinks = [
    { name: 'Cappuccino', desc: 'Smooth, rich & perfectly balanced', price: '$3.50', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Iced Latte', desc: 'Cool, creamy & refreshing', price: '$3.75', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400' },
    { name: 'Mocha', desc: 'A perfect blend of coffee & chocolate', price: '$4.25', img: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Espresso', desc: 'Strong, bold & full of flavor', price: '$2.50', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="bg-[#EFE8DC] text-[#2B1E1A] font-serif min-h-screen">
      {/* Top Header */}
      <header className="px-8 py-5 flex items-center justify-between border-b border-[#D8CCBD]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#2B1E1A] text-[#EFE8DC] rounded-xl"><Coffee className="w-5 h-5" /></div>
          <div>
            <h1 className="font-bold text-lg text-[#2B1E1A] tracking-tight">Brew Bliss Cafe</h1>
            <span className="text-[10px] text-[#7A675B] font-sans block">Where Every Sip Tells a Story</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-semibold text-[#524137] uppercase tracking-wider">
          <a
            href="#brewbliss-home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('brewbliss-home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-[#2B1E1A] border-b-2 border-[#2B1E1A] pb-0.5"
          >
            Home
          </a>
          <a
            href="#brewbliss-menu"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('brewbliss-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-[#2B1E1A] transition-colors"
          >
            Menu
          </a>
          <a
            href="#brewbliss-about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('brewbliss-about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-[#2B1E1A] transition-colors"
          >
            About Us
          </a>
          <a
            href="#brewbliss-about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('brewbliss-about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-[#2B1E1A] transition-colors"
          >
            Offers
          </a>
          <a
            href="#brewbliss-contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('brewbliss-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-[#2B1E1A] transition-colors"
          >
            Contact
          </a>
        </nav>

        <button
          onClick={() => setClaimed(true)}
          className="bg-[#2B1E1A] hover:bg-[#3D2B25] text-[#EFE8DC] text-xs font-sans font-bold uppercase px-5 py-2.5 rounded-full shadow"
        >
          {claimed ? 'Offer Claimed ✓' : '20% OFF Offer'}
        </button>
      </header>

      {/* Hero Section */}
      <section id="brewbliss-home" className="py-12 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-4 space-y-6">
          <span className="text-sm italic font-sans text-[#8C6F5A]">Good Coffee ♡</span>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-[#2B1E1A] leading-tight">
            GREAT <br />
            <span className="font-serif italic font-normal text-[#6E4F3B]">MOOD</span>
          </h1>
          <p className="text-xs sm:text-sm font-sans text-[#524137] leading-relaxed">
            Enjoy handcrafted coffee made with love and the finest beans. Sourced sustainably from private high-altitude micro-farms.
          </p>
          <a
            href="#brewbliss-menu"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('brewbliss-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="inline-flex items-center gap-2 bg-[#2B1E1A] text-[#EFE8DC] text-xs font-sans font-bold uppercase px-7 py-3.5 rounded-full shadow hover:bg-[#3D2B25] transition-all"
          >
            VISIT US TODAY →
          </a>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D8CCBD] relative">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=800"
              alt="Brew Bliss Coffee Cup"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#2B1E1A]/90 text-[#EFE8DC] p-3 rounded-full text-center shadow-lg border border-[#D8CCBD]/40 w-20 h-20 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-[#D8CCBD]">100%</span>
              <span className="text-[8px] uppercase tracking-widest font-sans">PREMIUM QUALITY</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-[#2B1E1A] text-[#EFE8DC] p-6 rounded-3xl space-y-5 shadow-xl">
          <div className="flex items-start gap-3">
            <Coffee className="w-5 h-5 text-[#D8CCBD] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">PREMIUM BEANS</h4>
              <p className="text-[10px] text-[#A69585] font-sans mt-0.5">Sourced from the best coffee farms worldwide.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#D8CCBD] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">EXPERTLY BREWED</h4>
              <p className="text-[10px] text-[#A69585] font-sans mt-0.5">Perfectly crafted by our certified baristas.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-[#D8CCBD] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">COZY AMBIENCE</h4>
              <p className="text-[10px] text-[#A69585] font-sans mt-0.5">A warm place to relax, work, and unwind.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-[#D8CCBD] shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-white">SUSTAINABLE CHOICES</h4>
              <p className="text-[10px] text-[#A69585] font-sans mt-0.5">Eco-friendly and responsibly sourced.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Most Loved */}
      <section id="brewbliss-menu" className="py-16 px-6 bg-[#2B1E1A] text-[#EFE8DC]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center">
            <span className="text-xs font-sans tracking-widest uppercase text-[#D8CCBD] font-bold">OUR MOST LOVED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mostLovedDrinks.map((drink, i) => (
              <div key={i} className="bg-[#1F1512] rounded-2xl p-4 border border-[#3D2B25] hover:border-[#D8CCBD] transition-all flex flex-col justify-between">
                <div>
                  <div className="rounded-xl overflow-hidden aspect-square mb-3">
                    <img src={drink.img} alt={drink.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm text-white">{drink.name}</h3>
                    <Heart className="w-4 h-4 text-[#D8CCBD]" />
                  </div>
                  <p className="text-[11px] font-sans text-[#A69585] mt-1">{drink.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#3D2B25] flex justify-between items-center">
                  <span className="font-sans font-bold text-sm text-[#D8CCBD]">{drink.price}</span>
                  <button className="bg-[#2B1E1A] hover:bg-[#D8CCBD] hover:text-[#2B1E1A] text-xs font-sans font-semibold px-3 py-1 rounded-full border border-[#3D2B25] transition-colors">
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us & Weekday Offer */}
      <section id="brewbliss-about" className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-sans font-bold uppercase tracking-widest text-[#8C6F5A]">ABOUT US</span>
          <p className="text-xs font-sans text-[#524137] leading-relaxed max-w-md">
            At Brew Bliss Cafe, we believe great coffee brings people together. From bean to cup, we are passionate about quality, community, and creating memorable experiences for everyone.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <img
              src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=200"
              alt="Coffee cup takeaway"
              className="w-20 h-24 object-cover rounded-2xl shadow"
            />
            <div className="font-serif italic text-2xl font-bold text-[#2B1E1A]">
              Coffee <br />
              <span className="text-sm font-sans uppercase not-italic font-normal tracking-widest text-[#8C6F5A] block">
                MAKES EVERYTHING BETTER
              </span>
            </div>
          </div>
        </div>

        {/* Offer Box */}
        <div id="brewbliss-offers" className="bg-[#FAF5EF] p-8 rounded-3xl border border-[#D8CCBD] text-center space-y-4 shadow-lg">
          <span className="text-[10px] font-sans uppercase tracking-widest bg-[#2B1E1A] text-[#EFE8DC] px-3 py-1 rounded-full inline-block font-bold">
            WEEKDAY OFFER
          </span>
          <h3 className="text-3xl font-bold text-[#2B1E1A]">
            GET 20% OFF <br />
            <span className="italic font-light text-[#6E4F3B]">ON ALL COFFEE</span>
          </h3>
          <p className="text-xs font-sans text-[#7A675B]">Mon - Thu | 9AM - 2PM</p>
          <button
            onClick={() => setClaimed(true)}
            className="bg-[#2B1E1A] text-[#EFE8DC] font-sans text-xs font-bold uppercase px-8 py-3 rounded-full shadow hover:bg-[#3D2B25] transition-all"
          >
            {claimed ? 'COUPON CLAIMED ✓' : 'CLAIM OFFER →'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="brewbliss-contact" className="bg-[#1F1512] text-[#A69585] py-10 px-8 text-xs font-sans border-t border-[#3D2B25]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="font-serif font-bold text-lg text-white">Brew Bliss Cafe</h3>
            <p className="text-[11px] text-[#A69585]">Where Every Sip Tells a Story.</p>
          </div>
          <div className="text-center md:text-left">
            <p>+1 234 567 8900</p>
            <p>123 Coffee Street, Brew City, CA 90210</p>
            <p>www.brewblisscafe.com</p>
          </div>
          <div>
            <button
              onClick={onContactClick}
              className="text-[#D8CCBD] font-bold uppercase tracking-wider text-xs underline"
            >
              Order This Website Design →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
