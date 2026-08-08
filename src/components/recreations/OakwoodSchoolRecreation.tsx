import React, { useState } from 'react';
import { WebsiteProject, GalleryScreenshot } from '../../types';
import { ProjectGalleryLightbox } from '../ProjectGalleryLightbox';
import { GraduationCap, BookOpen, Users, Award, Calendar, CheckCircle, FileText, Globe, Sparkles, MapPin, Phone, Mail, Image as ImageIcon } from 'lucide-react';

export const defaultOakwoodScreenshots: GalleryScreenshot[] = [
  {
    id: 'oakwood-scr-1',
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    title: 'Home Page',
    caption: 'Oakwood International School main landing page featuring inspirational hero banner and acceptance metrics.',
  },
  {
    id: 'oakwood-scr-2',
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    title: 'About & Campus Overview',
    caption: 'Detailed campus overview, faculty directory, and IB World School accreditation details.',
  },
  {
    id: 'oakwood-scr-3',
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200',
    title: 'Admissions Portal',
    caption: 'Interactive student admission application form and admissions guidance workflow.',
  },
  {
    id: 'oakwood-scr-4',
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200',
    title: 'Academics & Curriculum',
    caption: 'IB & AP Diploma course breakdown, STEM robotics lab highlights, and grade pathways.',
  },
  {
    id: 'oakwood-scr-5',
    url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200',
    title: 'Student & Parent Portal',
    caption: 'Interactive student dashboard with attendance records, gradebook, and class schedule.',
  },
  {
    id: 'oakwood-scr-6',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200',
    title: 'News & Events',
    caption: 'Campus news feed, STEM robotics awards, and upcoming athletic galas calendar.',
  },
  {
    id: 'oakwood-scr-7',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200',
    title: 'Contact & Campus Tour',
    caption: 'Interactive campus map, tour scheduling calendar, and contact inquiry form.',
  },
];

interface OakwoodSchoolProps {
  project?: WebsiteProject;
  onContactClick?: () => void;
}

export const OakwoodSchoolRecreation: React.FC<OakwoodSchoolProps> = ({ project, onContactClick }) => {
  const [activeTab, setActiveTab] = useState<'academics' | 'admissions' | 'news'>('academics');
  const [submittedAdmission, setSubmittedAdmission] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [gradeSelect, setGradeSelect] = useState('High School (Grades 9-12)');

  const handleSubmitAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setSubmittedAdmission(true);
  };

  const newsItems = [
    {
      title: 'Oakwood STEM Robotics Team Wins National Championship 2026',
      date: 'July 15, 2026',
      category: 'STEM Excellence',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Annual Arts & Musical Performance Gala Scheduled for August',
      date: 'July 22, 2026',
      category: 'Arts & Music',
      img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Oakwood Alumnus Accepted to Top Ivy League Universities',
      date: 'June 30, 2026',
      category: 'Academics',
      img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
    },
  ];

  return (
    <div className="bg-[#FAF8F5] text-[#1F2937] font-sans min-h-screen">
      
      {/* Top Admissions Alert */}
      <div className="bg-[#1E3A8A] text-white px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-4 font-medium">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span>ADMISSIONS 2026-2027 NOW OPEN: Limited Seats for Kindergarten through Grade 12</span>
        </div>
        <a
          href="#oakwood-admissions"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('oakwood-admissions')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-3 py-1 rounded-lg text-[11px] uppercase tracking-wider transition-colors"
        >
          Apply Online
        </a>
      </div>

      {/* Main School Header */}
      <header className="bg-white px-8 py-4 border-b border-slate-200 shadow-sm sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#1E3A8A] text-white rounded-2xl shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-xl text-[#1E3A8A] tracking-tight">Oakwood International</h1>
            <span className="text-[10px] text-amber-600 font-bold uppercase tracking-widest block">Academy & Preparatory School</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
          <a
            href="#oakwood-overview"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('oakwood-overview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-[#1E3A8A] border-b-2 border-[#1E3A8A] pb-1 hover:text-[#1E3A8A] transition-colors"
          >
            Academy
          </a>
          <a
            href="#oakwood-curriculum"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('oakwood-curriculum')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-[#1E3A8A] transition-colors"
          >
            Curriculum
          </a>
          <a
            href="#oakwood-admissions"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('oakwood-admissions')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-[#1E3A8A] transition-colors"
          >
            Admissions
          </a>
          <a
            href="#oakwood-news"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('oakwood-news')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hover:text-[#1E3A8A] transition-colors"
          >
            Campus News
          </a>
        </nav>

        <button
          onClick={onContactClick}
          className="bg-[#1E3A8A] hover:bg-blue-900 text-white text-xs font-bold uppercase px-5 py-2.5 rounded-xl shadow transition-all"
        >
          Book Campus Tour
        </button>
      </header>

      {/* Hero Section */}
      <section id="oakwood-overview" className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase px-4 py-1.5 rounded-full">
            <Award className="w-4 h-4 text-[#1E3A8A]" /> Accredited IB World School & STEM Center
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-slate-900 leading-tight">
            Nurturing Tomorrow's <br />
            <span className="text-[#1E3A8A] italic">Global Leaders</span>.
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
            Oakwood International School combines rigorous academic standards, advanced STEM research laboratories, creative arts, and global exchange programs to empower students to reach their highest potential.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 text-center sm:text-left">
            <div>
              <span className="text-2xl font-serif font-bold text-[#1E3A8A] block">100%</span>
              <span className="text-[11px] text-slate-500 font-bold uppercase">University Acceptance</span>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-amber-600 block">12:1</span>
              <span className="text-[11px] text-slate-500 font-bold uppercase">Student-Teacher Ratio</span>
            </div>
            <div>
              <span className="text-2xl font-serif font-bold text-emerald-600 block">28+</span>
              <span className="text-[11px] text-slate-500 font-bold uppercase">AP & IB Courses</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
              alt="Oakwood Campus"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Curriculum & Academics */}
      <section id="oakwood-curriculum" className="py-16 px-6 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest block">ACADEMIC EXCELLENCE</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Comprehensive Educational Pathway</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 hover:shadow-lg transition-all">
              <div className="p-3 bg-blue-100 text-[#1E3A8A] w-fit rounded-2xl">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Primary Academy (K-5)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Focusing on inquiry-based learning, foundational literacy, mathematics, music, and social-emotional growth in a nurturing atmosphere.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 hover:shadow-lg transition-all">
              <div className="p-3 bg-amber-100 text-amber-800 w-fit rounded-2xl">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">Middle School (6-8)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fostering critical thinking, STEM robotics labs, foreign language immersion, interdisciplinary project learning, and sports leagues.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4 hover:shadow-lg transition-all">
              <div className="p-3 bg-emerald-100 text-emerald-800 w-fit rounded-2xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-xl text-slate-900">High Preparatory (9-12)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advanced Placement (AP) diploma, IB diploma curriculum, college admissions counselling, leadership summits, and global internships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Online Admissions Application Form */}
      <section id="oakwood-admissions" className="py-16 px-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest block">ONLINE ADMISSIONS PORTAL</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Apply for Student Admission</h2>
            <p className="text-xs text-slate-500 max-w-lg mx-auto">Complete the preliminary online application to begin the admissions review process.</p>
          </div>

          {submittedAdmission ? (
            <div className="bg-blue-50 border border-blue-200 text-blue-900 p-8 rounded-2xl text-center space-y-4">
              <CheckCircle className="w-12 h-12 text-[#1E3A8A] mx-auto" />
              <h3 className="font-serif font-bold text-xl">Admissions Application Received!</h3>
              <p className="text-xs text-blue-800">
                Thank you! Application for <span className="font-bold">{studentName}</span> for <span className="font-bold">{gradeSelect}</span> has been logged. Our admissions officer will email you next steps within 24 hours.
              </p>
              <button
                onClick={() => setSubmittedAdmission(false)}
                className="bg-[#1E3A8A] text-white text-xs font-bold uppercase px-6 py-2.5 rounded-xl"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitAdmission} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samantha Miller"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Parent / Guardian Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="parent@example.com"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Grade Level Applying For</label>
                <select
                  value={gradeSelect}
                  onChange={(e) => setGradeSelect(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:outline-none focus:border-[#1E3A8A]"
                >
                  <option value="Kindergarten & Early Years">Kindergarten & Early Years</option>
                  <option value="Primary School (Grades 1-5)">Primary School (Grades 1-5)</option>
                  <option value="Middle School (Grades 6-8)">Middle School (Grades 6-8)</option>
                  <option value="High School (Grades 9-12)">High School (Grades 9-12)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold py-4 rounded-xl uppercase tracking-wider text-xs shadow-lg transition-all"
              >
                Submit Student Admissions Form
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Campus News Section */}
      <section id="oakwood-news" className="py-16 px-6 bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest block">LATEST UPDATES</span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">Campus News & Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((news, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="h-44 overflow-hidden">
                  <img src={news.img} alt={news.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-[#1E3A8A]">
                    <span>{news.category}</span>
                    <span className="text-slate-400 font-normal">{news.date}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">{news.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Resolution Screenshot Gallery Section */}
      <section id="oakwood-gallery" className="py-16 px-6 bg-[#121110] text-[#E8E4DF] border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block flex items-center justify-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-[#D49E6A]" /> PORTAL ARCHITECTURE & SCREENSHOT GALLERY
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">Oakwood School Portal Screenshots</h2>
            <p className="text-xs text-[#9E958C] max-w-xl mx-auto">
              Explore pixel-perfect high-resolution screenshots of the Oakwood International School Portal across Home, Admissions, Academics, Student Portal, News, and Contact modules.
            </p>
          </div>

          <ProjectGalleryLightbox
            screenshots={project?.galleryScreenshots && project.galleryScreenshots.length > 0 ? project.galleryScreenshots : defaultOakwoodScreenshots}
            rawUrls={project?.screenshotUrls && project.screenshotUrls.length > 0 ? project.screenshotUrls : defaultOakwoodScreenshots.map(s => s.url)}
            projectTitle={project?.title || 'Oakwood International School Portal'}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-6 text-xs text-center border-t border-slate-800">
        <p>© 2026 Oakwood International School. Engineered by AETORA Technologies.</p>
      </footer>

    </div>
  );
};
