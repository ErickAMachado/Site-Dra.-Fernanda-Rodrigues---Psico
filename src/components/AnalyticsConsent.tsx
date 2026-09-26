"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY, readConsent, saveConsent, startAnalytics, stopAnalytics, trackWhatsAppClick, type Consent } from "@/lib/analytics";

export default function AnalyticsConsent() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<Consent | null>(null);

  useEffect(() => {
    const saved = readConsent();
    setChoice(saved);
    setOpen(saved === null);
    if (saved === "accepted") startAnalytics();
    document.addEventListener("click", trackWhatsAppClick);
    document.addEventListener("auxclick", trackWhatsAppClick);
    const sync = (event: StorageEvent) => {
      if (event.key !== CONSENT_KEY && event.key !== null) return;
      stopAnalytics();
      window.location.reload();
    };
    window.addEventListener("storage", sync);
    return () => {
      document.removeEventListener("click", trackWhatsAppClick);
      document.removeEventListener("auxclick", trackWhatsAppClick);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function choose(next: Consent) {
    saveConsent(next);
    setChoice(next);
    setOpen(false);
    if (next === "accepted") startAnalytics();
    else {
      stopAnalytics();
      if (choice === "accepted") window.location.reload();
    }
  }

  return (
    <>
      <div className="bg-white/70 px-4 pb-8 text-center">
        <button type="button" onClick={() => setOpen(true)} className="text-sm text-muted underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          Preferências de privacidade
        </button>
      </div>
      {open && (
        <section aria-label="Preferências de privacidade" className="fixed bottom-24 left-4 right-4 z-[60] max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-white p-5 shadow-lg sm:bottom-6 sm:right-auto sm:max-w-md">
          <h2 className="text-base font-semibold">Sua privacidade</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Com sua permissão, uso o Google Analytics para entender as visitas ao site e os cliques no WhatsApp. Você pode recusar e continuar navegando normalmente.
          </p>
          <details className="mt-3 text-sm text-muted">
            <summary className="cursor-pointer underline underline-offset-4">Como funciona</summary>
            <p className="mt-2 leading-relaxed">Ao aceitar, o Google recebe dados de navegação e usa cookies de medição. A medição do clique não permite ler sua conversa no WhatsApp. Não ativo anúncios personalizados. Sua escolha fica salva neste navegador por até seis meses e pode ser alterada em “Preferências de privacidade”, no fim da página.</p>
            <a className="mt-2 inline-block underline" href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer">Política de privacidade do Google</a>
          </details>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose("rejected")} className="btn-secondary flex-1">Recusar</button>
            <button type="button" onClick={() => choose("accepted")} className="btn-secondary flex-1">Aceitar medição</button>
          </div>
          {choice && <button type="button" onClick={() => setOpen(false)} className="mt-3 text-sm text-muted underline">Manter minha escolha</button>}
        </section>
      )}
    </>
  );
}
