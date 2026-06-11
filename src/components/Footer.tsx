import Link from "next/link";
import { siteContent } from "@/lib/content";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#areas", label: "Áreas" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white/70 py-12">
      <div className="section-container">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-lg font-semibold text-foreground">
              {siteContent.psychologistName}
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Atendimento psicológico para crianças e adolescentes, com
              acolhimento, escuta profissional e experiência com crianças
              autistas.
            </p>
          </div>

          <nav aria-label="Links do rodapé">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted">
          <p>
            © {year} {siteContent.psychologistName}. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            CRP [00/00000] · Endereço profissional · Cidade/UF
          </p>
        </div>
      </div>
    </footer>
  );
}
