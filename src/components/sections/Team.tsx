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

  const getRoleIcon = (role: string) => {
    const lowerRole = (role || "").toLowerCase();
    if (lowerRole.includes("ceo") || lowerRole.includes("founder")) {
      return <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />;
    }
    if (lowerRole.includes("operations") || lowerRole.includes("manager")) {
      return <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />;
    }
    if (lowerRole.includes("senior") || lowerRole.includes("lead")) {
      return <ShieldAlert className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />;
    }
    if (lowerRole.includes("developer") || lowerRole.includes("engineer")) {
      return <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />;
    }
    return <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />;
  };

  const categories = ["Leadership", "AI & Engineering", "Growth & Strategy", "Creative Design"];

  return (
    <section id="team" className="py-14 sm:py-24 relative overflow-hidden bg-black/30">
      {/* Dynamic background blur elements */}
      <div className="absolute top-1/3 left-0 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-1/3 right-0 w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2"></div>

      <div className="container mx-auto px-3 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel mb-3 border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-primary">Engineering Syndicate</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white"
          >
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">Experts</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed"
          >
            Specialized engineering and design teams architecting mission-critical digital systems.
          </motion.p>
        </div>

        {/* Categories of team members */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 sm:h-72 rounded-2xl glass-panel border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-14">
            {categories.map((catName) => {
              const members = teamMembers.filter((m) => m.category === catName);
              if (members.length === 0) return null;

              return (
                <div key={catName} className="space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-primary whitespace-nowrap">
                      {catName}
                    </h3>
                    <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent"></div>
                  </motion.div>

                  {/* Team Members Grid: 2 COLUMNS ON MOBILE (grid-cols-2) and 3/4 on desktop */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-5">
                    {members.map((member, index) => (
                      <motion.div
                        key={member.id || member.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="glass-panel rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex flex-col items-center text-center relative overflow-hidden group hover:border-primary/40 transition-all border border-white/10 bg-black/40 hover:bg-black/60"
                      >
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] z-0 pointer-events-none"></div>

                        {/* Team Member Photo Frame */}
                        <div className="relative w-18 h-18 sm:w-24 sm:h-24 mb-3 sm:mb-4 rounded-full p-1 z-10">
                          <div className="absolute inset-0 rounded-full border border-dashed border-white/20 group-hover:border-primary/40 group-hover:rotate-45 transition-all duration-700"></div>
                          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
                          
                          {/* Avatar Image */}
                          <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-black/50">
                            {member.image_url ? (
                              <img 
                                src={member.image_url} 
                                alt={member.name} 
                                className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-lg font-mono text-primary bg-primary/10">
                                {member.name?.charAt(0) || "T"}
                              </div>
                            )}
                          </div>
                          
                          {/* Small Role Icon Indicator */}
                          <div className="absolute bottom-0 right-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full glass-panel border border-white/20 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                            {getRoleIcon(member.role)}
                          </div>
                        </div>

                        <div className="relative z-10 w-full flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs sm:text-base font-bold text-white group-hover:text-primary transition-colors truncate">
                              {member.name}
                            </h4>
                            <p className="text-[9px] sm:text-xs font-semibold tracking-wider uppercase text-secondary/90 mb-2 mt-0.5 truncate">
                              {member.role}
                            </p>
                            {member.bio && (
                              <p className="text-[9px] sm:text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2 px-1">
                                {member.bio}
                              </p>
                            )}
                          </div>

                          {/* Social links */}
                          <div className="flex justify-center gap-2 pt-2 sm:pt-3 border-t border-white/5 mt-auto">
                            {member.twitter && (
                              <a 
                                href={member.twitter} 
                                target="_blank"
                                rel="noreferrer"
                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                              >
                                <Twitter className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              </a>
                            )}
                            {member.linkedin && (
                              <a 
                                href={member.linkedin} 
                                target="_blank"
                                rel="noreferrer"
                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                              >
                                <Linkedin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                              </a>
                            )}
                            {member.github && (
                              <a 
                                href={member.github} 
                                target="_blank"
                                rel="noreferrer"
                                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary transition-all"
                              >
                                <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
