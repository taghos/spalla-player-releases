'use client';

import { useCallback, useEffect, useState } from 'react';

const ESTADO_VAZIO = {
  currentTime: 0,
  duration: 0,
  paused: true,
  ended: false,
  muted: false,
  volume: 1,
  playbackRate: 1,
  liveState: null,
  isLive: false,
  qualities: [],
  audioTracks: [],
  textTracks: [],
  cdns: [],
};

function retrato(player) {
  if (!player) return ESTADO_VAZIO;
  return {
    currentTime: player.currentTime ?? 0,
    duration: player.duration ?? 0,
    paused: player.paused ?? true,
    ended: player.ended ?? false,
    muted: player.muted ?? false,
    volume: player.volume ?? 1,
    playbackRate: player.playbackRate ?? 1,
    liveState: player.liveState ?? null,
    isLive: player.isLive?.() ?? false,
    qualities: player.getVideoQualities?.() ?? [],
    audioTracks: player.getAudioTracks?.() ?? [],
    textTracks: player.getTextTracks?.() ?? [],
    cdns: player.getCdns?.() ?? [],
  };
}

/** Assina todos os eventos do player e devolve um retrato atualizado do estado. */
export function usePlayerState(player) {
  const [state, setState] = useState(() => retrato(player));
  const atualizar = useCallback(() => setState(retrato(player)), [player]);

  useEffect(() => {
    if (!player) return undefined;
    atualizar();
    return player.on('*', atualizar);
  }, [player, atualizar]);

  return state;
}
