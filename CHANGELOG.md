# Changelog

Convenção: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e
[Semantic Versioning](https://semver.org/lang/pt-BR/).

Este repositório guarda só a versão mais recente na raiz; o histórico
completo fica nas [tags](https://github.com/taghos/spalla-player-releases/tags)
e na [página de releases](https://github.com/taghos/spalla-player-releases/releases).

## [1.0.3] — 2026-09-25

### Fixed

- O receptor do Chromecast não falha mais com o erro 3018 ao iniciar em
  aparelhos sem `Map.getOrInsert()` e `Map.getOrInsertComputed()`.
- Fullscreen pedido assim que o botão aparece (ainda com o pré-roll de
  cliente pendente) não entra mais em fullscreen no Safari iOS enquanto o
  anúncio (VAST/VMAP) estiver pendente ou tocando; o fullscreen é retomado
  sozinho ao fim do anúncio. O mesmo vale para mid-roll CSAI iniciado com o
  player já em fullscreen: ele sai para o anúncio e retorna ao fim. Sem essa
  espera, o anúncio (que usa um `<video>` próprio, fora do fullscreen nativo
  do iOS) tocava embutido enquanto a live seguia sozinha em tela cheia. A trava
  agora vale desde a criação do pedido de publicidade, e não só a partir da
  resposta do DAI — essa resposta pode demorar mais que o clique do espectador
  no botão.
