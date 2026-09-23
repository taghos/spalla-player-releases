# Spalla Player — Tizen (TV Samsung)

Aplicativo de exemplo para Smart TVs Samsung com Tizen: sem ponteiro,
navegado por controle remoto, rodando no motor de mídia da própria TV.

## Por que existe

Assim como o exemplo de webOS, existe para validar o player no navegador da
TV — onde o motor de mídia, a ausência de ponteiro e o controle remoto mudam o
comportamento. A reprodução em si vem do player sem nenhum ajuste de
plataforma; o que este aplicativo adiciona é a navegação por setas, o registro
das teclas de mídia e o botão RETURN.

## Como rodar

### No navegador (rápido, sem SDK)

Sirva a pasta com qualquer servidor estático e abra no Chrome. `$WEBAPIS` (a
API do Tizen) não existe fora do aparelho — sem ela, o aplicativo cai para o
teclado normal e não registra teclas de mídia.

### No aparelho (Tizen Studio / tizen CLI)

Requer o [Tizen Studio](https://developer.tizen.org/development/tizen-studio/download)
com o pacote de TV instalado.

```bash
tizen package -t wgt -s <perfil-de-assinatura> -- .
tizen install -n <arquivo>.wgt -t <id-do-dispositivo>
tizen run -p SpallaPlyr.Player -t <id-do-dispositivo>
```

## Onde trocar o conteúdo

Troque os IDs em `app.js` (array `CONTEUDOS`) pelos IDs fornecidos pela
Spalla. O placeholder `SEU_ID_AQUI` está aí só para o aplicativo abrir sem
erro — ele não reproduz nada de verdade.

## Pontos de atenção

- **Privilégios em `config.xml`**: `tv.inputdevice` é obrigatório para
  `tizen.tvinputdevice.registerKey` funcionar — sem ele, apertar play no
  controle abre o painel do próprio televisor em vez de chegar ao aplicativo.
  `display` evita que a TV apague a tela durante a reprodução.
- **`RETURN = 10009`** fecha o player e volta para a lista (ou fecha o
  aplicativo, se a lista já estiver visível); setas (`38`/`40`) navegam;
  `13` (Enter) abre o item focado.
- O painel de diagnóstico mostra quais teclas de mídia foram registradas e
  quais falharam — é a única forma de mapear o controle remoto sem um
  depurador conectado ao aparelho.
- **`deviceClass: 'tv'`** é passado explicitamente no construtor, pelo mesmo
  motivo do exemplo de webOS.
