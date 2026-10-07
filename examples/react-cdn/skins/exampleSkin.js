/**
 * Skin de terceiro, registrada em runtime — mesmo caminho de
 * `demo/demo-skin.js`: a classe base vem do bundle já carregado por
 * `<script>`, e o CSS viaja como string porque não há bundler processando
 * este arquivo.
 *
 * Importado dinamicamente (`import()`) de dentro de um `useEffect`, nunca no
 * topo de um módulo: `extends globalThis.SpallaPlayer.Skin` explodiria se
 * fosse avaliado durante a renderização no servidor do Next, onde não existe
 * `window`.
 */
export class ReactExampleSkin extends globalThis.SpallaPlayer.Skin {
  static skinName = 'react-exemplo';

  static styles = `
    .sp-skin--react-exemplo .shaka-controls-container {
      background: linear-gradient(to top, rgba(20, 30, 60, 0.92), transparent);
    }
    .sp-skin--react-exemplo .shaka-bottom-controls {
      padding: 0 18px 14px;
    }
    .sp-skin--react-exemplo .react-exemplo__marca {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 4;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(20, 30, 60, 0.85);
      color: #8ab4ff;
      font: 600 12px/1.4 system-ui, sans-serif;
      letter-spacing: 0.04em;
    }
  `;

  static tokens = {
    '--spalla-accent': '#8ab4ff',
    '--shaka-icon-size': '42px',
    '--shaka-font-color': '#e6ecff',
  };

  static controls = {
    desktop: [
      'play_pause',
      'time_and_duration',
      'spacer',
      'mute',
      'volume',
      'plugins',
      'overflow_menu',
      'fullscreen',
    ],
    mobile: ['play_pause', 'time_and_duration', 'spacer', 'plugins', 'overflow_menu', 'fullscreen'],
    tv: ['play_pause', 'time_and_duration', 'spacer', 'plugins', 'overflow_menu', 'fullscreen'],
  };

  static overflow = {
    desktop: ['captions', 'language', 'quality', 'playback_rate'],
    mobile: ['captions', 'language'],
  };

  static trickPlay = { elements: ['rewind_10', 'forward_10'], after: 'play_pause', sempre: true };

  /** Marca visual só para provar que é esta skin, e não uma das embarcadas. */
  mount() {
    const marca = this.container.ownerDocument.createElement('div');
    marca.className = 'react-exemplo__marca';
    marca.textContent = 'skin do exemplo React';
    this.container.appendChild(marca);
    this.marca_ = marca;
  }

  destroy() {
    this.marca_?.remove();
    this.marca_ = null;
  }
}

/** Registra a skin uma única vez, mesmo com o Strict Mode do React chamando duas vezes. */
export function registerReactExampleSkin() {
  if (!globalThis.SpallaPlayer.skins().includes(ReactExampleSkin.skinName)) {
    globalThis.SpallaPlayer.registerSkin(ReactExampleSkin);
  }
}
