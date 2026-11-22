"use client";

import { useState } from "react";
import {
  Settings,
  Building,
  Phone,
  Mail,
  Globe,
  DollarSign,
  Share2,
  BarChart,
  Save,
  CheckCircle2
} from "lucide-react";

export default function AdminSettingsPage() {
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Agency Info
  const [brandName, setBrandName] = useState("SARDYX AI");
  const [tagline, setTagline] = useState("Full-Stack Software & AI Agency");
  const [email, setEmail] = useState("sardyxai@gmail.com");
  const [phone, setPhone] = useState("+92 300 0000000");
  const [whatsapp, setWhatsapp] = useState("+92 300 0000000");
  const [region, setRegion] = useState("Khyber Pakhtunkhwa, Pakistan");

  // Currency
  const [usdToPkr, setUsdToPkr] = useState("278");

  // Social Links
  const [linkedin, setLinkedin] = useState("https://linkedin.com/company/sardyxai");
  const [github, setGithub] = useState("https://github.com/sardyxai");
  const [twitter, setTwitter] = useState("https://x.com/sardyxai");

  // Analytics
  const [gaId, setGaId] = useState("G-XXXXXXXXXX");
  const [metaPixelId, setMetaPixelId] = useState("");
  const [gscToken, setGscToken] = useState("");

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <Settings className="text-[#8A2BEF]" size={28} />
            Agency & Platform Settings
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Global brand contacts, currency exchange ratios, social integrations, and search engine verification tokens.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 animate-fadeIn">
              <CheckCircle2 size={14} /> Settings Saved
            </span>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-[#8A2BEF]/20"
          >
            <Save size={16} />
            Save Configuration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Brand & Contact */}
        <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-4">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <Building size={16} className="text-[#8A2BEF]" />
            Brand & Contact Details
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">Agency Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">Official Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">Primary Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-[#8A849F] mb-1 font-medium">WhatsApp Direct Number</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">Headquarters Region (Privacy Standard)</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Currency & Financials */}
        <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-4">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <DollarSign size={16} className="text-emerald-400" />
            Financial & Multi-Currency Settings
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">USD to PKR Conversion Base</label>
              <div className="flex items-center gap-2">
                <span className="text-white font-mono font-bold">$1.00 USD = ₨</span>
                <input
                  type="number"
                  value={usdToPkr}
                  onChange={(e) => setUsdToPkr(e.target.value)}
                  className="w-28 bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono"
                />
                <span className="text-xs text-[#8A849F]">PKR</span>
              </div>
              <p className="text-[11px] text-[#8A849F] mt-1">
                Used dynamically on the public pricing package calculator and estimate invoices.
              </p>
            </div>
          </div>

          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2 pt-2 border-t border-white/[0.06]">
            <Share2 size={16} className="text-[#00C0FF]" />
            Social Profiles & Brand Handles
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">LinkedIn Company URL</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">GitHub Organization URL</label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* Analytics & Verification */}
        <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-5 space-y-4 lg:col-span-2">
          <h3 className="text-sm font-heading font-bold text-white flex items-center gap-2">
            <BarChart size={16} className="text-[#A66BFF]" />
            Analytics & Webmaster Verification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">Google Analytics 4 Measurement ID</label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={gaId}
                onChange={(e) => setGaId(e.target.value)}
                className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">Meta Pixel ID (Optional)</label>
              <input
                type="text"
                placeholder="Pixel ID"
                value={metaPixelId}
                onChange={(e) => setMetaPixelId(e.target.value)}
                className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-[#8A849F] mb-1 font-medium">Google Search Console HTML Tag</label>
              <input
                type="text"
                placeholder="google-site-verification token"
                value={gscToken}
                onChange={(e) => setGscToken(e.target.value)}
                className="w-full bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
