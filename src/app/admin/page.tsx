"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Download,
  Users,
  Building2,
  ShoppingBag,
  Wrench,
  Search,
  Lock,
  ArrowLeft,
  RefreshCw,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";

interface Lead {
  id: string;
  fullName: string;
  email: string | null;
  whatsapp: string | null;
  city: string;
  primaryInterest: string | null;
  message: string | null;
  source: string;
  createdAt: string;
}

interface Stats {
  totalLeads: number;
  cities: Record<string, number>;
  interests: Record<string, number>;
  withEmail: number;
  withWhatsApp: number;
}

export default function AdminDashboard() {
  const [secret, setSecret] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedInterest, setSelectedInterest] = useState<string>("all");

  const fetchLeads = async (sec: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/leads?secret=${encodeURIComponent(sec)}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed");
      }
      setLeads(data.leads || []);
      setStats(data.stats || null);
      setAuthenticated(true);
      sessionStorage.setItem("yarfix_admin_sec", sec);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load leads";
      setError(message);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("yarfix_admin_sec");
    if (saved) {
      setSecret(saved);
      fetchLeads(saved);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secret.trim()) {
      fetchLeads(secret.trim());
    }
  };

  const handleDownloadCsv = () => {
    window.location.href = `/api/admin/leads?secret=${encodeURIComponent(secret)}&format=csv`;
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      searchTerm === "" ||
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.whatsapp && lead.whatsapp.includes(searchTerm)) ||
      (lead.message && lead.message.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCity = selectedCity === "all" || lead.city.toLowerCase() === selectedCity.toLowerCase();

    const matchesInterest =
      selectedInterest === "all" ||
      (lead.primaryInterest && lead.primaryInterest.toLowerCase() === selectedInterest.toLowerCase());

    return matchesSearch && matchesCity && matchesInterest;
  });

  const uniqueCities = Array.from(new Set(leads.map((l) => l.city).filter(Boolean)));

  return (
    <div className="min-h-screen bg-[#051610] text-[#f3f5f4] flex flex-col">
      {/* Top Header */}
      <header className="border-b border-brand-border/40 bg-[#081e17]/80 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-brand-gold/40">
                <Image src="/logo-badge.png" alt="YarFix" fill className="object-cover" />
              </div>
              <div>
                <span className="font-bold tracking-wider text-brand-gold text-lg">YARFIX</span>
                <span className="text-xs text-brand-sage block -mt-1">Admin Portal</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs sm:text-sm text-brand-sage hover:text-brand-gold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border/30 hover:border-brand-gold/40 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Landing Page
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {!authenticated ? (
          <div className="max-w-md mx-auto mt-16 p-6 sm:p-8 rounded-2xl bg-[#09221a]/90 border border-brand-border/50 shadow-gold">
            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-white">YarFix Lead Management</h1>
              <p className="text-xs text-brand-sage mt-1">
                Enter your configured ADMIN_SECRET to view early access submissions.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs text-brand-sage uppercase tracking-wider mb-1.5 font-medium">
                  Admin Passkey
                </label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder="Enter admin secret..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#051610] border border-brand-border text-white placeholder-brand-muted text-sm focus:outline-none focus:border-brand-gold transition-colors"
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-goldLight to-brand-gold font-semibold text-brand-dark text-sm hover:brightness-105 transition-all shadow-md disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Access Lead Dashboard"}
              </button>

              <p className="text-[11px] text-center text-brand-muted">
                Default dev secret is configured in <code className="text-brand-gold">.env.local</code>
              </p>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-brand-border/20">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>Early Access Leads</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40">
                    Live Data
                  </span>
                </h1>
                <p className="text-xs text-brand-sage mt-0.5">
                  Real-time waitlist submissions collected from the YarFix landing page.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => fetchLeads(secret)}
                  disabled={loading}
                  className="px-3.5 py-2 rounded-xl bg-[#0b2920] border border-brand-border hover:border-brand-gold/50 text-brand-sage hover:text-brand-gold text-xs font-medium flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  Refresh
                </button>

                <button
                  onClick={handleDownloadCsv}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-goldLight to-brand-gold hover:from-brand-gold to-brand-goldDark text-brand-dark font-semibold text-xs flex items-center gap-2 transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  Export to CSV
                </button>
              </div>
            </div>

            {/* Metric Cards */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-[#09221a]/80 border border-brand-border/40">
                  <div className="flex items-center justify-between text-brand-sage">
                    <span className="text-xs font-medium uppercase tracking-wider">Total Leads</span>
                    <Users className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-2">{stats.totalLeads}</div>
                  <div className="text-[11px] text-brand-muted mt-1">
                    {stats.withWhatsApp} with WhatsApp · {stats.withEmail} with Email
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#09221a]/80 border border-brand-border/40">
                  <div className="flex items-center justify-between text-brand-sage">
                    <span className="text-xs font-medium uppercase tracking-wider">Top City</span>
                    <Building2 className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="text-2xl font-extrabold text-brand-goldLight mt-2">
                    {Object.entries(stats.cities).sort((a, b) => b[1] - a[1])[0]?.[0] || "Karachi"}
                  </div>
                  <div className="text-[11px] text-brand-muted mt-1">
                    {Object.keys(stats.cities).length} cities represented
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#09221a]/80 border border-brand-border/40">
                  <div className="flex items-center justify-between text-brand-sage">
                    <span className="text-xs font-medium uppercase tracking-wider">Home Services</span>
                    <Wrench className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-2">
                    {(stats.interests["home_services"] || 0) + (stats.interests["both"] || 0)}
                  </div>
                  <div className="text-[11px] text-brand-muted mt-1">Interested in home repairs</div>
                </div>

                <div className="p-4 rounded-xl bg-[#09221a]/80 border border-brand-border/40">
                  <div className="flex items-center justify-between text-brand-sage">
                    <span className="text-xs font-medium uppercase tracking-wider">Marketplace</span>
                    <ShoppingBag className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-2">
                    {(stats.interests["buying_used"] || 0) +
                      (stats.interests["selling_used"] || 0) +
                      (stats.interests["both"] || 0)}
                  </div>
                  <div className="text-[11px] text-brand-muted mt-1">Interested in used goods</div>
                </div>
              </div>
            )}

            {/* Filter Bar */}
            <div className="p-4 rounded-xl bg-[#09221a]/60 border border-brand-border/30 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-brand-muted absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#051610] border border-brand-border text-white placeholder-brand-muted text-xs focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#051610] border border-brand-border text-brand-sage text-xs focus:outline-none focus:border-brand-gold flex-1 md:flex-none"
                >
                  <option value="all">All Cities ({leads.length})</option>
                  {uniqueCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[#051610] border border-brand-border text-brand-sage text-xs focus:outline-none focus:border-brand-gold flex-1 md:flex-none"
                >
                  <option value="all">All Interests</option>
                  <option value="home_services">Home Services</option>
                  <option value="buying_used">Buying Used Products</option>
                  <option value="selling_used">Selling Used Products</option>
                  <option value="both">Both Services & Marketplace</option>
                </select>
              </div>
            </div>

            {/* Leads Table */}
            <div className="rounded-xl border border-brand-border/30 overflow-hidden bg-[#081e17]/60">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0b2920] text-brand-sage border-b border-brand-border/30 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="px-4 py-3">Lead Details</th>
                      <th className="px-4 py-3">Contact Information</th>
                      <th className="px-4 py-3">City</th>
                      <th className="px-4 py-3">Interest</th>
                      <th className="px-4 py-3">Message / Notes</th>
                      <th className="px-4 py-3">Registered Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/15">
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-12 text-center text-brand-muted">
                          {leads.length === 0
                            ? "No early access submissions yet. Submissions from the landing page will appear here immediately."
                            : "No leads matched your current filter criteria."}
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-[#0b2b21]/40 transition-colors">
                          <td className="px-4 py-3.5 font-medium text-white">
                            <div>{lead.fullName}</div>
                            <div className="text-[10px] text-brand-muted font-mono">{lead.id}</div>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="space-y-1">
                              {lead.whatsapp && (
                                <div className="flex items-center gap-1.5 text-emerald-400">
                                  <Phone className="w-3 h-3 flex-shrink-0" />
                                  <span>{lead.whatsapp}</span>
                                </div>
                              )}
                              {lead.email && (
                                <div className="flex items-center gap-1.5 text-brand-sage">
                                  <Mail className="w-3 h-3 flex-shrink-0" />
                                  <span>{lead.email}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-brand-goldLight font-medium">
                            {lead.city}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] bg-brand-gold/15 text-brand-gold border border-brand-gold/30 capitalize">
                              {lead.primaryInterest?.replace(/_/g, " ") || "General"}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-brand-sage max-w-xs truncate" title={lead.message || ""}>
                            {lead.message || <span className="text-brand-muted italic">None</span>}
                          </td>
                          <td className="px-4 py-3.5 text-brand-muted whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="text-[10px]">
                              {new Date(lead.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
