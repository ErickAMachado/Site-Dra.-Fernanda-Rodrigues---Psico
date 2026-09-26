"use client";

import { motion } from "framer-motion";
import { siteContent } from "@/lib/content";

export default function AboutSection() {
  return (
    <section id="sobre" className="py-20 sm:py-24">
      <div className="section-container grid gap-10 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">{siteContent.about.title}</h2>
          <p className="section-subtitle">{siteContent.about.text}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="soft-card bg-gradient-to-br from-white to-secondary/30"
        >
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            {siteContent.psychologistName}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Psicóloga · {siteContent.registration}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-foreground">
            <li>• Terapia Cognitivo-Comportamental (TCC)</li>
            <li>• Foco em crianças e adolescentes, com atendimento também a adultos</li>
            <li>• Atendimento presencial em Hortolândia</li>
            <li>• Psicoterapia online para adolescentes e adultos</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
