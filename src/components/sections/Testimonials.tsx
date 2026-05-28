"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The integration capabilities shown by SARDYX are beyond what we imagined. Our operational latency decreased by 60%.",
    author: "Elena Vance",
    role: "CTO, Nexus Corp",
  },
  {
    quote: "Their engineered interfaces feel like they are from the next decade. Highly recommended for complex systems.",
    author: "Marcus Chen",
    role: "Lead Product, Synapse",
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 relative bg-black/50">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            Network Feedback
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Validations from the field.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-10 rounded-2xl border border-white/10 relative"
            >
              <Quote className="absolute top-6 right-6 text-white/5" size={80} />
              <p className="text-xl text-gray-300 leading-relaxed mb-8 relative z-10 italic">
                "{test.quote}"
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary/50 to-secondary/50 flex items-center justify-center border border-white/20">
                  <span className="font-bold text-white">{test.author.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-white font-bold">{test.author}</h4>
                  <p className="text-sm text-gray-400">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
