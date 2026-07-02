"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Globe, ShieldAlert, Award } from "lucide-react";
import { supabase, mockTeam } from "@/lib/supabase";

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

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          setTeamMembers(data);
        }
      } catch (err) {
        console.warn("Using local team members fallback data", err);
      }
    };
    fetchTeam();
  }, []);

  const getRoleIcon = (role: string) => {
    const lowerRole = role.toLowerCase();
    if (lowerRole.includes("ceo") || lowerRole.includes("founder")) {
      return <Award className="w-5 h-5 text-primary" />;
    }
    if (lowerRole.includes("operations") || lowerRole.includes("manager")) {
      return <Cpu className="w-5 h-5 text-secondary" />;
    }
    if (lowerRole.includes("senior") || lowerRole.includes("lead")) {
      return <ShieldAlert className="w-5 h-5 text-primary" />;
    }
    if (lowerRole.includes("developer") || lowerRole.includes("engineer")) {
      return <Code2 className="w-5 h-5 text-secondary" />;
    }
    return <Globe className="w-5 h-5 text-primary" />;
  };

  // Group by categories
  const categories = ["Leadership", "AI & Engineering", "Growth & Strategy"];

  return (
    <section id="team" className="py-32 relative overflow-hidden bg-black/30">
      {/* Dynamic background blur elements */}
      <div className="absolute top-1/3 left-0 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2"></div>
      <div className="absolute bottom-1/3 right-0 w-[450px] h-[450px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none translate-x-1/2"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel mb-6 border-primary/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-primary">SARDYX Syndicate</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white"
          >
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary glow-text">Experts</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            The specialized intelligence unit engineering futuristic digital infrastructures and cognitive systems.
          </motion.p>
        </div>

        {/* Categories of team members */}
        <div className="space-y-24">
          {categories.map((catName) => {
            const members = teamMembers.filter((m) => m.category === catName);
            if (members.length === 0) return null;

            return (
              <div key={catName} className="space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-500 whitespace-nowrap">
                    {catName}
                  </h3>
                  <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent"></div>
                </motion.div>

                <div className={`grid grid-cols-1 ${
                  members.length === 2 ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"
                } gap-8`}>
                  {members.map((member, index) => (
                    <motion.div
                      key={member.id || member.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="glass-panel rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden group cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0 pointer-events-none"></div>
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                      {/* Team Member Photo Frame */}
                      <div className="relative w-32 h-32 mb-6 rounded-full p-1 z-10">
                        <div className="absolute inset-0 rounded-full border border-dashed border-white/20 group-hover:border-primary/40 group-hover:rotate-45 transition-all duration-700"></div>
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
                        
                        {/* Avatar Image container */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-black/40">
                          <img 
                            src={member.image_url} 
                            alt={member.name} 
                            className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out" 
                          />
                        </div>
                        
                        {/* Small Indicator Role Icon */}
                        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full glass-panel border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          {getRoleIcon(member.role)}
                        </div>
                      </div>

                      <div className="relative z-10 w-full flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                            {member.name}
                          </h4>
                          <p className="text-sm font-semibold tracking-wider uppercase text-secondary/90 mb-4 mt-1">
                            {member.role}
                          </p>
                          <p className="text-sm text-gray-400 leading-relaxed mb-6 px-2">
                            {member.bio}
                          </p>
                        </div>

                        {/* Social icons */}
                        <div className="flex justify-center gap-4 pt-4 border-t border-white/5 mt-auto">
                          <a 
                            href={member.twitter} 
                            className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary hover:scale-110 transition-all"
                          >
                            <Twitter size={14} />
                          </a>
                          <a 
                            href={member.linkedin} 
                            className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary hover:scale-110 transition-all"
                          >
                            <Linkedin size={14} />
                          </a>
                          <a 
                            href={member.github} 
                            className="w-8 h-8 rounded-full glass-panel flex items-center justify-center text-gray-400 hover:text-primary hover:scale-110 transition-all"
                          >
                            <Github size={14} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
