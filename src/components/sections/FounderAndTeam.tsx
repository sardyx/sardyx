"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Code, Globe2 } from "lucide-react";

const teamMembers = [
  {
    name: "Miss Bushra",
    role: "Operations & Project Manager",
    desc: "Coordinates agile development sprints, client communication, and software milestone delivery.",
    photo: "/team/bushra.png",
  },
  {
    name: "Mr. Hamad",
    role: "Senior AI Engineer",
    desc: "Engineers sub-second latency voice callbots, conversational RAG, and n8n workflow automations.",
    photo: "/team/hamad.jpeg",
  },
  {
    name: "Mr. Khubaib",
    role: "Backend & Cloud Engineer",
    desc: "Architects high-availability PostgreSQL databases, serverless APIs, and secure microservices.",
    photo: "/team/khubaib.png",
  },
  {
    name: "Mr. Hussain",
    role: "Growth & Strategy Lead",
    desc: "Drives commercial pipeline acquisition and market positioning across Pakistan, the US, and the UK.",
    photo: "/team/hussain.jpeg",
  },
  {
    name: "Mr. Ahmed",
    role: "Client Solutions Consultant",
    desc: "Translates complex retail and enterprise workflows into scalable software requirements.",
    photo: "/team/ahmed.jpeg",
  },
];

export default function FounderAndTeam() {
  return (
    <section id="team" className="py-24 sm:py-32 bg-[#07060D] relative">
      <div className="container mx-auto px-5 sm:px-8 max-w-[1200px]">
        {/* 1. Founder Spotlight Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl glass-panel p-6 sm:p-10 border border-[#8A2BEF]/30 shadow-[0_0_40px_rgba(138,43,239,0.15)] mb-20 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8A2BEF]/15 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Founder Photo */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-[#8A2BEF]/40 shadow-2xl">
                <Image
                  src="/team/abdullah.jpeg"
                  alt="Sardar M. Abdullah (Mr. Abdullah) — Founder & CEO of SARDYX AI"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              </div>
            </div>

            {/* Founder Content */}
            <div className="lg:col-span-8 text-left">
              <div className="eyebrow-pill mb-3">
                <Sparkles size={13} className="text-[#00C0FF]" />
                <span>FOUNDER SPOTLIGHT</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-1">
                Sardar M. Abdullah
                <span className="text-[#8A849F] text-lg font-normal ml-2 sm:inline-block">
                  (Mr. Abdullah)
                </span>
              </h2>

              <p className="text-xs font-mono uppercase tracking-wider text-[#00C0FF] mb-4">
                Founder & CEO, SARDYX AI · Khyber Pakhtunkhwa, Pakistan
              </p>

              <blockquote className="text-base sm:text-lg font-medium text-white italic border-l-2 border-[#8A2BEF] pl-4 mb-4">
                &ldquo;Young founder. Serious engineering. Global ambition.&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed mb-6">
                Big companies are not always built in big cities. Growing up in Khyber Pakhtunkhwa, Pakistan, Sardar M. Abdullah started learning and shipping technology with one focus: delivering world-class software that any ambitious business can afford. From custom POS software keeping shops running to AI agents handling customer inquiries around the clock, every system is engineered to perform.
              </p>

              {/* 3 Verifiable Facts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                  <Globe2 size={16} className="text-[#00C0FF] shrink-0" />
                  <span className="text-xs text-[#B8B3CC]">Serving PK, US & UK</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                  <Code size={16} className="text-[#8A2BEF] shrink-0" />
                  <span className="text-xs text-[#B8B3CC]">Full-Stack Engineering</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-[#32CD32] shrink-0" />
                  <span className="text-xs text-[#B8B3CC]">Fixed-Scope Pricing</span>
                </div>
              </div>

              <Link
                href="/founder"
                className="btn-glass-pill inline-flex items-center gap-2 text-xs py-2.5 px-6 font-semibold"
              >
                <span>Read the Founder&apos;s Full Story</span>
                <ArrowRight size={14} className="text-[#00C0FF]" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 2. Team Grid */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow-pill mb-3">
            <Sparkles size={13} className="text-[#00C0FF]" />
            <span>ENGINEERING TALENT</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            The SARDYX <span className="gradient-text-highlight">Team</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#B8B3CC] mt-2">
            Engineers, system architects, and operations specialists delivering client milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-panel p-5 rounded-2xl border border-white/[0.08] flex flex-col items-center text-center glass-panel-hover"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border border-[#8A2BEF]/30 bg-black/40">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              <h4 className="font-heading font-bold text-sm text-white mb-0.5">
                {member.name}
              </h4>
              <p className="text-[11px] font-mono text-[#00C0FF] mb-2">
                {member.role}
              </p>
              <p className="text-xs text-[#8A849F] leading-relaxed">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

