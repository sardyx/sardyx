"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Code, Globe2, Award, Users } from "lucide-react";

const teamMembers = [
  {
    name: "SARDAR ZAKA",
    role: "Managing Director",
    desc: "Oversees executive strategy, commercial partnerships, and operational governance across international client accounts.",
    photo: "/team/zaka.svg",
  },
  {
    name: "ZAK ASLAM",
    role: "VP of Operations",
    desc: "Directs organizational infrastructure, project delivery workflows, and cross-border client operations.",
    photo: "/team/zak.svg",
  },
  {
    name: "BUSHRA FAZAL",
    role: "Finance Manager",
    desc: "Manages financial compliance, milestone billing, multi-currency invoicing, and budget allocations.",
    photo: "/team/bushra.svg",
  },
  {
    name: "MR. HAMAD",
    role: "Senior AI Engineer",
    desc: "Engineers sub-second latency voice callbots, conversational RAG systems, and autonomous n8n workflows.",
    photo: "/team/hamad.svg",
  },
  {
    name: "KHUBAIB QAYYUM",
    role: "Full-Stack Web Developer",
    desc: "Builds high-performance Next.js architectures, secure Supabase backends, and responsive user interfaces.",
    photo: "/team/khubaib.svg",
  },
  {
    name: "HUSSAIN AHMED",
    role: "Head of Enterprise Sales",
    desc: "Drives commercial pipelines, enterprise client acquisitions, and strategic partnerships across PK, US, and UK.",
    photo: "/team/hussain.svg",
  },
  {
    name: "AHMED UR REHMAN",
    role: "Client Solutions Specialist",
    desc: "Translates complex retail, POS, and software requirements into customized, high-ROI technical proposals.",
    photo: "/team/ahmed.svg",
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
                <span>FOUNDER SPOTLIGHT · PAKISTAN&apos;S YOUNGEST PROGRAMMER &amp; GAME DEVELOPER</span>
              </div>

              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-1">
                Sardar M. Abdullah
                <span className="text-[#8A849F] text-lg font-normal ml-2 sm:inline-block">
                  (Mr. Abdullah)
                </span>
              </h2>

              <p className="text-xs font-mono uppercase tracking-wider text-[#00C0FF] mb-3">
                Founder &amp; CEO, SARDYX AI · Karlal (Sardar) Family · Khyber Pakhtunkhwa, Pakistan
              </p>

              <blockquote className="text-base sm:text-lg font-medium text-white italic border-l-2 border-[#8A2BEF] pl-4 mb-3">
                &ldquo;Young founder. Serious engineering. Global ambition.&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-[#B8B3CC] leading-relaxed mb-4">
                Recognized among Pakistan&apos;s youngest self-taught programmers and game developers, Sardar M. Abdullah began building interactive games and software engines in early youth before founding SARDYX AI. Belonging to the renowned <strong>Karlal (Sardar)</strong> family of Khyber Pakhtunkhwa, he is the son of <strong>Mufti Fazal ur Rehman Shakir</strong> and nephew of the late prominent politician <strong>Sardar Muhammad Idrees</strong> (former Member of the Provincial Assembly of Khyber Pakhtunkhwa / NWFP from 2002–2007 and 2013–2018, ex-provincial minister).
              </p>

              <p className="text-xs sm:text-sm text-[#8A849F] leading-relaxed mb-6">
                Under his technical leadership, SARDYX AI has grown into an international technology agency, engineering mission-critical Cloud POS systems, offline-tolerant retail ledgers, and autonomous AI voice agents for enterprises across Pakistan, the United States, and the United Kingdom.
              </p>

              {/* 3 Verifiable Facts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                  <Award size={16} className="text-[#00C0FF] shrink-0" />
                  <span className="text-xs text-[#B8B3CC]">Youngest Dev Heritage</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                  <Globe2 size={16} className="text-[#8A2BEF] shrink-0" />
                  <span className="text-xs text-[#B8B3CC]">Serving PK, US &amp; UK</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5">
                  <ShieldCheck size={16} className="text-[#32CD32] shrink-0" />
                  <span className="text-xs text-[#B8B3CC]">Karlal (Sardar) Lineage</span>
                </div>
              </div>

              <Link
                href="/founder"
                className="btn-glass-pill inline-flex items-center gap-2 text-xs py-2.5 px-6 font-semibold"
              >
                <span>Read the Founder&apos;s Full Story &amp; Lineage</span>
                <ArrowRight size={14} className="text-[#00C0FF]" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 2. Team Grid */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow-pill mb-3">
            <Users size={13} className="text-[#00C0FF]" />
            <span>THE SARDYX TEAM</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            The SARDYX <span className="gradient-text-highlight">Team</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#B8B3CC] mt-2">
            Leadership, engineers, and client operations specialists delivering production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-panel p-6 rounded-2xl border border-white/[0.08] flex flex-col items-center text-center glass-panel-hover"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border border-[#8A2BEF]/30 bg-[#0D0B16] shadow-lg shadow-[#8A2BEF]/10">
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
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#00C0FF] mb-2 font-semibold">
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
