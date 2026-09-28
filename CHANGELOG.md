# Changelog

Convenção: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e
[Semantic Versioning](https://semver.org/lang/pt-BR/).

Este repositório guarda só a versão mais recente na raiz; o histórico
completo fica nas [tags](https://github.com/taghos/spalla-player-releases/tags)
e na [página de releases](https://github.com/taghos/spalla-player-releases/releases).

## [1.0.5] — 2026-09-28

### Added

- Mensagens de erro exibem o localizador da visualização em destaque,
  selecionável, acompanhado da data e hora da ocorrência em UTC.
- Recuperação automática de falhas transitórias de rede, com três
  retentativas extras após 2, 4 e 8 segundos, contagem na tela e limite
  configurável pela opção `autoRetry` do construtor.

### Fixed

- Os controles da skin `vibranium` permanecem agrupados nas pontas em players
  estreitos, sem espaços excessivos entre os botões.
