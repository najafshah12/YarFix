"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  User,
  Zap,
  Wind,
  Hammer,
  Sparkles,
  Paintbrush,
  ShieldCheck,
  Smartphone,
  Laptop,
  Gamepad2,
  Shirt,
  Rocket,
  Tag,
  Bell,
} from "lucide-react";

import {
  CornerChevrons,
  BottomChevronWings,
  PakistanLandmarksLeft,
  HomeAndMosqueRight,
  MosqueSilhouette,
} from "@/components/GeometricDecorations";
import LeadForm from "@/components/LeadForm";
import LeadModal from "@/components/LeadModal";

export default function YarFixLandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState("both");
  const [modalSource, setModalSource] = useState("hero_cta");
  const [useAltHeadline, setUseAltHeadline] = useState(false);

  const openLeadModal = (interest = "both", source = "cta_button") => {
    setModalInterest(interest);
    setModalSource(source);
    setModalOpen(true);
  };

  const scrollToEarlyAccess = () => {
    const el = document.getElementById("early-access");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#061a13] text-[#f3f5f4] selection:bg-brand-gold/30 selection:text-brand-goldLight relative overflow-x-hidden">
      {/* =========================================================================
          NAVIGATION HEADER
          ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#061a13]/85 backdrop-blur-md border-b border-brand-border/30 transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-brand-gold/40 shadow-sm transition-transform group-hover:scale-105">
              <Image
                src="/logo-badge.png"
                alt="YarFix Logo"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <div className="font-extrabold tracking-wider text-white text-lg flex items-center gap-1">
                <span>YAR</span>
                <span className="text-brand-gold">FIX</span>
              </div>
              <div className="text-[10px] text-brand-goldLight/80 font-medium tracking-tight -mt-0.5">
                اب گھر کا ہر مسئلہ حل
              </div>
            </div>
          </Link>

          {/* Nav links matching reference */}
          <nav className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium">
            <a
              href="#services"
              className="text-brand-sage hover:text-brand-gold transition-colors"
            >
              Home Services
            </a>

            <span className="text-brand-border/60 select-none">|</span>

            <a
              href="#marketplace"
              className="text-brand-sage hover:text-brand-gold transition-colors"
            >
              Used Products
            </a>

            <button
              onClick={() => openLeadModal("both", "navbar_cta")}
              className="px-4 py-2 rounded-full border border-brand-gold/60 text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all text-xs font-semibold shadow-sm hover:shadow-gold"
            >
              Join Early Access
            </button>
          </nav>
        </div>
      </header>

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        {/* Outer Golden Border & Corner Chevrons (matching reference design) */}
        <div className="max-w-6xl mx-auto relative border border-brand-border/30 rounded-3xl p-6 sm:p-12 md:p-16 bg-gradient-to-b from-[#0a251d]/70 via-[#071d16]/80 to-[#051610] shadow-2xl">
          {/* Top Left & Top Right Geometric Chevron Borders */}
          <div className="absolute top-2 left-2">
            <CornerChevrons />
          </div>
          <div className="absolute top-2 right-2 scale-x-[-1]">
            <CornerChevrons />
          </div>

          {/* Background Landmark Silhouettes */}
          {/* Left: Minar-e-Pakistan & Karachi Skyline Line Art */}
          <div className="absolute left-0 bottom-4 w-52 sm:w-72 md:w-80 pointer-events-none opacity-40 md:opacity-75">
            <PakistanLandmarksLeft className="w-full h-auto" />
          </div>

          {/* Right: Suburban House & Mosque Line Art */}
          <div className="absolute right-0 bottom-4 w-52 sm:w-72 md:w-80 pointer-events-none opacity-40 md:opacity-75">
            <HomeAndMosqueRight className="w-full h-auto" />
          </div>

          {/* Central Hero Content */}
          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* YarFix Logo Centered Prominently */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-6 rounded-2xl overflow-hidden border-2 border-brand-gold/60 shadow-goldGlow transition-transform hover:scale-105 duration-300">
              <Image
                src="/logo-badge.png"
                alt="YarFix - Ghar Ka Har Masla Hal"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Headline */}
            <h2 className="text-sm sm:text-base md:text-lg text-[#e6ece9] font-medium tracking-wide mb-3">
              Ghar ke har maslay ka solution aa raha hai
            </h2>

            {/* Large Golden COMING SOON Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wider text-brand-gold uppercase gold-glow mb-4">
              COMING SOON
            </h1>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg text-white font-normal mb-8">
              YarFix is coming soon! Stay tuned!
            </p>

            {/* Two CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-6">
              {/* Button 1: Stay Tuned */}
              <button
                onClick={scrollToEarlyAccess}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#071d16] border border-brand-gold/60 hover:border-brand-gold text-brand-gold hover:text-white font-medium text-sm flex items-center justify-center gap-2 transition-all hover:bg-[#0b2b21] group shadow-sm"
              >
                <span>Stay Tuned</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Button 2: Join Early Access (Primary conversion) */}
              <button
                onClick={() => openLeadModal("both", "hero_cta")}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-brand-goldLight via-brand-gold to-brand-goldDark hover:from-brand-gold hover:to-brand-goldDark text-brand-dark font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40 hover:scale-[1.02] active:scale-[0.98] group"
              >
                <User className="w-4 h-4" />
                <span>Join Early Access</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Sub-supporting line */}
            <p className="text-xs sm:text-sm text-brand-sage max-w-lg leading-relaxed">
              Be among the first to experience a smarter way to manage your home and discover great deals.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOME SERVICES SECTION
          ========================================================================= */}
      <section id="services" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UPCOMING FEATURES</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Your Home, <span className="text-brand-gold">Our Responsibility</span>
            </h2>

            <p className="text-xs sm:text-sm text-brand-sage leading-relaxed">
              From everyday repairs to essential home maintenance, YarFix aims to make finding reliable home service professionals easier for everyone in Pakistan.
            </p>
          </div>

          {/* 8 Services Responsive Grid (4x2 on desktop, 2x4 on tablet, 1 col mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1: Plumbing */}
            <div className="group p-6 rounded-2xl bg-[#09221a]/70 hover:bg-[#0d2e24]/90 border border-brand-border/40 hover:border-brand-gold/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#051610]/80 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 group-hover:border-brand-gold transition-all">
                {/* Custom Tap / Plumbing icon */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 11-1 9" />
                  <path d="m19 11-4-7" />
                  <path d="M2 11h20" />
                  <path d="m7 11 5-7 5 7" />
                  <path d="M6 11v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-goldLight transition-colors">
                Plumbing
              </h3>
              <p className="text-xs text-brand-sage leading-relaxed">
                Tap repairs, leak fixes, and plumbing maintenance.
              </p>
            </div>

            {/* Card 2: Electrical Services */}
            <div className="group p-6 rounded-2xl bg-[#09221a]/70 hover:bg-[#0d2e24]/90 border border-brand-border/40 hover:border-brand-gold/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#051610]/80 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 group-hover:border-brand-gold transition-all">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-goldLight transition-colors">
                Electrical Services
              </h3>
              <p className="text-xs text-brand-sage leading-relaxed">
                Switches, wiring, and electrical repairs.
              </p>
            </div>

            {/* Card 3: AC Services */}
            <div className="group p-6 rounded-2xl bg-[#09221a]/70 hover:bg-[#0d2e24]/90 border border-brand-border/40 hover:border-brand-gold/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#051610]/80 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 group-hover:border-brand-gold transition-all">
                <Wind className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-goldLight transition-colors">
                AC Services
              </h3>
              <p className="text-xs text-brand-sage leading-relaxed">
                AC installation, servicing, and maintenance.
              </p>
            </div>

            {/* Card 4: Appliance Repair */}
            <div className="group p-6 rounded-2xl bg-[#09221a]/70 hover:bg-[#0d2e24]/90 border border-brand-border/40 hover:border-brand-gold/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#051610]/80 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 group-hover:border-brand-gold transition-all">
                {/* Washing Machine Icon */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="20" x="3" y="2" rx="2" />
                  <circle cx="12" cy="13" r="5" />
                  <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
                  <circle cx="7" cy="6" r="1" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-goldLight transition-colors">
                Appliance Repair
              </h3>
              <p className="text-xs text-brand-sage leading-relaxed">
                Washing machines, refrigerators, and household appliances.
              </p>
            </div>

            {/* Card 5: Carpentry */}
            <div className="group p-6 rounded-2xl bg-[#09221a]/70 hover:bg-[#0d2e24]/90 border border-brand-border/40 hover:border-brand-gold/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#051610]/80 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 group-hover:border-brand-gold transition-all">
                <Hammer className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-goldLight transition-colors">
                Carpentry
              </h3>
              <p className="text-xs text-brand-sage leading-relaxed">
                Furniture repairs, doors, and fittings.
              </p>
            </div>

            {/* Card 6: Cleaning Services */}
            <div className="group p-6 rounded-2xl bg-[#09221a]/70 hover:bg-[#0d2e24]/90 border border-brand-border/40 hover:border-brand-gold/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#051610]/80 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 group-hover:border-brand-gold transition-all">
                {/* Broom / Cleaning Icon */}
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m11.5 8.5 7.5-7.5" />
                  <path d="m19 1 4 4" />
                  <path d="M2.5 17.5 11 9l4 4-8.5 8.5a3.5 3.5 0 0 1-5-5Z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-goldLight transition-colors">
                Cleaning Services
              </h3>
              <p className="text-xs text-brand-sage leading-relaxed">
                Home cleaning and general maintenance.
              </p>
            </div>

            {/* Card 7: Painting & Maintenance */}
            <div className="group p-6 rounded-2xl bg-[#09221a]/70 hover:bg-[#0d2e24]/90 border border-brand-border/40 hover:border-brand-gold/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#051610]/80 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 group-hover:border-brand-gold transition-all">
                <Paintbrush className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-goldLight transition-colors">
                Painting & Maintenance
              </h3>
              <p className="text-xs text-brand-sage leading-relaxed">
                Painting and minor home improvements.
              </p>
            </div>

            {/* Card 8: Trusted Professionals */}
            <div className="group p-6 rounded-2xl bg-[#09221a]/70 hover:bg-[#0d2e24]/90 border border-brand-border/40 hover:border-brand-gold/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#051610]/80 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-4 group-hover:scale-110 group-hover:border-brand-gold transition-all">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-brand-goldLight transition-colors">
                Trusted Professionals
              </h3>
              <p className="text-xs text-brand-sage leading-relaxed">
                Planned professional profiles, verification, and customer feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          USED PRODUCTS MARKETPLACE SECTION
          ========================================================================= */}
      <section id="marketplace" className="py-16 sm:py-24 px-4 sm:px-6 relative bg-gradient-to-b from-[#061a13] via-[#08221a]/60 to-[#061a13]">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-brand-border/40 bg-[#082018]/90 p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl relative">
            {/* Top delicate gold glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Product Showcase Podium from Reference */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full max-w-md h-56 sm:h-72 rounded-2xl overflow-hidden border border-brand-border/50 shadow-gold group">
                  <Image
                    src="/marketplace-products.png"
                    alt="Buy & Sell Used Tech, Gadgets, Gaming Gear on YarFix"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061a13]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Verified Pre-loved Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#061a13]/90 border border-brand-gold/40 text-[11px] text-brand-gold flex items-center gap-1.5 backdrop-blur-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
                    <span>Verified Pre-Loved Goods</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Content, Categories & Waitlist CTA */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>UPCOMING FEATURE</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                  Buy & Sell <span className="text-brand-gold">Used Products</span>
                </h2>

                <p className="text-xs sm:text-sm text-brand-sage leading-relaxed mb-8 max-w-xl">
                  Give your pre-loved items a new home or discover great deals on quality used products — all in one place.
                </p>

                {/* 4 Categories row matching reference */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full mb-8">
                  {/* Category 1 */}
                  <div className="p-3.5 rounded-2xl bg-[#061a13]/80 border border-brand-border/40 hover:border-brand-gold/60 transition-all flex flex-col items-center text-center group cursor-default">
                    <div className="w-11 h-11 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center text-brand-gold mb-2 group-hover:scale-110 transition-transform">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-brand-gold transition-colors">
                      Phones & Tablets
                    </span>
                  </div>

                  {/* Category 2 */}
                  <div className="p-3.5 rounded-2xl bg-[#061a13]/80 border border-brand-border/40 hover:border-brand-gold/60 transition-all flex flex-col items-center text-center group cursor-default">
                    <div className="w-11 h-11 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center text-brand-gold mb-2 group-hover:scale-110 transition-transform">
                      <Laptop className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-brand-gold transition-colors">
                      Laptops & Computers
                    </span>
                  </div>

                  {/* Category 3 */}
                  <div className="p-3.5 rounded-2xl bg-[#061a13]/80 border border-brand-border/40 hover:border-brand-gold/60 transition-all flex flex-col items-center text-center group cursor-default">
                    <div className="w-11 h-11 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center text-brand-gold mb-2 group-hover:scale-110 transition-transform">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-brand-gold transition-colors">
                      Gaming Gear
                    </span>
                  </div>

                  {/* Category 4 */}
                  <div className="p-3.5 rounded-2xl bg-[#061a13]/80 border border-brand-border/40 hover:border-brand-gold/60 transition-all flex flex-col items-center text-center group cursor-default">
                    <div className="w-11 h-11 rounded-full bg-brand-gold/10 border border-brand-gold/40 flex items-center justify-center text-brand-gold mb-2 group-hover:scale-110 transition-transform">
                      <Shirt className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-brand-gold transition-colors">
                      Fashion & More
                    </span>
                  </div>
                </div>

                {/* Marketplace Waitlist CTA Button */}
                <button
                  onClick={() => openLeadModal("buying_used", "marketplace_section")}
                  className="px-7 py-3.5 rounded-full bg-[#051610] hover:bg-[#071d16] border border-brand-gold/70 text-brand-gold hover:text-white font-semibold text-sm flex items-center gap-2.5 transition-all shadow-md hover:shadow-gold group"
                >
                  <span>Join the Marketplace Waitlist</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW YARFIX WILL WORK SECTION
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
            <span>HOW IT WORKS</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-12 sm:mb-16">
            Simple. <span className="text-brand-gold">Fast.</span> Hassle-Free.
          </h2>

          {/* 3 Step Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center relative group">
              <div className="relative mb-5">
                <div className="w-20 h-20 rounded-full bg-[#09221a] border-2 border-brand-gold/50 flex items-center justify-center text-brand-gold group-hover:scale-105 group-hover:border-brand-gold transition-all shadow-gold">
                  {/* Phone with tap icon */}
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="20" x="5" y="2" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
                    <path d="M12 7v4" />
                    <path d="m10 9 2-2 2 2" />
                  </svg>
                </div>
                {/* Step number badge */}
                <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-brand-gold text-brand-dark text-xs font-bold flex items-center justify-center border-2 border-[#061a13]">
                  01
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                Choose a Service
              </h3>
              <p className="text-xs sm:text-sm text-brand-sage max-w-xs leading-relaxed">
                Select the home service you need.
              </p>
            </div>

            {/* Connecting Arrow (Desktop only) */}
            <div className="hidden md:flex items-center justify-center absolute left-[31%] top-10 pointer-events-none text-brand-gold/40">
              <ArrowRight className="w-8 h-8" />
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center relative group">
              <div className="relative mb-5">
                <div className="w-20 h-20 rounded-full bg-[#09221a] border-2 border-brand-gold/50 flex items-center justify-center text-brand-gold group-hover:scale-105 group-hover:border-brand-gold transition-all shadow-gold">
                  {/* Verified Professional */}
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M10 2h4" />
                  </svg>
                </div>
                {/* Step number badge */}
                <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-brand-gold text-brand-dark text-xs font-bold flex items-center justify-center border-2 border-[#061a13]">
                  02
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                Connect with a Professional
              </h3>
              <p className="text-xs sm:text-sm text-brand-sage max-w-xs leading-relaxed">
                Find and request an appropriate service professional.
              </p>
            </div>

            {/* Connecting Arrow (Desktop only) */}
            <div className="hidden md:flex items-center justify-center absolute left-[65%] top-10 pointer-events-none text-brand-gold/40">
              <ArrowRight className="w-8 h-8" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center relative group">
              <div className="relative mb-5">
                <div className="w-20 h-20 rounded-full bg-[#09221a] border-2 border-brand-gold/50 flex items-center justify-center text-brand-gold group-hover:scale-105 group-hover:border-brand-gold transition-all shadow-gold">
                  {/* Happy Finished Home */}
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                {/* Step number badge */}
                <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-brand-gold text-brand-dark text-xs font-bold flex items-center justify-center border-2 border-[#061a13]">
                  03
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                Get the Job Done
              </h3>
              <p className="text-xs sm:text-sm text-brand-sage max-w-xs leading-relaxed">
                Arrange the service and get your home issue resolved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HIGH-CONVERSION EARLY ACCESS SECTION
          ========================================================================= */}
      <section id="early-access" className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto relative rounded-3xl border border-brand-gold/40 bg-gradient-to-b from-[#08221a]/95 via-[#061c15] to-[#04140e] p-6 sm:p-10 md:p-12 shadow-2xl overflow-hidden">
          {/* Architectural Silhouettes in background */}
          <div className="absolute left-0 bottom-0 w-64 md:w-80 pointer-events-none opacity-20">
            <PakistanLandmarksLeft className="w-full h-auto" />
          </div>
          <div className="absolute right-0 bottom-0 w-64 md:w-80 pointer-events-none opacity-25">
            <MosqueSilhouette className="w-full h-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Column: Early Access Pitch & Benefits */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
                  <Rocket className="w-3.5 h-3.5" />
                  <span>EARLY ACCESS</span>
                </div>

                {/* Headline (with toggle for alternative copy as requested) */}
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {useAltHeadline ? (
                    <>
                      Your Next Favourite Platform{" "}
                      <span className="text-brand-gold">Is Almost Here.</span>
                    </>
                  ) : (
                    <>
                      Be First.{" "}
                      <span className="text-brand-gold">
                        Get There Before Everyone Else.
                      </span>
                    </>
                  )}
                </h2>

                {/* Optional headline toggle pill for A/B testing */}
                <div className="mt-2">
                  <button
                    onClick={() => setUseAltHeadline(!useAltHeadline)}
                    className="text-[10px] text-brand-muted hover:text-brand-gold underline transition-colors"
                  >
                    {useAltHeadline ? "Show default headline" : "Preview alternative headline"}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-brand-sage leading-relaxed mt-4 max-w-lg">
                  YarFix is coming to Pakistan. Join our early-access list to be among the first to discover trusted home services, exclusive marketplace deals, and launch updates.
                </p>
              </div>

              {/* 3 Short Benefit Highlights */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#051610]/60 border border-brand-border/40">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">
                      Early access to upcoming features
                    </h4>
                    <p className="text-[11px] text-brand-sage">
                      Experience priority booking before public launch.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#051610]/60 border border-brand-border/40">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Tag className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">
                      Be among the first to discover marketplace deals
                    </h4>
                    <p className="text-[11px] text-brand-sage">
                      First dibs on verified quality pre-loved tech & gear.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#051610]/60 border border-brand-border/40">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-white">
                      Get launch updates and early-bird announcements
                    </h4>
                    <p className="text-[11px] text-brand-sage">
                      Direct WhatsApp/email alerts when we go live in Karachi.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Collection Form */}
            <div className="lg:col-span-6">
              <LeadForm
                initialInterest="both"
                source="landing_page_embed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL COMING SOON SECTION
          ========================================================================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto relative border border-brand-border/30 rounded-3xl p-8 sm:p-14 text-center bg-gradient-to-b from-[#08221a]/80 to-[#04140e] overflow-hidden shadow-2xl">
          {/* Elegant Golden Chevron Wings on Left and Right (matching reference) */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 hidden sm:block">
            <BottomChevronWings />
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:block">
            <BottomChevronWings flip={true} />
          </div>

          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            {/* Tagline */}
            <p className="text-xs sm:text-sm font-bold text-brand-gold tracking-[0.25em] uppercase mb-2">
              BETTER HOMES. HAPPIER LIVES.
            </p>

            {/* Big Golden COMING SOON */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wider text-brand-gold uppercase gold-glow mb-3">
              COMING SOON
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-white mb-6">
              YarFix is coming soon! Stay tuned!
            </p>

            {/* Two Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <button
                onClick={scrollToEarlyAccess}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#071d16] border border-brand-gold/60 hover:border-brand-gold text-brand-gold hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:bg-[#0b2b21] group shadow-sm"
              >
                <span>Stay Tuned</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => openLeadModal("both", "bottom_cta")}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-brand-goldLight via-brand-gold to-brand-goldDark text-brand-dark font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-gold hover:scale-105 active:scale-95 group"
              >
                <User className="w-3.5 h-3.5" />
                <span>Join Early Access</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="border-t border-brand-border/25 bg-[#04120d] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-brand-sage">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-brand-gold/40">
              <Image src="/logo-badge.png" alt="YarFix" fill className="object-cover" />
            </div>
            <div>
              <span className="font-bold text-white tracking-wider">YARFIX</span>
              <span className="text-[11px] text-brand-goldLight ml-2">Ghar Ka Har Masla, Hal!</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-brand-gold transition-colors">
              Home Services
            </a>
            <a href="#marketplace" className="hover:text-brand-gold transition-colors">
              Used Marketplace
            </a>
            <a href="#early-access" className="hover:text-brand-gold transition-colors">
              Early Access Waitlist
            </a>
            <Link href="/admin" className="text-brand-muted hover:text-brand-gold transition-colors">
              Admin Portal
            </Link>
          </div>

          <div className="text-center md:text-right text-[11px] text-brand-muted">
            <div>© {new Date().getFullYear()} YarFix Pakistan. All rights reserved.</div>
            <div className="text-[10px] text-brand-gold/60 mt-0.5">
              Targeted Launch: Karachi · Expanding Nationwide
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE MODAL DIALOG
          ========================================================================= */}
      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialInterest={modalInterest}
        source={modalSource}
      />
    </div>
  );
}
