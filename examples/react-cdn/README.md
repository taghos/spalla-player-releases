# Spalla Player — React (Next.js) via CDN

As mesmas quatro telas do [exemplo React com bundle local](../react/):
controles completos com painel próprio, overlay totalmente customizado, várias
instâncias na mesma página e skin registrada em runtime.

A diferença é a origem do JavaScript do player: este exemplo usa diretamente
o CDN da Spalla, sem compilar nem copiar arquivos para `public/vendor/`.

## Como rodar

```bash
yarn install
yarn dev
```

Abra `http://localhost:3000` e navegue pelas quatro telas a partir da home.
Se o outro exemplo estiver rodando nessa porta, use `yarn dev --port 3001`.

No repositório de desenvolvimento, `lib/content.js` traz os mesmos conteúdos
do exemplo React local. No repositório de releases, troque `SEU_ID_AQUI` pelos
IDs fornecidos pela Spalla antes de carregar um conteúdo.

## Como o player é carregado

O layout raiz (`app/layout.jsx`) carrega a global `window.SpallaPlayer` com
`next/script`, antes de hidratar as telas:

```jsx
<Script src="https://beyond.spalla.io/player/spalla-player.min.js" strategy="beforeInteractive" />
```

Não há import do player por npm, script de build do player ou bundle local.
O worker de transmux e os arquivos auxiliares são localizados pelo player ao
lado do próprio script, no CDN.

Essa URL serve sempre a **última versão publicada**; não fixa uma versão.
O exemplo precisa de acesso à internet mesmo com o Next.js rodando localmente.
Para controlar a versão e hospedar os arquivos por conta própria, use o
[exemplo React com bundle local](../react/).

## Pontos de atenção

- Preserve `strategy="beforeInteractive"` no layout raiz: os componentes
  precisam encontrar `window.SpallaPlayer` ao montar.
- Se o site usa CSP, autorize a origem `https://beyond.spalla.io` para carregar
  o script e os recursos do player; mantenha também as permissões exigidas
  pela mídia e pelos recursos que habilitar.
- A skin personalizada é importada dinamicamente dentro de um `useEffect`,
  pois `SpallaPlayer.Skin` não existe no servidor.
- Cada instância chama `destroy()` na limpeza do efeito, como no exemplo local.
