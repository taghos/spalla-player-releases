# Spalla Player

Player de streaming HLS para web, TV e apps, distribuído como um único
arquivo compilado.

```html
<script src="spalla-player.min.js"></script>
<script>
  const player = new SpallaPlayer('#player', { autoplay: true, muted: true });
  await player.load('SEU_ID_AQUI');
</script>
```

## Instalação

Baixe o tarball anexado à [release mais recente](https://github.com/taghos/spalla-player-releases/releases/latest)
e confira a integridade:

```bash
shasum -a 256 -c spalla-player-<versão>.tgz.sha256
tar -xzf spalla-player-<versão>.tgz
```

Este repositório guarda apenas os artefatos da **versão mais recente** —
releases anteriores continuam disponíveis nas
[tags](https://github.com/taghos/spalla-player-releases/tags) e na
[página de releases](https://github.com/taghos/spalla-player-releases/releases).

## Documentação

Guia completo para integradores em [`docs/`](docs/), começando pelo
[início rápido](docs/01-inicio-rapido.md).

## Exemplos

| Exemplo                                          | O que mostra                               |
| ------------------------------------------------ | ------------------------------------------ |
| [`examples/html/`](examples/html/)               | HTML puro, sem framework — comece por aqui |
| [`examples/webos/`](examples/webos/)             | Aplicativo para TVs LG (webOS)             |
| [`examples/tizen/`](examples/tizen/)             | Aplicativo para TVs Samsung (Tizen)        |
| [`examples/react/`](examples/react/)             | Integração com Next.js (React)             |
| [`examples/custom-skin/`](examples/custom-skin/) | Skin própria, registrada em runtime        |

Cada pasta tem seu próprio `README.md` com instruções específicas.

## Licença

Distribuído sob os termos do arquivo [`LICENSE`](LICENSE) — leia antes de
redistribuir, modificar ou usar em produção. Avisos de licença dos
componentes de terceiros embutidos estão em `THIRD-PARTY-NOTICES.txt`, dentro
do tarball de cada release.

## Changelog

Ver [`CHANGELOG.md`](CHANGELOG.md).
