import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, ShieldCheck, CheckCircle2, Lock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    title: 'TrustLink AI',
    subtitle: 'Ministry of Tribal Affairs (MoTA) Scholarship & Verification Platform',
    text: 'Next-generation AI document verification & direct benefit transfer (DBT) system built to serve Scheduled Tribe (ST) students with 100% transparency.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    primaryCta: { text: 'Apply For ST Scholarship', path: '/apply' },
    secondaryCta: { text: 'Explore All Schemes', path: '/schemes' },
    badge: 'Official MoTA AI Portal'
  },
  {
    id: 2,
    title: 'Instant AI Document Verification',
    subtitle: 'Eliminate Verification Delays from 45 Days to Under 4 Days',
    text: 'Optical Character Recognition (OCR) automatically verifies ST Caste Certificates, Income Proofs & Marksheets against government database rules.',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=80',
    primaryCta: { text: 'Test AI OCR Verification', path: '/apply' },
    secondaryCta: { text: 'How AI Verification Works', path: '/how-it-works' },
    badge: '99.4% Automated Accuracy'
  },
  {
    id: 3,
    title: 'Direct Benefit Transfer (DBT) Integration',
    subtitle: 'Seamless Financial Aid directly into Aadhaar-Seeded Bank Accounts',
    text: 'Integrated with Public Financial Management System (PFMS) for automated sanction orders, transparent deficiency resolution & zero leakage.',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80',
    primaryCta: { text: 'Track Disbursement Status', path: '/disbursement' },
    secondaryCta: { text: 'Officer Review Portal', path: '/login' },
    badge: 'Aadhaar PFMS Compliant'
  }
];

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex(prev => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % SLIDES.length);
  };

  const activeSlide = SLIDES[currentIndex];

  return (
    <div className="relative w-full min-h-[540px] md:min-h-[600px] bg-slate-950 overflow-hidden select-none">
      {/* Background Image Carousel with Overlay */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/70" />
          <div className="absolute inset-0 bg-gov-hero" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[540px] md:min-h-[600px] flex flex-col justify-center py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>{activeSlide.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {activeSlide.title}
            </h1>

            <p className="text-lg sm:text-xl font-bold text-teal-400">
              {activeSlide.subtitle}
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
              {activeSlide.text}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                to={activeSlide.primaryCta.path}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-black text-sm shadow-xl shadow-teal-950/50 transition-all flex items-center gap-2 group border border-teal-400/30"
              >
                <span>{activeSlide.primaryCta.text}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to={activeSlide.secondaryCta.path}
                className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm backdrop-blur-sm transition-all"
              >
                {activeSlide.secondaryCta.text}
              </Link>
            </div>
          </div>

          {/* Right Column: High Impact Trust Card */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="glass-card-dark p-6 rounded-2xl border border-slate-700/80 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-slate-200">MoTA Real-Time System Metrics</span>
                </div>
                <span className="text-[10px] bg-teal-950 text-teal-300 font-extrabold px-2 py-0.5 rounded border border-teal-500/30 uppercase">
                  Live Audit
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Disbursed</span>
                  <p className="text-xl font-black text-emerald-400 mt-0.5">₹482.5 Cr</p>
                  <span className="text-[10px] text-slate-500">Directly into ST Bank A/C</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">ST Scholars Benefited</span>
                  <p className="text-xl font-black text-teal-400 mt-0.5">1.28 Million</p>
                  <span className="text-[10px] text-slate-500">Across 28 States & UTs</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Avg Processing Speed</span>
                  <p className="text-xl font-black text-amber-400 mt-0.5">3.8 Days</p>
                  <span className="text-[10px] text-slate-500">Down from 45 days</span>
                </div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">AI OCR Accuracy</span>
                  <p className="text-xl font-black text-cyan-400 mt-0.5">99.4%</p>
                  <span className="text-[10px] text-slate-500">Confidence Match Rate</span>
                </div>
              </div>

              <div className="p-3 bg-teal-950/40 rounded-xl border border-teal-500/20 text-xs text-teal-200 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                <span>Protected by Ministry of Tribal Affairs Automated Verification Protocol</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prev / Next Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-all cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-all cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'w-8 bg-teal-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
