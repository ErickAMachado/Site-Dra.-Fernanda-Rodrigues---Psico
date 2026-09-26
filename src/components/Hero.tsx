"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, MessageCircle, Sparkles } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/supabaseClient";
import { siteContent } from "@/lib/content";
import Image from "next/image";

export default function Hero() {
  const whatsappUrl = getWhatsAppUrl(siteContent.assessment.message);

  return (
    <section
      id="inicio"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 -left-20 h-72 w-72 rounded-full bg-secondary/60 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="section-container relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-white/80 px-4 py-2 text-sm text-muted backdrop-blur">
            <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
            Atendimento humanizado e desenvolvimento infantil
          </div>

          <h1 className="max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {siteContent.hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {siteContent.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {siteContent.assessment.cta}
            </a>
            <Link href="#avaliacao-neuropsicologica" className="btn-secondary">
              Conhecer a avaliação
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="soft-card relative overflow-hidden p-3">
            <div className="flex aspect-[4/5] items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-secondary/70 via-white to-primary/10">
            <div className="relative h-[550px] w-full overflow-hidden rounded-[1.4rem]">
              <Image
              src="/Fernanda-foto-site.png"
              alt="Foto profissional da psicóloga"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
              priority
              />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="absolute right-4 -bottom-4 max-w-[220px] rounded-2xl border border-border bg-white p-4 shadow-lg"
            >
              <p className="text-sm leading-relaxed font-medium text-foreground">
                {siteContent.hero.trustCard}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
