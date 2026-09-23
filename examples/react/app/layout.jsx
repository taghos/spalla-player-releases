import Script from 'next/script';
import { NavBar } from '@/components/NavBar';
import './globals.css';

export const metadata = {
  title: 'Spalla Player · exemplo React',
  description: 'Exemplo de integração do Spalla Player com React',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Precisa existir como window.SpallaPlayer antes de qualquer tela
            montar um player — beforeInteractive garante essa ordem. */}
        <Script src="/vendor/spalla-player.js" strategy="beforeInteractive" />
        <NavBar />
        <main className="app-main">{children}</main>
      </body>
    </html>
  );
}
