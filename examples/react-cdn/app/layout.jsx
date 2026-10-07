import Script from 'next/script';
import { NavBar } from '@/components/NavBar';
import './globals.css';

export const metadata = {
  title: 'Spalla Player · exemplo React via CDN',
  description: 'Exemplo de integração do Spalla Player via CDN com React',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Script
          src="https://beyond.spalla.io/player/spalla-player.min.js"
          strategy="beforeInteractive"
        />
        <NavBar />
        <main className="app-main">{children}</main>
      </body>
    </html>
  );
}
