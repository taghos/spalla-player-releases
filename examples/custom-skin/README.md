# Spalla Player — skin própria

Exemplo de registro de uma skin declarada por quem integra o player, sem
bundler: a classe base vem do bundle já carregado por `<script>`, e o CSS
viaja como string de JavaScript.

## Por que existe

Toda skin embutida no player segue o mesmo contrato (`SpallaPlayer.Skin`) que
uma skin externa usa aqui. Este exemplo existe para mostrar esse contrato
isolado — sem nada além do necessário para registrar e trocar de skin em
runtime.

## Como rodar

Sirva a pasta com qualquer servidor estático:

```bash
npx serve .
```

O seletor no topo troca de skin com o vídeo já tocando (`player.setSkin(...)`).

## Como funciona

`minha-skin.js` é carregado **antes** de `app.js` e registra a skin assim que
o arquivo é avaliado:

```js
class NoiteSkin extends SpallaPlayer.Skin {
  mount() {
    /* roda quando a skin entra */
  }
  destroy() {
    /* roda quando a skin sai */
  }
}
NoiteSkin.skinName = 'noite';
// ...demais campos estáticos (styles, tokens, controls, overflow, icons...)
SpallaPlayer.registerSkin(NoiteSkin);
```

`app.js` só escolhe qual skin usar (`SpallaPlayer.skins()` lista as
registradas) e cria o player com `{ skin: 'noite' }`.

## Pontos de atenção

- Campos estáticos de classe (`NoiteSkin.skinName = ...`) são atribuídos fora
  da declaração da classe de propósito: sintaxe de campo estático de classe só
  chegou no Chromium 72, e não há build aqui para converter — TVs mais antigas
  quebrariam na avaliação do arquivo.
- `NoiteSkin.tokens` sobrescreve variáveis `--shaka-*`, que o player já declara
  em `:root`; herdam para qualquer elemento dentro do player.
- `NoiteSkin.icons` troca ícones nativos do player (chave em maiúsculas) ou de
  um botão de plugin (chave em minúsculas) pelo atributo `d` de um path SVG.
- Skin em produção deve chegar pelo mesmo caminho: registrada antes de
  qualquer `new SpallaPlayer(...)` que a use.
