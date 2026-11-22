"use client";

import { useState, useEffect } from "react";
import {
  Users2,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  ExternalLink,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MoreVertical,
  Plus,
  Send,
  Calendar,
  Building,
  Tag,
  Kanban,
  Table as TableIcon,
  ChevronRight,
  ShieldAlert
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Lead {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_label: string | null;
  budget_range: string | null;
  message: string;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost" | "spam";
  source: string;
  utm?: Record<string, any>;
  ip_hash?: string;
}

interface Note {
  id: string;
  created_at: string;
  author_name: string;
  note_content: string;
}

const statusColors: Record<Lead["status"], { bg: string; text: string; border: string }> = {
  new: { bg: "bg-[#00C0FF]/10", text: "text-[#00C0FF]", border: "border-[#00C0FF]/30" },
  contacted: { bg: "bg-[#8A2BEF]/10", text: "text-[#8A2BEF]", border: "border-[#8A2BEF]/30" },
  qualified: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  proposal: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  won: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
  lost: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/30" },
  spam: { bg: "bg-gray-500/10", text: "text-gray-400", border: "border-gray-500/30" },
};

const mockInitialLeads: Lead[] = [
  {
    id: "lead-001",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    full_name: "Adeel Tariq",
    email: "adeel@tarq-enterprises.com",
    phone: "+92 300 1234567",
    company: "Tariq Enterprises Ltd",
    service_label: "Cloud POS Softwares",
    budget_range: "$1,000 – $3,000 (~₨275k – ₨825k)",
    message: "We need a multi-branch cloud POS with barcode scanning and real-time inventory synchronization for 3 retail outlets in Lahore.",
    status: "new",
    source: "contact_form",
  },
  {
    id: "lead-002",
    created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    full_name: "Harrison Brooks",
    email: "h.brooks@apexventures.co.uk",
    phone: "+44 7700 900123",
    company: "Apex Ventures UK",
    service_label: "Professional Websites (Next.js)",
    budget_range: "$3,000 – $7,000 (~₨825k – ₨1.9M)",
    message: "Looking for an ultra-fast headless Next.js rebuild of our fintech portal with Supabase backend and animated landing pages.",
    status: "qualified",
    source: "contact_form",
  },
  {
    id: "lead-003",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    full_name: "Dr. Samina Khan",
    email: "samina@careclinic.pk",
    phone: "+92 321 9876543",
    company: "Care Specialized Clinic",
    service_label: "AI Workflow Automations (n8n)",
    budget_range: "$400 – $1,000 (~₨110k – ₨275k)",
    message: "Need automated patient booking reminders and medical history intake integrated directly through WhatsApp API.",
    status: "contacted",
    source: "whatsapp_direct",
  },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockInitialLeads);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch from Supabase
  useEffect(() => {
    async function loadLeads() {
      try {
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setLeads(data as any);
        }
      } catch (err) {
        console.warn("Using offline mock leads:", err);
      }
    }
    loadLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.full_name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(search.toLowerCase())) ||
      (lead.service_label && lead.service_label.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = async (leadId: string, newStatus: Lead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }

    try {
      await supabase.from("leads").update({ status: newStatus }).eq("id", leadId);
    } catch (e) {
      console.warn("DB update skipped:", e);
    }
  };

  const handleAddNote = () => {
    if (!newNoteText.trim() || !selectedLead) return;
    const newNote: Note = {
      id: `note-${Date.now()}`,
      created_at: new Date().toISOString(),
      author_name: "Staff Admin",
      note_content: newNoteText.trim(),
    };
    setNotes([newNote, ...notes]);
    setNewNoteText("");
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Created At", "Name", "Email", "Phone", "Company", "Service", "Budget", "Status", "Message"];
    const rows = filteredLeads.map((l) => [
      l.id,
      new Date(l.created_at).toLocaleString(),
      `"${l.full_name}"`,
      l.email,
      `"${l.phone || ""}"`,
      `"${l.company || ""}"`,
      `"${l.service_label || ""}"`,
      `"${l.budget_range || ""}"`,
      l.status,
      `"${l.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sardyx_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white flex items-center gap-2">
            <Users2 className="text-[#8A2BEF]" size={28} />
            Leads & Inquiries CRM
          </h1>
          <p className="text-sm text-[#8A849F] mt-1">
            Track, qualify, and convert inbound enterprise prospects from websites, WhatsApp, and campaigns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.08] text-xs font-semibold cursor-pointer transition-colors"
          >
            <Download size={15} />
            Export CSV
          </button>

          <div className="flex items-center bg-[#14111F] p-1 rounded-xl border border-white/[0.08]">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                viewMode === "table" ? "bg-[#8A2BEF] text-white" : "text-[#8A849F] hover:text-white"
              }`}
              title="Table View"
            >
              <TableIcon size={16} />
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                viewMode === "kanban" ? "bg-[#8A2BEF] text-white" : "text-[#8A849F] hover:text-white"
              }`}
              title="Kanban Pipeline"
            >
              <Kanban size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A849F]" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, company, service..."
            className="w-full bg-[#0D0B16] border border-white/[0.08] focus:border-[#8A2BEF] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#8A849F] focus:outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {["all", "new", "contacted", "qualified", "proposal", "won", "lost"].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap cursor-pointer transition-colors ${
                selectedStatus === st
                  ? "bg-[#8A2BEF] text-white"
                  : "bg-white/[0.03] text-[#8A849F] hover:text-white border border-white/[0.05]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* View Mode: Table */}
      {viewMode === "table" && (
        <div className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#14111F] text-[#8A849F] text-[11px] font-mono uppercase tracking-wider border-b border-white/[0.08]">
                <tr>
                  <th className="py-3 px-4">Lead / Client</th>
                  <th className="py-3 px-4">Service & Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#8A849F]">
                      No leads match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const statusConf = statusColors[lead.status];
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="hover:bg-white/[0.02] cursor-pointer transition-colors group"
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white group-hover:text-[#00C0FF] transition-colors">
                            {lead.full_name}
                          </div>
                          <div className="text-xs text-[#8A849F] flex items-center gap-2 mt-0.5">
                            <span>{lead.email}</span>
                            {lead.phone && <span>• {lead.phone}</span>}
                          </div>
                          {lead.company && (
                            <div className="text-[11px] text-[#A66BFF] mt-0.5 flex items-center gap-1">
                              <Building size={11} /> {lead.company}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-white text-xs font-medium">
                            {lead.service_label || "Custom Inquiry"}
                          </div>
                          <div className="text-xs text-[#8A849F] mt-0.5">
                            {lead.budget_range || "Flexible"}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusConf.bg} ${statusConf.text} ${statusConf.border}`}
                          >
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-[#8A849F]">
                          {new Date(lead.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            {lead.phone && (
                              <a
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare size={14} />
                              </a>
                            )}
                            <a
                              href={`mailto:${lead.email}?subject=Regarding your inquiry at SARDYX AI`}
                              className="p-1.5 rounded-lg bg-[#00C0FF]/10 text-[#00C0FF] hover:bg-[#00C0FF]/20 transition-colors"
                              title="Send Email"
                            >
                              <Mail size={14} />
                            </a>
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="p-1.5 rounded-lg bg-white/[0.05] text-[#B8B3CC] hover:text-white hover:bg-white/[0.1] transition-colors"
                            >
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Mode: Kanban */}
      {viewMode === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(["new", "contacted", "qualified", "proposal"] as const).map((col) => {
            const colLeads = leads.filter((l) => l.status === col);
            const conf = statusColors[col];
            return (
              <div key={col} className="bg-[#0D0B16] rounded-2xl border border-white/[0.08] p-3 flex flex-col">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${conf.bg} border ${conf.border}`} />
                    <span className="font-heading font-bold text-xs uppercase tracking-wider text-white">
                      {col}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8A849F] px-2 py-0.5 rounded-full bg-white/[0.04]">
                    {colLeads.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[600px]">
                  {colLeads.length === 0 ? (
                    <div className="text-center py-8 text-xs text-[#8A849F]/60 border border-dashed border-white/[0.04] rounded-xl">
                      Empty stage
                    </div>
                  ) : (
                    colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="bg-[#14111F] hover:bg-[#1C1830] p-3 rounded-xl border border-white/[0.05] cursor-pointer transition-colors space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-semibold text-white">{lead.full_name}</h4>
                          <span className="text-[10px] text-[#8A849F]">
                            {new Date(lead.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                          </span>
                        </div>
                        {lead.company && (
                          <p className="text-[11px] text-[#A66BFF] flex items-center gap-1">
                            <Building size={10} /> {lead.company}
                          </p>
                        )}
                        <p className="text-[11px] text-[#B8B3CC] line-clamp-2">{lead.message}</p>
                        <div className="pt-1 flex items-center justify-between text-[10px] text-[#8A849F] border-t border-white/[0.04]">
                          <span>{lead.service_label || "Inquiry"}</span>
                          <span>{lead.budget_range?.split(" ")[0]}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm p-0 sm:p-4">
          <div className="w-full sm:max-w-xl h-full sm:h-[95vh] bg-[#0D0B16] sm:rounded-2xl border border-white/[0.1] shadow-2xl flex flex-col overflow-hidden">
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-[#14111F]">
              <div>
                <span className="text-[10px] font-mono text-[#8A849F] uppercase">Lead Details</span>
                <h3 className="text-lg font-heading font-bold text-white">{selectedLead.full_name}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-xl text-[#8A849F] hover:text-white hover:bg-white/[0.05] cursor-pointer"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-5 flex-1 overflow-y-auto space-y-6">
              {/* Status Selector Bar */}
              <div>
                <label className="text-xs font-mono uppercase text-[#8A849F] block mb-2">Stage & Status</label>
                <div className="flex flex-wrap gap-1.5">
                  {(["new", "contacted", "qualified", "proposal", "won", "lost", "spam"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedLead.id, st)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium capitalize cursor-pointer transition-colors ${
                        selectedLead.status === st
                          ? "bg-[#8A2BEF] text-white"
                          : "bg-white/[0.04] text-[#8A849F] hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-[#14111F] rounded-xl p-4 border border-white/[0.06] space-y-3">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#8A849F] block mb-0.5">Email Address</span>
                    <a href={`mailto:${selectedLead.email}`} className="text-[#00C0FF] hover:underline font-medium break-all">
                      {selectedLead.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[#8A849F] block mb-0.5">Phone / WhatsApp</span>
                    {selectedLead.phone ? (
                      <a
                        href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline font-medium"
                      >
                        {selectedLead.phone}
                      </a>
                    ) : (
                      <span className="text-[#8A849F]">Not provided</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[#8A849F] block mb-0.5">Company / Org</span>
                    <span className="text-white font-medium">{selectedLead.company || "Independent"}</span>
                  </div>
                  <div>
                    <span className="text-[#8A849F] block mb-0.5">Budget Allocated</span>
                    <span className="text-white font-medium">{selectedLead.budget_range || "Undecided"}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Message */}
              <div>
                <label className="text-xs font-mono uppercase text-[#8A849F] block mb-2">Inquiry Message</label>
                <div className="p-4 rounded-xl bg-[#14111F] border border-white/[0.06] text-xs sm:text-sm text-[#F5F3FF] leading-relaxed whitespace-pre-wrap">
                  {selectedLead.message}
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex gap-3">
                {selectedLead.phone && (
                  <a
                    href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello ${selectedLead.full_name}, this is Sardar M. Abdullah from SARDYX AI. Thank you for your project inquiry regarding ${selectedLead.service_label || "software development"}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    <MessageSquare size={16} />
                    WhatsApp Client
                  </a>
                )}
                <a
                  href={`mailto:${selectedLead.email}?subject=SARDYX AI Discovery — ${selectedLead.service_label || "Project Inquiry"}&body=Hello ${selectedLead.full_name},%0D%0A%0D%0AThank you for reaching out to SARDYX AI.`}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#8A2BEF] hover:bg-[#7220CC] text-white text-xs font-semibold cursor-pointer transition-colors"
                >
                  <Mail size={16} />
                  Send Official Email
                </a>
              </div>

              {/* Internal Staff Notes */}
              <div>
                <label className="text-xs font-mono uppercase text-[#8A849F] block mb-2">Internal Staff Notes</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                    placeholder="Add an internal note or next call date..."
                    className="flex-1 bg-[#14111F] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#8A2BEF]"
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-3.5 py-2 bg-[#8A2BEF] hover:bg-[#7220CC] text-white rounded-xl text-xs font-medium cursor-pointer"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {notes.length === 0 ? (
                    <p className="text-[11px] text-[#8A849F] italic">No internal notes added yet.</p>
                  ) : (
                    notes.map((n) => (
                      <div key={n.id} className="p-3 bg-[#14111F] rounded-xl border border-white/[0.04] text-xs">
                        <div className="flex items-center justify-between text-[10px] text-[#8A849F] mb-1">
                          <span className="font-semibold text-[#A66BFF]">{n.author_name}</span>
                          <span>{new Date(n.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                        <p className="text-white">{n.note_content}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
