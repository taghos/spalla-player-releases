# Changelog

Convenção: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e
[Semantic Versioning](https://semver.org/lang/pt-BR/).

Este repositório guarda só a versão mais recente na raiz; o histórico
completo fica nas [tags](https://github.com/taghos/spalla-player-releases/tags)
e na [página de releases](https://github.com/taghos/spalla-player-releases/releases).

## [1.0.6] — 2026-09-29

### Added

- Miniplayer opcional quando o vídeo sai do viewport (`autoPipViewport`) e
  PiP nativo ao perder foco (`autoPipBlur`), sujeito ao suporte e às permissões
  do navegador. Gatilhos independentes, desligados por padrão, configuráveis
  por construtor, URL e flags do backend, com retorno automático sem fechar
  PiP aberto manualmente. Modos automáticos não atuam dentro de iframe.

### Fixed

- Abrir PiP pelo menu enquanto o miniplayer está flutuando preserva a
  reprodução e o retorno à página, sem disputar a posição do vídeo entre
  as duas janelas.
