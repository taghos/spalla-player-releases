# Changelog

Convenção: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e
[Semantic Versioning](https://semver.org/lang/pt-BR/).

Este repositório guarda só a versão mais recente na raiz; o histórico
completo fica nas [tags](https://github.com/taghos/spalla-player-releases/tags)
e na [página de releases](https://github.com/taghos/spalla-player-releases/releases).

## [1.0.1] — 2026-09-23

### Added

- Opção `isApp` no construtor, para distinguir app de TV empacotado do
  navegador da própria TV.

### Changed

- A tira de miniaturas (`seekMode: 'strip'`) só ativa quando o manifesto traz
  trilha de imagens (`EXT-X-IMAGE-STREAM-INF` ou `thumbnail.vtt`); sem ela,
  cai para o cursor automaticamente.
- A skin automática de TV passa a valer só dentro de app (`isApp`); `tv`
  deixou de ser automática em qualquer cenário.
