'use client';

import { PlaybackGroup } from './PlaybackGroup';
import { TracksGroup } from './TracksGroup';
import { InterfaceGroup } from './InterfaceGroup';
import { LiveGroup } from './LiveGroup';
import { PlaylistGroup } from './PlaylistGroup';
import { AdsCastGroup } from './AdsCastGroup';
import { DiagnosticsGroup } from './DiagnosticsGroup';

/** Painel completo: um grupo por área da API pública do player. */
export function ControlPanel({ player, state }) {
  if (!player) return null;

  return (
    <div className="control-panel">
      <PlaybackGroup player={player} state={state} />
      <TracksGroup player={player} state={state} />
      <InterfaceGroup player={player} />
      <LiveGroup player={player} state={state} />
      <PlaylistGroup player={player} />
      <AdsCastGroup player={player} />
      <DiagnosticsGroup player={player} state={state} />
    </div>
  );
}
