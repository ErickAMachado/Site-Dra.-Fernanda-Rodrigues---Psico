"use client";

import { motion } from "framer-motion";
import { Baby, Brain, ClipboardList, Heart, Sparkles, Users } from "lucide-react";
import { serviceAreas } from "@/lib/content";

const icons = [Baby, Sparkles, Heart, Users, Brain, ClipboardList];

export default function ServicesSection() {
  return (
    <section id="areas" className="bg-white/60 py-20 sm:py-24">
      <div className="section-container">
        <div className="max-w-2xl">
          <h2 className="section-title">Como posso acompanhar você</h2>
          <p className="section-subtitle">
            Meu foco está na infância e na adolescência, mas o atendimento
            também está aberto a adultos. Conheça as possibilidades.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area, index) => {
            const Icon = icons[index % icons.length];

            return (
              <motion.article
                key={area.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="soft-card hover:-translate-y-1 transition-transform"
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary/60 text-primary"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {area.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
