"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Save,
  Trash2,
  CheckCircle,
  RefreshCw,
  Plus,
  Edit3,
  Inbox,
  FileText,
  DollarSign,
  PhoneCall,
  Users,
  MessageSquare,
  LogOut,
  Sparkles,
  ExternalLink,
  Search,
  Sliders,
  Check,
  X,
  Camera,
  Upload
} from "lucide-react";
import { mockAllServices, mockTestimonials, mockTeam } from "@/lib/supabase";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"pricing" | "blogs" | "contact" | "leads" | "testimonials" | "team">("pricing");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  // Data States
  const [services, setServices] = useState<any[]>(mockAllServices);
  const [testimonials, setTestimonials] = useState<any[]>(mockTestimonials);
  const [team, setTeam] = useState<any[]>(mockTeam);
  const [leads, setLeads] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);

  // Agency Contact Details State
  const [contactSettings, setContactSettings] = useState({
    primaryEmail: "sardyxai@gmail.com",
    whatsappNumber: "+92 3499398141",
    phoneDisplay: "+92 3499398141",
    headquarters: "Global Hub (USA, UK & Pakistan)",
    instagramUrl: "https://www.instagram.com/sardyxai.pk/",
    facebookUrl: "https://www.facebook.com/profile.php?id=61593771264721",
    websiteUrl: "https://www.sardyxai.com/"
  });

  // Modals & Editing States
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const [selectedTeamMember, setSelectedTeamMember] = useState<any | null>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("sardyx_auth");
    if (authStatus === "authorized") {
      setIsAuthenticated(true);
      loadSavedData();
      fetchData();
    }
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = username.trim().toLowerCase();
    if ((cleanUser === "admin" || cleanUser === "sardyxadmin") && password === "smafSARDYXAI3072009@") {
      setIsAuthenticated(true);
      localStorage.setItem("sardyx_auth", "authorized");
      setLoginError("");
      loadSavedData();
      fetchData();
      showToast("Access Authorized. Welcome to SARDYX Control Panel.");
    } else {
      setLoginError("Invalid credentials. Please verify your username and password.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("sardyx_auth");
  };

  const loadSavedData = () => {
    const savedServices = localStorage.getItem("sardyx_services_override");
    if (savedServices) {
      try { setServices(JSON.parse(savedServices)); } catch {}
    }
    const savedTeam = localStorage.getItem("sardyx_team_override");
    if (savedTeam) {
      try { setTeam(JSON.parse(savedTeam)); } catch {}
    }
    const savedContact = localStorage.getItem("sardyx_contact_settings");
    if (savedContact) {
      try { setContactSettings(JSON.parse(savedContact)); } catch {}
    }
    const savedBlogs = localStorage.getItem("sardyx_blogs_override");
    if (savedBlogs) {
      try { setBlogs(JSON.parse(savedBlogs)); } catch {}
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [testRes, teamRes, leadRes, blogRes] = await Promise.all([
        fetch("/api/admin/testimonials").catch(() => null),
        fetch("/api/admin/team").catch(() => null),
        fetch("/api/admin/leads").catch(() => null),
        fetch("/api/admin/blog").catch(() => null),
      ]);

      if (testRes && testRes.ok) {
        const d = await testRes.json();
        if (d && d.length > 0) setTestimonials(d);
      }
      if (teamRes && teamRes.ok) {
        const d = await teamRes.json();
        if (d && d.length > 0) {
          setTeam(d);
          localStorage.setItem("sardyx_team_override", JSON.stringify(d));
        }
      }
      if (leadRes && leadRes.ok) {
        const d = await leadRes.json();
        if (d) setLeads(d);
      }
      if (blogRes && blogRes.ok) {
        const d = await blogRes.json();
        if (d && d.length > 0) {
          setBlogs(d);
          localStorage.setItem("sardyx_blogs_override", JSON.stringify(d));
        }
      }
    } catch (err) {
      console.warn("Using local fallback data in panel", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── SERVICES & PRICING ACTIONS ── */
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    let updated: any[];
    if (selectedService.id) {
      updated = services.map((s) => (s.id === selectedService.id ? selectedService : s));
    } else {
      const newService = {
        ...selectedService,
        id: `s_${Date.now()}`,
        slug: selectedService.slug || selectedService.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      };
      updated = [newService, ...services];
    }

    setServices(updated);
    localStorage.setItem("sardyx_services_override", JSON.stringify(updated));

    try {
      await fetch("/api/admin/services", {
        method: selectedService.id && !selectedService.id.startsWith("s_") ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedService),
      });
    } catch {}

    setIsServiceModalOpen(false);
    setSelectedService(null);
    showToast("Service & Pricing details updated successfully!");
  };

  const handleDeleteService = (id: string) => {
    if (!confirm("Are you sure you want to remove this service?")) return;
    const updated = services.filter((s) => s.id !== id);
    setServices(updated);
    localStorage.setItem("sardyx_services_override", JSON.stringify(updated));
    showToast("Service removed from catalog.");
  };

  /* ── BLOG ACTIONS ── */
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBlog) return;

    let updated: any[];
    const blogData = {
      ...selectedBlog,
      slug: selectedBlog.slug || selectedBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      created_at: selectedBlog.created_at || new Date().toISOString(),
    };

    if (selectedBlog.id) {
      updated = blogs.map((b) => (b.id === selectedBlog.id ? blogData : b));
    } else {
      blogData.id = `b_${Date.now()}`;
      updated = [blogData, ...blogs];
    }

    setBlogs(updated);
    localStorage.setItem("sardyx_blogs_override", JSON.stringify(updated));

    try {
      await fetch("/api/admin/blog", {
        method: selectedBlog.id && !selectedBlog.id.startsWith("b_") ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
    } catch {}

    setIsBlogModalOpen(false);
    setSelectedBlog(null);
    showToast("Blog article published / updated successfully!");
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Delete this blog article?")) return;
    const updated = blogs.filter((b) => b.id !== id);
    setBlogs(updated);
    localStorage.setItem("sardyx_blogs_override", JSON.stringify(updated));
    try {
      await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    } catch {}
    showToast("Blog article deleted.");
  };

  /* ── CONTACT SETTINGS ACTIONS ── */
  const handleSaveContactSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sardyx_contact_settings", JSON.stringify(contactSettings));
    showToast("Agency contact information and social channels updated!");
  };

  /* ── TESTIMONIAL ACTIONS ── */
  const toggleFeedbackApproval = async (id: string, current: boolean) => {
    const updated = testimonials.map((t) => (t.id === id ? { ...t, approved: !current } : t));
    setTestimonials(updated);
    try {
      await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved: !current }),
      });
    } catch {}
    showToast(current ? "Review set to unapproved" : "Review approved for live showcase");
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    const updated = testimonials.filter((t) => t.id !== id);
    setTestimonials(updated);
    try {
      await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    } catch {}
    showToast("Testimonial deleted.");
  };

  /* ── TEAM ACTIONS ── */
  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeamMember) return;

    let updated: any[];
    if (selectedTeamMember.id) {
      updated = team.map((t) => (t.id === selectedTeamMember.id ? selectedTeamMember : t));
    } else {
      const newMember = {
        ...selectedTeamMember,
        id: `t_${Date.now()}`,
        image_url: selectedTeamMember.image_url || "/team/fazal.jpeg"
      };
      updated = [...team, newMember];
    }
    setTeam(updated);
    localStorage.setItem("sardyx_team_override", JSON.stringify(updated));

    try {
      await fetch("/api/admin/team", {
        method: selectedTeamMember.id && !selectedTeamMember.id.startsWith("t_") ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedTeamMember),
      });
    } catch {}

    setIsTeamModalOpen(false);
    setSelectedTeamMember(null);
    showToast("Team member profile & photo saved successfully!");
  };

  const handleDeleteTeamMember = (id: string) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;
    const updated = team.filter((t) => t.id !== id);
    setTeam(updated);
    localStorage.setItem("sardyx_team_override", JSON.stringify(updated));
    showToast("Team member removed.");
  };

  /* ── LOGIN SCREEN ── */
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-md glass-panel p-8 md:p-10 rounded-3xl border border-primary/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] bg-black/90 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-black font-black shadow-[0_0_20px_rgba(0,240,255,0.6)]">
              <Lock size={22} />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">SARDYX AI Core Admin</h1>
            <p className="text-xs text-gray-400 mt-1 font-mono">Restricted Management Environment</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-2xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
                Admin Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-primary focus:outline-none text-sm text-white placeholder-gray-600 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-2xs font-mono uppercase tracking-wider text-gray-400 mb-1.5 font-bold">
                Passcode
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-primary focus:outline-none text-sm text-white placeholder-gray-600 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer mt-2"
            >
              Authorize System Access
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  /* ── AUTHENTICATED DASHBOARD ── */
  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 relative overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            className={`fixed top-6 left-1/2 z-50 px-6 py-3 rounded-full text-xs font-bold font-mono tracking-wide shadow-2xl flex items-center gap-2 ${
              notification.type === "success"
                ? "bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                : "bg-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.5)]"
            }`}
          >
            <CheckCircle size={15} />
            <span>{notification.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 lg:px-16">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-2xs font-mono uppercase tracking-widest text-primary font-bold">
                SARDYX AI Enterprise Control Panel
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white mt-1">Management Console</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-4 py-2 rounded-xl glass-panel border border-white/10 hover:border-primary/40 text-gray-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span>Sync</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-white/5">
          {[
            { id: "pricing", label: "Services & Pricing", icon: <DollarSign size={15} /> },
            { id: "blogs", label: "Blogs & Insights", icon: <FileText size={15} /> },
            { id: "contact", label: "Contact & Socials", icon: <PhoneCall size={15} /> },
            { id: "leads", label: `Client Leads (${leads.length})`, icon: <Inbox size={15} /> },
            { id: "testimonials", label: "Testimonials", icon: <MessageSquare size={15} /> },
            { id: "team", label: "Team Members", icon: <Users size={15} /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-primary text-black shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    : "glass-panel text-gray-400 hover:text-white border-white/5"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: SERVICES & PRICING ── */}
        {activeTab === "pricing" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">All 11 Agency Services & Rates</h2>
                <p className="text-xs text-gray-400 mt-0.5">Edit live USD/PKR pricing, descriptions, and feature deliverables.</p>
              </div>
              <button
                onClick={() => {
                  setSelectedService({
                    title: "",
                    slug: "",
                    category: "Development",
                    shortDesc: "",
                    priceUsd: 499,
                    pricePkr: 135000,
                    icon: "LayoutTemplate",
                    features: ["Custom Feature 1", "Custom Feature 2", "Custom Feature 3"]
                  });
                  setIsServiceModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-all shrink-0 cursor-pointer"
              >
                <Plus size={15} /> Add Custom Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((svc) => (
                <div
                  key={svc.id}
                  className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between bg-black/40 hover:border-primary/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 uppercase font-bold">
                        {svc.category}
                      </span>
                      <div className="text-right">
                        <span className="text-lg font-black text-primary block">${svc.priceUsd}</span>
                        <span className="text-2xs text-gray-400 font-mono">₨ {Math.round(svc.pricePkr / 1000)}k</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{svc.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">{svc.shortDesc}</p>

                    <ul className="space-y-1.5 mb-6">
                      {svc.features?.slice(0, 3).map((f: string, i: number) => (
                        <li key={i} className="text-2xs text-gray-300 flex items-center gap-2">
                          <Check size={12} className="text-primary shrink-0" />
                          <span className="truncate">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <button
                      onClick={() => {
                        setSelectedService(svc);
                        setIsServiceModalOpen(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-primary hover:text-black text-white text-xs font-bold transition-all border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 size={13} /> Edit Pricing & Details
                    </button>
                    <button
                      onClick={() => handleDeleteService(svc.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/25 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 2: BLOGS & INSIGHTS ── */}
        {activeTab === "blogs" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Articles & Thought Leadership</h2>
                <p className="text-xs text-gray-400 mt-0.5">Publish articles to drive organic search traffic and establish agency authority.</p>
              </div>
              <button
                onClick={() => {
                  setSelectedBlog({
                    title: "",
                    slug: "",
                    category: "AI & Engineering",
                    read_time: "5 min read",
                    excerpt: "",
                    content: "",
                    cover_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
                    author: "SARDYX AI Research Team"
                  });
                  setIsBlogModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-all shrink-0 cursor-pointer"
              >
                <Plus size={15} /> New Blog Article
              </button>
            </div>

            {blogs.length === 0 ? (
              <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center">
                <FileText size={32} className="mx-auto text-gray-500 mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No Custom Articles Stored</h3>
                <p className="text-xs text-gray-400 mb-4">Click 'New Blog Article' to create your first published insight.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((b) => (
                  <div
                    key={b.id}
                    className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between bg-black/40"
                  >
                    <div>
                      {b.cover_image && (
                        <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4 border border-white/10">
                          <img src={b.cover_image} alt={b.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-2xs font-mono text-primary mb-2">
                        <span>{b.category || "Insight"}</span>
                        <span>•</span>
                        <span>{b.read_time || "4 min"}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 leading-snug">{b.title}</h3>
                      <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3">{b.excerpt}</p>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-white/10">
                      <button
                        onClick={() => {
                          setSelectedBlog(b);
                          setIsBlogModalOpen(true);
                        }}
                        className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-primary hover:text-black text-white text-xs font-bold transition-all border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 size={13} /> Edit Article
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/25 transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: CONTACT & SOCIAL SETTINGS ── */}
        {activeTab === "contact" && (
          <div className="max-w-3xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Agency Contact & Social Channels</h2>
              <p className="text-xs text-gray-400 mt-0.5">Configure live receiving email, phone, WhatsApp desk, and official social pages.</p>
            </div>

            <form onSubmit={handleSaveContactSettings} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 bg-black/40">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-2xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-bold">
                    Primary Receiving Email
                  </label>
                  <input
                    type="email"
                    value={contactSettings.primaryEmail}
                    onChange={(e) => setContactSettings({ ...contactSettings, primaryEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-2xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-bold">
                    WhatsApp Desk Number
                  </label>
                  <input
                    type="text"
                    value={contactSettings.whatsappNumber}
                    onChange={(e) => setContactSettings({ ...contactSettings, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-2xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-bold">
                    Phone Display
                  </label>
                  <input
                    type="text"
                    value={contactSettings.phoneDisplay}
                    onChange={(e) => setContactSettings({ ...contactSettings, phoneDisplay: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-2xs font-mono uppercase tracking-wider text-gray-400 mb-2 font-bold">
                    HQ Operations / Location
                  </label>
                  <input
                    type="text"
                    value={contactSettings.headquarters}
                    onChange={(e) => setContactSettings({ ...contactSettings, headquarters: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-primary font-mono uppercase tracking-wider">Social Links</h3>
                
                <div>
                  <label className="block text-2xs font-mono text-gray-400 mb-1">Instagram URL</label>
                  <input
                    type="url"
                    value={contactSettings.instagramUrl}
                    onChange={(e) => setContactSettings({ ...contactSettings, instagramUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-2xs font-mono text-gray-400 mb-1">Facebook Page URL</label>
                  <input
                    type="url"
                    value={contactSettings.facebookUrl}
                    onChange={(e) => setContactSettings({ ...contactSettings, facebookUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-primary text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
                >
                  <Save size={15} /> Save Contact Details
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── TAB 4: CLIENT LEADS ── */}
        {activeTab === "leads" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Client Transmissions & Inquiries</h2>
              <p className="text-xs text-gray-400 mt-0.5">Real-time incoming requests submitted through the contact forms.</p>
            </div>

            {leads.length === 0 ? (
              <div className="glass-panel p-12 rounded-3xl border border-white/10 text-center">
                <Inbox size={32} className="mx-auto text-gray-500 mb-3" />
                <h3 className="text-base font-bold text-white mb-1">No Leads Stored Yet</h3>
                <p className="text-xs text-gray-400">Incoming inquiries from the website contact forms will appear here in real-time.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leads.map((l) => (
                  <div key={l.id} className="glass-panel p-5 rounded-2xl border border-white/10 bg-black/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-white">{l.name}</h4>
                        <span className="text-2xs px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">{l.email}</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{l.message}</p>
                      <span className="text-3xs text-gray-500 font-mono mt-1 block">
                        {l.created_at ? new Date(l.created_at).toLocaleString() : "Just now"}
                      </span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <a
                        href={`mailto:${l.email}`}
                        className="px-3.5 py-1.5 rounded-lg bg-primary text-black text-xs font-bold"
                      >
                        Reply
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 5: TESTIMONIALS ── */}
        {activeTab === "testimonials" && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Client Feedback & Reviews</h2>
              <p className="text-xs text-gray-400 mt-0.5">Review, approve, or remove user-submitted testimonials.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="glass-panel p-6 rounded-3xl border border-white/10 bg-black/40 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-2xs font-mono px-2.5 py-0.5 rounded-full font-bold uppercase ${
                        t.approved ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}>
                        {t.approved ? "Live on Web" : "Pending Approval"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 italic mb-4 leading-relaxed">"{t.quote}"</p>
                    <h4 className="text-sm font-bold text-white">{t.author}</h4>
                    <p className="text-2xs text-gray-400 font-mono">{t.role}</p>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-white/10 mt-4">
                    <button
                      onClick={() => toggleFeedbackApproval(t.id, t.approved)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        t.approved ? "bg-white/10 text-gray-300 hover:bg-white/20" : "bg-emerald-500 text-black hover:bg-white"
                      }`}
                    >
                      {t.approved ? "Hide from Web" : "Approve & Show"}
                    </button>
                    <button
                      onClick={() => deleteFeedback(t.id)}
                      className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 6: TEAM MANAGEMENT WITH LOCAL PICTURE UPLOAD ── */}
        {activeTab === "team" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Team Members & Leadership</h2>
                <p className="text-xs text-gray-400 mt-0.5">Add, edit, adjust bios, and upload local photos from your device.</p>
              </div>
              <button
                onClick={() => {
                  setSelectedTeamMember({
                    name: "",
                    role: "",
                    category: "AI & Engineering",
                    bio: "",
                    image_url: "",
                    twitter: "#",
                    linkedin: "#",
                    github: "#"
                  });
                  setIsTeamModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-all shrink-0 cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                <Plus size={15} /> Add Team Member
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((m) => (
                <div key={m.id} className="glass-panel p-6 rounded-3xl border border-white/10 bg-black/40 flex flex-col justify-between hover:border-primary/30 transition-colors">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20 bg-white/5 shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <img src={m.image_url || "/team/fazal.jpeg"} alt={m.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-3xs font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-primary border border-white/10 mb-1 inline-block">
                          {m.category || "Team"}
                        </span>
                        <h4 className="text-sm font-bold text-white">{m.name}</h4>
                        <p className="text-2xs text-gray-400 font-mono">{m.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 mb-4">{m.bio}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setSelectedTeamMember(m);
                        setIsTeamModalOpen(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-primary hover:text-black text-white text-xs font-bold transition-all border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Edit3 size={13} /> Edit Details & Picture
                    </button>
                    <button
                      onClick={() => handleDeleteTeamMember(m.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/25 text-rose-400 border border-rose-500/20 transition-colors cursor-pointer"
                      title="Delete Member"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── MODAL: SERVICE & PRICING EDITOR ── */}
      <AnimatePresence>
        {isServiceModalOpen && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl glass-panel p-6 md:p-8 rounded-3xl border border-primary/40 bg-black/95 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-black text-white mb-4">Edit Service & Pricing Matrix</h3>

              <form onSubmit={handleSaveService} className="space-y-4">
                <div>
                  <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Service Title</label>
                  <input
                    type="text"
                    value={selectedService.title}
                    onChange={(e) => setSelectedService({ ...selectedService, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Starting Price (USD $)</label>
                    <input
                      type="number"
                      value={selectedService.priceUsd}
                      onChange={(e) => setSelectedService({ ...selectedService, priceUsd: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Starting Price (PKR ₨)</label>
                    <input
                      type="number"
                      value={selectedService.pricePkr}
                      onChange={(e) => setSelectedService({ ...selectedService, pricePkr: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={selectedService.category}
                      onChange={(e) => setSelectedService({ ...selectedService, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Icon Identifier</label>
                    <input
                      type="text"
                      value={selectedService.icon}
                      onChange={(e) => setSelectedService({ ...selectedService, icon: e.target.value })}
                      placeholder="LayoutTemplate / Cpu / Bot"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Short Description</label>
                  <textarea
                    rows={3}
                    value={selectedService.shortDesc}
                    onChange={(e) => setSelectedService({ ...selectedService, shortDesc: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Deliverables / Features (one per line)</label>
                  <textarea
                    rows={4}
                    value={selectedService.features?.join("\n") || ""}
                    onChange={(e) => setSelectedService({ ...selectedService, features: e.target.value.split("\n").filter(Boolean) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsServiceModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
                  >
                    Save Service Details
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: BLOG EDITOR ── */}
      <AnimatePresence>
        {isBlogModalOpen && selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl glass-panel p-6 md:p-8 rounded-3xl border border-primary/40 bg-black/95 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-black text-white mb-4">Blog Article Editor</h3>

              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div>
                  <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Article Title</label>
                  <input
                    type="text"
                    value={selectedBlog.title}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={selectedBlog.category}
                      onChange={(e) => setSelectedBlog({ ...selectedBlog, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Read Time</label>
                    <input
                      type="text"
                      value={selectedBlog.read_time}
                      onChange={(e) => setSelectedBlog({ ...selectedBlog, read_time: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <ImageUploader
                    currentUrl={selectedBlog.cover_image}
                    folder="blog"
                    label="Article Cover Image (Upload locally or paste URL)"
                    onUpload={(url) => setSelectedBlog({ ...selectedBlog, cover_image: url })}
                  />
                </div>

                <div>
                  <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Excerpt / Meta Summary</label>
                  <textarea
                    rows={2}
                    value={selectedBlog.excerpt}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, excerpt: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Full Article Content (Markdown / Text)</label>
                  <textarea
                    rows={8}
                    value={selectedBlog.content}
                    onChange={(e) => setSelectedBlog({ ...selectedBlog, content: e.target.value })}
                    placeholder="Write your article content here..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBlogModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
                  >
                    Publish Article
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: TEAM MEMBER EDITOR WITH LOCAL PICTURE UPLOAD ── */}
      <AnimatePresence>
        {isTeamModalOpen && selectedTeamMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-panel p-6 md:p-8 rounded-3xl border border-primary/40 bg-black/95 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsTeamModalOpen(false)}
                className="absolute top-5 right-5 text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-black text-white mb-4">
                {selectedTeamMember.id ? "Edit Team Member Details" : "Add New Team Member"}
              </h3>

              <form onSubmit={handleSaveTeamMember} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={selectedTeamMember.name}
                      onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, name: e.target.value })}
                      placeholder="e.g. Mr. John Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Role Title</label>
                    <input
                      type="text"
                      value={selectedTeamMember.role}
                      onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, role: e.target.value })}
                      placeholder="e.g. Senior AI Engineer"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Department / Category</label>
                  <select
                    value={selectedTeamMember.category || "AI & Engineering"}
                    onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none cursor-pointer"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="AI & Engineering">AI & Engineering</option>
                    <option value="Growth & Strategy">Growth & Strategy</option>
                    <option value="Creative Design">Creative Design</option>
                  </select>
                </div>

                {/* Local Image Uploader & Device File Picker */}
                <div>
                  <ImageUploader
                    currentUrl={selectedTeamMember.image_url}
                    folder="team"
                    label="Profile Picture (Upload locally from device or enter URL)"
                    onUpload={(url) => setSelectedTeamMember({ ...selectedTeamMember, image_url: url })}
                  />
                </div>

                <div>
                  <label className="block text-2xs font-mono uppercase text-gray-400 mb-1">Biography</label>
                  <textarea
                    rows={4}
                    value={selectedTeamMember.bio}
                    onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, bio: e.target.value })}
                    placeholder="Brief description of skills, role, and achievements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/15 text-white text-sm focus:border-primary focus:outline-none resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-3xs font-mono uppercase text-gray-500 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={selectedTeamMember.linkedin || ""}
                      onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, linkedin: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-3xs font-mono uppercase text-gray-500 mb-1">Twitter / X URL</label>
                    <input
                      type="text"
                      value={selectedTeamMember.twitter || ""}
                      onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, twitter: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-3xs font-mono uppercase text-gray-500 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={selectedTeamMember.github || ""}
                      onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, github: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-lg bg-black border border-white/15 text-xs text-white focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsTeamModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
                  >
                    Save Member Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
