import Link from 'next/link';

const LINKS = [
  { href: '/', label: 'Início' },
  { href: '/controles-completos', label: 'Controles completos' },
  { href: '/overlay-personalizado', label: 'Overlay personalizado' },
  { href: '/varios-players', label: 'Vários players' },
  { href: '/skin-personalizada', label: 'Skin personalizada' },
];

export function NavBar() {
  return (
    <nav className="nav-bar">
      <span className="nav-bar__brand">Spalla Player · exemplo React</span>
      <ul className="nav-bar__links">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
