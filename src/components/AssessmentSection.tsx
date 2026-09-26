import { ArrowUpRight, ClipboardList, MessageCircle } from "lucide-react";
import { siteContent } from "@/lib/content";
import { getWhatsAppUrl } from "@/lib/supabaseClient";

export default function AssessmentSection() {
  const assessment = siteContent.assessment;

  return (
    <section
      id="avaliacao-neuropsicologica"
      aria-labelledby="assessment-title"
      className="scroll-mt-24 py-10 sm:py-16"
    >
      <div className="section-container">
        <div className="relative overflow-hidden rounded-3xl bg-primary-dark px-6 py-10 text-white sm:p-12 lg:p-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border-[40px] border-white/10" aria-hidden="true" />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium">
                <ClipboardList className="h-4 w-4" aria-hidden="true" />
                Avaliação e aplicação de testes
              </div>
              <h2 id="assessment-title" className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {assessment.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
                {assessment.text}
              </p>
            </div>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-6 sm:p-8">
              <MessageCircle className="mb-4 h-8 w-8" aria-hidden="true" />
              <h3 className="text-xl font-semibold">Vamos conversar sobre a avaliação?</h3>
              <p className="mt-3 text-sm leading-relaxed">Tire suas dúvidas diretamente pelo WhatsApp.</p>
              <a
                href={getWhatsAppUrl(assessment.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-center text-sm font-semibold text-foreground transition hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {assessment.cta}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
