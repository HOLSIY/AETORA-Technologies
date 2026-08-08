import React, { useState } from 'react';
import { Heart, Clock, Phone, MapPin, Mail, ChevronRight, Utensils, Star, Award } from 'lucide-react';

interface FlavoroProps {
  onContactClick?: () => void;
}

export const FlavoroRestaurantRecreation: React.FC<FlavoroProps> = ({ onContactClick }) => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [booked, setBooked] = useState(false);

  const popularDishes = [
    {
      id: 1,
      name: 'Creamy Alfredo Pasta',
      desc: 'White sauce pasta with herbs & parmesan',
      price: '$12.99',
      badge: 'Best Seller',
      img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 2,
      name: 'Grilled Chicken Steak',
      desc: 'Served with roasted veggies & mushroom sauce',
      price: '$15.99',
      badge: 'Chef Choice',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500',
    },
    {
      id: 3,
      name: 'Margherita Pizza',
      desc: 'Classic buffalo mozzarella & basil',
      price: '$11.99',
      badge: 'Popular',
      img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=500',
    },
    {
      id: 4,
      name: 'Chocolate Lava Cake',
      desc: 'Warm chocolate with vanilla bean ice cream',
      price: '$7.99',
      badge: 'Sweet Top',
      img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=500',
    },
  ];

  return (
    <div className="bg-[#FAF5EF] text-[#2D231E] font-sans min-h-screen">
      {/* Top Navbar */}
      <header className="bg-[#120F0D] text-white px-6 py-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="w-6 h-6 text-[#FF9E00]" />
            <span className="font-serif text-2xl font-bold tracking-tight text-white">Flavoro</span>
            <span className="text-[9px] uppercase tracking-widest text-[#FF9E00] font-bold block">RESTAURANT</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-300 uppercase tracking-wider">
            <a
              href="#flavoro-home"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('flavoro-home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-[#FF9E00]"
            >
              Home
            </a>
            <a
              href="#flavoro-about"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('flavoro-about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-[#FF9E00] transition-colors"
            >
              About Us
            </a>
            <a
              href="#flavoro-menu"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('flavoro-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-[#FF9E00] transition-colors"
            >
              Menu
            </a>
            <a
              href="#flavoro-gallery"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('flavoro-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-[#FF9E00] transition-colors"
            >
              Gallery
            </a>
            <a
              href="#flavoro-menu"
              onClick={(e) => {
                e.preventDefault();
                setBookingOpen(true);
              }}
              className="hover:text-[#FF9E00] transition-colors"
            >
              Reservations
            </a>
            <a
              href="#flavoro-blog"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('flavoro-blog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-[#FF9E00] transition-colors"
            >
              Blog
            </a>
            <a
              href="#flavoro-contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('flavoro-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-[#FF9E00] transition-colors"
            >
              Contact
            </a>
          </nav>

          <button
            onClick={() => setBookingOpen(true)}
            className="bg-[#FF9E00] hover:bg-[#E08B00] text-black text-xs font-bold uppercase px-5 py-2.5 rounded-full shadow-md flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Clock className="w-3.5 h-3.5" /> Book a Table
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="flavoro-home" className="relative bg-[#120F0D] text-white py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10">
            <span className="text-xs font-serif italic text-[#FF9E00] tracking-widest block text-lg">
              Good Food, Good Mood ♡
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold leading-tight text-white">
              Delicious Food <br />
              <span className="text-[#FF9E00] italic font-serif">Made with Love ♡</span>
            </h1>
            <p className="text-sm text-gray-300 font-light max-w-lg leading-relaxed">
              Experience the perfect blend of taste, quality and happiness in every bite. Crafted by master culinary artisans using 100% fresh organic ingredients.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#flavoro-menu"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('flavoro-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="bg-[#FF9E00] hover:bg-[#E08B00] text-black font-bold text-xs uppercase px-7 py-3.5 rounded-full transition-all shadow-md"
              >
                Explore Menu
              </a>
              <button
                onClick={() => setBookingOpen(true)}
                className="border border-white/30 hover:border-[#FF9E00] text-white hover:text-[#FF9E00] font-bold text-xs uppercase px-7 py-3.5 rounded-full transition-all"
              >
                Book a Table
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#FF9E00]" />
                <div>
                  <span className="font-bold block text-white">Fresh Ingredients</span>
                  <span className="text-[10px] text-gray-400">100% Fresh & Healthy</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#FF9E00]" />
                <div>
                  <span className="font-bold block text-white">Expert Chefs</span>
                  <span className="text-[10px] text-gray-400">10+ Years Experience</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#FF9E00]" />
                <div>
                  <span className="font-bold block text-white">Great Ambience</span>
                  <span className="text-[10px] text-gray-400">Feel Like Home</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FF9E00]/20">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
                alt="Delicious Food"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute top-6 right-6 bg-[#120F0D]/90 backdrop-blur-md p-4 rounded-2xl border border-[#FF9E00]/40 text-center shadow-lg">
                <span className="text-2xl font-black text-[#FF9E00] block">1st</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Food In Town</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="flavoro-about" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative" id="flavoro-gallery">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
                alt="Flavoro Dining"
                className="w-full h-[380px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 text-center flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FF9E00] rounded-xl flex items-center justify-center font-bold text-black text-xl">
                10+
              </div>
              <div className="text-left">
                <span className="font-bold text-sm block">Years of</span>
                <span className="text-xs text-gray-500">Experience</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-serif italic text-[#FF9E00] text-lg font-semibold block">About Us ♡</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D231E]">
              We Serve <span className="text-[#FF9E00] italic">Happiness ♡</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              At Flavoro, we believe that great food brings people together. Our chefs craft every dish with fresh ingredients and a passion for culinary perfection.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="p-2.5 bg-[#FFF4E5] text-[#FF9E00] rounded-xl"><Utensils className="w-5 h-5" /></div>
                <span className="font-bold text-xs">Fresh Ingredients</span>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="p-2.5 bg-[#FFF4E5] text-[#FF9E00] rounded-xl"><Award className="w-5 h-5" /></div>
                <span className="font-bold text-xs">Skilled Chefs</span>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="p-2.5 bg-[#FFF4E5] text-[#FF9E00] rounded-xl"><Clock className="w-5 h-5" /></div>
                <span className="font-bold text-xs">Fast & Friendly</span>
              </div>
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="p-2.5 bg-[#FFF4E5] text-[#FF9E00] rounded-xl"><Heart className="w-5 h-5" /></div>
                <span className="font-bold text-xs">Happy Customers</span>
              </div>
            </div>

            <button
              onClick={() => setBookingOpen(true)}
              className="bg-[#2D231E] text-[#FF9E00] hover:bg-black font-bold text-xs uppercase px-7 py-3.5 rounded-full transition-all"
            >
              Learn More About Us →
            </button>
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section id="flavoro-menu" className="py-20 px-6 bg-[#FFF9F2] border-y border-gray-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-serif italic text-[#FF9E00] text-lg font-semibold">Our Menu ♡</span>
            <h2 className="text-3xl font-serif font-bold text-[#2D231E]">Popular Dishes</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDishes.map((dish) => (
              <div key={dish.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="relative rounded-xl overflow-hidden mb-4 aspect-[4/3] bg-stone-100">
                    <img
                      src={dish.img}
                      alt={dish.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=800';
                      }}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-[#FF9E00] text-black font-bold text-[10px] uppercase px-2.5 py-1 rounded-full">
                      {dish.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#2D231E]">{dish.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{dish.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <span className="font-bold text-base text-[#FF9E00]">{dish.price}</span>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="w-8 h-8 rounded-full bg-[#2D231E] text-[#FF9E00] hover:bg-[#FF9E00] hover:text-black flex items-center justify-center font-bold text-sm transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reserve Table Banner & Blog */}
      <section id="flavoro-blog" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="bg-[#120F0D] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-xl border border-[#FF9E00]/20">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white">
            Book Your Table <br />
            <span className="text-[#FF9E00] italic font-serif">Reserve Your Table Now!</span>
          </h2>
          <p className="text-xs text-gray-400">Good food is better when shared with people you love.</p>
          <button
            onClick={() => setBookingOpen(true)}
            className="bg-[#FF9E00] hover:bg-[#E08B00] text-black font-bold text-xs uppercase px-8 py-3.5 rounded-full transition-all"
          >
            Book a Table
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="flavoro-contact" className="bg-[#120F0D] text-gray-400 py-12 px-6 text-xs border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-white">Flavoro RESTAURANT</h3>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              Flavoro is where taste meets passion. We serve delicious food, great vibes, and unforgettable moments.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Opening Hours</h4>
            <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
            <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
          </div>
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Contact Us</h4>
            <p>+1 234 567 8900</p>
            <p>info@flavoro.com</p>
            <p>123 Food Street, New York, USA</p>
          </div>
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Developer Inquiries</h4>
            <button
              onClick={onContactClick}
              className="text-[#FF9E00] font-bold uppercase underline text-[11px]"
            >
              Contact AETORA Technologies to Order →
            </button>
          </div>
        </div>
      </footer>

      {/* Booking Drawer Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 max-w-md w-full rounded-3xl p-6 shadow-2xl relative">
            <button
              onClick={() => { setBookingOpen(false); setBooked(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-serif font-bold text-center mb-4">Book a Table at Flavoro</h3>

            {booked ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-[#FF9E00] text-black font-bold rounded-full flex items-center justify-center mx-auto text-xl">
                  ✓
                </div>
                <h4 className="font-bold text-lg">Table Reserved!</h4>
                <p className="text-xs text-gray-600">We look forward to serving you.</p>
                <button
                  onClick={() => { setBookingOpen(false); setBooked(false); }}
                  className="bg-black text-[#FF9E00] text-xs font-bold uppercase px-6 py-2 rounded-full"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setBooked(true); }} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Full Name</label>
                  <input type="text" required placeholder="Senaf Wondimmu" className="w-full border rounded-xl p-2.5" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Date</label>
                    <input type="date" required className="w-full border rounded-xl p-2.5" />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Time</label>
                    <input type="time" required className="w-full border rounded-xl p-2.5" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-[#FF9E00] text-black font-bold py-3 rounded-xl uppercase tracking-wider">
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
