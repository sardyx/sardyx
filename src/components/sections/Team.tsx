"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { mockTeam } from "@/lib/supabase";

const Linkedin = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const roleColors: Record<string, string> = {
  "CEO & Founder": "text-primary",
  "Operations & Project Manager": "text-violet-400",
  "Senior AI Developer": "text-cyan-400",
  "Back End Developer": "text-emerald-400",
  "Growth & Strategy Lead": "text-amber-400",
  "Brand & Sales Consultant": "text-pink-400",
};

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<any[]>(mockTeam);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch("/api/team");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (data && data.length > 0) setTeamMembers(data);
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <section id="team" className="py-16 sm:py-24 relative overflow-hidden bg-[#06060E]">
      {/* Ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 lg:px-14 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs font-semibold tracking-wider uppercase text-gray-300">The People Behind It</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 tracking-tight text-white"
          >
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-200 to-violet-400">Team</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-xs sm:text-base leading-relaxed"
          >
            A specialized team of engineers, strategists, and designers building the future of digital systems.
          </motion.p>
        </div>

        {/* Team: Mobile Horizontal Carousel / Desktop 6-Col Grid */}
        {loading ? (
          <div className="flex lg:grid lg:grid-cols-6 gap-4 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-3 lg:pb-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="min-w-[200px] lg:min-w-0 h-52 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex lg:grid lg:grid-cols-6 gap-4 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-3 lg:pb-0 -mx-5 px-5 lg:mx-0 lg:px-0">
            {teamMembers.map((member, index) => {
              const roleColor = roleColors[member.role] || "text-gray-400";
              const isFirst = index === 0;

              return (
                <motion.div
                  key={member.id || member.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className={`min-w-[190px] sm:min-w-[220px] lg:min-w-0 snap-center relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border transition-all group
                    ${isFirst
                      ? "border-primary/30 bg-[#0E0E1C] ring-1 ring-primary/20"
                      : "border-white/[0.08] bg-[#0E0E1C] hover:border-white/20"
                    }`}
                >
                  {/* Founder badge */}
                  {isFirst && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-primary text-black text-[9px] font-black uppercase tracking-wider whitespace-nowrap">
                      Founder
                    </span>
                  )}

                  {/* Avatar */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 mb-3 rounded-full overflow-hidden border shrink-0 ${
                    isFirst ? "border-primary/50" : "border-white/10"
                  }`}>
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-base font-bold text-primary bg-primary/10">
                        {member.name?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <h4 className="font-bold text-white text-xs sm:text-sm leading-tight mb-0.5 truncate w-full">
                    {member.name}
                  </h4>
                  <p className={`text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide mb-2 truncate w-full ${roleColor}`}>
                    {member.role}
                  </p>

                  <p className="text-[10px] sm:text-[11px] text-gray-500 leading-relaxed line-clamp-2 mb-3">
                    {member.bio}
                  </p>

                  {/* LinkedIn only */}
                  <div className="mt-auto pt-2 border-t border-white/[0.06] w-full flex justify-center">
                    <a
                      href={member.linkedin && member.linkedin !== "#" ? member.linkedin : "https://www.linkedin.com/"}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="w-6 h-6 rounded-md bg-white/[0.04] hover:bg-primary/20 flex items-center justify-center text-gray-500 hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Mobile Swipe Hint */}
        <div className="flex lg:hidden items-center justify-center gap-1.5 mt-3 text-[10px] text-gray-500 font-medium">
          <span>Swipe sideways to view all team members</span>
          <ArrowRight size={11} />
        </div>

      </div>
    </section>
  );
}
