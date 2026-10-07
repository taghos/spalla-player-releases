# Changelog

Convenção: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e
[Semantic Versioning](https://semver.org/lang/pt-BR/).

Este arquivo cobre o player em si. Cada versão publicada aqui vira uma
[release pública](https://github.com/taghos/spalla-player-releases/releases)
com o tarball anexado.

## Como ler a severidade

A primeira linha de cada versão é a classificação do seu conteúdo mais grave —
é o que diz se vale pular a versão. `BUG/CRITICAL` pede atualização sem esperar;
`BUG/MAJOR` indica confiabilidade seriamente afetada, com contorno;
`BUG/MEDIUM` é um defeito que só se contorna com desajeito; `BUG/MINOR` é de
baixo risco. Versão sem correção abre com o risco da maior mudança (`MAJOR`,
`MEDIUM`, `MINOR`) ou com o tipo predominante (`DOC`, `BUILD`, `CLEANUP`,
`OPTIM`, `REORG`). Cada entrada repete a própria classificação.

## [1.0.16] — 2026-10-07

BUG/MEDIUM

### Fixed

- BUG/MEDIUM — Otimizações internas de performance na telemetria.

## [1.0.15] — 2026-10-07

MINOR

### Changed

- MINOR — Otimizações internas de performance na entrega de vídeo, sem
  mudança de API nem de comportamento visível.

## [1.0.14] — 2026-10-06

BUG/MINOR

### Fixed

- BUG/MINOR — Erros durante a inicialização da telemetria passam a ser
  registrados com o localizador e o horário original, em vez de se perderem
  antes dos pings.

## [1.0.13] — 2026-10-06

BUG/MEDIUM

### Fixed

- BUG/MEDIUM — A tela de erro só aparece quando a recuperação automática se
  esgota ou a falha não permite recuperação. Falhas recuperáveis deixam de
  gerar avisos visuais enquanto o player volta a funcionar.

## [1.0.12] — 2026-10-01

BUG/MAJOR

### Fixed

- BUG/MAJOR — Transmissões ao vivo não caem mais na tela de erro (`UNKNOWN`)
  quando uma atualização da playlist chega sem nenhum segmento de vídeo
  disponível; o player segue tentando atualizar e o evento `error` deixa de ser
  emitido como fatal nesse caso.

## [1.0.11] — 2026-10-01

BUG/MEDIUM

### Fixed

- BUG/MEDIUM — A live deixa de ficar para trás do ponto ao vivo quando o
  espectador volta de outra aba ou janela: navegadores congelam abas ocultas
  com vídeo mudo, o relógio da reprodução para, e ao voltar o player retomava
  de onde parou, sem reconquistar a posição. Agora a correção acontece em duas
  escalas — deriva pequena é reconquistada pelo `liveSync`, que acelera até
  1.1x até a folga de início do conteúdo (no LL-HLS, o `PART-HOLD-BACK`
  anunciado pela playlist); atraso grande adquirido fora da aba (cresceu mais
  de 10 s entre a ida e a volta) salta direto para o fio, como o botão "Ao
  vivo". Quem recuou de propósito, pausou, está assistindo por cast ou sob
  anúncio não é arrastado de volta.

## [1.0.10] — 2026-10-01

BUG/MINOR

### Fixed

- BUG/MINOR — As coletas de telemetria passam a carregar o schema base
  completo desde o primeiro evento, com timestamps UTC sincronizados pelo
  servidor e detalhes técnicos de erro sanitizados, sem expor credenciais. O
  `view_id` volta a ser um UUID, sem timestamp concatenado.

## [1.0.9] — 2026-09-30

BUG/MINOR

### Fixed

- BUG/MINOR — O campo `view_start` da telemetria passa a ser enviado como
  epoch inteiro, sem a fração introduzida pela sincronização do relógio.

## [1.0.8] — 2026-09-30

MINOR

### Changed

- MINOR — Vídeo ainda em processamento deixa de cair na tela de erro: o player
  mostra um banner "Vídeo em processamento" sobre a imagem de capa do
  conteúdo, como fazia o player anterior.

## [1.0.7] — 2026-09-30

BUG/MAJOR

### Added

- MINOR — Eventos `aderror` e `daifallback`, também publicados por
  `postMessage` no embed. O primeiro leva o código e a mensagem do erro de
  anúncio (e sai igualmente com o nome antigo `adserror`); o segundo avisa que
  o intervalo comercial costurado ao vídeo não veio e a reprodução seguiu pelo
  conteúdo normal, com o motivo em `reason`.

### Fixed

- BUG/MAJOR — Ativar o picture-in-picture pelo menu dentro de um iframe de
  outra origem não interrompe mais a reprodução: o navegador recusa ali a
  janela de documento, e o player passa a usar o PiP do próprio vídeo. Fora de
  iframe nada muda.
- BUG/MEDIUM — Uma ação da barra recusada pelo navegador deixa de ser tratada
  como falha de reprodução — antes cobria com a tela de erro um vídeo que
  continuava tocando.
- BUG/MINOR — O console não recebe mais um aviso por segundo sobre a
  configuração interna de recuperação de falhas.
- BUG/MEDIUM — A lista de controles no formato antigo
  (`play,pause,time,seekbar,…`) volta a produzir a barra de progresso, o botão
  de tocar e o tempo. Eles sumiam quando a lista chegava pelo iframe, porque a
  tradução dos nomes acontecia duas vezes.
- BUG/MEDIUM — O evento `error` deixa de ser emitido para falhas que o player
  recupera sozinho; só chega quando a reprodução para de fato.
- BUG/MINOR — `subtitleLanguage=null` volta a significar "comece sem legenda",
  com as faixas disponíveis no menu. Antes o vídeo começava legendado.

## [1.0.6] — 2026-09-29

BUG/MINOR

### Added

- MINOR — Miniplayer opcional quando o vídeo sai do viewport
  (`autoPipViewport`) e PiP nativo ao perder foco (`autoPipBlur`), sujeito ao
  suporte e às permissões do navegador. Gatilhos independentes, desligados por
  padrão, configuráveis por construtor, URL e flags do backend, com retorno
  automático sem fechar PiP aberto manualmente. Modos automáticos não atuam
  dentro de iframe.

### Fixed

- BUG/MINOR — Abrir PiP pelo menu enquanto o miniplayer está flutuando
  preserva a reprodução e o retorno à página, sem disputar a posição do vídeo
  entre as duas janelas.

## [1.0.5] — 2026-09-28

BUG/MINOR

### Added

- MINOR — Mensagens de erro exibem o localizador da visualização em destaque,
  selecionável, acompanhado da data e hora da ocorrência em UTC.
- MEDIUM — Recuperação automática de falhas transitórias de rede, com três
  retentativas extras após 2, 4 e 8 segundos, contagem na tela e limite
  configurável pela opção `autoRetry` do construtor.

### Fixed

- BUG/MINOR — Os controles da skin `vibranium` permanecem agrupados nas
  pontas em players estreitos, sem espaços excessivos entre os botões.

## [1.0.4] — 2026-09-28

MINOR

### Changed

- MINOR — Anúncios CSAI em conteúdos verticais passam a informar ao IMA o slot
  9:16 ajustado à área disponível no player, favorecendo a seleção de criativos
  verticais.

## [1.0.3] — 2026-09-25

BUG/MAJOR

### Fixed

- BUG/MAJOR — O receptor do Chromecast não falha mais com o erro 3018 ao
  iniciar em aparelhos sem `Map.getOrInsert()` e `Map.getOrInsertComputed()`.
- BUG/MEDIUM — Fullscreen pedido assim que o botão aparece (ainda com o
  pré-roll de cliente pendente) não entra mais em fullscreen no Safari iOS
  enquanto o anúncio (VAST/VMAP) estiver pendente ou tocando; o fullscreen é
  retomado sozinho ao fim do anúncio. O mesmo vale para mid-roll CSAI iniciado
  com o player já em fullscreen: ele sai para o anúncio e retorna ao fim. Sem
  essa espera, o anúncio (que usa um `<video>` próprio, fora do fullscreen
  nativo do iOS) tocava embutido enquanto a live seguia sozinha em tela cheia.
  A trava agora vale desde a criação do pedido de publicidade, e não só a
  partir da resposta do DAI — essa resposta pode demorar mais que o clique do
  espectador no botão.

## [1.0.2] — 2026-09-24

MINOR

### Changed

- MINOR — A implementação do ABR agora considera o tempo até o primeiro byte
  (TTFB) para ajustes mais precisos em cenários de baixa latência.

## [1.0.1] — 2026-09-23

MEDIUM

### Added

- MINOR — Opção `isApp` no construtor, para distinguir app de TV empacotado do
  navegador da própria TV.

### Changed

- MINOR — A tira de miniaturas (`seekMode: 'strip'`) só ativa quando o
  manifesto traz trilha de imagens (`EXT-X-IMAGE-STREAM-INF` ou
  `thumbnail.vtt`); sem ela, cai para o cursor automaticamente.
- MEDIUM — A skin automática de TV passa a valer só dentro de app (`isApp`);
  `tv` deixou de ser automática em qualquer cenário.

## [1.0.0] — 2026-09-23

MINOR

### Added

- MINOR — Marco de disponibilidade pública para integradores: tarball assinado
  por SHA-256, exemplos de implementação (HTML puro, webOS, Tizen, React, skin
  própria) e documentação detalhada, publicados em
  [taghos/spalla-player-releases](https://github.com/taghos/spalla-player-releases).
