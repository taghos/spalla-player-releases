# Compatibilidade com o player anterior

O construtor aceita, opcionalmente, o formato de uma integração já publicada
pelo player anterior da Spalla — para reduzir o esforço de quem está
migrando. **Nada disso é obrigatório**: para integrações novas, prefira a API
"moderna" documentada na [referência da API](02-referencia-api.md). Este
arquivo cobre só o que muda quando o formato antigo é usado.

## Como ativar

O modo de compatibilidade liga sozinho quando o construtor recebe `videoId`,
`liveId` ou `playlistId`:

```js
const player = new SpallaPlayer("player", {
  videoId: "019e6f63-8821-7942-ba28-a7c1b403c5c4", // ou liveId / playlistId
  width: "100%",
  height: "100%",
  autoplay: false,
  muted: true,
});
```

`width`/`height` aceitam número (interpretado em pixels) ou string CSS
(`'100%'`, `'640px'`) — nos dois casos, aplicados como estilo inline na raiz
do player.

## Carregamento automático

Informar `videoId`, `liveId` ou `playlistId` inicia o carregamento sozinho,
numa microtask, sem precisar chamar `player.load(...)`. A Promise dessa carga
fica disponível em `player.loadPromise`:

```js
const player = new SpallaPlayer("player", { videoId: "019e6f63-…" });
await player.loadPromise; // opcional: aguarda a carga automática
```

Omitir os três campos mantém o fluxo moderno, no qual você chama
`await player.load(...)` explicitamente quando quiser.

## Aliases de opções

| Nome antigo | Equivale a        |
| ----------- | ----------------- |
| `t`         | `startTime`       |
| `bar`       | `showSeekButtons` |
| `search`    | `aiSearch`        |
| `info`      | `showInfo`        |

Se as duas formas forem informadas juntas, o **nome novo vence**.

## Lista antiga de controles

O array `controls` do formato antigo usava outros nomes, traduzidos
automaticamente para os controles atuais:

| Nome antigo  | Controle(s) atuais          |
| ------------ | --------------------------- |
| `play`       | `play_pause`                |
| `pause`      | `play_pause`                |
| `time`       | `time_and_duration`         |
| `live`       | `time_and_duration`         |
| `volume`     | `mute`, `volume`            |
| `quality`    | `quality`                   |
| `speed`      | `playback_rate`             |
| `subtitles`  | `captions`                  |
| `fullscreen` | `fullscreen`                |
| `forward`    | `forward_10`                |
| `backward`   | `rewind_10`                 |
| `settings`   | `overflow_menu`             |
| `cast`       | `cast`, `remote`            |
| `info`       | `statistics`                |
| `seekbar`    | (liga a barra de progresso) |

```js
controls: ["play", "pause", "time", "seekbar", "volume", "fullscreen"];
```

`controls: '0'` ou `controls: '-'` (string) escondem a barra inteira, igual ao
parâmetro de URL equivalente. Um nome que não conste na tabela é mantido como
está — permitindo citar diretamente um nome de controle atual, se preferir.

## `currentTime()` e `playbackRate()` como funções

**Só quando o modo de compatibilidade está ativo** (`videoId`/`liveId`/
`playlistId` no construtor), `currentTime` e `playbackRate` deixam de ser
apenas propriedades e passam a ser **funções chamáveis que também se
comportam como número** em qualquer contexto de leitura:

```js
const player = new SpallaPlayer("player", { videoId: "019e6f63-…" });

player.currentTime(30); // define a posição em 30s (chamando como função)
player.currentTime(); // lê a posição atual (chamando sem argumento)

player.currentTime + 5; // 35 — coage para número automaticamente
`${player.currentTime}`; // "30" — também coage em template string
```

Sem o modo de compatibilidade (ou seja, usando `player.load(...)`
explicitamente), `currentTime` e `playbackRate` continuam sendo propriedades
simples, como documentado na [referência da API](02-referencia-api.md).

## Marcações (`bookmarks`)

```js
new SpallaPlayer("player", {
  videoId: "019e6f63-…",
  bookmarks: [
    { start: 30, title: "Introdução" },
    { start: 120, end: 180, title: "Destaque", color: "#ff0055" },
  ],
});
```

As marcações são ordenadas por `start`; quando `end` não é informado, o
player completa com o início da marcação seguinte (ou o fim do conteúdo, na
última).

## Anúncios: `ima_cust_params` e DAI

`ima_cust_params.adTagUrl` substitui completamente as tags de anúncio
configuradas no backend por uma tag própria; `ima_cust_params.disableAds:
true` desliga anúncios por completo. Qualquer outra chave em
`ima_cust_params` é anexada como parâmetro de query nas tags de anúncio
(sejam elas a sua ou as do backend):

```js
new SpallaPlayer("player", {
  videoId: "019e6f63-…",
  ima_cust_params: { adTagUrl: "https://.../vast.xml", meuParametro: "valor" },
});
```

As opções `dai`, `dai_asset_key`, `dai_api_key`, `dai_video_id`,
`dai_content_source_id` e `dai_ad_tag_params` configuram inserção de anúncio
do lado do servidor (Google DAI), sobrescrevendo o que o backend definiu para
aquele conteúdo. `dai: false` desliga DAI por completo.

## Eventos com nomes antigos

Os aliases abaixo são emitidos **em paralelo** aos nomes atuais (ver
[referência da API](02-referencia-api.md#eventos)) — não é preciso ativar o
modo de compatibilidade para recebê-los, e você pode misturar nomes antigos e
novos no mesmo `player.on(...)`:

| Nome atual                        | Alias(es) antigo(s)                         |
| --------------------------------- | ------------------------------------------- |
| `ready`                           | `init`                                      |
| `loading`                         | `loadingSpalla`, `loading`                  |
| `loaded`                          | `load`, `ready`                             |
| `play` (primeira vez no conteúdo) | `start`                                     |
| `play` (demais vezes)             | `resume`                                    |
| `timeupdate`                      | `progress`                                  |
| `seeked`                          | `seek`                                      |
| `ended`                           | `finish`                                    |
| `ratechange`                      | `playbackRate`                              |
| `volumechange`                    | `volume`                                    |
| `adstarted`                       | `adbegin`                                   |
| `adended`                         | `adend`                                     |
| `fullscreenchange`                | `fullscreen`                                |
| `controlsshown`                   | `showControls`                              |
| `controlshidden`                  | `hideControls`                              |
| `trackschanged`                   | `audioTracks`                               |
| `textchanged`                     | `captionSwitch`, `subtitle_language_change` |

Além desses, um evento `stats` é emitido a cada segundo assim que o conteúdo
termina de carregar — não existe equivalente direto na API atual, que expõe o
mesmo dado sob demanda em `player.getStats()`.

O payload de cada evento traz só um conjunto fixo de campos considerados
seguros para expor (por exemplo `uri`, `status`, `type`, `state`, `index`,
`reason`, `language`, conforme o evento) — nunca objetos internos de
configuração, tokens ou credenciais.

## O que não migrou

O controle remoto por `postMessage` que a página hospedada pela Spalla
(`beyond.spalla.io/player/…`) aceitava é um recurso **daquela página
específica**, não deste pacote — quem incorpora o Spalla Player diretamente
(como este tarball permite) integra pela API de JavaScript descrita nos
demais documentos, não por mensagens entre janelas.
