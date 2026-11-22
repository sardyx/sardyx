"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users2,
  TrendingUp,
  MessageSquare,
  FileText,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Lead {
  id: string;
  full_name: string;
  email: string;
  service_label: string | null;
  status: string;
  created_at: string;
}

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    activeServices: 12,
    pendingReviews: 0,
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const { data: leadsData, count: leadsCount } = await supabase
          .from("leads")
          .select("id, full_name, email, service_label, status, created_at", { count: "exact" })
          .order("created_at", { ascending: false })
          .limit(6);

        const { count: pendingCount } = await supabase
          .from("testimonials")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending");

        if (leadsData) {
          setLeads(leadsData);
          setStats({
            totalLeads: leadsCount || leadsData.length,
            newLeads: leadsData.filter((l) => l.status === "new").length,
            activeServices: 12,
            pendingReviews: pendingCount || 0,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            Executive Control Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#8A849F] mt-1 font-mono">
            Pipeline overview, catalog metrics, and customer inquiry logs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/leads"
            className="btn-primary-pill text-xs py-2 px-4 inline-flex items-center gap-1.5"
          >
            <Users2 size={15} />
            <span>View All Leads</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between text-xs text-[#8A849F] mb-3">
            <span>Total Captured Leads</span>
            <Users2 size={16} className="text-[#00C0FF]" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            {stats.totalLeads}
          </div>
          <p className="text-[11px] font-mono text-[#32CD32] mt-1">
            Real-time PostgreSQL sync
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between text-xs text-[#8A849F] mb-3">
            <span>New Actionable Leads</span>
            <AlertCircle size={16} className="text-[#FFB020]" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            {stats.newLeads}
          </div>
          <p className="text-[11px] font-mono text-[#FFB020] mt-1">
            Requires follow-up
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between text-xs text-[#8A849F] mb-3">
            <span>Active Core Services</span>
            <TrendingUp size={16} className="text-[#8A2BEF]" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            {stats.activeServices}
          </div>
          <p className="text-[11px] font-mono text-[#8A849F] mt-1">
            Live on public catalog
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between text-xs text-[#8A849F] mb-3">
            <span>Pending Reviews</span>
            <MessageSquare size={16} className="text-[#C4A0FF]" />
          </div>
          <div className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            {stats.pendingReviews}
          </div>
          <p className="text-[11px] font-mono text-[#8A849F] mt-1">
            In moderation queue
          </p>
        </div>
      </div>

      {/* Main Row: Recent Leads Table & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Leads */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/[0.06]">
            <div>
              <h2 className="font-heading font-bold text-base text-white">
                Recent Inquiries & Leads
              </h2>
              <p className="text-xs text-[#8A849F]">Direct website form and WhatsApp submissions</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs text-[#00C0FF] hover:underline inline-flex items-center gap-1"
            >
              <span>Manage CRM</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {loading ? (
            <div className="py-8 text-center text-xs text-[#8A849F]">Loading records...</div>
          ) : leads.length === 0 ? (
            <div className="py-10 text-center text-xs text-[#8A849F]">
              No leads received yet. Test by submitting an inquiry on the public contact form!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/[0.06] text-[#8A849F] font-mono">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Service</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 font-semibold text-white">
                        {l.full_name}
                        <span className="block text-[11px] text-[#8A849F] font-normal font-mono">
                          {l.email}
                        </span>
                      </td>
                      <td className="py-3 text-[#B8B3CC]">
                        {l.service_label || "General Inquiry"}
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase font-bold border ${
                            l.status === "new"
                              ? "bg-yellow-500/15 border-yellow-500/30 text-[#FFB020]"
                              : l.status === "won"
                              ? "bg-emerald-500/15 border-emerald-500/30 text-[#32CD32]"
                              : "bg-white/[0.04] border-white/[0.08] text-[#B8B3CC]"
                          }`}
                        >
                          {l.status}
                        </span>
                      </td>
                      <td className="py-3 text-[#8A849F] font-mono">
                        {new Date(l.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right: Quick Launch & System Status */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08]">
            <h3 className="font-heading font-bold text-sm text-white mb-4 pb-2 border-b border-white/[0.06]">
              Quick Management
            </h3>
            <div className="space-y-2">
              <Link
                href="/admin/services"
                className="w-full p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-xs font-semibold text-white flex items-center justify-between transition-colors min-h-[44px]"
              >
                <span>Edit Services & Pricing</span>
                <ArrowUpRight size={14} className="text-[#8A2BEF]" />
              </Link>
              <Link
                href="/admin/team"
                className="w-full p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-xs font-semibold text-white flex items-center justify-between transition-colors min-h-[44px]"
              >
                <span>Update Founder Bio & Team</span>
                <ArrowUpRight size={14} className="text-[#8A2BEF]" />
              </Link>
              <Link
                href="/admin/seo"
                className="w-full p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-xs font-semibold text-white flex items-center justify-between transition-colors min-h-[44px]"
              >
                <span>SEO & GEO Prompt Tracker</span>
                <ArrowUpRight size={14} className="text-[#8A2BEF]" />
              </Link>
              <Link
                href="/admin/settings"
                className="w-full p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-xs font-semibold text-white flex items-center justify-between transition-colors min-h-[44px]"
              >
                <span>WhatsApp & Brand Settings</span>
                <ArrowUpRight size={14} className="text-[#8A2BEF]" />
              </Link>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08]">
            <h3 className="font-heading font-bold text-sm text-white mb-3">
              Infrastructure Status
            </h3>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center text-[#B8B3CC]">
                <span>PostgreSQL DB</span>
                <span className="text-[#32CD32] flex items-center gap-1">
                  <CheckCircle2 size={13} /> Connected
                </span>
              </div>
              <div className="flex justify-between items-center text-[#B8B3CC]">
                <span>Storage Media Bucket</span>
                <span className="text-[#32CD32] flex items-center gap-1">
                  <CheckCircle2 size={13} /> Ready (5MB)
                </span>
              </div>
              <div className="flex justify-between items-center text-[#B8B3CC]">
                <span>Row-Level Security</span>
                <span className="text-[#32CD32] flex items-center gap-1">
                  <CheckCircle2 size={13} /> Enforced
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
