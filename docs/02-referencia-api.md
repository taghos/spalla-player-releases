# Referência da API

## Construtor

```js
new SpallaPlayer(elementoOuSeletor, opcoes);
```

O primeiro argumento é um seletor CSS ou um elemento DOM. O segundo é
opcional; qualquer opção informada aqui **sempre vence** o que o backend da
Spalla configurou para aquele conteúdo.

### Compatibilidade com integrações antigas

O construtor também aceita o formato de uma integração anterior:

```js
const player = new SpallaPlayer("player", {
  videoId: "019e6f63-8821-7942-ba28-a7c1b403c5c4", // ou liveId / playlistId
  width: "100%",
  height: "100%",
  autoplay: false,
  muted: true,
  t: 20, // vira startTime
  bar: true, // vira showSeekButtons
  search: false, // vira aiSearch
  info: true, // vira showInfo
  controls: ["play", "pause", "time", "seekbar", "volume", "fullscreen"],
});
```

`videoId`, `liveId` e `playlistId` iniciam a carga automaticamente e a Promise
fica disponível em `player.loadPromise`. Omitir os três mantém o fluxo
moderno, com `await player.load(...)` explícito. O nome novo de uma opção
sempre vence quando os dois forem informados juntos.

### Opções completas

```js
const player = new SpallaPlayer("#player", {
  language: "pt", // pt | en | es; omitido usa o idioma do navegador
  autoplay: true,
  muted: false,
  debug: "warn", // silent | error | warn | info | debug
  aid: "parceiro-x", // identificador de afiliado
  referrer: "https://exemplo.com/", // sobrescreve o referrer enviado
  telemetry: true,
  ads: true,
  skin: "videojs", // ver docs/04-skins-personalizadas.md
  showSeekButtons: undefined, // botões de salto de dez segundos
  deviceClass: undefined, // tv | mobile | desktop; só para testes manuais
  cast: { receiverAppId: "3C6B9439" },
  features: { ai: true }, // liga ou desliga plugins específicos
  allowUrlParams: false, // ver docs/03-parametros-de-url.md
});
```

Campo omitido preserva o que o backend configurou (ou o padrão do recurso);
`false` e `0` são valores explícitos, não ausência.

| Opção                     | Tipo                 | Efeito                                                                |
| ------------------------- | -------------------- | --------------------------------------------------------------------- |
| `autoplay`/`muted`/`loop` | `boolean`            | Estado inicial de reprodução                                          |
| `startTime`               | `number`             | Segundos iniciais do primeiro VOD; ignorado em conteúdo ao vivo       |
| `resume`                  | `boolean`            | Retoma de onde parou (backend + armazenamento local)                  |
| `showSeekButtons`         | `boolean`            | Botões de avanço/retrocesso de dez segundos, quando há linha do tempo |
| `subtitles`               | `boolean`            | Exibição inicial de legendas externas                                 |
| `enableCc`                | `boolean`            | Seleção inicial de legenda embutida (CC), separada da externa         |
| `subtitleLanguage`        | `string`             | Idioma preferido de legenda (`pt-br`, `en-US`, ...)                   |
| `subtitlePosition`        | `'inner' \| 'outer'` | Legenda sobre o vídeo ou numa faixa reservada abaixo dele             |
| `showInfo`                | `boolean`            | Painel de estatísticas de transmissão                                 |
| `playbackSpeeds`          | `number[] \| string` | Velocidades do menu (positivas, até 16); string separada por vírgulas |
| `controls`                | `string[] \| false`  | Lista de controles da barra; `false` oculta e `[]` restaura o padrão  |
| `cast`                    | `boolean \| object`  | Chromecast/AirPlay; aceita `{ receiverAppId, enabled }`               |

### Fontes de conteúdo

```js
await player.load("019e6f63-…"); // detecta live, VOD ou playlist pelo ID
await player.load({ contentId: "019e…" });
await player.load({ contentId: "019e…", contentKind: "video" }); // ou 'live'
await player.load({ playlistId: "01a0…", startIndex: 3 });
await player.load({ url: "https://…/playlist.m3u8" }); // manifesto direto
```

IDs precisam ser UUIDs completos. Se você informar `contentKind` e ele
divergir do que a Spalla retorna para aquele ID, o carregamento é recusado —
prefira deixar o player autodetectar quando não tiver certeza.

### Várias instâncias na mesma página

```js
SpallaPlayer.getPlayers(); // todas as instâncias vivas
SpallaPlayer.getPlayerById("spalla-player-1");
SpallaPlayer.getPlayerByElement(el);
await SpallaPlayer.destroyAll();
SpallaPlayer.isSupported(); // navegador atende os requisitos mínimos
```

## Métodos e propriedades

### Reprodução

| Método/propriedade  | O que faz                                                         | Exemplo / retorno                         |
| ------------------- | ----------------------------------------------------------------- | ----------------------------------------- |
| `play()`            | Inicia ou retoma a reprodução                                     | `await player.play();` → `Promise<void>`  |
| `pause()`           | Pausa a reprodução                                                | `player.pause();`                         |
| `togglePlay()`      | Alterna entre tocar e pausar                                      | `player.togglePlay();`                    |
| `stop()`            | Para e volta ao início, sem descarregar a mídia                   | `player.stop();`                          |
| `seek(s)`           | Vai para um instante absoluto, em segundos                        | `player.seek(120);` // pula para 2min     |
| `seekBy(delta)`     | Avança ou retrocede a partir da posição atual                     | `player.seekBy(-10);` // volta 10s        |
| `seekToLive()`      | Vai para o ponto ao vivo mais recente (conteúdo live)             | `player.seekToLive();`                    |
| `replay()`          | Reinicia o conteúdo atual do zero                                 | `player.replay();`                        |
| `retry()`           | Tenta recarregar depois de um erro, preservando a posição atual   | `await player.retry();` → `Promise<void>` |
| `reload()`          | Recarrega o conteúdo atual do início                              | `await player.reload();`                  |
| `unload()`          | Descarrega a mídia sem destruir a instância                       | `await player.unload();`                  |
| `destroy()`         | Destrói a instância e libera todos os recursos                    | `await player.destroy();`                 |
| `trickPlay(rate)`   | Reproduz em velocidade diferente de 1x (avanço/retrocesso rápido) | `player.trickPlay(2);` // 2x              |
| `cancelTrickPlay()` | Volta à velocidade normal após `trickPlay()`                      | `player.cancelTrickPlay();`               |
| `setStartTime(s)`   | Define o instante inicial antes de carregar o conteúdo            | `player.setStartTime(30);`                |

Propriedades (leitura, e escrita quando indicado):

| Propriedade          | Tipo                            | Exemplo de valor                           |
| -------------------- | ------------------------------- | ------------------------------------------ |
| `currentTime`        | `number` (leitura/escrita)      | `player.currentTime` → `42.3`              |
| `duration`           | `number`                        | `player.duration` → `184.5`                |
| `paused`             | `boolean`                       | `player.paused` → `false`                  |
| `ended`              | `boolean`                       | `player.ended` → `false`                   |
| `seeking`            | `boolean`                       | `player.seeking` → `false`                 |
| `buffered`           | `TimeRanges`                    | intervalos de mídia já baixados            |
| `seekable`           | `TimeRanges`                    | intervalos para onde dá para saltar        |
| `volume`             | `number` (0–1, leitura/escrita) | `player.volume = 0.5;`                     |
| `muted`              | `boolean` (leitura/escrita)     | `player.muted = true;`                     |
| `playbackRate`       | `number` (leitura/escrita)      | `player.playbackRate = 1.5;`               |
| `poster`             | `string`                        | URL da imagem de capa                      |
| `src`                | `string`                        | URL do manifesto em reprodução             |
| `liveState`          | `string`                        | `'live'`, `'ended'`, etc.                  |
| `destroyed`          | `boolean`                       | `true` depois de `destroy()`               |
| `startTimeRequested` | `number \| undefined`           | valor passado a `setStartTime`/`startTime` |

Para desenhar controles próprios, `player.media` é o elemento de mídia
efetivo (equivalente a um `<video>`) e `player.engine` é o motor de
reprodução interno efetivo — durante uma sessão de Chromecast, os dois
passam a apontar para o dispositivo remoto automaticamente, sem precisar
tratar os dois casos separadamente no seu código.

### Live e DVR

| Método                | O que faz                                                                    | Exemplo / retorno                                   |
| --------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------- |
| `isLive()`            | Diz se o conteúdo atual é uma transmissão ao vivo                            | `player.isLive()` → `true`                          |
| `getSeekRange()`      | Intervalo navegável da linha do tempo, em segundos                           | `player.getSeekRange()` → `{ start: 0, end: 3600 }` |
| `getLiveLatency()`    | Atraso atual em relação ao ponto ao vivo real, em segundos                   | `player.getLiveLatency()` → `4.2`                   |
| `getDvrWindow()`      | Duração da janela de DVR disponível, em segundos                             | `player.getDvrWindow()` → `1800`                    |
| `isAtLiveEdge()`      | Diz se a reprodução está exatamente no ponto ao vivo                         | `player.isAtLiveEdge()` → `false`                   |
| `getTimeUntilStart()` | Segundos até uma live agendada começar (0 se já começou)                     | `player.getTimeUntilStart()` → `120`                |
| `toggleSignal()`      | Alterna entre os sinais disponíveis de uma live com múltiplos ângulos/fontes | `player.toggleSignal();`                            |

### Faixas

| Método                                  | O que faz                                             | Exemplo / retorno                                        |
| --------------------------------------- | ----------------------------------------------------- | -------------------------------------------------------- |
| `getVideoQualities()`                   | Lista as qualidades de vídeo disponíveis              | `player.getVideoQualities()` → `[{ height: 1080, ... }]` |
| `setVideoQuality(altura)`               | Fixa a qualidade de vídeo por altura, ou libera o ABR | `player.setVideoQuality(720);`                           |
| `limitQuality(bool)`                    | Restringe a qualidade automática a um teto            | `player.limitQuality(true);`                             |
| `getAudioTracks()`                      | Lista as faixas de áudio disponíveis                  | `player.getAudioTracks()` → `[{ language: 'pt', ... }]`  |
| `setAudioTrack(idioma, papel)`          | Troca a faixa de áudio ativa                          | `player.setAudioTrack('en');`                            |
| `getTextTracks()`                       | Lista as faixas de legenda/CC disponíveis             | `player.getTextTracks()` → `[{ language: 'pt', ... }]`   |
| `setTextTrack(idioma)`                  | Troca a faixa de legenda ativa                        | `player.setTextTrack('en');`                             |
| `setTextTrackVisibility(bool)`          | Mostra ou esconde a legenda atual                     | `player.setTextTrackVisibility(false);`                  |
| `isTextTrackVisible()`                  | Diz se a legenda está visível no momento              | `player.isTextTrackVisible()` → `true`                   |
| `getTextStyle()`/`setTextStyle(estilo)` | Lê/define a aparência da legenda (fonte, cor, fundo)  | `player.setTextStyle({ fontSize: '120%' });`             |

### Playlist

| Método                  | O que faz                                  | Exemplo / retorno                                |
| ----------------------- | ------------------------------------------ | ------------------------------------------------ |
| `getPlaylist()`         | Lista os itens da playlist atual           | `player.getPlaylist()` → `[{ id, title, ... }]`  |
| `getCurrentItem()`      | Item da playlist tocando no momento        | `player.getCurrentItem()` → `{ id, title, ... }` |
| `getCurrentItemIndex()` | Posição (índice) do item atual na playlist | `player.getCurrentItemIndex()` → `2`             |
| `playItem(i)`           | Pula para um item específico da playlist   | `player.playItem(0);`                            |
| `next()`                | Avança para o próximo item                 | `await player.next();`                           |
| `previous()`            | Volta para o item anterior                 | `await player.previous();`                       |

### Interface

| Método                                                  | O que faz                                              | Exemplo / retorno                         |
| ------------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------- |
| `showControls()` / `hideControls()`                     | Mostra ou esconde a barra de controles manualmente     | `player.hideControls();`                  |
| `setControlsVisible(bool)`                              | Define a visibilidade da barra diretamente             | `player.setControlsVisible(false);`       |
| `setControls(nomes)`                                    | Troca a lista de controles da barra (ver abaixo)       | `player.setControls([]);`                 |
| `addControlButton(spec)`                                | Adiciona um botão próprio à barra                      | ver exemplo abaixo                        |
| `removeControlButton(nome)`                             | Remove um botão adicionado com `addControlButton`      | `player.removeControlButton('ajuda');`    |
| `setSkin(slug)`                                         | Troca de skin com o vídeo já tocando                   | `player.setSkin('tv');`                   |
| `skin`                                                  | Slug da skin ativa (leitura)                           | `player.skin` → `'videojs'`               |
| `enterFullscreen()`/`exitFullscreen()`/`isFullscreen()` | Controla e consulta o modo tela cheia                  | `player.isFullscreen()` → `false`         |
| `enterPiP()`/`exitPiP()`/`isPiP()`                      | Controla e consulta o modo picture-in-picture          | `player.isPiP()` → `false`                |
| `setTheme({ accent })`                                  | Sobrescreve a cor de destaque da skin ativa em runtime | `player.setTheme({ accent: '#ff0055' });` |
| `toast(mensagem, opcoes)`                               | Mostra um aviso temporário sobre o vídeo               | `player.toast('Salvo!');`                 |

Adicionar um botão próprio à barra:

```js
player.addControlButton({
  name: "ajuda",
  label: "Ajuda",
  icon: "M11 18h2v-2h-2v2zm1-16A10…", // atributo `d` de um path SVG, viewBox 24x24
  onClick: () => player.toast("olá"),
});
player.removeControlButton("ajuda");
```

`setControls(nomes)` troca a lista inteira de controles da barra (a ordem do
array é a ordem visual). Botões de plugin, `rewind_10` e `forward_10` **não**
são reinseridos automaticamente — quem quiser mantê-los precisa nomeá-los.

```js
player.setControls(["play_pause", "time_and_duration", "spacer", "fullscreen"]);
player.setControls([]); // volta ao padrão da skin/dispositivo
player.setControls(false); // mantém a barra oculta
```

#### Lista de controles suportados

Nomes aceitos em `controls` (opção do construtor) e em `setControls(nomes)`:

| Nome                                               | O que é                                    |
| -------------------------------------------------- | ------------------------------------------ |
| `play_pause` · `play_pause_buffering`              | Tocar e pausar; a segunda mostra o spinner |
| `rewind_10` · `forward_10`                         | Saltam dez segundos na linha do tempo      |
| `rewind` · `fast_forward`                          | Aceleram a reprodução, sem saltar          |
| `skip_previous` · `skip_next`                      | Item anterior e próximo da playlist        |
| `skip_previous_always` · `skip_next_always`        | Os mesmos, sempre visíveis                 |
| `time_and_duration`                                | Tempo decorrido e duração                  |
| `spacer`                                           | Espaço elástico, empurra o resto à direita |
| `mute` · `volume` · `mute_volume`                  | Áudio; `mute_volume` junta os dois         |
| `captions` · `captions-position` · `captions-size` | Legenda, posição e tamanho                 |
| `language` · `video_type`                          | Faixa de áudio e tipo de vídeo             |
| `quality` · `playback_rate`                        | Qualidade e velocidade                     |
| `chapter` · `queue`                                | Capítulos e fila                           |
| `loop` · `picture_in_picture`                      | Repetição e janela flutuante               |
| `cast` · `remote`                                  | Chromecast e Remote Playback (AirPlay)     |
| `fullscreen` · `overflow_menu` · `content_title`   | Tela cheia, menu "mais" e título           |

Mais os botões dos plugins ativos, quando existirem: `ai`, `audio_description`,
`comments`, `libras`, `like`, `playlist`, `statistics`, `voice`. Um nome
desconhecido é ignorado, com aviso no console — não interrompe a montagem da
barra.

Um botão de plugin próprio (`addControlButton`) entra onde a skin ativa citar
o token `plugins` dentro da lista de controles (ver
[skins personalizadas](04-skins-personalizadas.md)).

### Publicidade e cast

| Método                     | O que faz                                                       | Exemplo / retorno                            |
| -------------------------- | --------------------------------------------------------------- | -------------------------------------------- |
| `isAdPlaying()`            | Diz se um anúncio está tocando no momento                       | `player.isAdPlaying()` → `false`             |
| `skipAd()`                 | Pula o anúncio atual, se ele permitir pular                     | `player.skipAd();`                           |
| `requestAds(vastUrl)`      | Solicita a reprodução de um anúncio a partir de uma tag VAST    | `player.requestAds('https://.../vast.xml');` |
| `getAdManager()`           | Acesso ao gerenciador de anúncios interno, para casos avançados | `player.getAdManager()`                      |
| `isCastAvailable()`        | Diz se há um receptor de Chromecast na rede                     | `player.isCastAvailable()` → `true`          |
| `startCast()`/`stopCast()` | Inicia ou encerra uma sessão de Chromecast                      | `await player.startCast();`                  |
| `isCasting()`              | Diz se uma sessão de Chromecast está ativa                      | `player.isCasting()` → `false`               |
| `startAirPlay()`           | Abre o seletor nativo de AirPlay (Safari/WebKit)                | `player.startAirPlay();`                     |

### Diagnóstico

| Método                | O que faz                                                    | Exemplo / retorno                                  |
| --------------------- | ------------------------------------------------------------ | -------------------------------------------------- |
| `getStats()`          | Estatísticas de reprodução (bitrate, quedas de quadro, etc.) | `player.getStats()` → `{ bitrate: 2500000, ... }`  |
| `getConfig()`         | Configuração efetiva do conteúdo atual                       | `player.getConfig()` → `{ isVod: true, ... }`      |
| `updateConfig(patch)` | Aplica um ajuste pontual à configuração em runtime           | `player.updateConfig({ showInfo: true });`         |
| `getSessionId()`      | Identificador único da sessão de reprodução atual            | `player.getSessionId()` → `'a1b2c3...'`            |
| `getViewId()`         | Identificador único desta exibição de conteúdo               | `player.getViewId()` → `'x9y8z7...'`               |
| `getChapters()`       | Lista os capítulos do conteúdo, se houver                    | `player.getChapters()` → `[{ title, start }, ...]` |
| `seekToChapter(i)`    | Pula para o início de um capítulo                            | `player.seekToChapter(2);`                         |
| `getPlugin(nome)`     | Acessa a instância de um plugin já montado                   | `player.getPlugin('comments')`                     |
| `use(ClassePlugin)`   | Registra e monta um plugin diretamente nesta instância       | `player.use(MeuPlugin);`                           |

Estáticos:

| Método                                       | O que faz                                        | Exemplo / retorno                               |
| -------------------------------------------- | ------------------------------------------------ | ----------------------------------------------- |
| `SpallaPlayer.getPlayers()`                  | Lista todas as instâncias vivas na página        | `SpallaPlayer.getPlayers()` → `[player1, ...]`  |
| `SpallaPlayer.getPlayerById(id)`             | Busca uma instância pelo seu ID                  | `SpallaPlayer.getPlayerById('spalla-player-1')` |
| `SpallaPlayer.destroyAll()`                  | Destrói todas as instâncias da página            | `await SpallaPlayer.destroyAll();`              |
| `SpallaPlayer.registerPlugin(nome, fabrica)` | Registra um plugin próprio globalmente           | ver [plugins](05-plugins.md)                    |
| `SpallaPlayer.isSupported()`                 | Diz se o navegador atende aos requisitos mínimos | `SpallaPlayer.isSupported()` → `true`           |
| `SpallaPlayer.version`                       | Versão do player em uso                          | `SpallaPlayer.version` → `'1.0.0'`              |

## Eventos

```js
const cancelar = player.on("playing", () => {});
cancelar(); // cancela a inscrição

player.on("*", (event, metadata) => {
  // event.event e metadata.type trazem o nome do evento
});
```

- **Ciclo de vida**: `ready` `loading` `loaded` `unloaded` `destroyed` `error` `retry`
- **Reprodução**: `play` `playing` `pause` `ended` `timeupdate` `durationchange`
  `seeking` `seeked` `waiting` `ratechange` `volumechange`
- **Faixas**: `trackschanged` `variantchanged` `textchanged` `audiochanged`
- **Transmissão**: `livestatechange` `countdowntick`
- **Playlist**: `playlistloaded` `itemchange` `playlistended` `chapterchange`
- **Rede**: `segment` `networkfailure` `sessionauthorized` `configloaded`
- **Interface**: `fullscreenchange` `controlsshown` `controlshidden`
- **Publicidade e cast**: `adstarted` `adended` `caststatechange`

## Chromecast

O envio replica o estado do player para o dispositivo — a API pública
inteira segue a sessão. Com cast ativo, `player.currentTime` é o tempo na TV,
`player.volume = 0.5` mexe no volume da TV e `player.on('timeupdate')` dispara
com os eventos que vêm de lá. Controles próprios funcionam iguais nos dois
modos:

```js
player.on("timeupdate", () => (barra.value = player.currentTime));
botaoPlay.onclick = () => player.togglePlay(); // local ou na TV, tanto faz
```

Quem precisa do elemento real — para PiP, AirPlay ou desenhar num canvas —
usa `player.video`, que é sempre o `<video>` local, mesmo durante o cast.

Um evento não atravessa para o Cast: `durationchange`. A duração continua
correta em `player.duration`, só a notificação de mudança não chega.

App ID padrão do receptor Spalla: `3C6B9439`. Para usar outro:

```js
new SpallaPlayer("#player", { cast: { receiverAppId: "XXXXXXXX" } });
```
