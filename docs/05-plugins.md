# Plugins

Um plugin injeta o próprio HTML e CSS no player e se desfaz sozinho quando
sai — é o mecanismo usado internamente para recursos como legendas
inteligentes, formulário de leads, marca d'água e estatísticas. Você pode
registrar o seu do mesmo jeito.

## Ciclo de vida

1. O player decide, via `shouldMount(context)`, se aquele plugin deve existir
   para o conteúdo atual (por exemplo, só em VOD, ou só quando uma opção foi
   ligada).
2. Se sim, `mount()` roda uma vez — é onde o plugin desenha sua interface e se
   inscreve em eventos.
3. Quando o player é destruído (ou o plugin deixa de se aplicar), o próprio
   framework de plugin cuida da limpeza de listeners registrados via
   `this.listen(...)`; qualquer recurso adicional (timers, observers) deve ser
   liberado explicitamente pelo plugin.

## Registrando um plugin

```js
SpallaPlayer.registerPlugin(
  "meu-plugin",
  class extends SpallaPlayer.Plugin {
    static pluginName = "meu-plugin";
    static styles = ".meu { color: tomato }";

    static shouldMount({ config }) {
      return config.isVod; // só existe em conteúdo VOD
    }

    mount() {
      this.mountDOM('<div class="meu">olá</div>', "overlay");
      this.listen("timeupdate", () => {
        // reage a eventos do player sem precisar desinscrever manualmente
      });
    }
  },
);
```

`mountDOM(html, camada)` insere o elemento numa das camadas visuais do
player: `background`, `content`, `controls`, `overlay` ou `modal` — a ordem
delas na tela é fixa, então um plugin em `overlay` sempre fica acima de um em
`content`, independente da ordem em que os plugins montam.

`this.listen(nomeDoEvento, handler)` é a forma recomendada de ouvir eventos do
player dentro de um plugin: a inscrição é automaticamente cancelada quando o
plugin é desmontado, evitando referências penduradas depois que o player já
não existe mais.

## Interceptando controle na barra

Um plugin também pode expor um botão na barra de controles (que aparece onde
a skin ativa citar o token `plugins`) usando a mesma API pública descrita na
[referência da API](02-referencia-api.md#interface):

```js
this.player.addControlButton({
  name: this.constructor.pluginName,
  label: "Meu recurso",
  icon: "M11 18h2v-2h-2v2zm1-16A10…",
  onClick: () => this.abrirPainel(),
});
```

## Opções e features

Qualquer plugin pode ser forçado ligado ou desligado via `features` no
construtor, independente do que `shouldMount()` decidiria sozinho:

```js
new SpallaPlayer("#player", { features: { "meu-plugin": false } });
```

## Dependências entre plugins

Um plugin pode consultar outro já montado via `this.player.getPlugin(nome)` —
útil para coordenar comportamento (por exemplo, um plugin de anúncio que
precisa pular a abertura de outro enquanto o anúncio toca). Trate o retorno
como possivelmente `undefined`: a ordem e a própria existência de outro
plugin dependem da configuração daquele conteúdo específico.
