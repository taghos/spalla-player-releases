'use client';

/** Tocar, pausar, saltar, ir para um ponto e avanço rápido. */
export function PlaybackGroup({ player, state }) {
  return (
    <details open>
      <summary>Reprodução</summary>
      <div className="control-row">
        <button onClick={() => player.play()}>Play</button>
        <button onClick={() => player.pause()}>Pause</button>
        <button onClick={() => player.togglePlay()}>Play/Pause</button>
        <button onClick={() => player.stop()}>Stop</button>
        <span className="badge">{state.paused ? 'pausado' : 'tocando'}</span>
      </div>
      <div className="control-row">
        <button onClick={() => player.seekBy(-10)}>-10s</button>
        <button onClick={() => player.seekBy(10)}>+10s</button>
        <button onClick={() => player.seekToLive()}>Ir ao vivo</button>
        <button onClick={() => player.replay()}>Reiniciar</button>
        <button onClick={() => player.retry()}>Tentar novamente</button>
        <button onClick={() => player.reload()}>Recarregar</button>
      </div>
      <div className="control-row">
        <label htmlFor="seek-time">Ir para (s)</label>
        <input
          id="seek-time"
          name="seek-time"
          type="number"
          min="0"
          defaultValue={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') player.seek(Number(e.currentTarget.value));
          }}
        />
        <span className="badge">
          {Math.round(state.currentTime)}s / {Math.round(state.duration) || '—'}s
        </span>
      </div>
      <div className="control-row">
        <label htmlFor="trick-rate">Avanço rápido</label>
        <select
          id="trick-rate"
          name="trick-rate"
          onChange={(e) => player.trickPlay(Number(e.target.value))}
          defaultValue=""
        >
          <option value="" disabled>
            escolher velocidade
          </option>
          <option value="2">2x</option>
          <option value="4">4x</option>
          <option value="8">8x</option>
        </select>
        <button onClick={() => player.cancelTrickPlay()}>Cancelar</button>
      </div>
    </details>
  );
}
