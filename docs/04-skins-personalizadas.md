# Skins personalizadas

A aparência do player — quais controles existem, em que ordem, com que
tamanho, cor e ícones — é uma "skin". Várias já vêm embarcadas; você também
pode registrar a sua.

## Como escolher uma skin

A ordem de precedência é: opção do construtor, parâmetro de URL
(`?skin=minimal`, com `allowUrlParams: true`), configuração do backend e, por
fim, uma escolha automática por tipo de dispositivo.

```js
new SpallaPlayer("#player", { skin: "minimal" });
player.setSkin("tv"); // troca com o vídeo já tocando
player.skin; // 'tv'
SpallaPlayer.skins(); // lista todas as registradas, embarcadas e customizadas
```

## Registrando uma skin própria

Uma skin é uma classe que estende `SpallaPlayer.Skin`, registrada **antes** de
qualquer `new SpallaPlayer(...)` que vá usá-la. Funciona sem bundler: veja o
exemplo completo, executável direto no navegador, em
[`examples/custom-skin/`](../examples/custom-skin/).

```js
class MinhaSkin extends SpallaPlayer.Skin {
  mount() {
    // roda quando a skin entra — desenhe o que for próprio dela aqui
  }
  destroy() {
    // roda quando a skin sai — desfaça o que mount() criou
  }
}

MinhaSkin.skinName = "minha";
MinhaSkin.controls = {
  desktop: [
    "play_pause",
    "time_and_duration",
    "spacer",
    "plugins",
    "fullscreen",
  ],
  mobile: ["play_pause", "spacer", "plugins", "fullscreen"],
  tv: ["play_pause", "spacer", "plugins", "fullscreen"],
};

SpallaPlayer.registerSkin(MinhaSkin);
new SpallaPlayer("#player", { skin: "minha" });
```

### Campos estáticos

Atribuídos fora da declaração da classe de propósito: sintaxe de campo
estático de classe (`static skinName = 'minha'` dentro do corpo da classe) só
chegou no Chromium 72, e o player precisa continuar funcionando em navegadores
de TV mais antigos, que não passam por nenhum processo de build antes de
carregar sua skin.

| Campo                               | Para que serve                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `skinName`                          | identificador único, usado em `skin: '...'` e `?skin=...`                                                    |
| `controls`                          | lista de controles por dispositivo (`desktop`, `mobile`, `tv`)                                               |
| `overflow`                          | itens do menu "mais opções", por dispositivo                                                                 |
| `contextMenu`                       | itens do menu do botão direito                                                                               |
| `adControls`                        | controles mostrados durante a reprodução de um anúncio                                                       |
| `styles`                            | CSS como string — sem `import './x.css'` fora de um bundler                                                  |
| `tokens`                            | variáveis de tema (`--shaka-*` e `--spalla-*`), sobrescritas em `:root`                                      |
| `icons`                             | troca de ícones: chave em maiúsculas troca um ícone nativo do player; em minúsculas, o de um botão de plugin |
| `trickPlay`                         | configuração de avanço/retrocesso rápido (`elements`, `after`, `sempre`)                                     |
| `hidden`                            | nomes de controle que nunca aparecem, mesmo disponíveis                                                      |
| `seekBarColors` / `volumeBarColors` | cores das barras de progresso e volume                                                                       |

O token `plugins`, citado em `controls`/`overflow`, é onde os botões dos
plugins ativos entram automaticamente — sem precisar listar cada plugin por
nome.

## Ícones

O valor de cada entrada em `icons` é o atributo `d` de um `<path>` SVG, em um
viewBox de 24x24. Para converter um ícone de outra fonte (ex.: uma fonte de
ícones com glifos), normalize o desenho para essa caixa antes de usar —
ícones fora dela ficam desproporcionais entre si na mesma barra.

## Tokens de tema

`tokens` sobrescreve variáveis CSS que o player já declara em `:root`
(prefixo `--shaka-`) e/ou variáveis próprias (prefixo `--spalla-`), que
herdam para qualquer elemento dentro do player:

```js
MinhaSkin.tokens = {
  "--shaka-icon-size": "44px",
  "--shaka-font-color": "#dce6ff",
  "--shaka-bg-menu": "rgba(16, 22, 43, 0.95)",
  "--spalla-accent": "#7ee3ff",
};
```

## Ver também

O exemplo [`examples/custom-skin/`](../examples/custom-skin/) tem uma skin
completa e funcional, incluindo `styles`, `tokens`, `icons` e `controls`, com
comentários explicando cada campo em contexto.
