# Solução de problemas

## Autoplay com som nunca começa

**Sintoma**: `autoplay: true` sem `muted`, e o vídeo fica carregado mas
parado; `player.paused` continua `true` e nenhum erro aparece no console
necessariamente (o `play()` interno pode falhar silenciosamente, dependendo
de como você trata a Promise).

**Causa**: todo navegador recusa iniciar reprodução com som sem um gesto do
usuário (clique, toque). Isso não é um bug do player — é uma política dos
próprios navegadores, igual em qualquer outro player de vídeo da web.

**Solução**: comece mudo.

```js
new SpallaPlayer("#player", { autoplay: true, muted: true });
```

Deixe o espectador ativar o som pelo próprio controle de volume do player.
Se você precisa mesmo começar com som, isso só é possível em resposta direta
a uma interação do usuário (por exemplo, um clique num botão "assistir"), e
mesmo assim alguns navegadores podem recusar.

## Chromecast: "o cast não funciona"

Esse sintoma tem causas bem diferentes entre si — o primeiro passo é
identificar qual delas é a sua:

| O que você observa                                      | Causa provável                                                                                                                                |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Nada acontece ao clicar no botão de cast, sem erro      | Verifique se há um listener de erro (`player.on('error', ...)`) — falhas de cast às vezes só aparecem ali                                     |
| O botão de cast nunca aparece                           | Só aparece quando há um receptor Chromecast disponível na mesma rede; teste com um dispositivo real, não em automação de navegador            |
| Áudio toca, mas sem imagem no Chromecast                | Geralmente é composição de camadas na sua própria página — confira se algum elemento seu está sobrepondo o vídeo com `z-index` ou fundo opaco |
| Cast conecta e desconecta com erro, conteúdo específico | Pode ser incompatibilidade de codec/nível do aparelho com aquele conteúdo — reporte à Spalla com o ID do conteúdo                             |
| Funciona para VOD mas nunca para conteúdo ao vivo       | Verifique a versão do player — releases muito antigas podem ter uma limitação conhecida nesse cenário                                         |

**Nunca teste Chromecast em navegador automatizado** (Playwright, Puppeteer,
Selenium): a descoberta de dispositivos Cast não funciona nesse contexto, e o
comportamento de compositing também difere de um Chrome real. Valide sempre
com um dispositivo físico na mesma rede.

## Testando reprodução com Playwright/Chromium

**Sintoma**: todo conteúdo termina em erro de mídia (`MEDIA_ERROR` ou
equivalente), `readyState` do `<video>` fica em `0`, `buffered` fica vazio —
mesmo que o mesmo conteúdo funcione perfeitamente num Chrome normal.

**Causa**: o Chromium empacotado com o Playwright não inclui os codecs de
vídeo licenciados (H.264/AAC), que são os mais comuns em streaming HLS. Isso
não é um problema do player — é uma limitação conhecida do Chromium de
automação, que nem sempre é óbvia porque `MediaSource.isTypeSupported(...)`
pode retornar `true` mesmo sem o codec real disponível.

**Solução**: use automação apenas para validar DOM, barra de controles e
menus (coisas que não dependem de decodificar vídeo de verdade). Para validar
reprodução de fato, use um Chrome/Chromium instalado normalmente na máquina,
fora do Playwright.

## CSP bloqueando o player

**Sintoma**: o player carrega, mas nunca reproduz nada, com erros de Content
Security Policy no console mencionando `blob:` ou `worker-src`.

**Causa**: o player usa um Web Worker (criado a partir de um Blob) para
transporte de rede e transmux. Uma política de CSP restritiva pode bloquear
isso.

**Solução**: adicione `blob:` a `worker-src` (e, se aplicável, a
`script-src`) na sua política de CSP. Se isso não for possível no seu
ambiente, o arquivo `wasm_exec.js` que acompanha o tarball é justamente a
reserva para esse caso — sem `Worker` disponível ou com CSP que impeça
`blob:`, o player cai automaticamente para o thread principal, sem quebrar,
apenas com menos paralelismo.

## O aparelho de TV mostra a tela errada / não navega com o controle remoto

Veja os guias específicos: [webOS](06-tv-webos.md) e [Tizen](07-tv-tizen.md).
O sintoma mais comum é esquecer de passar `deviceClass: 'tv'` explicitamente,
deixando a detecção automática (por user agent) escolher a barra de
desktop, que não tem como ser navegada sem mouse.

## Nada acontece e não há nenhum erro

Confira, nesta ordem:

1. Há um `<div>` (ou elemento equivalente) no DOM no momento em que
   `new SpallaPlayer(seletor, ...)` é chamado? Chamar o construtor antes do
   elemento existir falha silenciosamente em alguns fluxos.
2. Você está tratando a Promise de `player.load(id)`? Uma rejeição não
   tratada pode não aparecer visivelmente na tela, dependendo do seu
   ambiente.
3. O ID de conteúdo está correto e foi de fato fornecido pela Spalla para o
   seu domínio/ambiente? Um ID válido em outro ambiente (produção vs. teste)
   não necessariamente funciona no seu.
4. Adicione `player.on('error', console.error)` e `debug: 'info'` no
   construtor antes de investigar mais fundo — a maioria dos problemas fica
   visível assim.
