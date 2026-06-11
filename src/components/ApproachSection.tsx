"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { siteContent } from "@/lib/content";

export default function ApproachSection() {
  return (
    <section id="abordagem" className="py-20 sm:py-24">
      <div className="section-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">{siteContent.approach.title}</h2>
          <p className="section-subtitle">{siteContent.approach.text}</p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {siteContent.approach.items.map((item) => (
            <li key={item} className="soft-card flex gap-3">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-foreground">
                {item}
              </span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
