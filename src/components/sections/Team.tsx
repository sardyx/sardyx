"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Globe, ShieldAlert, Award } from "lucide-react";
import { mockTeam } from "@/lib/supabase";

const Github = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.76a5.5 5.5 0 0 0-1.5-3.89 5 5 0 0 0-.15-3.83s-1.13-.36-3.7 1.38a12.8 12.8 0 0 0-7 0C4.9 1.5 3.75 1.86 3.75 1.86a5 5 0 0 0-.15 3.83 5.5 5.5 0 0 0-1.5 3.89c0 5.23 3 6.42 6 6.76a4.8 4.8 0 0 0-1 3.24v4" />
  </svg>
);

const Twitter = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Linkedin = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<any[]>(mockTeam);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data && data.length > 0) {
          setTeamMembers(data);
        }
      } catch (err) {
        console.warn("Using local team members fallback data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const categories = ["Leadership", "AI & Engineering", "Growth & Strategy", "Creative Design"];

  return (
    <section id="team" className="py-20 sm:py-28 relative overflow-hidden bg-[#080814]">
      {/* Background glow blurs */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-1/3 right-0 w-[450px] h-[450px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none translate-x-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">Engineering & Growth Specialists</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black mb-3 tracking-tight text-white"
          >
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Syndicate</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm sm:text-base leading-relaxed"
          >
            Specialized engineering and growth teams dedicated to scaling client digital systems.
          </motion.p>
        </div>

        {/* Categories of team members */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((catName) => {
              const members = teamMembers.filter((m) => m.category === catName);
              if (members.length === 0) return null;

              return (
                <div key={catName} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-primary whitespace-nowrap">
                      {catName}
                    </h3>
                    <div className="h-[1px] w-full bg-white/10"></div>
                  </div>

                  {/* Clean Team Members Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {members.map((member, index) => (
                      <motion.div
                        key={member.id || member.name}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className="p-5 rounded-2xl border border-white/10 bg-[#0E0E1C]/80 hover:bg-[#121224] hover:border-primary/40 transition-all flex flex-col items-center text-center group shadow-sm"
                      >
                        {/* Avatar Image Frame */}
                        <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border border-white/15 bg-black/60 shrink-0">
                          {member.image_url ? (
                            <img 
                              src={member.image_url} 
                              alt={member.name} 
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-xl font-mono text-primary bg-primary/10">
                              {member.name?.charAt(0) || "T"}
                            </div>
                          )}
                        </div>

                        <div className="w-full flex flex-col justify-between flex-1">
                          <div>
                            <h4 className="text-base font-bold text-white group-hover:text-primary transition-colors truncate">
                              {member.name}
                            </h4>
                            <p className="text-xs font-semibold uppercase text-violet-400 mb-2 mt-0.5 tracking-wider truncate">
                              {member.role}
                            </p>
                            {member.bio && (
                              <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2 px-1">
                                {member.bio}
                              </p>
                            )}
                          </div>

                          {/* Social links */}
                          <div className="flex justify-center gap-2.5 pt-3 border-t border-white/5 mt-auto">
                            {member.twitter && (
                              <a 
                                href={member.twitter} 
                                target="_blank"
                                rel="noreferrer"
                                className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-primary/20 flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                              >
                                <Twitter className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.linkedin && (
                              <a 
                                href={member.linkedin} 
                                target="_blank"
                                rel="noreferrer"
                                className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-primary/20 flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                              >
                                <Linkedin className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {member.github && (
                              <a 
                                href={member.github} 
                                target="_blank"
                                rel="noreferrer"
                                className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-primary/20 flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                              >
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
