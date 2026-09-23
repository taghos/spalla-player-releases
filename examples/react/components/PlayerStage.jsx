'use client';

/** Contêiner onde o player monta a própria raiz (`.sp-player`). */
export function PlayerStage({ playerRef, className = '' }) {
  return <div ref={playerRef} className={`player-stage ${className}`.trim()} />;
}
