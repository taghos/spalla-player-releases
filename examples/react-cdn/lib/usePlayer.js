'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Cria uma instância de `SpallaPlayer` presa ao ciclo de vida do componente.
 *
 * `options` só vale na primeira renderização: skin, controles e afins são
 * decididos na construção, e trocar esse objeto depois não recria o player —
 * quem precisa de outra configuração monta outro componente (ou usa os
 * métodos da instância, como `setSkin`/`setControls`).
 */
export function usePlayer(containerRef, options) {
  const [player, setPlayer] = useState(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    if (!containerRef.current || !window.SpallaPlayer) return undefined;

    const instance = new window.SpallaPlayer(containerRef.current, optionsRef.current);
    setPlayer(instance);

    return () => {
      instance.destroy();
      setPlayer(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  return player;
}

/** Carrega um conteúdo e loga a falha, sem derrubar a tela. */
export function loadContent(player, contentId) {
  if (!player || !contentId) return;
  player.load(contentId).catch((err) => {
    console.error('falha ao carregar conteúdo', err);
  });
}
