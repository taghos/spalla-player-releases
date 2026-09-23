'use client';

/** Volume, taxa de reprodução, qualidade, áudio e legenda. */
export function TracksGroup({ player, state }) {
  return (
    <details>
      <summary>Áudio, vídeo e legendas</summary>

      <div className="control-row">
        <label htmlFor="volume">Volume</label>
        <input
          id="volume"
          name="volume"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={state.volume}
          onChange={(e) => {
            player.volume = Number(e.target.value);
          }}
        />
        <button onClick={() => (player.muted = !player.muted)}>{state.muted ? 'Ativar som' : 'Mudo'}</button>
      </div>

      <div className="control-row">
        <label htmlFor="rate">Velocidade</label>
        <select
          id="rate"
          name="rate"
          value={state.playbackRate}
          onChange={(e) => {
            player.playbackRate = Number(e.target.value);
          }}
        >
          {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
            <option key={rate} value={rate}>
              {rate}x
            </option>
          ))}
        </select>
      </div>

      <div className="control-row">
        <label htmlFor="quality">Qualidade</label>
        <select
          id="quality"
          name="quality"
          onChange={(e) => player.setVideoQuality(e.target.value === 'auto' ? 'auto' : Number(e.target.value))}
          defaultValue="auto"
        >
          <option value="auto">automática</option>
          {state.qualities.map((track) => (
            <option key={track.id} value={track.id}>
              {track.height ? `${track.height}p` : `faixa ${track.id}`}
              {track.active ? ' (atual)' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="control-row">
        <label htmlFor="audio">Faixa de áudio</label>
        <select
          id="audio"
          name="audio"
          onChange={(e) => {
            const track = state.audioTracks[Number(e.target.value)];
            if (track) player.setAudioTrack(track);
          }}
          defaultValue=""
        >
          <option value="" disabled>
            escolher faixa
          </option>
          {state.audioTracks.map((track, i) => (
            <option key={`${track.language}-${i}`} value={i}>
              {track.label || track.language}
              {track.active ? ' (atual)' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="control-row">
        <label htmlFor="text">Legenda</label>
        <select
          id="text"
          name="text"
          onChange={(e) => {
            if (e.target.value === 'off') {
              player.setTextTrackVisibility(false);
              return;
            }
            const track = state.textTracks[Number(e.target.value)];
            if (track) player.setTextTrack(track);
          }}
          defaultValue="off"
        >
          <option value="off">desligada</option>
          {state.textTracks.map((track, i) => (
            <option key={`${track.language}-${i}`} value={i}>
              {track.label || track.language}
              {track.active ? ' (atual)' : ''}
            </option>
          ))}
        </select>
      </div>
    </details>
  );
}
