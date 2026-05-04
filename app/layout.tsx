import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Candidata Ideal",
  description: "Sistema pessoal de candidatura guiada por agentes de IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="siteHeader">
          <Link href="/" className="brand">
            Candidata Ideal
          </Link>
          <nav className="mainNav" aria-label="Navegação principal">
            <Link href="/">Processo</Link>
            <Link href="/historico">Histórico</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
