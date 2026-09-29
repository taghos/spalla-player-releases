# Parâmetros de URL

Desligado por padrão — o player só lê a query string se você ligar
explicitamente:

```js
new SpallaPlayer("#player", { allowUrlParams: true });
```

## Por que é opt-in

A opção não é a proteção — a lista fechada de parâmetros aceitos é. A query
pode influenciar a autorização; habilite sua leitura apenas em páginas
confiáveis. Uma página de terceiro embutida no seu site não deveria conseguir
reconfigurar o player só por causa da própria URL — por isso a leitura é
opcional, e cabe a você decidir se faz sentido no seu caso (por exemplo, uma
página de testes interna).

## Precedência

**Opção do construtor > parâmetro de URL > configuração do backend.**

Uma opção do construtor sempre vence, mesmo quando o valor é `undefined` —
porque `undefined` significa "não decidi nada aqui", e nesse caso o parâmetro
de URL (se houver) ou o backend continuam valendo. Se você quer que a URL
decida algo, **omita a chave** da opção correspondente no construtor, em vez
de passá-la como `undefined` explicitamente dentro de um objeto.

## Parâmetros aceitos

`t`, `language`, `debug`, `aid`, `device`, `autoplay`, `autoplay_mudo`,
`muted`, `loop`, `resume`, `skin`, `enableLikes`, `enableForm`, `enableLogo`,
`libras`, `playbackSpeeds`, `subtitles`, `subtitleLanguage`,
`subtitlePosition`, `enableCc`, `aiSearch`, `bar`, `controls`.

`debug=1` liga logs detalhados e `debug=0` os silencia; também são aceitos
`silent`, `error`, `warn`, `info` e `debug`.

Nas versões com AutoPiP, `autoPipViewport=1|0` e `autoPipBlur=1|0` controlam
separadamente miniplayer ao rolar e PiP nativo ao perder foco. Ambos são opt-in;
o construtor vence esses valores. Os parâmetros são reconhecidos no embed, mas
os modos automáticos ficam inativos dentro de iframe. Consulte as
[condições e permissões](02-referencia-api.md#miniplayer-e-pip-automático).

Exemplos:

```
?skin=minimal
?controls=play_pause,spacer,fullscreen
?controls=0        // ou ?controls=-, esconde a barra inteira
?bar=1             // liga os botões de salto de dez segundos
?t=30              // começa em 30 segundos (só no primeiro VOD)
?subtitleLanguage=en
```
