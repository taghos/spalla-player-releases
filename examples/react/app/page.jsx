import Link from 'next/link';

const SCREENS = [
  {
    href: '/controles-completos',
    title: 'Controles completos',
    description:
      'Um player só, com a skin padrão do conteúdo, e abaixo um painel próprio com botões para praticamente toda ação da API do player.',
  },
  {
    href: '/overlay-personalizado',
    title: 'Overlay personalizado',
    description:
      'Um player só, sem nenhum controle nativo — a barra é inteiramente nossa, desenhada por cima do vídeo.',
  },
  {
    href: '/varios-players',
    title: 'Vários players',
    description:
      'Três instâncias independentes na mesma página, cada uma com a skin padrão do próprio conteúdo e um seletor só seu.',
  },
  {
    href: '/skin-personalizada',
    title: 'Skin personalizada',
    description:
      'Um player só, usando uma skin registrada localmente neste exemplo (não é nenhuma das embarcadas no player).',
  },
];

export default function HomePage() {
  return (
    <div>
      <h1>Exemplo React</h1>
      <p>Quatro telas exercitando integrações diferentes com o Spalla Player.</p>
      <div className="home-grid">
        {SCREENS.map((screen) => (
          <Link key={screen.href} href={screen.href} className="home-card" style={{ textDecoration: 'none' }}>
            <h2>{screen.title}</h2>
            <p>{screen.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
