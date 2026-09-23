# Início rápido

## 1. Baixe a release

Baixe o tarball anexado à [release desejada](https://github.com/taghos/spalla-player-releases/releases)
(ex.: `spalla-player-1.0.0.tgz`) e o arquivo `.sha256` ao lado.

Confira a integridade antes de usar:

```bash
shasum -a 256 -c spalla-player-1.0.0.tgz.sha256
tar -xzf spalla-player-1.0.0.tgz
```

O conteúdo extraído:

| Arquivo                              | Para que serve                                              |
| ------------------------------------ | ----------------------------------------------------------- |
| `spalla-player.min.js`               | O player                                                    |
| `spalla-player.transmuxer-worker.js` | Worker de transmux, servido ao lado do player               |
| `wasm_exec.js`                       | Reserva para CSP que proíbe script vindo de `blob:`         |
| `LICENSE`                            | Licença do player — leia antes de distribuir qualquer coisa |
| `THIRD-PARTY-NOTICES.txt`            | Avisos de licença dos componentes embutidos                 |

O WebAssembly de telemetria e multiCDN já vai embutido no `spalla-player.min.js`;
não há arquivo `.wasm` separado para servir, a menos que o binário exceda o
orçamento de tamanho — nesse caso um `spalla.wasm` acompanha o tarball e deve
ser hospedado ao lado do script.

## Alternativa: usar direto via CDN

Se não quiser baixar, hospedar e atualizar os arquivos você mesmo, aponte o
`<script>` direto para:

```
https://beyond.spalla.io/player/spalla-player.min.js
```

Essa URL sempre serve a **última versão publicada** — não há como fixar uma
versão específica por ela. É a forma mais simples de começar, mas para
produção considere o tarball baixado (passos acima): você decide quando
atualizar, e consegue conferir a integridade do arquivo pelo `.sha256`, o que
a URL da CDN não oferece.

## 2. Sirva os arquivos

Hospede `spalla-player.min.js` e `spalla-player.transmuxer-worker.js` no mesmo
diretório (o player localiza o worker automaticamente, ao lado do próprio
script). `wasm_exec.js` só é necessário se a sua política de CSP proíbe
`worker-src blob:`.

## 3. Monte o player

```html
<div id="player"></div>

<script src="spalla-player.min.js"></script>
<script>
  const player = new SpallaPlayer("#player", { autoplay: true, muted: true });
  player.load("SEU_ID_AQUI").catch((err) => console.error(err));
</script>
```

- O primeiro argumento é um seletor CSS ou um elemento.
- O segundo, opcional, são as opções — sempre têm precedência sobre o que vier
  do backend da Spalla para aquele conteúdo.
- `SEU_ID_AQUI` é o identificador de conteúdo (vídeo, live ou playlist)
  fornecido pela Spalla.

Veja a implementação completa e comentada em
[`examples/html/`](../examples/html/) — é a referência mais simples deste
pacote.

## 4. Confira se carregou

```js
player.on("ready", (event) => console.info(event.event, event));
player.on("error", (event) => console.error(event));
```

`ready` só dispara depois que a mídia carrega de fato. Para uma lista completa
de eventos, métodos e opções, veja a [referência da API](02-referencia-api.md).

## Pegadinha mais comum: autoplay com som

Todo navegador recusa iniciar reprodução com som sem gesto do usuário. Comece
com `muted: true` (ou sem `autoplay`) e deixe o espectador ativar o som pelo
próprio controle do player. Detalhes em
[solução de problemas](09-solucao-de-problemas.md#autoplay-com-som-nunca-comeca).
