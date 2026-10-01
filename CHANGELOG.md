# Changelog

Convenção: [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e
[Semantic Versioning](https://semver.org/lang/pt-BR/).

Este repositório guarda só a versão mais recente na raiz; o histórico
completo fica nas [tags](https://github.com/taghos/spalla-player-releases/tags)
e na [página de releases](https://github.com/taghos/spalla-player-releases/releases).

## [1.0.11] — 2026-10-01

### Fixed

- A live deixa de ficar para trás do ponto ao vivo quando o espectador volta
  de outra aba ou janela: navegadores congelam abas ocultas com vídeo mudo, o
  relógio da reprodução para, e ao voltar o player retomava de onde parou, sem
  reconquistar a posição. Agora a correção acontece em duas escalas — deriva
  pequena é reconquistada pelo `liveSync`, que acelera até 1.1x até a
  folga de início do conteúdo (no LL-HLS, o `PART-HOLD-BACK` anunciado pela
  playlist); atraso grande adquirido fora da aba (cresceu mais de 10 s entre a
  ida e a volta) salta direto para o fio, como o botão "Ao vivo". Quem recuou
  de propósito, pausou, está assistindo por cast ou sob anúncio não é
  arrastado de volta.
