import React, { useState } from 'react';
import { HeartPulse, Phone, Calendar, Clock, User, ShieldAlert, Award, Stethoscope, Search, CheckCircle, MapPin, ChevronRight, Activity, ArrowRight } from 'lucide-react';

interface StarlightHospitalProps {
  onContactClick?: () => void;
}

export const StarlightMedicalRecreation: React.FC<StarlightHospitalProps> = ({ onContactClick }) => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [doctorSelect, setDoctorSelect] = useState('Dr. Sarah Jenkins (Cardiology)');
  const [appointmentDate, setAppointmentDate] = useState('2026-08-05');

  const doctors = [
    {
      name: 'Dr. Sarah Jenkins',
      specialty: 'Cardiology',
      dept: 'Cardiology',
      exp: '14+ Years Exp.',
      rating: '4.9 ★',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Dr. Marcus Vance',
      specialty: 'Neurology & Brain Surgery',
      dept: 'Neurology',
      exp: '18+ Years Exp.',
      rating: '5.0 ★',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Dr. Elena Rostova',
      specialty: 'Pediatrics & Child Health',
      dept: 'Pediatrics',
      exp: '12+ Years Exp.',
      rating: '4.9 ★',
      img: 'https://images.unsplash.com/photo-1594824813566-7885a6a21fb8?auto=format&fit=crop&q=80&w=400',
    },
    {
      name: 'Dr. Arthur Pendelton',
      specialty: 'Orthopedics & Joint Care',
      dept: 'Orthopedics',
      exp: '16+ Years Exp.',
      rating: '4.8 ★',
      img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const filteredDoctors = selectedDept === 'All' ? doctors : doctors.filter(d => d.dept === selectedDept);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;
    setBookedSuccess(true);
  };

  return (
    <div className="bg-[#F4F8FA] text-[#1E293B] font-sans min-h-screen">
      
      {/* Emergency Top Banner */}
      <div className="bg-[#0F172A] text-white px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-rose-400 font-bold">
          <ShieldAlert className="w-4 h-4 animate-pulse" />
          <span>24/7 EMERGENCY & TRAUMA HOTLINE:</span>
          <a href="tel:+18009997827" className="text-white underline hover:text-sky-300 font-mono">+1 (800) 999-STAR</a>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-slate-300">
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-sky-400" /> 500 Starlight Medical Plaza, NY</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-400" /> ER Open 24 Hours</span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white px-6 py-4 shadow-sm border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-sky-600 text-white rounded-2xl shadow-md">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-xl text-slate-900 tracking-tight">Starlight Medical</h1>
            <span className="text-[10px] text-sky-600 font-bold uppercase tracking-widest block">Advanced Healthcare & Research</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
          <a
            href="#starlight-overview"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('starlight-overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-sky-600 border-b-2 border-sky-600 pb-1"
          >
            Overview
          </a>
          <a
            href="#starlight-doctors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('starlight-doctors')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-sky-600 transition-colors"
          >
            Departments
          </a>
          <a
            href="#starlight-doctors"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('starlight-doctors')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-sky-600 transition-colors"
          >
            Doctors Directory
          </a>
          <a
            href="#starlight-appointment"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('starlight-appointment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-sky-600 transition-colors"
          >
            Book Appointment
          </a>
        </nav>

        <button
          onClick={onContactClick}
          className="bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" /> Book Consultation
        </button>
      </header>

      {/* Hero Section */}
      <section id="starlight-overview" className="relative py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase px-4 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-sky-600" /> Ranked #1 Hospital for Patient Care 2026
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-slate-900 leading-tight">
            Excellence in <br />
            <span className="text-sky-600 italic">Compassionate</span> Care.
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
            Starlight Medical Center brings together world-class specialists, cutting-edge surgical technology, and compassionate care to deliver outstanding medical outcomes for patients worldwide.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            <div>
              <span className="text-2xl font-serif font-bold text-slate-900 block">450+</span>
              <span className="text-[11px] text-slate-500 font-medium uppercase">Board Certified Doctors</span>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-sky-600 block">99.4%</span>
              <span className="text-[11px] text-slate-500 font-medium uppercase">Patient Satisfaction</span>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-emerald-600 block">24/7</span>
              <span className="text-[11px] text-slate-500 font-medium uppercase">Emergency Response</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
              alt="Starlight Hospital Center"
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl">
                  <Activity className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Immediate Appointment Availability</h4>
                  <span className="text-[10px] text-slate-500">Same-Day Specialist Consultations</span>
                </div>
              </div>
              <a
                href="#starlight-appointment"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('starlight-appointment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="text-sky-600 font-bold text-xs flex items-center gap-1 hover:underline"
              >
                Book <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Directory Section */}
      <section id="starlight-doctors" className="py-16 px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-1">Meet Our Specialists</span>
              <h2 className="text-3xl font-serif font-bold text-slate-900">World-Class Doctor Directory</h2>
            </div>

            <div id="starlight-departments" className="flex items-center gap-2 overflow-x-auto pb-2">
              {['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics'].map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-all ${
                    selectedDept === dept
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doc, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
                <div className="h-56 overflow-hidden bg-slate-200 relative">
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 font-bold text-xs px-2.5 py-1 rounded-full shadow">
                    {doc.rating}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-600">{doc.specialty}</span>
                    <h3 className="font-serif font-bold text-base text-slate-900">{doc.name}</h3>
                    <span className="text-[11px] text-slate-500 block">{doc.exp}</span>
                  </div>

                  <a
                    href="#starlight-appointment"
                    onClick={(e) => {
                      e.preventDefault();
                      setDoctorSelect(`${doc.name} (${doc.specialty})`);
                      document.getElementById('starlight-appointment')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="block text-center w-full bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold uppercase py-2.5 rounded-xl transition-colors"
                  >
                    Select Doctor
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment Booking Portal */}
      <section id="starlight-appointment" className="py-16 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block">Online Patient Portal</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Schedule Your Specialist Appointment</h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">Select your preferred physician, appointment date, and personal details for instant confirmation.</p>
          </div>

          {bookedSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-8 rounded-2xl text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif font-bold text-xl">Appointment Reserved Successfully!</h3>
              <p className="text-xs text-emerald-700">
                Thank you, <span className="font-bold">{patientName}</span>. Your appointment with <span className="font-bold">{doctorSelect}</span> on <span className="font-bold">{appointmentDate}</span> is confirmed. A SMS reminder has been sent.
              </p>
              <button
                onClick={() => setBookedSuccess(false)}
                className="bg-emerald-600 text-white text-xs font-bold uppercase px-6 py-2.5 rounded-xl"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleBook} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Select Specialist Doctor</label>
                  <select
                    value={doctorSelect}
                    onChange={(e) => setDoctorSelect(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-600"
                  >
                    {doctors.map((d, i) => (
                      <option key={i} value={`${d.name} (${d.specialty})`}>{d.name} — {d.specialty}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-sky-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-all"
              >
                Confirm Medical Appointment
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6 text-xs text-center border-t border-slate-800">
        <p>© 2026 Starlight Medical Center. Engineered by AETORA Technologies.</p>
      </footer>

    </div>
  );
};
