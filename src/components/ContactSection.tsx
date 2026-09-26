"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/supabaseClient";
import { siteContent } from "@/lib/content";

export default function ContactSection() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section id="contato" className="bg-white/60 py-20 sm:py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="section-title">{siteContent.contact.title}</h2>
          <p className="section-subtitle mx-auto">{siteContent.contact.subtitle}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Conversar no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
