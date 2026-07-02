"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Save, Trash2, CheckCircle, RefreshCw, XCircle, Plus, Edit3, ShieldAlert } from "lucide-react";
import { mockPackages, mockTestimonials, mockTeam } from "@/lib/supabase";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // DB Data States
  const [packages, setPackages] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("pricing"); // "pricing", "feedback", "team"
  const [loading, setLoading] = useState(false);

  // Edit Modes & Modal states
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<any>(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  useEffect(() => {
    // Check if session has authorized status
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
      // 1. Fetch Packages
      const pkgRes = await fetch("/api/admin/packages");
      const pkgData = pkgRes.ok ? await pkgRes.json() : null;
      setPackages(pkgData && pkgData.length > 0 ? pkgData : mockPackages);

      // 2. Fetch Testimonials
      const testRes = await fetch("/api/admin/testimonials");
      const testData = testRes.ok ? await testRes.json() : null;
      setTestimonials(testData && testData.length > 0 ? testData : mockTestimonials);

      // 3. Fetch Team
      const teamRes = await fetch("/api/admin/team");
      const teamData = teamRes.ok ? await teamRes.json() : null;
      setTeam(teamData && teamData.length > 0 ? teamData : mockTeam);
    } catch (err) {
      console.error("Error loading administration stats:", err);
    } finally {
      setLoading(false);
    }
  };

  // Feedback actions
  const toggleFeedbackApproval = async (id: string, currentApproved: boolean) => {
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, approved: !currentApproved }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchData();
    } catch (err) {
      setTestimonials(prev =>
        prev.map(t => (t.id === id ? { ...t, approved: !currentApproved } : t))
      );
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      fetchData();
    } catch (err) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    }
  };

  // Package Actions
  const handleUpdatePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/packages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedPackage.id,
          name: selectedPackage.name,
          description: selectedPackage.description,
          price_usd: Number(selectedPackage.price_usd),
          features: selectedPackage.features,
          highlighted: selectedPackage.highlighted
        }),
      });
      if (!res.ok) throw new Error("Failed to update package");
      setSelectedPackage(null);
      fetchData();
    } catch (err) {
      setPackages(prev =>
        prev.map(p => (p.id === selectedPackage.id ? selectedPackage : p))
      );
      setSelectedPackage(null);
    }
  };

  // Team Actions
  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedTeamMember.id && !selectedTeamMember.id.startsWith("t")) {
        // Edit existing db member
        const res = await fetch("/api/admin/team", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedTeamMember),
        });
        if (!res.ok) throw new Error("Failed to update");
      } else {
        // Insert new member
        const res = await fetch("/api/admin/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedTeamMember),
        });
        if (!res.ok) throw new Error("Failed to insert");
      }
      setIsTeamModalOpen(false);
      setSelectedTeamMember(null);
      fetchData();
    } catch (err) {
      if (selectedTeamMember.id) {
        setTeam(prev => prev.map(t => (t.id === selectedTeamMember.id ? selectedTeamMember : t)));
      } else {
        setTeam(prev => [...prev, { ...selectedTeamMember, id: Math.random().toString() }]);
      }
      setIsTeamModalOpen(false);
      setSelectedTeamMember(null);
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    if (!confirm("Remove this expert from the SARDYX team list?")) return;
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete member");
      fetchData();
    } catch (err) {
      setTeam(prev => prev.filter(t => t.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center pt-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute w-96 h-96 bg-primary/20 blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass-panel p-8 rounded-3xl border border-white/10 relative z-10"
        >
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
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all"
                required 
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-gray-500 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm transition-all"
                required 
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-xs font-semibold font-mono text-center">{loginError}</p>
            )}

            <button 
              type="submit" 
              className="w-full py-4 bg-primary text-black font-semibold rounded-xl hover:bg-white hover:text-black transition-all font-mono text-sm uppercase tracking-wider drop-shadow-[0_0_12px_rgba(0,240,255,0.2)]"
            >
              Verify Credentials
            </button>
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
            <button 
              onClick={fetchData} 
              className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <RefreshCw size={18} />
            </button>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all font-mono text-xs uppercase font-bold"
            >
              Disconnect Node
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          {["pricing", "feedback", "team"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-mono text-xs uppercase font-bold border transition-all ${
                activeTab === tab 
                  ? "bg-primary text-black border-primary" 
                  : "bg-white/5 text-gray-400 border-white/10 hover:text-white"
              }`}
            >
              Manage {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500 font-mono flex items-center justify-center gap-2">
            <RefreshCw className="animate-spin text-primary" size={18} /> Loading system state...
          </div>
        ) : (
          <div>
            {/* PRICING TAB */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Package List */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white mb-4 font-mono">System Packages</h2>
                    {packages.map((pkg) => (
                      <div 
                        key={pkg.id} 
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-6 rounded-2xl glass-panel border cursor-pointer transition-all ${
                          selectedPackage?.id === pkg.id 
                            ? "border-primary bg-primary/5" 
                            : "border-white/5 bg-white/[0.01] hover:border-white/10"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-white text-lg">{pkg.name}</h3>
                          <span className="font-mono text-xs px-2 py-1 rounded bg-white/5 text-primary">${pkg.price_usd.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2">{pkg.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Editor form */}
                  <div>
                    {selectedPackage ? (
                      <form onSubmit={handleUpdatePackage} className="glass-panel p-8 rounded-3xl border border-white/10 bg-white/[0.01] space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4 font-mono flex items-center gap-2">
                          <Edit3 size={16} /> Edit Package details
                        </h3>
                        <div>
                          <label className="block text-xs font-mono text-gray-400 mb-2">Package Name</label>
                          <input 
                            type="text" 
                            value={selectedPackage.name}
                            onChange={(e) => setSelectedPackage({ ...selectedPackage, name: e.target.value })}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm"
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-gray-400 mb-2">Price (USD)</label>
                          <input 
                            type="number" 
                            value={selectedPackage.price_usd}
                            onChange={(e) => setSelectedPackage({ ...selectedPackage, price_usd: e.target.value })}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm font-mono"
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-gray-400 mb-2">Description</label>
                          <textarea 
                            rows={3}
                            value={selectedPackage.description}
                            onChange={(e) => setSelectedPackage({ ...selectedPackage, description: e.target.value })}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none focus:border-primary text-sm resize-none"
                            required 
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="checkbox"
                            checked={selectedPackage.highlighted}
                            onChange={(e) => setSelectedPackage({ ...selectedPackage, highlighted: e.target.checked })}
                            className="w-4 h-4 accent-primary"
                          />
                          <label className="text-xs font-mono text-gray-400">Highlighted / Popular Selection</label>
                        </div>

                        <div className="pt-4 flex gap-4">
                          <button 
                            type="submit" 
                            className="px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:bg-white hover:text-black transition-all text-xs font-mono uppercase flex items-center gap-2"
                          >
                            <Save size={14} /> Save Package
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setSelectedPackage(null)}
                            className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 hover:text-white rounded-xl text-xs font-mono uppercase"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="h-full min-h-[300px] flex items-center justify-center border border-dashed border-white/10 rounded-3xl text-gray-500 text-sm font-mono p-8 text-center">
                        Select a package to start editing.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* FEEDBACK TAB */}
            {activeTab === "feedback" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-6 font-mono">Client Testimonial Feed</h2>
                {testimonials.length === 0 ? (
                  <p className="text-gray-500 font-mono text-sm">No client submissions found.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((test) => (
                      <div key={test.id} className="p-6 rounded-2xl glass-panel border border-white/5 bg-white/[0.01] flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-bold text-white">{test.author}</h4>
                              <p className="text-xs text-gray-500 font-mono">{test.role}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-3xs uppercase font-mono tracking-widest font-black ${
                              test.approved 
                                ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                                : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                            }`}>
                              {test.approved ? "Approved" : "Pending Approval"}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm italic mb-6">"{test.quote}"</p>
                        </div>
                        <div className="flex gap-4 pt-4 border-t border-white/5">
                          <button
                            onClick={() => toggleFeedbackApproval(test.id, test.approved)}
                            className={`px-4 py-2 rounded-lg text-2xs font-mono uppercase font-bold flex items-center gap-1.5 transition-colors ${
                              test.approved 
                                ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border border-yellow-500/25" 
                                : "bg-green-500/10 text-green-500 hover:bg-green-500/20 border border-green-500/25"
                            }`}
                          >
                            {test.approved ? <XCircle size={12} /> : <CheckCircle size={12} />}
                            {test.approved ? "Revoke Approval" : "Approve Feedback"}
                          </button>
                          <button
                            onClick={() => deleteFeedback(test.id)}
                            className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/25 text-2xs font-mono uppercase font-bold flex items-center gap-1.5 transition-colors"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TEAM TAB */}
            {activeTab === "team" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white font-mono">Expert Team Members</h2>
                  <button
                    onClick={() => {
                      setSelectedTeamMember({
                        name: "",
                        role: "",
                        bio: "",
                        image_url: "/team/fazal.jpeg",
                        category: "Leadership",
                        twitter: "#",
                        linkedin: "#",
                        github: "#"
                      });
                      setIsTeamModalOpen(true);
                    }}
                    className="px-4 py-2.5 bg-primary text-black font-semibold rounded-xl hover:bg-white hover:text-black transition-all text-xs font-mono uppercase flex items-center gap-2 shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                  >
                    <Plus size={14} /> Add Expert
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {team.map((member) => (
                    <div key={member.id} className="p-6 rounded-2xl glass-panel border border-white/5 bg-white/[0.01] flex flex-col justify-between">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-black">
                          <img src={member.image_url} alt={member.name} className="w-full h-full object-cover grayscale" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{member.name}</h4>
                          <p className="text-xs text-gray-500">{member.role}</p>
                          <span className="text-3xs uppercase tracking-widest text-primary font-mono">{member.category}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-3 mb-6 leading-relaxed">{member.bio}</p>
                      
                      <div className="flex gap-4 pt-4 border-t border-white/5">
                        <button
                          onClick={() => {
                            setSelectedTeamMember(member);
                            setIsTeamModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-2xs font-mono uppercase font-bold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTeamMember(member.id)}
                          className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors text-2xs font-mono uppercase font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Team Modal */}
                {isTeamModalOpen && selectedTeamMember && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsTeamModalOpen(false)} />
                    <div className="relative w-full max-w-lg glass-panel p-8 rounded-3xl border border-white/10 bg-black/90 z-10 max-h-[90vh] overflow-y-auto">
                      <h3 className="text-xl font-bold text-white mb-6 font-mono">
                        {selectedTeamMember.id ? "Edit Team Member" : "Add Team Member"}
                      </h3>
                      <form onSubmit={handleSaveTeamMember} className="space-y-4">
                        <div>
                          <label className="block text-xs font-mono text-gray-400 mb-2">Name</label>
                          <input 
                            type="text" 
                            value={selectedTeamMember.name}
                            onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, name: e.target.value })}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none"
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-gray-400 mb-2">Role</label>
                          <input 
                            type="text" 
                            value={selectedTeamMember.role}
                            onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, role: e.target.value })}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none"
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-gray-400 mb-2">Category</label>
                          <select 
                            value={selectedTeamMember.category}
                            onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, category: e.target.value })}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none text-gray-300"
                          >
                            <option>Leadership</option>
                            <option>AI & Engineering</option>
                            <option>Growth & Strategy</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-gray-400 mb-2">Bio Description</label>
                          <textarea 
                            rows={3}
                            value={selectedTeamMember.bio}
                            onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, bio: e.target.value })}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none resize-none"
                            required 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-gray-400 mb-2">Avatar URL</label>
                          <input 
                            type="text" 
                            value={selectedTeamMember.image_url}
                            onChange={(e) => setSelectedTeamMember({ ...selectedTeamMember, image_url: e.target.value })}
                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl focus:outline-none"
                            required 
                          />
                        </div>

                        <div className="pt-4 flex gap-4">
                          <button type="submit" className="px-6 py-3 bg-primary text-black font-semibold rounded-xl text-xs font-mono uppercase">
                            Save Member
                          </button>
                          <button type="button" onClick={() => setIsTeamModalOpen(false)} className="px-6 py-3 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-xs font-mono uppercase">
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
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
