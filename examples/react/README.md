# Spalla Player — React (Next.js)

Quatro telas em Next.js (App Router) exercitando integrações diferentes:
controles completos com painel próprio, overlay totalmente customizado, várias
instâncias na mesma página e skin registrada em runtime.

## Por que existe

O player é consumido como global (`window.SpallaPlayer`), carregado por
`<script>` — nunca por `import` de pacote npm. Este exemplo mostra como isso
convive com o React: o script sobe com `next/script strategy="beforeInteractive"`
em `app/layout.jsx`, e os componentes leem a global depois de montados.

## Como rodar

```bash
yarn install
yarn dev
```

Abra `http://localhost:3000` e navegue pelas quatro telas a partir da home.

## De onde vem o bundle em `public/vendor/`

Este exemplo espera encontrar o player já compilado em
`public/vendor/spalla-player.js` (mais o worker de transmux e, se aplicável,
o adaptador WebAssembly). **Se você recebeu este exemplo dentro do repositório
de releases da Spalla, esses arquivos já vêm prontos**, na mesma versão do
restante do pacote — não é preciso compilar nada.

Se você recebeu só o código deste exemplo separadamente (ou quer usar outra
versão do player), baixe o tarball da
[release desejada](https://github.com/taghos/spalla-player-releases/releases)
e copie `spalla-player.min.js` (renomeado para `spalla-player.js`),
`spalla-player.transmuxer-worker.js`, `wasm_exec.js` e `spalla.wasm` (se
existir) para dentro de `public/vendor/`.

## Pontos de atenção

- **`beforeInteractive` importa.** O player precisa existir como
  `window.SpallaPlayer` antes de qualquer tela montar um `<div>` de player —
  qualquer outra estratégia de carregamento do `next/script` arrisca uma
  corrida em que o componente monta antes do script terminar.
- Uma skin registrada em runtime (`skins/exampleSkin.js`) **não pode** ser
  importada no topo de um módulo usado por uma página do App Router: o Next
  renderiza componentes `'use client'` no servidor também, onde `window` não
  existe, e a avaliação da classe explode. A tela de skin personalizada
  importa com `import()` dinâmico dentro de um `useEffect`, só então criando o
  player.
- Troque os IDs em `lib/content.js` pelos IDs fornecidos pela Spalla; o
  placeholder `SEU_ID_AQUI` está aí só para as telas abrirem sem erro.
