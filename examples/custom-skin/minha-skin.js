/**
 * Skin declarada por quem integra o player.
 *
 * Roda sem bundler: a classe base vem do bundle já carregado por <script>, e o
 * CSS viaja como string, porque fora do build não existe `import './x.css'`.
 * Uma skin interna do player faz exatamente o mesmo — só troca a string por um
 * arquivo importado ao lado.
 */
(function () {
  class NoiteSkin extends SpallaPlayer.Skin {
    /** Desenha algo próprio quando a skin entra, e some quando ela sai. */
    mount() {
      const marca = this.container.ownerDocument.createElement('div');
      marca.className = 'noite__marca';
      marca.textContent = 'skin do integrador';
      this.container.appendChild(marca);
      this.marca_ = marca;
    }

    destroy() {
      if (this.marca_) this.marca_.remove();
      this.marca_ = null;
    }
  }

  // Campos estáticos de classe só chegaram no Chromium 72, e o piso das TVs é o
  // 63; aqui não há build para converter, então a atribuição fica solta.
  NoiteSkin.skinName = 'noite';

  NoiteSkin.styles = [
    '.sp-skin--noite .shaka-controls-container {',
    '  background: linear-gradient(to top, #10162b, rgba(16, 22, 43, 0.2) 60%, transparent);',
    '}',
    '.sp-skin--noite .shaka-bottom-controls { padding: 0 20px 14px; }',
    '.sp-skin--noite .noite__marca {',
    '  position: absolute; top: 12px; left: 12px; z-index: 4;',
    '  padding: 4px 10px; border-radius: 999px;',
    '  background: rgba(16, 22, 43, 0.75); color: #7ee3ff;',
    '  font: 600 12px/1.4 system-ui, sans-serif; letter-spacing: 0.04em;',
    '}',
  ].join('\n');

  // As `--shaka-*` valem porque o Shaka as declara em `:root` e elas herdam.
  NoiteSkin.tokens = {
    '--spalla-accent': '#7ee3ff',
    '--shaka-icon-size': '44px',
    '--shaka-font-color': '#dce6ff',
    '--shaka-bg-menu': 'rgba(16, 22, 43, 0.95)',
  };

  // Chave em maiúsculas troca um ícone nativo do Shaka; em minúsculas, o de um
  // botão de plugin. O valor é o atributo `d` de um path SVG.
  NoiteSkin.icons = {
    CLOSED_CAPTIONS:
      'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 9h4v-1H8v-2h3V9H7v4zm6 0h4v-1h-3v-2h3V9h-4v4z',
    share:
      'M18 16.1c-.8 0-1.5.3-2 .8l-7.1-4.2c.1-.2.1-.4.1-.7s0-.5-.1-.7L16 7.2c.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3c0 .2 0 .5.1.7L8 9.8c-.5-.5-1.2-.8-2-.8-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2-.8l7.1 4.2c0 .2-.1.4-.1.6 0 1.7 1.3 3 3 3s3-1.3 3-3-1.3-3-3-3z',
  };

  // `plugins` marca onde entram os botões dos plugins; citar um pelo nome o fixa
  // naquela posição, e o que não aparece na lista fica de fora.
  NoiteSkin.controls = {
    desktop: [
      'play_pause',
      'time_and_duration',
      'spacer',
      'share',
      'mute',
      'volume',
      'plugins',
      'overflow_menu',
      'fullscreen',
    ],
    mobile: ['play_pause', 'time_and_duration', 'spacer', 'plugins', 'overflow_menu', 'fullscreen'],
    tv: ['play_pause', 'time_and_duration', 'spacer', 'plugins', 'overflow_menu', 'fullscreen'],
  };

  NoiteSkin.overflow = {
    desktop: ['captions', 'language', 'quality', 'playback_rate'],
    mobile: ['captions', 'language'],
    tv: ['captions', 'language', 'quality'],
  };

  NoiteSkin.contextMenu = ['loop', 'statistics'];
  NoiteSkin.adControls = ['play_pause', 'mute', 'spacer', 'fullscreen'];

  // Avanço rápido sem depender da opção do backend.
  NoiteSkin.trickPlay = {
    elements: ['rewind', 'fast_forward'],
    after: 'play_pause',
    sempre: true,
  };

  // Some com o botão mesmo que o recurso esteja disponível.
  NoiteSkin.hidden = ['picture_in_picture'];

  // Registrar antes de instanciar é tudo o que o player exige.
  SpallaPlayer.registerSkin(NoiteSkin);
})();
