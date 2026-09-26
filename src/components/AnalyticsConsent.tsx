"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY, readConsent, saveConsent, startAnalytics, stopAnalytics, trackWhatsAppClick } from "@/lib/analytics";

export default function AnalyticsConsent() {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const optedOut = readConsent() === "rejected";
    setDisabled(optedOut);
    // Preserve previous refusals; otherwise start limited measurement automatically.
    if (!optedOut) startAnalytics();
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

  function toggleMeasurement() {
    saveConsent(disabled ? "accepted" : "rejected");
    stopAnalytics();
    window.location.reload();
  }

  return (
    <div className="bg-white/70 px-4 pb-8 text-center text-sm text-muted">
      <details className="mx-auto max-w-xl">
        <summary className="cursor-pointer underline underline-offset-4">Privacidade</summary>
        <p className="mt-3 leading-relaxed">
          Este site envia ao Google Analytics sinais limitados de visitas e cliques no WhatsApp, sem cookies de medição nem personalização de anúncios. Isso não permite ler suas conversas no WhatsApp. Você pode desativar a medição neste navegador sem alterar o funcionamento do site.
        </p>
        <a className="mt-3 inline-block underline" href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer">Política de privacidade do Google</a>
        <p className="mt-3" role="status">{disabled ? "Medição desativada neste navegador." : "Medição limitada ativada."}</p>
        <button type="button" onClick={toggleMeasurement} className="mt-3 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          {disabled ? "Reativar medição limitada" : "Desativar medição"}
        </button>
      </details>
    </div>
  );
}
