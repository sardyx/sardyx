"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Save, Trash2, CheckCircle, RefreshCw, XCircle, Plus, Edit3, ShieldAlert, Inbox, FileText } from "lucide-react";
import { mockPackages, mockTestimonials, mockTeam } from "@/lib/supabase";
import ImageUploader from "@/components/admin/ImageUploader";

const staticServicesFallback = [
  { id: "s1", title: "AI Automation", description: "Streamline complex workflows with advanced autonomous agents operating at superhuman speed.", icon: "Cpu" },
  { id: "s2", title: "AI Chatbots", description: "Intelligent conversational interfaces that understand context and resolve issues seamlessly.", icon: "MessageSquareText" },
  { id: "s3", title: "Web Design", description: "Ultra-premium, high-performance UI tailored for futuristic brands with cinematic interactions.", icon: "LayoutTemplate" },
  { id: "s4", title: "Digital Growth", description: "Data-driven SEO strategies, advanced funnels, and analytics mapping to scale your operations.", icon: "Globe" },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [packages, setPackages] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("pricing");
  const [loading, setLoading] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<any>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("sardyx_auth");
    if (authStatus === "authorized") {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "sardyxadmin2026") {
      setIsAuthenticated(true);
      localStorage.setItem("sardyx_auth", "authorized");
      setLoginError("");
      fetchData();
    } else {
      setLoginError("Invalid cryptographic credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("sardyx_auth");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pkgRes, testRes, teamRes, servRes, leadRes, blogRes] = await Promise.all([
        fetch("/api/admin/packages"),
        fetch("/api/admin/testimonials"),
        fetch("/api/admin/team"),
        fetch("/api/admin/services"),
        fetch("/api/admin/leads"),
        fetch("/api/admin/blog"),
      ]);
      const pkgData = pkgRes.ok ? await pkgRes.json() : null;
      const testData = testRes.ok ? await testRes.json() : null;
      const teamData = teamRes.ok ? await teamRes.json() : null;
      const servData = servRes.ok ? await servRes.json() : null;
      const leadData = leadRes.ok ? await leadRes.json() : null;
      const blogData = blogRes.ok ? await blogRes.json() : null;

      setPackages(pkgData?.length > 0 ? pkgData : mockPackages);
      setTestimonials(testData?.length > 0 ? testData : mockTestimonials);
      setTeam(teamData?.length > 0 ? teamData : mockTeam);
      setServices(servData?.length > 0 ? servData : staticServicesFallback);
      setLeads(leadData || []);
      setBlogs(blogData || []);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Feedback ── */
  const toggleFeedbackApproval = async (id: string, current: boolean) => {
    await fetch("/api/admin/testimonials", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, approved: !current }) });
    fetchData();
  };
  const deleteFeedback = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  /* ── Packages ── */
  const handleUpdatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/packages", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...selectedPackage, price_usd: Number(selectedPackage.price_usd) }) });
    setSelectedPackage(null);
    fetchData();
  };

  /* ── Team ── */
  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = selectedTeamMember.id && !selectedTeamMember.id.startsWith("t") ? "PATCH" : "POST";
    await fetch("/api/admin/team", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(selectedTeamMember) });
    setIsTeamModalOpen(false);
    setSelectedTeamMember(null);
    fetchData();
  };
  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm("Remove this team member?")) return;
    await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  /* ── Services ── */
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = selectedService.id && !selectedService.id.startsWith("s") ? "PATCH" : "POST";
    await fetch("/api/admin/services", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(selectedService) });
    setIsServiceModalOpen(false);
    setSelectedService(null);
    fetchData();
  };
  const handleDeleteService = async (id: string) => {
    if (!confirm("Remove this service?")) return;
    await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  /* ── Leads ── */
  const handleDeleteLead = async (id: string) => {
    if (!confirm("Clear this message?")) return;
    await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  /* ── Blog ── */
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = selectedBlog.id ? "PATCH" : "POST";
    await fetch("/api/admin/blog", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(selectedBlog) });
    setIsBlogModalOpen(false);
    setSelectedBlog(null);
    fetchData();
  };
  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    fetchData();
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute w-96 h-96 bg-primary/20 blur-[120px] pointer-events-none" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <Lock size={20} />
            </div>
          </div>
          <h1 className="text-2xl font-black text-center mb-2 tracking-tight">Access Secure Node</h1>
          <p className="text-gray-400 text-xs text-center mb-8 font-mono">SARDYX SECURITY PROTOCOL ACTIVATED</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm" required />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm" required />
            </div>
            {loginError && <p className="text-red-500 text-xs font-semibold font-mono text-center">{loginError}</p>}
            <button type="submit" className="w-full py-4 bg-primary text-black font-semibold rounded-xl hover:bg-white transition-all font-mono text-sm uppercase tracking-wider">Verify Credentials</button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="container mx-auto px-6 lg:px-16 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4 pb-6 border-b border-white/10">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <ShieldAlert className="text-primary animate-pulse" /> SARDYX Admin Panel
            </h1>
            <p className="text-gray-400 text-sm font-mono mt-1">Operational configuration cluster</p>
          </div>
          <div className="flex gap-4">
            <button onClick={fetchData} className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
              <RefreshCw size={18} />
            </button>
            <button onClick={handleLogout} className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 font-mono text-xs uppercase font-bold">
              Disconnect Node
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 flex-wrap">
          {[
            { id: "pricing", label: "Pricing" },
            { id: "feedback", label: "Feedback" },
            { id: "team", label: "Team" },
            { id: "services", label: "Services" },
            { id: "blog", label: "Blog" },
            { id: "inbox", label: `Inbox ${leads.length > 0 ? `(${leads.length})` : ""}` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs uppercase font-bold border transition-all whitespace-nowrap ${activeTab === tab.id ? "bg-primary text-black border-primary" : "bg-white/5 text-gray-400 border-white/10 hover:text-white"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-mono flex items-center justify-center gap-2">
            <RefreshCw className="animate-spin text-primary" size={18} /> Loading system state...
          </div>
        ) : (
          <div>

            {/* ── PRICING ── */}
            {activeTab === "pricing" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-white mb-4 font-mono">System Packages</h2>
                  {packages.map((pkg) => (
                    <div key={pkg.id} onClick={() => setSelectedPackage({ ...pkg })} className={`p-6 rounded-2xl glass-panel border cursor-pointer transition-all ${selectedPackage?.id === pkg.id ? "border-primary bg-primary/5" : "border-white/5 hover:border-white/10"}`}>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold text-white">{pkg.name}</h3>
                        <span className="font-mono text-xs px-2 py-1 rounded bg-white/5 text-primary">${Number(pkg.price_usd).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-1">{pkg.description}</p>
                    </div>
                  ))}
                </div>
                <div>
                  {selectedPackage ? (
                    <form onSubmit={handleUpdatePackage} className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
                      <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2"><Edit3 size={16} /> Edit Package</h3>
                      <div>
                        <label className="block text-xs font-mono text-gray-400 mb-2">Package Name</label>
                        <input type="text" value={selectedPackage.name} onChange={(e) => setSelectedPackage({ ...selectedPackage, name: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-gray-400 mb-2">Price (USD)</label>
                        <input type="number" value={selectedPackage.price_usd} onChange={(e) => setSelectedPackage({ ...selectedPackage, price_usd: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm font-mono" required />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-gray-400 mb-2">Description</label>
                        <textarea rows={3} value={selectedPackage.description} onChange={(e) => setSelectedPackage({ ...selectedPackage, description: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm resize-none" required />
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={selectedPackage.highlighted} onChange={(e) => setSelectedPackage({ ...selectedPackage, highlighted: e.target.checked })} className="w-4 h-4 accent-primary" />
                        <label className="text-xs font-mono text-gray-400">Highlighted / Popular</label>
                      </div>
                      <div className="flex gap-4 pt-2">
                        <button type="submit" className="px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:bg-white transition-all text-xs font-mono uppercase flex items-center gap-2"><Save size={14} /> Save</button>
                        <button type="button" onClick={() => setSelectedPackage(null)} className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-mono uppercase">Cancel</button>
                      </div>
                    </form>
                  ) : (
                    <div className="h-full min-h-[300px] flex items-center justify-center border border-dashed border-white/10 rounded-3xl text-gray-500 text-sm font-mono">
                      Select a package to edit.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── FEEDBACK ── */}
            {activeTab === "feedback" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6 font-mono">Client Testimonial Feed</h2>
                {testimonials.length === 0 ? <p className="text-gray-500 font-mono text-sm">No submissions yet.</p> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((test) => (
                      <div key={test.id} className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <div><h4 className="font-bold text-white">{test.author}</h4><p className="text-xs text-gray-500 font-mono">{test.role}</p></div>
                            <span className={`px-3 py-1 rounded-full text-xs uppercase font-mono font-black ${test.approved ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"}`}>
                              {test.approved ? "Approved" : "Pending"}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm italic mb-4">"{test.quote}"</p>
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-white/5">
                          <button onClick={() => toggleFeedbackApproval(test.id, test.approved)} className={`px-4 py-2 rounded-lg text-xs font-mono uppercase font-bold flex items-center gap-1.5 ${test.approved ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/25" : "bg-green-500/10 text-green-500 border border-green-500/25"}`}>
                            {test.approved ? <XCircle size={12} /> : <CheckCircle size={12} />}
                            {test.approved ? "Revoke" : "Approve"}
                          </button>
                          <button onClick={() => deleteFeedback(test.id)} className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/25 text-xs font-mono uppercase font-bold flex items-center gap-1.5">
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── TEAM ── */}
            {activeTab === "team" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white font-mono">Expert Team Members</h2>
                  <button onClick={() => { setSelectedTeamMember({ name: "", role: "", bio: "", image_url: "", category: "Leadership", twitter: "#", linkedin: "#", github: "#" }); setIsTeamModalOpen(true); }} className="px-4 py-2.5 bg-primary text-black font-semibold rounded-xl hover:bg-white transition-all text-xs font-mono uppercase flex items-center gap-2">
                    <Plus size={14} /> Add Expert
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {team.map((member) => (
                    <div key={member.id} className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-black/40">
                          {member.image_url ? <img src={member.image_url} alt={member.name} className="w-full h-full object-cover grayscale" /> : <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold">{member.name?.charAt(0)}</div>}
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{member.name}</h4>
                          <p className="text-xs text-gray-500">{member.role}</p>
                          <span className="text-xs uppercase tracking-widest text-primary font-mono">{member.category}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-4">{member.bio}</p>
                      <div className="flex gap-3 pt-4 border-t border-white/5">
                        <button onClick={() => { setSelectedTeamMember(member); setIsTeamModalOpen(true); }} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-mono uppercase font-bold">Edit</button>
                        <button onClick={() => handleDeleteTeamMember(member.id)} className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-mono uppercase font-bold">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                {isTeamModalOpen && selectedTeamMember && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsTeamModalOpen(false)} />
                    <div className="relative w-full max-w-lg glass-panel p-8 rounded-3xl border border-white/10 bg-black/90 z-10 max-h-[90vh] overflow-y-auto">
                      <h3 className="text-xl font-bold text-white mb-6 font-mono">{selectedTeamMember.id ? "Edit Member" : "Add Member"}</h3>
                      <form onSubmit={handleSaveTeamMember} className="space-y-4">
                        <div><label className="block text-xs font-mono text-gray-400 mb-2">Name</label><input type="text" value={selectedTeamMember.name} onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, name: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none" required /></div>
                        <div><label className="block text-xs font-mono text-gray-400 mb-2">Role</label><input type="text" value={selectedTeamMember.role} onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, role: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none" required /></div>
                        <div>
                          <label className="block text-xs font-mono text-gray-400 mb-2">Category</label>
                          <select value={selectedTeamMember.category} onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, category: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none text-gray-300">
                            <option>Leadership</option><option>AI & Engineering</option><option>Growth & Strategy</option>
                          </select>
                        </div>
                        <div><label className="block text-xs font-mono text-gray-400 mb-2">Bio</label><textarea rows={3} value={selectedTeamMember.bio} onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, bio: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none resize-none" required /></div>
                        <ImageUploader
                          currentUrl={selectedTeamMember.image_url}
                          onUpload={(url) => setSelectedTeamMember({ ...selectedTeamMember, image_url: url })}
                          folder="team"
                          label="Profile Photo"
                        />
                        <div className="pt-4 flex gap-4">
                          <button type="submit" className="px-6 py-3 bg-primary text-black font-semibold rounded-xl text-xs font-mono uppercase">Save</button>
                          <button type="button" onClick={() => setIsTeamModalOpen(false)} className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-xs font-mono uppercase">Cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── SERVICES ── */}
            {activeTab === "services" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white font-mono">Core Capabilities</h2>
                  <button onClick={() => { setSelectedService({ title: "", description: "", icon: "Cpu" }); setIsServiceModalOpen(true); }} className="px-4 py-2.5 bg-primary text-black font-semibold rounded-xl hover:bg-white transition-all text-xs font-mono uppercase flex items-center gap-2">
                    <Plus size={14} /> Add Service
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((svc) => (
                    <div key={svc.id} className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-white text-lg mb-1 flex items-center gap-2"><span className="px-2 py-1 rounded bg-white/5 text-primary text-xs font-mono">{svc.icon}</span>{svc.title}</h4>
                        <p className="text-sm text-gray-400 mb-4">{svc.description}</p>
                      </div>
                      <div className="flex gap-3 pt-4 border-t border-white/5">
                        <button onClick={() => { setSelectedService(svc); setIsServiceModalOpen(true); }} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-mono uppercase font-bold">Edit</button>
                        <button onClick={() => handleDeleteService(svc.id)} className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-xs font-mono uppercase font-bold">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                {isServiceModalOpen && selectedService && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsServiceModalOpen(false)} />
                    <div className="relative w-full max-w-lg glass-panel p-8 rounded-3xl border border-white/10 bg-black/90 z-10">
                      <h3 className="text-xl font-bold text-white mb-6 font-mono">{selectedService.id ? "Edit Capability" : "Add Capability"}</h3>
                      <form onSubmit={handleSaveService} className="space-y-4">
                        <div><label className="block text-xs font-mono text-gray-400 mb-2">Title</label><input type="text" value={selectedService.title} onChange={(e) => setSelectedService({ ...selectedService, title: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none" required /></div>
                        <div>
                          <label className="block text-xs font-mono text-gray-400 mb-2">Icon</label>
                          <select value={selectedService.icon} onChange={(e) => setSelectedService({ ...selectedService, icon: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none text-gray-300">
                            <option>Cpu</option><option>MessageSquareText</option><option>LayoutTemplate</option><option>Globe</option><option>Sparkles</option><option>Code2</option>
                          </select>
                        </div>
                        <div><label className="block text-xs font-mono text-gray-400 mb-2">Description</label><textarea rows={3} value={selectedService.description} onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none resize-none" required /></div>
                        <div className="pt-4 flex gap-4">
                          <button type="submit" className="px-6 py-3 bg-primary text-black font-semibold rounded-xl text-xs font-mono uppercase">Save</button>
                          <button type="button" onClick={() => setIsServiceModalOpen(false)} className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-xs font-mono uppercase">Cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── BLOG ── */}
            {activeTab === "blog" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2"><FileText className="text-primary" size={20} /> Blog Posts</h2>
                  <button onClick={() => { setSelectedBlog({ title: "", slug: "", excerpt: "", content: "", author: "SARDYX Technical Team", category: "AI Automation", read_time: "5 min read", date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }), image_url: "", published: false }); setIsBlogModalOpen(true); }} className="px-4 py-2.5 bg-primary text-black font-semibold rounded-xl hover:bg-white transition-all text-xs font-mono uppercase flex items-center gap-2">
                    <Plus size={14} /> New Post
                  </button>
                </div>
                {blogs.length === 0 ? (
                  <p className="text-gray-500 font-mono text-sm">No blog posts yet. Click "New Post" to create one.</p>
                ) : (
                  <div className="space-y-4">
                    {blogs.map((post) => (
                      <div key={post.id} className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex items-start gap-4">
                          {post.image_url && <img src={post.image_url} alt={post.title} className="w-16 h-16 rounded-xl object-cover border border-white/10 flex-shrink-0" />}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-white">{post.title}</h4>
                              <span className={`px-2 py-0.5 rounded text-xs font-mono ${post.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>{post.published ? "Published" : "Draft"}</span>
                            </div>
                            <p className="text-xs text-gray-500 font-mono">{post.category} • {post.date} • {post.read_time}</p>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-1">{post.excerpt}</p>
                          </div>
                        </div>
                        <div className="flex gap-3 flex-shrink-0">
                          <button onClick={() => { setSelectedBlog(post); setIsBlogModalOpen(true); }} className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-xs font-mono uppercase font-bold">Edit</button>
                          <button onClick={() => handleDeleteBlog(post.id)} className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-xs font-mono uppercase font-bold">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {isBlogModalOpen && selectedBlog && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsBlogModalOpen(false)} />
                    <div className="relative w-full max-w-2xl glass-panel p-8 rounded-3xl border border-white/10 bg-black/90 z-10 max-h-[90vh] overflow-y-auto">
                      <h3 className="text-xl font-bold text-white mb-6 font-mono">{selectedBlog.id ? "Edit Blog Post" : "New Blog Post"}</h3>
                      <form onSubmit={handleSaveBlog} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div><label className="block text-xs font-mono text-gray-400 mb-2">Title</label><input type="text" value={selectedBlog.title} onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none text-sm" required /></div>
                          <div><label className="block text-xs font-mono text-gray-400 mb-2">Slug (URL)</label><input type="text" value={selectedBlog.slug} onChange={(e) => setSelectedBlog({ ...selectedBlog, slug: e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none text-sm font-mono" required /></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div><label className="block text-xs font-mono text-gray-400 mb-2">Author</label><input type="text" value={selectedBlog.author} onChange={(e) => setSelectedBlog({ ...selectedBlog, author: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none text-sm" /></div>
                          <div><label className="block text-xs font-mono text-gray-400 mb-2">Category</label><input type="text" value={selectedBlog.category} onChange={(e) => setSelectedBlog({ ...selectedBlog, category: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none text-sm" /></div>
                          <div><label className="block text-xs font-mono text-gray-400 mb-2">Read Time</label><input type="text" value={selectedBlog.read_time} onChange={(e) => setSelectedBlog({ ...selectedBlog, read_time: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none text-sm" /></div>
                        </div>
                        <div><label className="block text-xs font-mono text-gray-400 mb-2">Date</label><input type="text" value={selectedBlog.date} onChange={(e) => setSelectedBlog({ ...selectedBlog, date: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none text-sm" /></div>
                        <div><label className="block text-xs font-mono text-gray-400 mb-2">Excerpt / Summary</label><textarea rows={2} value={selectedBlog.excerpt} onChange={(e) => setSelectedBlog({ ...selectedBlog, excerpt: e.target.value })} className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none resize-none text-sm" required /></div>
                        <div><label className="block text-xs font-mono text-gray-400 mb-2">Content (HTML supported)</label><textarea rows={8} value={selectedBlog.content} onChange={(e) => setSelectedBlog({ ...selectedBlog, content: e.target.value })} placeholder="<p>Your blog content here...</p>" className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none resize-y text-sm font-mono" required /></div>
                        <ImageUploader
                          currentUrl={selectedBlog.image_url}
                          onUpload={(url) => setSelectedBlog({ ...selectedBlog, image_url: url })}
                          folder="blog"
                          label="Cover Image"
                        />
                        <div className="flex items-center gap-2">
                          <input type="checkbox" checked={selectedBlog.published} onChange={(e) => setSelectedBlog({ ...selectedBlog, published: e.target.checked })} className="w-4 h-4 accent-primary" />
                          <label className="text-xs font-mono text-gray-400">Published (visible on website)</label>
                        </div>
                        <div className="pt-4 flex gap-4">
                          <button type="submit" className="px-6 py-3 bg-primary text-black font-semibold rounded-xl text-xs font-mono uppercase flex items-center gap-2"><Save size={14} /> Save Post</button>
                          <button type="button" onClick={() => setIsBlogModalOpen(false)} className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-xs font-mono uppercase">Cancel</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── INBOX ── */}
            {activeTab === "inbox" && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6 font-mono flex items-center gap-2">
                  <Inbox className="text-primary animate-pulse" size={20} /> Client Transmissions
                  {leads.length > 0 && <span className="ml-2 px-2 py-0.5 bg-primary text-black text-xs font-bold rounded-full">{leads.length}</span>}
                </h2>
                {leads.length === 0 ? (
                  <p className="text-gray-500 font-mono text-sm">No transmissions in the inbox yet.</p>
                ) : (
                  <div className="space-y-4">
                    {leads.map((lead) => (
                      <div key={lead.id} className="p-6 rounded-2xl glass-panel border border-white/5 flex flex-col md:flex-row justify-between items-start gap-4 hover:border-primary/20 transition-all">
                        <div className="space-y-1 flex-grow">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h4 className="font-bold text-white">{lead.name}</h4>
                            <span className="text-xs font-mono text-gray-500">{new Date(lead.created_at).toLocaleString()}</span>
                          </div>
                          <p className="text-xs font-mono text-primary">{lead.email}</p>
                          <p className="text-gray-300 text-sm mt-2 leading-relaxed">"{lead.message}"</p>
                        </div>
                        <button onClick={() => handleDeleteLead(lead.id)} className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/25 text-xs font-mono uppercase font-bold flex items-center gap-1.5 flex-shrink-0">
                          <Trash2 size={12} /> Clear
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}
      </div>
    </main>
  );
}
