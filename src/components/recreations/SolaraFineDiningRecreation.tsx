import React, { useState } from 'react';
import { Star, Search, ShoppingBag, User, Calendar, Clock, ChevronRight, Check } from 'lucide-react';

interface SolaraProps {
  onContactClick?: () => void;
}

export const SolaraFineDiningRecreation: React.FC<SolaraProps> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [reservationOpen, setReservationOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [reservedSuccess, setReservedSuccess] = useState(false);

  const signatureDishes = [
    {
      id: 1,
      title: 'Pan-Seared Scallops',
      category: 'STARTERS',
      price: '$48',
      rating: '5★',
      img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600',
      desc: 'Cauliflower purée, brown butter drizzle & micro greens',
    },
    {
      id: 2,
      title: 'A5 Wagyu Ribeye',
      category: 'MAIN COURSE',
      price: '$130',
      rating: '5★',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
      desc: 'Japanese A5 Wagyu, truffle reduction & roasted garlic',
    },
    {
      id: 3,
      title: 'Lobster Risotto',
      category: 'MAIN COURSE',
      price: '$65',
      rating: '4.9★',
      img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
      desc: 'Maine lobster tail, saffron carnaroli rice & herbs',
    },
    {
      id: 4,
      title: 'Artisan Pasta with truffles',
      category: 'MAIN COURSE',
      price: '$55',
      rating: '4.8★',
      img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
      desc: 'Handmade tagliolini, fresh black truffle & Parmigiano',
    },
  ];

  const categories = [
    { name: 'STARTERS', item: 'Burrata Salad', img: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb12735?auto=format&fit=crop&q=80&w=300' },
    { name: 'MAIN COURSE', item: 'Ribeye', img: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=300' },
    { name: 'DESSERTS', item: 'Chocolate Dome', img: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=300' },
    { name: 'FINE WINES', item: 'Bordeaux', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=300' },
    { name: 'COCKTAILS', item: 'Gin Tonic', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=300' },
    { name: 'CHEF SPECIALS', item: "Chef's Table", img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=300' },
  ];

  return (
    <div className="bg-[#FAF6EE] text-[#2C221E] font-serif min-h-screen">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#FAF6EE]/90 backdrop-blur-md border-b border-[#E8DFC8]/60 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3A2D27] flex items-center justify-center text-[#D4B572] font-semibold text-lg shadow-sm">
              S
            </div>
            <div>
              <span className="tracking-widest text-lg font-bold block text-[#2C221E] font-serif">SOLARA</span>
              <span className="text-[10px] tracking-[0.2em] text-[#8C7A6B] uppercase block">Fine Dining</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-widest uppercase font-medium text-[#5E4E42]">
            <a
              href="#solara-home"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('solara-home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-[#9B7A38] transition-colors font-semibold text-[#2C221E]"
            >
              Home
            </a>
            <a
              href="#solara-menu"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('solara-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-[#9B7A38] transition-colors"
            >
              Menu
            </a>
            <a
              href="#solara-experience"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('solara-experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-[#9B7A38] transition-colors"
            >
              Experience
            </a>
            <a
              href="#solara-gallery"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('solara-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-[#9B7A38] transition-colors"
            >
              Gallery
            </a>
            <a
              href="#solara-experience"
              onClick={(e) => {
                e.preventDefault();
                setReservationOpen(true);
              }}
              className="hover:text-[#9B7A38] transition-colors"
            >
              Reservations
            </a>
            <a
              href="#solara-contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('solara-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-[#9B7A38] transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-[#5E4E42] hover:text-[#9B7A38] transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <div className="relative">
              <button className="p-2 text-[#5E4E42] hover:text-[#9B7A38] transition-colors">
                <ShoppingBag className="w-4 h-4" />
              </button>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#9B7A38] text-white text-[9px] font-sans rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <button
              onClick={() => setReservationOpen(true)}
              className="bg-gradient-to-r from-[#D4B572] via-[#B8964E] to-[#9B7A38] hover:opacity-95 text-white text-xs font-sans font-semibold tracking-wider uppercase px-5 py-2.5 rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="solara-home" className="relative min-h-[85vh] flex items-center justify-center px-6 py-20 bg-[#2C221E] text-[#FAF6EE] overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2000"
            alt="Solara Fine Dining Table"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C221E] via-[#2C221E]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-block text-xs font-sans tracking-[0.3em] uppercase text-[#D4B572] font-semibold bg-[#2C221E]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D4B572]/30">
            A Michelin-Starred Culinary Sanctuary
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-white leading-tight">
            WHERE CULINARY ART <br />
            <span className="italic font-light text-[#E8DFC8]">MEETS LUXURY</span>
          </h1>

          <p className="text-sm sm:text-base text-[#D4C5B0] font-sans font-light max-w-2xl mx-auto leading-relaxed">
            Experience an unparalleled journey of flavor in an environment of exquisite elegance, masterfully curated by Chef Antoine Solara.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#solara-menu"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('solara-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="bg-[#FAF6EE] hover:bg-white text-[#2C221E] text-xs font-sans font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full shadow-lg transition-all"
            >
              Explore Menu
            </a>
            <button
              onClick={() => setReservationOpen(true)}
              className="bg-gradient-to-r from-[#D4B572] to-[#9B7A38] text-white text-xs font-sans font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full shadow-lg hover:brightness-110 transition-all border border-[#D4B572]/40"
            >
              Book Experience
            </button>
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section id="solara-menu" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif tracking-widest uppercase text-[#2C221E] font-semibold">
            SIGNATURE DISHES
          </h2>
          <div className="w-12 h-0.5 bg-[#D4B572] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureDishes.map((dish) => (
            <div
              key={dish.id}
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8DFC8]/60 relative flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#FAF6EE]">
                <img
                  src={dish.img}
                  alt={dish.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#2C221E]/90 text-[#D4B572] font-sans font-bold text-xs px-3 py-1 rounded-full shadow-md">
                  {dish.price}
                </span>
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#2C221E] font-sans font-semibold text-[11px] px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#D4B572] text-[#D4B572]" /> {dish.rating}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#2C221E] group-hover:text-[#9B7A38] transition-colors">
                  {dish.title}
                </h3>
                <p className="text-xs text-[#7A6B5D] font-sans line-clamp-2 leading-relaxed">
                  {dish.desc}
                </p>
              </div>

              <button
                onClick={() => setCartCount((prev) => prev + 1)}
                className="mt-4 w-full bg-[#FAF6EE] hover:bg-[#2C221E] hover:text-[#D4B572] text-[#2C221E] text-xs font-sans font-semibold tracking-wider uppercase py-2.5 rounded-lg border border-[#E8DFC8] transition-colors flex items-center justify-center gap-2"
              >
                Order Dish
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Menu Categories */}
      <section className="py-16 bg-[#F4EFE6] px-6 border-y border-[#E8DFC8]/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif tracking-widest uppercase text-[#2C221E] font-semibold">
              CURATED MENU CATEGORIES
            </h2>
            <p className="text-xs font-sans text-[#8C7A6B] uppercase tracking-widest">
              Select a category to view bespoke seasonal creations
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex flex-col items-center group text-center transition-transform hover:-translate-y-1 ${
                  activeCategory === cat.name ? 'scale-105' : ''
                }`}
              >
                <div className={`w-24 h-24 rounded-full overflow-hidden border-2 p-1 transition-all ${
                  activeCategory === cat.name ? 'border-[#9B7A38] shadow-lg' : 'border-[#E8DFC8] group-hover:border-[#9B7A38]'
                }`}>
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="mt-3 text-xs font-serif font-bold tracking-widest text-[#2C221E] uppercase">
                  {cat.name}
                </span>
                <span className="text-[10px] text-[#8C7A6B] font-sans">{cat.item}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dining Experience */}
      <section id="solara-experience" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" id="solara-gallery">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
              alt="Solara Dining Room"
              className="rounded-2xl shadow-md aspect-[3/4] object-cover"
            />
            <div className="space-y-4 pt-8">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=600"
                alt="Chef Plating"
                className="rounded-2xl shadow-md aspect-square object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80&w=600"
                alt="Candlelight atmosphere"
                className="rounded-2xl shadow-md aspect-square object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 md:pl-6">
            <span className="text-xs font-sans tracking-[0.25em] text-[#9B7A38] font-bold uppercase block">
              THE SOLARA ESSENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#2C221E] leading-tight">
              PRIVATE DINING & <br />
              <span className="italic font-light">CHEF'S TABLE AVAILABLE</span>
            </h2>
            <p className="text-sm font-sans text-[#6B5C50] leading-relaxed">
              Host your memorable occasions in our intimate VIP dining salons or reserve our Exclusive Chef’s Table for a 9-course wine pairing tasting menu curated personally for your party.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
                <h4 className="font-serif font-bold text-sm text-[#2C221E]">Award-Winning Chefs</h4>
                <p className="text-[11px] font-sans text-[#8C7A6B] mt-1">3 Michelin star credentials</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#E8DFC8]">
                <h4 className="font-serif font-bold text-sm text-[#2C221E]">Fresh Ingredients</h4>
                <p className="text-[11px] font-sans text-[#8C7A6B] mt-1">Sourced farm-to-table daily</p>
              </div>
            </div>

            <button
              onClick={() => setReservationOpen(true)}
              className="bg-[#2C221E] hover:bg-[#3A2D27] text-[#D4B572] text-xs font-sans font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full shadow-md transition-all"
            >
              Book Private Event
            </button>
          </div>
        </div>

        {/* Banner CTA */}
        <div className="bg-gradient-to-r from-[#3A2D27] via-[#2C221E] to-[#1F1714] text-[#FAF6EE] p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-xl border border-[#D4B572]/20">
          <h2 className="text-2xl sm:text-4xl font-serif text-[#FAF6EE] tracking-tight">
            RESERVE YOUR LUXURY DINING <br />
            <span className="text-[#D4B572] italic font-light">EXPERIENCE TONIGHT</span>
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#C5B7A5] max-w-xl mx-auto">
            Limited seatings available daily to preserve our uncompromising standard of culinary perfection.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => setReservationOpen(true)}
              className="bg-gradient-to-r from-[#D4B572] to-[#9B7A38] text-white text-xs font-sans font-bold tracking-widest uppercase px-8 py-3.5 rounded-full shadow-lg hover:brightness-110 transition-all"
            >
              BOOK NOW
            </button>
            {onContactClick && (
              <button
                onClick={onContactClick}
                className="border border-[#D4B572]/60 text-[#D4B572] hover:bg-[#D4B572]/10 text-xs font-sans font-bold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all"
              >
                Inquire Developer
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="solara-contact" className="bg-[#1F1714] text-[#C5B7A5] font-sans text-xs py-12 px-6 border-t border-[#3A2D27]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-white tracking-widest">SOLARA</h3>
            <p className="text-[11px] text-[#9E8E80] leading-relaxed">
              Exquisite Michelin-grade fine dining where traditional craftsmanship meets modern luxury.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Opening Hours</h4>
            <p className="text-[11px] text-[#9E8E80]">Mon - Fri: 5:00 PM - 11:00 PM</p>
            <p className="text-[11px] text-[#9E8E80]">Sat - Sun: 12:00 PM - 11:30 PM</p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Location & Contact</h4>
            <p className="text-[11px] text-[#9E8E80]">742 Fifth Avenue, New York, NY</p>
            <p className="text-[11px] text-[#9E8E80]">+1 (212) 555-0199</p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Customized By</h4>
            <p className="text-[11px] text-[#9E8E80]">Designed & Built by AETORA Technologies</p>
            <button
              onClick={onContactClick}
              className="mt-3 text-[11px] text-[#D4B572] hover:underline uppercase tracking-wider font-semibold"
            >
              Buy / Customize This Website →
            </button>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      {reservationOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF6EE] text-[#2C221E] max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#E8DFC8] space-y-5 relative">
            <button
              onClick={() => { setReservationOpen(false); setReservedSuccess(false); }}
              className="absolute top-4 right-4 text-[#8C7A6B] hover:text-[#2C221E] text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="font-serif text-2xl font-bold text-center text-[#2C221E]">
              Reserve Your Table
            </h3>

            {reservedSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-[#9B7A38] text-white rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl font-bold">Reservation Confirmed!</h4>
                <p className="text-xs text-[#6B5C50]">We have reserved your table. A confirmation email has been sent.</p>
                <button
                  onClick={() => { setReservationOpen(false); setReservedSuccess(false); }}
                  className="bg-[#2C221E] text-[#D4B572] text-xs uppercase font-bold px-6 py-2.5 rounded-full"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setReservedSuccess(true); }}
                className="space-y-4 font-sans text-xs"
              >
                <div>
                  <label className="block text-[#5E4E42] font-semibold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full bg-white border border-[#E8DFC8] rounded-xl px-4 py-2.5 outline-none focus:border-[#9B7A38]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#5E4E42] font-semibold mb-1">Date</label>
                    <input
                      type="date"
                      required
                      className="w-full bg-white border border-[#E8DFC8] rounded-xl px-3 py-2.5 outline-none focus:border-[#9B7A38]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#5E4E42] font-semibold mb-1">Guests</label>
                    <select className="w-full bg-white border border-[#E8DFC8] rounded-xl px-3 py-2.5 outline-none focus:border-[#9B7A38]">
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests</option>
                      <option>8+ VIP Event</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[#5E4E42] font-semibold mb-1">Special Requests</label>
                  <textarea
                    rows={2}
                    placeholder="Dietary requirements or celebration notes..."
                    className="w-full bg-white border border-[#E8DFC8] rounded-xl px-4 py-2 outline-none focus:border-[#9B7A38]"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4B572] to-[#9B7A38] text-white font-bold py-3 rounded-xl uppercase tracking-wider shadow-md hover:brightness-105"
                >
                  Confirm Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
