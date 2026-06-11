"use client";

import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function AutismSection() {
  return (
    <section id="autismo" className="py-20 sm:py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="soft-card overflow-hidden bg-gradient-to-br from-primary/10 via-white to-secondary/40 p-8 sm:p-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-primary">
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                Atendimento individualizado
              </div>
              <h2 className="section-title">{siteContent.autism.title}</h2>
              <p className="section-subtitle">{siteContent.autism.text}</p>
            </div>

            <div className="max-w-sm rounded-2xl border border-border bg-white/80 p-5 text-sm leading-relaxed text-muted">
              O acompanhamento respeita o tempo, a comunicação e as
              particularidades de cada criança, sem promessas de cura ou
              resultados garantidos.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
