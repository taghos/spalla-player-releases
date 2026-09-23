'use client';

import { PlayerCard } from '@/components/PlayerCard';
import { CONTENT } from '@/lib/content';

export default function VariosPlayersPage() {
  return (
    <div>
      <h1>Vários players</h1>
      <p>Três instâncias independentes, cada uma com seu próprio seletor de conteúdo.</p>

      <div className="player-grid">
        {[0, 1, 2].map((i) => (
          <PlayerCard key={i} initialContentId={CONTENT[i % CONTENT.length].id} />
        ))}
      </div>
    </div>
  );
}
