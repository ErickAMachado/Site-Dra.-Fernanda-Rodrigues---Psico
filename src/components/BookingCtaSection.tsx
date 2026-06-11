"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarHeart, MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/supabaseClient";
import { siteContent } from "@/lib/content";

export default function BookingCtaSection() {
  const whatsappUrl = getWhatsAppUrl(
    "Olá, gostaria de agendar uma conversa inicial sobre o atendimento.",
  );

  return (
    <section id="agendamento" className="py-20 sm:py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="soft-card flex flex-col items-start justify-between gap-6 bg-gradient-to-r from-primary/15 via-white to-secondary/40 p-8 sm:flex-row sm:items-center sm:p-10"
        >
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
              <CalendarHeart className="h-4 w-4" aria-hidden="true" />
              Agendamento
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {siteContent.bookingCta.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {siteContent.bookingCta.text}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[220px]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Falar pelo WhatsApp
            </a>
            <Link href="#contato" className="btn-secondary w-full">
              Enviar mensagem
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
