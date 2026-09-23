# Documentação do Spalla Player

Guia para quem vai integrar o Spalla Player num site, app ou dispositivo. Cada
arquivo cobre um tópico; comece pelo [início rápido](01-inicio-rapido.md) se
for a primeira vez.

1. [Início rápido](01-inicio-rapido.md) — instalar, montar o player, carregar
   um conteúdo.
2. [Referência da API](02-referencia-api.md) — construtor, opções, métodos,
   eventos, propriedades.
3. [Parâmetros de URL](03-parametros-de-url.md) — configurar o player pela
   query string, quando e como habilitar.
4. [Skins personalizadas](04-skins-personalizadas.md) — mudar a aparência e o
   conjunto de controles.
5. [Plugins](05-plugins.md) — adicionar funcionalidade própria ao player.
6. [TV — webOS (LG)](06-tv-webos.md) — particularidades do navegador de TVs LG.
7. [TV — Tizen (Samsung)](07-tv-tizen.md) — particularidades do navegador de
   TVs Samsung.
8. [React / Next.js](08-react-nextjs.md) — integrar com um projeto React.
9. [Solução de problemas](09-solucao-de-problemas.md) — sintomas conhecidos e
   suas causas.
10. [Compatibilidade com o player anterior](10-compatibilidade-legada.md) —
    formato de construtor, aliases e eventos de uma integração anterior.

## Exemplos

Cada pasta em [`examples/`](../examples/) tem seu próprio `README.md` com
instruções específicas:

- [`examples/html/`](../examples/html/) — HTML puro, sem framework. Comece por
  aqui se só precisa embutir o player numa página comum.
- [`examples/webos/`](../examples/webos/) — aplicativo para TVs LG.
- [`examples/tizen/`](../examples/tizen/) — aplicativo para TVs Samsung.
- [`examples/react/`](../examples/react/) — integração com Next.js.
- [`examples/custom-skin/`](../examples/custom-skin/) — skin própria
  registrada em runtime.

## Suporte

Este pacote é distribuído sob os termos do [LICENSE](../LICENSE) que o
acompanha. Consulte a Spalla para obter um ID de conteúdo de teste, dúvidas de
integração ou suporte contratual.
