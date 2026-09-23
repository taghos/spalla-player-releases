# React / Next.js

Veja também o exemplo completo em [`examples/react/`](../examples/react/), com
quatro telas cobrindo controles completos, overlay personalizado, várias
instâncias na mesma página e skin registrada em runtime.

## O player é global, não um pacote npm

O Spalla Player é distribuído como um bundle único, carregado por `<script>`
e exposto como `window.SpallaPlayer`. Não existe (nem é necessário) um pacote
`npm install` — em React/Next.js isso significa carregar o script antes de
qualquer componente que crie um player.

Em Next.js (App Router), isso é feito no layout raiz com `next/script`:

```jsx
// app/layout.jsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Script src="/vendor/spalla-player.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
```

`strategy="beforeInteractive"` é essencial: garante que `window.SpallaPlayer`
já existe antes de qualquer componente montar. Qualquer outra estratégia
(`afterInteractive`, `lazyOnload`) arrisca uma corrida em que um componente
tenta `new SpallaPlayer(...)` antes do script terminar de carregar.

## Criando o player num componente

```jsx
"use client";

import { useEffect, useRef, useState } from "react";

export function PlayerStage({ contentId }) {
  const containerRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const instancia = new window.SpallaPlayer(containerRef.current);
    instancia.load(contentId).catch(console.error);
    setPlayer(instancia);

    return () => instancia.destroy();
  }, [contentId]);

  return <div ref={containerRef} />;
}
```

Sempre chame `destroy()` na limpeza do `useEffect` — sem isso, trocar de tela
ou desmontar o componente deixa o player anterior tocando em segundo plano.

## Skin registrada em runtime não pode ser importada no topo do módulo

Uma skin customizada estende `SpallaPlayer.Skin`, que só existe depois do
script carregar. Importar esse arquivo no topo de um módulo usado por uma
página do App Router quebra em produção: o Next renderiza componentes
`'use client'` no servidor também (para gerar o HTML inicial), e lá
`window`/`SpallaPlayer` não existem — a avaliação da classe lança exceção
antes mesmo de qualquer usuário abrir a página.

A forma que funciona é importar dinamicamente, dentro de um `useEffect`, só
depois de confirmar que está rodando no navegador:

```jsx
useEffect(() => {
  import("../skins/minhaSkin.js").then(() => {
    const instancia = new window.SpallaPlayer(containerRef.current, {
      skin: "minha",
    });
    setPlayer(instancia);
  });
}, []);
```

## Onde conseguir o arquivo do player

Baixe o tarball de uma [release](https://github.com/taghos/spalla-player-releases/releases)
e coloque `spalla-player.min.js` (você pode renomear para `spalla-player.js`,
como no exemplo) dentro de `public/vendor/` do seu projeto Next.js, junto com
`spalla-player.transmuxer-worker.js` e, se aplicável, `wasm_exec.js`/
`spalla.wasm`. Arquivos em `public/` são servidos como estáticos pelo Next,
então `/vendor/spalla-player.js` no `<Script src="...">` encontra o arquivo
sem configuração adicional.
