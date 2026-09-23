'use client';

import { useRef, useState } from 'react';
import { PlayerStage } from '@/components/PlayerStage';
import { ContentSelect } from '@/components/ContentSelect';
import { usePlayer, loadContent } from '@/lib/usePlayer';
import { usePlayerState } from '@/lib/usePlayerState';

/** Uma instância independente, com seletor e carga próprios. */
export function PlayerCard({ initialContentId }) {
  const containerRef = useRef(null);
  const [contentId, setContentId] = useState(initialContentId);
  // Sem `skin`: cada card usa a skin padrão do conteúdo que carregar.
  const player = usePlayer(containerRef, { allowUrlParams: true });
  const state = usePlayerState(player);

  return (
    <div className="player-card">
      <div className="screen-toolbar">
        <ContentSelect value={contentId} onChange={setContentId} />
        <button onClick={() => loadContent(player, contentId)}>Carregar</button>
      </div>
      <PlayerStage playerRef={containerRef} />
      <p className="player-card__status">
        {state.paused ? 'pausado' : 'tocando'} · {Math.round(state.currentTime)}s
      </p>
    </div>
  );
}
