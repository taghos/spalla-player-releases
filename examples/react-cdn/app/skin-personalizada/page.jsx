'use client';

import { useEffect, useRef, useState } from 'react';
import { PlayerStage } from '@/components/PlayerStage';
import { ContentSelect } from '@/components/ContentSelect';
import { loadContent } from '@/lib/usePlayer';
import { usePlayerState } from '@/lib/usePlayerState';
import { CONTENT } from '@/lib/content';

export default function SkinPersonalizadaPage() {
  const containerRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [contentId, setContentId] = useState(CONTENT[0].id);
  const state = usePlayerState(player);

  useEffect(() => {
    if (!containerRef.current) return undefined;
    let instance;
    let cancelado = false;

    // Import dinâmico: a skin faz `extends globalThis.SpallaPlayer.Skin`, que
    // só existe no navegador — carregá-la aqui evita avaliar isso no servidor.
    import('@/skins/exampleSkin').then(({ registerReactExampleSkin }) => {
      if (cancelado || !containerRef.current) return;
      registerReactExampleSkin();
      instance = new window.SpallaPlayer(containerRef.current, {
        allowUrlParams: true,
        skin: 'react-exemplo',
      });
      setPlayer(instance);
    });

    return () => {
      cancelado = true;
      instance?.destroy();
      setPlayer(null);
    };
  }, []);

  return (
    <div>
      <h1>Skin personalizada</h1>
      <p>
        A skin <code>react-exemplo</code> é registrada por este exemplo (<code>skins/exampleSkin.js</code>) —
        não é uma das sete embarcadas no player.
      </p>

      <div className="screen-toolbar">
        <ContentSelect value={contentId} onChange={setContentId} id="conteudo" />
        <button onClick={() => loadContent(player, contentId)}>Carregar</button>
      </div>

      <PlayerStage playerRef={containerRef} />
    </div>
  );
}
