# Changelog

Convenção: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e
[Semantic Versioning](https://semver.org/lang/pt-BR/).

Este repositório guarda só a versão mais recente na raiz; o histórico
completo fica nas [tags](https://github.com/taghos/spalla-player-releases/tags)
e na [página de releases](https://github.com/taghos/spalla-player-releases/releases).

## [1.0.7] — 2026-09-30

### Added

- Eventos `aderror` e `daifallback`, também publicados por `postMessage` no
  embed. O primeiro leva o código e a mensagem do erro de anúncio (e sai
  igualmente com o nome antigo `adserror`); o segundo avisa que o intervalo
  comercial costurado ao vídeo não veio e a reprodução seguiu pelo conteúdo
  normal, com o motivo em `reason`.

### Fixed

- Ativar o picture-in-picture pelo menu dentro de um iframe de outra origem
  não interrompe mais a reprodução: o navegador recusa ali a janela de
  documento, e o player passa a usar o PiP do próprio vídeo. Fora de iframe
  nada muda.
- Uma ação da barra recusada pelo navegador deixa de ser tratada como falha de
  reprodução — antes cobria com a tela de erro um vídeo que continuava tocando.
- O console não recebe mais um aviso por segundo sobre a configuração interna
  de recuperação de falhas.
