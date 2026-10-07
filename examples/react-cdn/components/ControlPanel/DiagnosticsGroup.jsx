'use client';

import { useState } from 'react';

/** Estatísticas, configuração normalizada e escolha manual de CDN. */
export function DiagnosticsGroup({ player, state }) {
  const [dump, setDump] = useState('');

  return (
    <details>
      <summary>Diagnóstico</summary>

      <div className="control-row">
        <button onClick={() => setDump(JSON.stringify(player.getStats(), null, 2))}>Ver stats</button>
        <button onClick={() => setDump(JSON.stringify(player.getConfig(), null, 2))}>Ver config</button>
        <span className="badge">sessão: {player.getSessionId?.()}</span>
        <span className="badge">view: {player.getViewId?.()}</span>
      </div>

      <div className="control-row">
        <label htmlFor="cdn">CDN</label>
        <select id="cdn" name="cdn" onChange={(e) => player.setCdn(e.target.value)} defaultValue="">
          <option value="" disabled>
            {player.getPinnedCdn?.() || 'automática'}
          </option>
          {state.cdns.map((cdn) => (
            <option key={cdn.name} value={cdn.name}>
              {cdn.name}
            </option>
          ))}
        </select>
      </div>

      {dump && <pre>{dump}</pre>}
    </details>
  );
}
