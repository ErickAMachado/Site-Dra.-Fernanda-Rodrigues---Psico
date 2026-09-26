import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fernanda Rodrigues | Psicóloga em Hortolândia | CRP 06/210733",
  description:
    "Psicoterapia com TCC para crianças, adolescentes e adultos. Presencial em Hortolândia e online para adolescentes e adultos. Avaliação neuropsicológica presencial.",
  openGraph: {
    title:
      "Fernanda Rodrigues | Psicóloga em Hortolândia | CRP 06/210733",
    description:
      "Psicoterapia com TCC para crianças, adolescentes e adultos. Presencial em Hortolândia e online para adolescentes e adultos. Avaliação neuropsicológica presencial.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
