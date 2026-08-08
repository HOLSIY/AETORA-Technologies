import React, { useState } from 'react';
import { ShoppingCart, MapPin, Phone, Mail, Check, Pizza, Flame } from 'lucide-react';

interface SliceProps {
  onContactClick?: () => void;
}

export const SlicePizzeriaRecreation: React.FC<SliceProps> = ({ onContactClick }) => {
  const [cart, setCart] = useState<string[]>([]);
  const [selectedBase, setSelectedBase] = useState('Thin Crust');
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['Mozzarella', 'Pepperoni']);

  const bestsellers = [
    { name: 'Pepperoni Perfection', price: '$1.99', desc: 'Loaded with double crispy pepperoni & oregano', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Veggie Delight', price: '$2.99', desc: 'Bell peppers, red onions, mushrooms & olives', img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=400' },
    { name: 'Meat Lovers', price: '$2.99', desc: 'Sausage, pepperoni, bacon & ham', img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=400' },
    { name: 'BBQ Chicken', price: '$4.99', desc: 'Smoked chicken, red onion & BBQ drizzle', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400' },
  ];

  const toppingsList = ['Mozzarella', 'Pepperoni', 'Sausage', 'Mushrooms', 'Jalapeños', 'Extra Cheese'];

  const toggleTopping = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== topping));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  return (
    <div className="bg-[#5C1418] text-white font-sans min-h-screen">
      {/* Navbar */}
      <header className="bg-[#420D10] px-8 py-4 border-b border-[#731B20] sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#E65100] rounded-xl text-white"><Pizza className="w-6 h-6" /></div>
          <div>
            <h1 className="font-extrabold text-2xl tracking-wider text-white">SLICE</h1>
            <span className="text-[10px] tracking-widest text-[#FFA726] uppercase font-bold block">PIZZERIA</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-[#FFCC80]">
          <a
            href="#slice-home"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('slice-home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-white"
          >
            Home
          </a>
          <a
            href="#slice-menu"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('slice-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-white transition-colors"
          >
            Menu
          </a>
          <a
            href="#slice-builder"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('slice-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-white transition-colors"
          >
            Build Pizza
          </a>
          <a
            href="#slice-contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('slice-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-white transition-colors"
          >
            Locations & Contact
          </a>
        </nav>

        <button
          onClick={() => setCart([...cart, 'Custom Order'])}
          className="bg-[#E65100] hover:bg-[#F57C00] text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-md"
        >
          <ShoppingCart className="w-4 h-4" /> Order Online ({cart.length})
        </button>
      </header>

      {/* Hero Banner */}
      <section id="slice-home" className="relative py-20 px-8 bg-cover bg-center border-b border-[#731B20]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1600')` }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="bg-[#E65100] text-white text-[10px] uppercase font-bold px-4 py-1.5 rounded-full tracking-widest inline-block">
            AUTHENTIC BRICK OVEN PIZZA
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white uppercase tracking-tight leading-none">
            HANDCRAFTED PIZZA, <br />
            <span className="text-[#FFA726]">MADE WITH PASSION</span>
          </h1>
          <a
            href="#slice-menu"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('slice-menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="inline-block bg-[#E65100] hover:bg-[#F57C00] text-white font-extrabold text-xs uppercase px-8 py-3.5 rounded-lg shadow-xl"
          >
            VIEW MENU & ORDER NOW
          </a>
        </div>
      </section>

      {/* Bestsellers */}
      <section id="slice-menu" className="py-16 px-8 max-w-7xl mx-auto space-y-8">
        <h2 className="text-center text-2xl font-black uppercase tracking-widest text-[#FFA726]">
          OUR BESTSELLERS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((item, i) => (
            <div key={i} className="bg-white text-gray-900 rounded-2xl p-4 shadow-xl border border-gray-200 flex flex-col justify-between">
              <div>
                <div className="aspect-square rounded-xl overflow-hidden mb-3">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-base">{item.name}</h3>
                <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t flex items-center justify-between">
                <span className="font-black text-lg text-[#E65100]">{item.price}</span>
                <button
                  onClick={() => setCart([...cart, item.name])}
                  className="bg-[#E65100] hover:bg-[#F57C00] text-white font-bold text-xs uppercase px-4 py-2 rounded-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Build Your Own Pizza */}
      <section id="slice-builder" className="py-16 px-8 bg-[#FAF6EE] text-gray-900 border-y border-[#E8DFC8]">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black uppercase text-[#5C1418]">BUILD YOUR OWN PIZZA</h2>
            <p className="text-xs text-gray-600">Step-by-step interactive interface to create your custom pizza</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase text-[#E65100]">1. Select Pizza Base</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Thin Crust', 'Deep Dish', 'Stuffed Crust', 'Gluten Free'].map((base) => (
                  <button
                    key={base}
                    onClick={() => setSelectedBase(base)}
                    className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                      selectedBase === base ? 'border-[#E65100] bg-[#FFF3E0] text-[#E65100]' : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    {base}
                  </button>
                ))}
              </div>

              <h3 className="font-bold text-sm uppercase text-[#E65100] pt-4">2. Choose Toppings</h3>
              <div className="grid grid-cols-2 gap-2">
                {toppingsList.map((topping) => (
                  <button
                    key={topping}
                    onClick={() => toggleTopping(topping)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                      selectedToppings.includes(topping) ? 'border-[#E65100] bg-[#E65100] text-white' : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    <span>{topping}</span>
                    {selectedToppings.includes(topping) && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#5C1418] text-white p-6 rounded-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-[#731B20] pb-3">
                  <Flame className="w-5 h-5 text-[#FFA726]" />
                  <h4 className="font-bold text-base">Your Custom Pizza Summary</h4>
                </div>

                <div className="text-xs space-y-2 text-[#FFCC80]">
                  <p><span className="text-white font-bold">Base:</span> {selectedBase}</p>
                  <p><span className="text-white font-bold">Toppings:</span> {selectedToppings.join(', ') || 'None'}</p>
                  <p><span className="text-white font-bold">Baking Style:</span> Wood Fired Brick Oven</p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#731B20] space-y-3">
                <div className="flex justify-between items-center text-lg font-black text-white">
                  <span>Price:</span>
                  <span className="text-[#FFA726]">$12.99</span>
                </div>
                <button
                  onClick={() => setCart([...cart, `Custom ${selectedBase}`])}
                  className="w-full bg-[#E65100] hover:bg-[#F57C00] text-white font-extrabold text-xs uppercase py-3 rounded-xl shadow-lg"
                >
                  Order Custom Pizza
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="slice-contact" className="bg-[#420D10] text-gray-400 py-10 px-8 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-bold text-base text-white">SLICE PIZZERIA</h3>
            <p className="text-[11px]">Handcrafted Pizza, Made with Passion.</p>
          </div>
          <button onClick={onContactClick} className="text-[#FFA726] font-bold uppercase underline">
            Customize This Pizzeria Website →
          </button>
        </div>
      </footer>
    </div>
  );
};
