'use client';

/** Navegação de playlist e capítulos; some sozinho quando não há nenhum. */
export function PlaylistGroup({ player }) {
  const playlist = player.getPlaylist?.() ?? null;
  const chapters = player.getChapters?.() ?? [];

  return (
    <details>
      <summary>Playlist e capítulos</summary>

      <div className="control-row">
        <button onClick={() => player.previous()}>Anterior</button>
        <button onClick={() => player.next()}>Próximo</button>
        <span className="badge">
          {playlist
            ? `item ${player.getCurrentItemIndex() + 1} de ${playlist.items?.length ?? '—'}`
            : 'sem playlist carregada'}
        </span>
      </div>

      {chapters.length > 0 && (
        <div className="control-row">
          {chapters.map((chapter, i) => (
            <button key={chapter.id ?? i} onClick={() => player.seekToChapter(i)}>
              {chapter.title ?? `Capítulo ${i + 1}`}
            </button>
          ))}
        </div>
      )}
    </details>
  );
}
