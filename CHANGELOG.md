# Changelog

Convenção: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e
[Semantic Versioning](https://semver.org/lang/pt-BR/).

Este repositório guarda só a versão mais recente na raiz; o histórico
completo fica nas [tags](https://github.com/taghos/spalla-player-releases/tags)
e na [página de releases](https://github.com/taghos/spalla-player-releases/releases).

## [1.0.12] — 2026-10-01

### Fixed

- Transmissões ao vivo não caem mais na tela de erro (`UNKNOWN`) quando uma
  atualização da playlist chega sem nenhum segmento de vídeo disponível; o
  player segue tentando atualizar e o evento `error` deixa de ser emitido como
  fatal nesse caso.
