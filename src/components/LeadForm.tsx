"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
} from "lucide-react";

interface LeadFormProps {
  initialInterest?: string;
  source?: string;
  onSuccess?: () => void;
  isModal?: boolean;
}

const CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Hyderabad",
  "Other Pakistan City",
];

export default function LeadForm({
  initialInterest,
  source = "early_access_section",
  onSuccess,
  isModal = false,
}: LeadFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("Karachi");
  const [primaryInterest, setPrimaryInterest] = useState<string>(initialInterest || "both");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(true);

  // Status states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialInterest) {
      setPrimaryInterest(initialInterest);
    }
  }, [initialInterest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side initial checks
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg("Please provide your full name (at least 2 letters).");
      return;
    }

    if (!email.trim() && !whatsapp.trim()) {
      setErrorMsg("Please provide either an Email Address or WhatsApp Number.");
      return;
    }

    if (!agree) {
      setErrorMsg("Please agree to receive launch updates from YarFix.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim() || undefined,
          whatsapp: whatsapp.trim() || undefined,
          city,
          primaryInterest,
          message: message.trim() || undefined,
          source,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Submission failed. Please check your details.");
      }

      setIsSubmitted(true);
      setSuccessMsg(data.message || "You're on the list! We'll keep you updated as YarFix gets ready to launch.");
      if (onSuccess) {
        setTimeout(onSuccess, 2500);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-[#08221a]/95 border border-brand-gold/40 text-center animate-fadeIn shadow-gold">
        <div className="w-14 h-14 mx-auto rounded-full bg-brand-gold/15 border border-brand-gold/50 flex items-center justify-center text-brand-gold mb-4 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Welcome to YarFix!</h3>
        <p className="text-brand-sage text-sm leading-relaxed max-w-md mx-auto mb-6">
          {successMsg}
        </p>

        <div className="p-3.5 rounded-xl bg-[#061a13]/80 border border-brand-border/40 text-left text-xs text-brand-sage space-y-1.5 max-w-sm mx-auto">
          <div className="text-brand-gold font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Early Access Confirmed
          </div>
          <div>Name: <span className="text-white font-medium">{fullName}</span></div>
          <div>City: <span className="text-brand-goldLight">{city}</span></div>
          {whatsapp && <div>WhatsApp: <span className="text-white">{whatsapp}</span></div>}
          {email && <div>Email: <span className="text-white">{email}</span></div>}
        </div>

        <p className="text-[11px] text-brand-muted mt-5">
          We will contact you via WhatsApp / Email with launch news & exclusive early access perks.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${
        isModal
          ? "p-5 sm:p-6"
          : "p-5 sm:p-7 rounded-2xl bg-[#09221a]/90 backdrop-blur-md border border-brand-border/60 shadow-2xl relative"
      }`}
    >
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center justify-between">
          <span>Join YarFix Early Access</span>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
            Karachi & Pakistan
          </span>
        </h3>
        <p className="text-xs text-brand-sage mt-1">
          Tell us a bit about yourself and what you&apos;re interested in.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-950/70 border border-red-700/60 text-red-200 text-xs flex items-start gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="block text-xs font-medium text-brand-sage uppercase tracking-wider mb-1.5">
          Full Name <span className="text-brand-gold">*</span>
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Rohaan Ahmed"
          required
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#051610]/90 border border-brand-border text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
        />
      </div>

      {/* Two-column Contact: Email & WhatsApp */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-brand-sage uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-brand-gold" /> Email Address
            </span>
            <span className="text-[10px] text-brand-muted lowercase font-normal">(or phone)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="rohaan@example.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#051610]/90 border border-brand-border text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-brand-sage uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <Phone className="w-3 h-3 text-emerald-400" /> WhatsApp Number
            </span>
            <span className="text-[10px] text-brand-muted lowercase font-normal">(or email)</span>
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="0300-1234567"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#051610]/90 border border-brand-border text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
          />
        </div>
      </div>
      <p className="text-[10px] text-brand-muted -mt-2">
        * Provide either email or WhatsApp number so we can notify you.
      </p>

      {/* City */}
      <div>
        <label className="block text-xs font-medium text-brand-sage uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-brand-gold" /> City <span className="text-brand-gold">*</span>
        </label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#051610]/90 border border-brand-border text-white text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors cursor-pointer"
        >
          {CITIES.map((c) => (
            <option key={c} value={c} className="bg-[#051610] text-white">
              {c} {c === "Karachi" ? "— Launch City" : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Primary Interest (Optional) */}
      <div>
        <label className="block text-xs font-medium text-brand-sage uppercase tracking-wider mb-1.5">
          Primary Interest <span className="text-[10px] text-brand-muted lowercase font-normal">(optional)</span>
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { id: "home_services", label: "Home Services" },
            { id: "buying_used", label: "Buying Used Products" },
            { id: "selling_used", label: "Selling Used Products" },
            { id: "both", label: "Both Services & Market" },
          ].map((item) => (
            <label
              key={item.id}
              className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                primaryInterest === item.id
                  ? "bg-brand-gold/15 border-brand-gold text-white font-medium"
                  : "bg-[#051610]/60 border-brand-border/40 text-brand-sage hover:border-brand-border hover:text-white"
              }`}
            >
              <input
                type="radio"
                name="primaryInterest"
                value={item.id}
                checked={primaryInterest === item.id}
                onChange={() => setPrimaryInterest(item.id)}
                className="w-3.5 h-3.5 accent-brand-gold cursor-pointer"
              />
              <span className="truncate">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* What would you like YarFix to help you with? */}
      <div>
        <label className="block text-xs font-medium text-brand-sage uppercase tracking-wider mb-1.5 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-brand-gold" /> What would you like YarFix to help you with?{" "}
          <span className="text-[10px] text-brand-muted lowercase font-normal">(optional)</span>
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. Need AC servicing in Gulshan / looking to buy clean laptops..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#051610]/90 border border-brand-border text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors"
        />
      </div>

      {/* Consent Checkbox */}
      <div className="pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-brand-sage leading-snug">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-brand-border accent-brand-gold cursor-pointer flex-shrink-0"
          />
          <span>
            I agree to receive launch updates, early announcements, and relevant follow-ups from YarFix.
          </span>
        </label>
      </div>

      {/* Big Golden CTA Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#f5d47a] via-[#e5b758] to-[#c69634] hover:from-[#fae29c] hover:via-[#f0c365] hover:to-[#d4a340] text-brand-dark font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-brand-gold/25 hover:shadow-brand-gold/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none group"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Securing Your Spot...</span>
          </>
        ) : (
          <>
            <span>Count Me In — Join YarFix</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      {/* Privacy note */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-brand-muted pt-1">
        <ShieldCheck className="w-3.5 h-3.5 text-brand-gold/70" />
        <span>Your information is safe with us. We only use it for YarFix launch updates and relevant communication.</span>
      </div>
    </form>
  );
}
