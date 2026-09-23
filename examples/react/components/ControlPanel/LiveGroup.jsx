'use client';

/** Estado só-leitura de ao vivo/DVR, mais a troca de sinal. */
export function LiveGroup({ player, state }) {
  return (
    <details>
      <summary>Ao vivo e DVR</summary>
      <div className="badge-row">
        <span className="badge">ao vivo: {state.isLive ? 'sim' : 'não'}</span>
        <span className="badge">estado: {state.liveState ?? '—'}</span>
        <span className="badge">latência: {player.getLiveLatency?.().toFixed?.(1) ?? '—'}s</span>
        <span className="badge">janela DVR: {player.getDvrWindow?.().toFixed?.(0) ?? '—'}s</span>
        <span className="badge">no fio: {player.isAtLiveEdge?.() ? 'sim' : 'não'}</span>
      </div>
      <div className="control-row">
        <button onClick={() => player.toggleSignal()}>Alternar sinal</button>
      </div>
    </details>
  );
}
