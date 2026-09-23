'use client';

import { useRef, useState } from 'react';
import { PlayerStage } from '@/components/PlayerStage';
import { ContentSelect } from '@/components/ContentSelect';
import { ControlPanel } from '@/components/ControlPanel';
import { usePlayer, loadContent } from '@/lib/usePlayer';
import { usePlayerState } from '@/lib/usePlayerState';
import { CONTENT } from '@/lib/content';

export default function ControlesCompletosPage() {
  const containerRef = useRef(null);
  const [contentId, setContentId] = useState(CONTENT[0].id);
  // Sem `skin`: o player usa a skin que o backend definir para o conteúdo.
  const player = usePlayer(containerRef, { allowUrlParams: true, debug: 'warn' });
  const state = usePlayerState(player);

  return (
    <div>
      <h1>Controles completos</h1>
      <p>
        A skin é a padrão do conteúdo (nenhuma opção de skin é passada ao construtor). O painel
        abaixo é próprio deste exemplo e cobre praticamente toda a API pública do player.
      </p>

      <div className="screen-toolbar">
        <ContentSelect value={contentId} onChange={setContentId} id="conteudo" />
        <button onClick={() => loadContent(player, contentId)}>Carregar</button>
      </div>

      <PlayerStage playerRef={containerRef} />

      <ControlPanel player={player} state={state} />
    </div>
  );
}
