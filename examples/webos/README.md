# Spalla Player — webOS (TV LG)

Aplicativo de exemplo para TVs LG com webOS: sem ponteiro, navegado por
controle remoto, rodando no motor de mídia da própria TV.

## Por que existe

O navegador de uma TV é onde as diferenças de verdade aparecem — motor de
mídia próprio, sem mouse, controle remoto no lugar de teclado. Este exemplo
existe para validar o player nesse ambiente; toda a reprodução vem do player
sem nenhum ajuste específico de plataforma, só a navegação por setas e o botão
BACK são deste aplicativo.

## Como rodar

### No navegador (rápido, sem SDK)

Sirva a pasta com qualquer servidor estático e abra no Chrome. O SDK
`webOSTVjs-*` é opcional: sem ele, o aplicativo simplesmente não mostra
model/versão da TV no rodapé.

### No aparelho (webOS CLI)

Requer o [webOS TV CLI](https://webostv.developer.lge.com/develop/tools/cli-installation)
instalado (`ares-package`, `ares-install`, `ares-launch`).

```bash
ares-package .
ares-install --device <nome-do-dispositivo> io.spalla.player_1.0.0_all.ipk
ares-launch --device <nome-do-dispositivo> io.spalla.player
```

O `<nome-do-dispositivo>` é o que você cadastrou com `ares-setup-device`.

## Onde trocar o conteúdo

Troque os IDs em `app.js` (array `CONTEUDOS`) pelos IDs fornecidos pela
Spalla. O placeholder `SEU_ID_AQUI` está aí só para o aplicativo abrir sem
erro — ele não reproduz nada de verdade.

## Pontos de atenção

- **Controle remoto**: `BACK = 461` fecha o player e volta para a lista; setas
  (`38`/`40`) navegam a lista; `13` (OK/Enter) abre o item focado. Não há API
  de registro de tecla de mídia no webOS como há no Tizen — os códigos chegam
  direto no `keydown`.
- **`deviceClass: 'tv'`** é passado explicitamente no construtor. Deixar para
  a heurística de user agent decidir arrisca cair na barra de desktop e perder
  a navegação por controle remoto.
- O painel no topo da tela (`versão`, modelo, SDK) é só diagnóstico deste
  exemplo — não faz parte da API do player.
