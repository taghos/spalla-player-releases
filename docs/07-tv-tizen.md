# TV — Tizen (Samsung)

Veja também o exemplo completo e comentado em
[`examples/tizen/`](../examples/tizen/).

> Testado em dispositivo real com Tizen 5.0.

## Piso de compatibilidade

O player é compilado com alvo Chromium 63, exatamente o piso do navegador em
Smart TVs Samsung com Tizen 5.0. A mesma tabela de ausências de API do
[guia de webOS](06-tv-webos.md#piso-de-compatibilidade) vale aqui — o alvo de
build converte sintaxe nova para sintaxe antiga, mas não cria uma API que
simplesmente não existe no navegador do aparelho.

## Registrando teclas de mídia

Ao contrário do webOS, o Tizen **exige registro explícito** para receber
teclas de mídia do controle remoto — e exige também o privilégio correto no
`config.xml`:

```xml
<tizen:privilege name="http://tizen.org/privilege/tv.inputdevice"/>
```

Sem esse privilégio, `tizen.tvinputdevice.registerKey(...)` lança uma
exceção e a TV continua dona das teclas: apertar "play" no controle abre o
painel do próprio televisor em vez de chegar ao seu aplicativo.

```js
try {
  tizen.tvinputdevice.registerKey("MediaPlayPause");
} catch (erro) {
  // modelos antigos não têm todas as teclas, e sem o privilégio nenhuma passa
}
```

Use `tizen.tvinputdevice.getSupportedKeys()` para descobrir, no próprio
aparelho, quais teclas de mídia ele reconhece — não há uma lista universal
confiável, e a única forma prática de mapear o controle remoto sem um
depurador conectado é imprimir isso na tela (é o que o painel de diagnóstico
do exemplo faz).

## Outros privilégios necessários

```xml
<tizen:privilege name="http://tizen.org/privilege/internet"/>
<!-- Sem isto o aparelho apaga a tela durante a reprodução. -->
<tizen:privilege name="http://tizen.org/privilege/display"/>
```

## Controle remoto

`RETURN = 10009` fecha o player e volta para a lista (ou fecha o aplicativo,
se a lista já estiver visível). Diferente do webOS, o Tizen usa esse código
específico em vez de `BACK`.

## `$WEBAPIS`

`$WEBAPIS/webapis/webapis.js` é um placeholder resolvido pelo empacotador do
Tizen em tempo de build — fora do aparelho (testando num navegador comum)
esse script simplesmente não existe, e o aplicativo deve cair de volta para
tratamento por teclado normal.

## `deviceClass: 'tv'`

Mesma recomendação do guia de webOS: passe explicitamente, não deixe para a
heurística automática.

## `isApp`

Mesma regra do guia de webOS: a WebAPI do Tizen (`window.tizen`) só existe
dentro do app empacotado, e o player usa isso para decidir sozinho se a skin
automática de TV entra. Passe `isApp: true` explicitamente só se estiver
testando num navegador comum ou rodando numa WebView sem essa WebAPI — veja
[o mesmo tópico no guia de webOS](06-tv-webos.md#isapp).

## Empacotamento

Requer o [Tizen Studio](https://developer.tizen.org/development/tizen-studio/download)
com o pacote de TV instalado:

```bash
tizen package -t wgt -s <perfil-de-assinatura> -- .
tizen install -n <arquivo>.wgt -t <id-do-dispositivo>
tizen run -p SpallaPlyr.Player -t <id-do-dispositivo>
```

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
