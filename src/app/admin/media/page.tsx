"use client";

import { useState } from "react";
import {
  Image as ImageIcon,
  UploadCloud,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  FileText
} from "lucide-react";

interface MediaAsset {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
  created_at: string;
  alt_text?: string;
}

const initialAssets: MediaAsset[] = [
  {
    id: "med-1",
    name: "nsk-enterprise-pos-dashboard.png",
    url: "/showcase/nsk-pos.png",
    size: "420 KB",
    type: "image/png",
    created_at: "2026-03-10",
    alt_text: "NSK Enterprise Cloud POS terminal with barcode scanning",
  },
  {
    id: "med-2",
    name: "unity-mark-corporate-portal.png",
    url: "/showcase/unity-mark.png",
    size: "385 KB",
    type: "image/png",
    created_at: "2026-03-12",
    alt_text: "Unity Mark Firm trademark management portal",
  },
  {
    id: "med-3",
    name: "ifixcars-booking-interface.png",
    url: "/showcase/ifixcars.png",
    size: "310 KB",
    type: "image/png",
    created_at: "2026-03-15",
    alt_text: "I FIX CARS automotive scheduler and WhatsApp dispatch interface",
  },
  {
    id: "med-4",
    name: "sardar-m-abdullah-executive.png",
    url: "/team/founder.png",
    size: "650 KB",
    type: "image/png",
    created_at: "2026-03-01",
    alt_text: "Sardar M. Abdullah, Founder and Chief Architect of SARDYX AI",
  },
];

export default function AdminMediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>(initialAssets);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this media asset?")) return;
    setAssets((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);

    setTimeout(() => {
      const file = files[0];
      const newAsset: MediaAsset = {
        id: `med-${Date.now()}`,
        name: file.name,
        url: URL.createObjectURL(file),
        size: `${Math.round(file.size / 1024)} KB`,
        type: file.type || "image/png",
        created_at: new Date().toISOString().slice(0, 10),
        alt_text: file.name.replace(/\.[^/.]+$/, ""),
      };
      setAssets([newAsset, ...assets]);
      setIsUploading(false);
    }, 1000);
  };

  const filtered = assets.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    (a.alt_text && a.alt_text.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <ImageIcon className="text-[#8A2BEF]" size={28} />
            Media & Asset Library
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Upload and organize CDN screenshots, system architecture diagrams, and founder branding assets.
          </p>
        </div>

        {/* Upload Button */}
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors shadow-lg shadow-[#8A2BEF]/20">
          <UploadCloud size={16} />
          <span>{isUploading ? "Uploading..." : "Upload New Asset"}</span>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleSimulateUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A849F]" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by asset filename or alt text..."
          className="w-full bg-[#0D0B16] border border-white/[0.08] focus:border-[#8A2BEF] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#8A849F] focus:outline-none transition-colors"
        />
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map((asset) => {
          const isCopied = copiedId === asset.id;
          return (
            <div
              key={asset.id}
              className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] overflow-hidden flex flex-col justify-between group hover:border-white/[0.15] transition-all"
            >
              {/* Thumbnail Container */}
              <div className="h-40 bg-[#14111F] flex items-center justify-center relative overflow-hidden p-2">
                <div className="w-full h-full rounded-xl bg-[#1C1830] flex flex-col items-center justify-center text-center p-3 border border-white/[0.04]">
                  <ImageIcon size={32} className="text-[#8A2BEF] mb-2 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <span className="text-[11px] font-mono text-[#B8B3CC] line-clamp-1">{asset.name}</span>
                  <span className="text-[10px] text-[#8A849F] mt-1">{asset.size}</span>
                </div>
              </div>

              {/* Info & Actions */}
              <div className="p-3.5 space-y-2 text-xs border-t border-white/[0.06]">
                <div className="font-semibold text-white truncate text-xs">{asset.name}</div>
                <p className="text-[11px] text-[#8A849F] truncate">
                  Alt: {asset.alt_text || "No description"}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-white/[0.04]">
                  <span className="text-[10px] font-mono text-[#8A849F]">{asset.created_at}</span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopyUrl(asset.id, asset.url)}
                      className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        isCopied
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "text-[#8A849F] hover:text-white hover:bg-white/[0.05]"
                      }`}
                      title="Copy URL"
                    >
                      {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                    <button
                      onClick={() => handleDelete(asset.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
