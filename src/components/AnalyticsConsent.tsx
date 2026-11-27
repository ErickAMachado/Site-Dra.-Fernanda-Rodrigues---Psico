"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY, type Consent, readConsent, saveConsent, startAnalytics, stopAnalytics, trackWhatsAppClick } from "@/lib/analytics";

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState<Consent | null | undefined>(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    setChoice(saved);
    if (saved === "accepted") startAnalytics();
    else stopAnalytics();
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
    setError(false);
    if (next === "rejected") stopAnalytics();
    if (!saveConsent(next)) {
      // Fail closed if browser storage cannot persist the user's choice.
      stopAnalytics();
      setChoice(null);
      setError(true);
      return;
    }
    setChoice(next);
    if (next === "accepted") startAnalytics();
    else window.location.reload();
  }

  return (
    <div className="bg-white/70 px-4 pb-8 text-center text-sm text-muted">
      {choice === null && (
        <section aria-label="Preferências de cookies" className="fixed bottom-4 left-4 right-4 z-50 rounded-xl border border-gray-300 bg-white p-4 text-left text-gray-800 shadow-lg sm:right-auto sm:max-w-md">
          <h2 className="font-semibold">Preferências de privacidade</h2>
          <p className="mt-2">Com sua autorização, usamos cookies do Google Analytics para medir visitas e interações gerais com o site. Não usamos cookies de publicidade nem personalização. Você pode recusar e continuar usando o site normalmente.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => choose("accepted")} className="rounded-md border border-gray-500 px-3 py-2 font-medium focus-visible:outline-2">Aceitar medição</button>
            <button type="button" onClick={() => choose("rejected")} className="rounded-md border border-gray-500 px-3 py-2 font-medium focus-visible:outline-2">Recusar medição</button>
          </div>
          {error && <p className="mt-2" role="alert">Não foi possível salvar sua escolha. A medição continua desativada nesta visita.</p>}
          <a className="mt-3 inline-block underline" href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer">Política de privacidade do Google</a>
        </section>
      )}
      <details className="mx-auto max-w-xl">
        <summary className="cursor-pointer underline underline-offset-4">Privacidade</summary>
        <p className="mt-3 leading-relaxed">A medição é opcional e usa cookies somente após sua autorização. Não lemos suas conversas no WhatsApp nem usamos publicidade personalizada. Você pode alterar sua escolha a qualquer momento.</p>
        <a className="mt-3 inline-block underline" href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer">Política de privacidade do Google</a>
        <p className="mt-3" role="status">{choice === "accepted" ? "Medição autorizada neste navegador." : "Medição desativada neste navegador."}</p>
        <div className="mt-3 flex justify-center gap-4">
          {choice !== "accepted" && <button type="button" onClick={() => choose("accepted")} className="underline underline-offset-4 focus-visible:outline-2">Aceitar medição</button>}
          {choice !== "rejected" && <button type="button" onClick={() => choose("rejected")} className="underline underline-offset-4 focus-visible:outline-2">Recusar medição</button>}
        </div>
      </details>
    </div>
  );
}
