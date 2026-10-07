'use client';

import { useRef, useState } from 'react';
import { PlayerStage } from '@/components/PlayerStage';
import { ContentSelect } from '@/components/ContentSelect';
import { CustomOverlay } from '@/components/CustomOverlay';
import { usePlayer, loadContent } from '@/lib/usePlayer';
import { usePlayerState } from '@/lib/usePlayerState';
import { CONTENT } from '@/lib/content';

export default function OverlayPersonalizadoPage() {
  const containerRef = useRef(null);
  const [contentId, setContentId] = useState(CONTENT[0].id);
  // `controls: false` esconde a barra nativa. A skin `videojs` (a padrão) tem
  // um botão de "convite para começar" que é próprio dela e não passa pela
  // lista de controles — por isso a troca para `minimal`, que não o tem.
  const player = usePlayer(containerRef, {
    allowUrlParams: true,
    skin: 'minimal',
    controls: false,
  });
  const state = usePlayerState(player);

  return (
    <div>
      <h1>Overlay personalizado</h1>
      <p>
        O player sobe sem nenhum controle nativo (<code>controls: false</code>, skin{' '}
        <code>minimal</code>); tudo o que se vê é overlay nosso.
      </p>

      <div className="screen-toolbar">
        <ContentSelect value={contentId} onChange={setContentId} id="conteudo" />
        <button onClick={() => loadContent(player, contentId)}>Carregar</button>
      </div>

      <div className="player-stage-wrap">
        <PlayerStage playerRef={containerRef} />
        {player && <CustomOverlay player={player} state={state} />}
      </div>
    </div>
  );
}
