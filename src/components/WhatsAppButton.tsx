"use client";

import { getWhatsAppUrl } from "@/lib/supabaseClient";

export default function WhatsAppButton() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed right-5 bottom-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.43 0 .05 5.38.05 11.99c0 2.11.55 4.17 1.6 5.99L0 24l6.16-1.62a12 12 0 0 0 5.88 1.5h.01c6.61 0 11.99-5.38 11.99-11.99a11.91 11.91 0 0 0-3.52-8.41ZM12.04 21.86a9.94 9.94 0 0 1-5.06-1.39l-.36-.21-3.66.96.98-3.57-.24-.37a9.94 9.94 0 0 1-1.53-5.29c0-5.5 4.47-9.97 9.97-9.97a9.9 9.9 0 0 1 7.05 2.92 9.9 9.9 0 0 1 2.92 7.05c0 5.5-4.47 9.97-9.97 9.97Zm5.47-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
