# Spalla Player — HTML puro

A integração mais curta possível: uma página comum, sem framework e sem
bundler, com o player carregado por `<script>` e alguns botões chamando a API
pública diretamente.

## Por que existe

A maioria dos integradores não usa React, TV ou skin própria — só quer o
player tocando numa página já existente. Este exemplo é essa referência: se
você só vai copiar um pedaço de código para começar, comece por aqui.

## Como rodar

Sirva a pasta com qualquer servidor estático (não abra o `index.html` direto
com `file://`, porque o player busca a configuração do conteúdo por rede):

```bash
npx serve .
# ou
python3 -m http.server 8080
```

Depois abra a URL indicada pelo servidor.

## O que muda para usar de verdade

- Troque `spalla-player.js` (usado aqui só porque este exemplo já vem com o
  bundle ao lado) pelo `spalla-player.min.js` do tarball da release, e ajuste
  o `<script src="...">` em `index.html`.
- Troque `SEU_ID_AQUI`, em `app.js`, pelo ID de conteúdo fornecido pela Spalla.

## Pontos de atenção

- **Autoplay com som quase sempre falha.** Todo navegador recusa `play()` com
  som sem gesto do usuário — comece mudo (`{ muted: true }` no construtor, ou
  sem `autoplay`) e deixe o espectador ativar o som depois.
- `player.togglePlay()`, `player.muted` e as demais propriedades (`currentTime`,
  `volume`, `duration`...) funcionam iguais estando em Chromecast ou local — não
  é preciso tratar os dois casos separadamente num controle próprio.
