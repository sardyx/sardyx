"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Essential intelligence for emerging ventures.",
    price: "$2.5k+",
    features: ["Basic AI Chatbot", "Standard Web Presence", "Monthly Analytics", "Email Support"],
    highlighted: false,
  },
  {
    name: "Growth",
    description: "Advanced capabilities for scaling networks.",
    price: "$5k+",
    features: ["Advanced Autonomous Agents", "Cinematic UI/UX Design", "Workflow Automation", "Real-time Optimization", "Priority Support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Custom neural infrastructure for industry leaders.",
    price: "Custom",
    features: ["Full Digital Transformation", "Dedicated Engineering Team", "Custom AI Models", "24/7 Red-Tie Support"],
    highlighted: false,
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            System Quotas
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Scalable infrastructure plans tailored to your computational demands.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-panel rounded-3xl p-8 relative ${plan.highlighted ? "border-primary/50 transform md:-translate-y-4 shadow-[0_0_50px_rgba(0,240,255,0.1)] glow-border" : "border-white/10"}`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-xs font-bold uppercase tracking-wider rounded-full z-10 shadow-[0_0_15px_#00f0ff]">
                  Recommended
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{plan.name}</h3>
              <p className="text-sm text-gray-400 h-10 mb-6 relative z-10">{plan.description}</p>
              <div className="mb-8 relative z-10">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
              </div>
              <ul className="space-y-4 mb-8 relative z-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-300">
                    <Check size={16} className="text-primary mr-3 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`relative z-10 w-full py-4 rounded-xl font-bold transition-all ${plan.highlighted ? "bg-white text-black hover:bg-gray-200" : "bg-white/5 text-white border border-white/10 hover:bg-white/10"}`}>
                Initialize Protocol
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
