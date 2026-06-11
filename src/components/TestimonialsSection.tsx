"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types/database";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

function formatDate(date: string | null) {
  if (!date) return null;

  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating ? "fill-amber-400 text-amber-400" : "text-border"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section id="depoimentos" className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(122,155,142,0.12),_transparent_55%)]" />

      <div className="section-container relative">
        <div className="max-w-2xl">
          <h2 className="section-title">Depoimentos e avaliações</h2>
          <p className="section-subtitle">
            Famílias que compartilharam experiências sobre o acompanhamento
            psicológico.
          </p>
        </div>

        <div className="mt-12 columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="soft-card break-inside-avoid rounded-[1.75rem] shadow-md hover:-translate-y-1 transition-transform"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <StarRating rating={testimonial.rating} />
                <span className="rounded-full bg-secondary/50 px-3 py-1 text-xs font-medium text-foreground">
                  {testimonial.source}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-foreground">
                “{testimonial.comment}”
              </p>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.author_name}
                </p>
                {testimonial.review_date && (
                  <time
                    className="text-xs text-muted"
                    dateTime={testimonial.review_date}
                  >
                    {formatDate(testimonial.review_date)}
                  </time>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
