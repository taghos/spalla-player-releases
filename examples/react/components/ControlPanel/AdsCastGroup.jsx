'use client';

import { useState } from 'react';

/** Publicidade e transmissão remota (Chromecast/AirPlay). */
export function AdsCastGroup({ player }) {
  const [vastUrl, setVastUrl] = useState('');

  return (
    <details>
      <summary>Publicidade e cast</summary>

      <div className="control-row">
        <button onClick={() => player.skipAd()}>Pular anúncio</button>
        <span className="badge">{player.isAdPlaying?.() ? 'anúncio em exibição' : 'sem anúncio'}</span>
      </div>

      <div className="control-row">
        <input
          id="vast-url"
          name="vast-url"
          type="text"
          placeholder="URL VAST"
          value={vastUrl}
          onChange={(e) => setVastUrl(e.target.value)}
        />
        <button onClick={() => vastUrl && player.requestAds(vastUrl)}>Solicitar anúncio</button>
      </div>

      <div className="control-row">
        <span className="badge">{player.isCastAvailable?.() ? 'cast disponível' : 'sem receptor'}</span>
        <button onClick={() => player.startCast()}>Iniciar cast</button>
        <button onClick={() => player.stopCast()}>Parar cast</button>
        <span className="badge">{player.isCasting?.() ? 'transmitindo' : 'local'}</span>
        <button onClick={() => player.startAirPlay()}>AirPlay</button>
      </div>
    </details>
  );
}
