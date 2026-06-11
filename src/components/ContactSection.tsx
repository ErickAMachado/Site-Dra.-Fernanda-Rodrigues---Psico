"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/supabaseClient";
import { siteContent } from "@/lib/content";
import { leadSchema, type LeadFormData } from "@/lib/validations";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const whatsappUrl = getWhatsAppUrl();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: LeadFormData) {
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        throw new Error(result.error ?? "Não foi possível enviar seu contato.");
      }

      setSubmitted(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar seu contato. Tente novamente.",
      );
    }
  }

  return (
    <section id="contato" className="bg-white/60 py-20 sm:py-24">
      <div className="section-container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">{siteContent.contact.title}</h2>
          <p className="section-subtitle">{siteContent.contact.subtitle}</p>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="soft-card p-6 sm:p-8"
        >
          {submitted ? (
            <div
              role="status"
              className="rounded-2xl border border-primary/20 bg-primary/10 p-6 text-center"
            >
              <p className="text-base font-medium text-foreground">
                {siteContent.contact.successMessage}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-secondary mt-5"
              >
                Enviar outro contato
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Seu nome"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  WhatsApp
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="(00) 00000-0000"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  E-mail <span className="text-muted">(opcional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="seu@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Como posso ajudar?
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Conte brevemente o que você busca"
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {submitError && (
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Quero conversar
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
