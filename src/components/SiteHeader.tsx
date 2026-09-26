import Link from "next/link";
import { siteContent } from "@/lib/content";

const navLinks = [
  { href: "#avaliacao-neuropsicologica", label: "Avaliação neuropsicológica" },
  { href: "#sobre", label: "Sobre" },
  { href: "#areas", label: "Áreas" },
  { href: "#abordagem", label: "Abordagem" },
  { href: "#contato", label: "Contato" },
];

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="section-container flex h-16 items-center justify-between">
        <Link
          href="#inicio"
          className="text-sm font-semibold tracking-tight text-foreground sm:text-base"
        >
          {siteContent.psychologistName}
        </Link>

        <Link href="#avaliacao-neuropsicologica" className="ml-3 rounded-full bg-primary-dark px-3 py-2 text-xs font-semibold text-white lg:hidden">
          Avaliação
        </Link>
        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={link.href === "#avaliacao-neuropsicologica" ? "text-sm font-semibold text-primary-dark underline decoration-primary/40 underline-offset-4" : "text-sm text-muted transition hover:text-primary"}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
