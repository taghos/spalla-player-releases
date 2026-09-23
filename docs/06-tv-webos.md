# TV — webOS (LG)

Veja também o exemplo completo e comentado em
[`examples/webos/`](../examples/webos/).

> Testado em dispositivo real com webOS 4.5.

## Piso de compatibilidade

O player é compilado com alvo Chromium 63, que é o piso do navegador em
TVs LG com webOS. Ainda assim, algumas APIs de JavaScript e CSS chegaram
depois dessa versão e simplesmente **não existem** no aparelho, mesmo que o
código passe pelo processo de build sem erro (compilar sintaxe não é o mesmo
que preencher uma API ausente):

| API                       | Chegou na versão | O que fazer                                                             |
| ------------------------- | ---------------- | ----------------------------------------------------------------------- |
| `globalThis`              | 71               | já preenchido pelo player; não precisa se preocupar                     |
| `ResizeObserver`          | 64               | evite depender disso no seu próprio código de integração                |
| `AbortController`         | 66               | idem                                                                    |
| `Array.prototype.flatMap` | 69               | use `reduce`/`concat` no seu código                                     |
| `Element.replaceChildren` | 86               | use `innerHTML = ''` + `appendChild`                                    |
| `min()`/`clamp()` em CSS  | 79               | use pares `width`/`max-width` em vez disso                              |
| `:focus-visible`          | 86               | use `:focus` como alternativa                                           |
| `aspect-ratio` em CSS     | 88               | defina altura fixa como alternativa (`@supports not (aspect-ratio: 1)`) |

Se você for escrever HTML/CSS/JS próprio ao redor do player (overlay, painel
de diagnóstico, etc.), evite essas APIs ou forneça alternativa — o sintoma de
usar uma delas sem querer costuma ser silencioso: nenhum erro aparece, só um
comportamento visual quebrado (ex.: uma regra CSS inteira é descartada pelo
parser, não só a propriedade desconhecida).

## Controle remoto

O navegador de TVs LG **não tem** API de registro de tecla de mídia — os
códigos chegam diretamente no evento `keydown` do documento. No exemplo,
`BACK = 461` fecha o player.

```js
document.addEventListener("keydown", (evento) => {
  if (evento.keyCode === 461) {
    /* fechar player / sair da tela */
  }
});
```

O player já trata as teclas de navegação (setas, OK) quando está montado; o
código do seu aplicativo só precisa tratar o que está **fora** dele (uma
lista de conteúdos, um botão de voltar, etc.).

## `deviceClass: 'tv'`

Passe essa opção explicitamente no construtor quando você já sabe que está
rodando numa TV — não deixe a decisão para a heurística automática de user
agent. Detectar TV errado troca a barra para a de desktop e quebra a
navegação por controle remoto (não há como usar mouse ali).

```js
new SpallaPlayer("#player", { deviceClass: "tv" });
```

## `isApp`

Controla se a skin automática de TV entra sozinha. O player já detecta
sozinho quando roda dentro do app empacotado (a WebAPI do webOS só existe
ali), então normalmente você não precisa passar nada. Se o seu app rodar numa
WebView sem essa WebAPI, ou se quiser testar num navegador comum antes de
empacotar, force explicitamente:

```js
new SpallaPlayer("#player", { deviceClass: "tv", isApp: true });
```

Sem essa opção (e sem a WebAPI), o player assume que está no navegador da
própria TV e usa a skin padrão em vez da automática de TV — mesmo com
`deviceClass: 'tv'` já forçado. Não há parâmetro de URL equivalente, de
propósito: uma página de terceiro não pode forjar "sou um app".

## Empacotamento

Requer o [webOS TV CLI](https://webostv.developer.lge.com/develop/tools/cli-installation):

```bash
ares-package .
ares-install --device <nome-do-dispositivo> io.spalla.player_1.0.0_all.ipk
ares-launch --device <nome-do-dispositivo> io.spalla.player
```

`appinfo.json` já declara os privilégios (`requiredACG`) usados pelo exemplo;
ajuste conforme os recursos do seu próprio aplicativo.

## Chave de API (`apiKey`)

O navegador embutido de uma TV nem sempre envia o cabeçalho `Referer` da
forma esperada — o que pode fazer a checagem de referrer bloquear conteúdo
que deveria estar liberado. Para esses casos, a Spalla pode fornecer uma
`apiKey`, que autoriza a reprodução **sem restrições de referer**:

```js
new SpallaPlayer("#player", { apiKey: "seu-jwt-fornecido-pela-spalla" });
```

O valor viaja apenas na chamada de autorização do conteúdo — a credencial da
mídia em si continua sendo emitida pelo backend normalmente. Peça essa chave
à Spalla especificamente para o seu aplicativo de TV.
