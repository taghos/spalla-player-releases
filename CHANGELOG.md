# Changelog

Convenção: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e
[Semantic Versioning](https://semver.org/lang/pt-BR/).

Este repositório guarda só a versão mais recente na raiz; o histórico
completo fica nas [tags](https://github.com/taghos/spalla-player-releases/tags)
e na [página de releases](https://github.com/taghos/spalla-player-releases/releases).

## [1.0.10] — 2026-10-01

### Fixed

- As coletas de telemetria passam a carregar o schema base completo desde o
  primeiro evento, com timestamps UTC sincronizados pelo servidor e detalhes
  técnicos de erro sanitizados, sem expor credenciais. O `view_id` volta a ser
  um UUID, sem timestamp concatenado.
