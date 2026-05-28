"use client";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery", desc: "Analyzing infrastructure needs and mapping computational goals." },
  { num: "02", title: "Architecture", desc: "Designing system architecture that integrates into your workflows." },
  { num: "03", title: "Development", desc: "Building the intelligence engine and crafting the user interface." },
  { num: "04", title: "Launch & Scale", desc: "Deployment, continuous monitoring, optimization, and scaling your systems." }
];

export default function Process() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Deployment Protocol
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Our rigorous methodology for building intelligent digital infrastructure.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Connector dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_#00f0ff] -translate-x-1/2 mt-8 md:mt-8"></div>
              
              <div className="hidden md:block md:w-1/2"></div>
              
              <div className="md:w-1/2 pl-20 md:pl-0 flex flex-col justify-center">
                <div className={`glass-panel p-8 rounded-2xl border border-white/10 relative group hover:border-primary/50 transition-colors ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}`}>
                  <div className="text-primary/50 font-bold text-5xl absolute -top-6 -right-2 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                    <span className="text-primary">{step.num}</span> {step.title}
                  </h3>
                  <p className="text-gray-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
