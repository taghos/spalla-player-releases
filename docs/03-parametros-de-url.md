# Parâmetros de URL

Desligado por padrão — o player só lê a query string se você ligar
explicitamente:

```js
new SpallaPlayer("#player", { allowUrlParams: true });
```

## Por que é opt-in

A opção não é a proteção — a lista fechada de parâmetros aceitos é. Nenhum
deles toca autorização, origem de mídia, telemetria ou publicidade, e cada
valor é validado por tipo antes de ser aplicado. Uma página de terceiro
embutida no seu site não deveria conseguir reconfigurar o player só por causa
da própria URL — por isso a leitura é opcional, e cabe a você decidir se faz
sentido no seu caso (por exemplo, uma página de testes interna).

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

Exemplos:

```
?skin=minimal
?controls=play_pause,spacer,fullscreen
?controls=0        // ou ?controls=-, esconde a barra inteira
?bar=1             // liga os botões de salto de dez segundos
?t=30              // começa em 30 segundos (só no primeiro VOD)
?subtitleLanguage=en
```
