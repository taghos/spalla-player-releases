'use client';

/** Barra própria, sem nenhuma classe do Shaka. */
export function CustomOverlay({ player, state }) {
  const percent = state.duration ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div className="overlay">
      <div className="overlay__center">
        <button onClick={() => player.togglePlay()}>{state.paused ? '►' : '❚❚'}</button>
      </div>
      <div className="overlay__bar">
        <input
          id="overlay-seek"
          name="overlay-seek"
          aria-label="Posição na linha do tempo"
          type="range"
          min="0"
          max="100"
          step="0.1"
          value={percent}
          onChange={(e) => {
            const fraction = Number(e.target.value) / 100;
            player.seek(fraction * state.duration);
          }}
        />
        <span className="overlay__time">
          {formatTime(state.currentTime)} / {formatTime(state.duration)}
        </span>
        <button onClick={() => (player.muted = !player.muted)}>{state.muted ? '🔇' : '🔊'}</button>
        <input
          id="overlay-volume"
          name="overlay-volume"
          aria-label="Volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={state.volume}
          onChange={(e) => {
            player.volume = Number(e.target.value);
          }}
          style={{ width: 80 }}
        />
        <button onClick={() => (player.isFullscreen() ? player.exitFullscreen() : player.enterFullscreen())}>
          ⛶
        </button>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
