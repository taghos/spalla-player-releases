/**
 * Aplicativo de exemplo para Samsung Tizen.
 *
 * Existe para exercitar o player no aparelho: sem ponteiro, com controle
 * remoto e com o motor de mídia da TV — que é onde as diferenças aparecem. A
 * lista, a navegação e o botão RETURN estão aqui; tudo que é reprodução vem do
 * player, sem ajuste específico de plataforma.
 */

/** Mesmos conteúdos da demo web, para comparar comportamento lado a lado. */
// Peça um ID de conteúdo à Spalla e troque aqui antes de usar este exemplo.
var CONTEUDOS = [
  { id: 'SEU_ID_AQUI', nome: 'Substitua pelo ID de conteúdo fornecido pela Spalla' },
];

/** Teclas do controle remoto que a TV entrega por código numérico. */
var TECLAS = { RETURN: 10009, ENTER: 13, UP: 38, DOWN: 40 };

var player = null;
var foco = 0;
/** O que o registro de teclas conseguiu, para o painel de diagnóstico. */
var registro = { ok: [], falhou: [] };
var diagTimer = null;
/** Tempo que o painel de teclas fica à vista antes de sair da frente. */
var DIAG_MS = 12000;

function $(id) {
  return document.getElementById(id);
}

/** Registra as teclas de mídia; sem isso a TV as engole antes do aplicativo. */
function registrarTeclas() {
  if (typeof tizen === 'undefined' || !tizen.tvinputdevice) {
    registro.falhou.push('sem tizen.tvinputdevice');
    return;
  }
  var teclas = [
    'MediaPlayPause',
    'MediaPlay',
    'MediaPause',
    'MediaStop',
    'MediaRewind',
    'MediaFastForward',
  ];
  for (var i = 0; i < teclas.length; i++) {
    try {
      tizen.tvinputdevice.registerKey(teclas[i]);
      registro.ok.push(teclas[i]);
    } catch (erro) {
      // Modelos antigos não têm todas, e sem o privilégio `tv.inputdevice`
      // nenhuma passa — o painel mostra qual dos dois casos é.
      registro.falhou.push(teclas[i] + ': ' + (erro && erro.name ? erro.name : 'erro'));
    }
  }
}

/** Código que este aparelho usa em cada tecla de mídia. */
function teclasDeMidia() {
  if (typeof tizen === 'undefined' || !tizen.tvinputdevice) return [];
  try {
    var todas = tizen.tvinputdevice.getSupportedKeys();
    var lista = [];
    for (var i = 0; i < todas.length; i++) {
      if (/Media|Play|Pause|Stop|Rewind|Forward/i.test(todas[i].name)) {
        lista.push(todas[i].name + '=' + todas[i].code);
      }
    }
    return lista;
  } catch (erro) {
    return ['getSupportedKeys: ' + (erro && erro.name ? erro.name : 'erro')];
  }
}

function montarDiagnostico() {
  var alvo = $('diagnostico');
  if (!alvo) return;
  var midia = teclasDeMidia();
  alvo.innerHTML =
    '<div>registradas: ' +
    (registro.ok.join(', ') || 'nenhuma') +
    '</div><div>falharam: ' +
    (registro.falhou.join(' · ') || 'nenhuma') +
    '</div><div>suportadas: ' +
    (midia.join(' · ') || 'lista indisponível') +
    '</div><div id="tecla">aperte uma tecla</div>';
}

/** Mostra o painel e o tira da frente sozinho: ele cobre o topo do vídeo. */
function mostrarDiagnostico() {
  var alvo = $('diagnostico');
  if (!alvo) return;
  alvo.classList.remove('hidden');
  clearTimeout(diagTimer);
  diagTimer = setTimeout(function () {
    alvo.classList.add('hidden');
  }, DIAG_MS);
}

function montarLista() {
  var lista = $('itens');
  for (var i = 0; i < CONTEUDOS.length; i++) {
    var li = document.createElement('li');
    var botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'app__item';
    botao.textContent = CONTEUDOS[i].nome;
    botao.setAttribute('data-indice', String(i));
    li.appendChild(botao);
    lista.appendChild(li);
  }
  aplicarFoco();
}

function itens() {
  return document.querySelectorAll('.app__item');
}

function aplicarFoco() {
  var todos = itens();
  for (var i = 0; i < todos.length; i++) {
    todos[i].classList.toggle('app__item--focado', i === foco);
  }
  if (todos[foco]) todos[foco].focus();
}

function mover(passo) {
  var total = itens().length;
  foco = (foco + passo + total) % total;
  aplicarFoco();
}

function abrir(indice) {
  var conteudo = CONTEUDOS[indice];
  if (!conteudo) return;

  $('lista').classList.add('hidden');
  $('palco').classList.remove('hidden');
  mostrarDiagnostico();

  player = new SpallaPlayer('#player', {
    language: 'pt',
    debug: 'info',
    // O aplicativo sabe onde roda; deixar isso para a heurística de user agent
    // é arriscar cair na barra de computador e perder o controle remoto.
    deviceClass: 'tv',
  });

  player.on('error', function (detalhe) {
    // Numa TV não há console à mão: o erro precisa aparecer na tela.
    console.error('erro', detalhe);
  });

  player.load(conteudo.id).catch(function (err) {
    console.error('falha ao carregar', err);
  });
}

function fechar() {
  if (!player) return false;
  player.destroy();
  player = null;
  $('palco').classList.add('hidden');
  $('lista').classList.remove('hidden');
  aplicarFoco();
  return true;
}

function aoTeclar(evento) {
  // Mapear controle remoto no aparelho: sem depurador, é a única pista de qual
  // código a TV manda em cada tecla.
  var diag = $('tecla');
  if (diag) diag.textContent = 'tecla ' + evento.keyCode + ' (' + (evento.key || '-') + ')';
  // Com o player aberto, quem trata as teclas é o plugin de teclado.
  if (player) {
    if (evento.keyCode === TECLAS.RETURN) {
      if (fechar()) evento.preventDefault();
    }
    return;
  }

  switch (evento.keyCode) {
    case TECLAS.UP:
      mover(-1);
      break;
    case TECLAS.DOWN:
      mover(1);
      break;
    case TECLAS.ENTER:
      abrir(foco);
      break;
    case TECLAS.RETURN:
      if (typeof tizen !== 'undefined' && tizen.application) {
        tizen.application.getCurrentApplication().exit();
      }
      break;
    default:
      return;
  }
  evento.preventDefault();
}

function iniciar() {
  registrarTeclas();
  montarLista();
  montarDiagnostico();
  document.addEventListener('keydown', aoTeclar);

  // Sem depurador remoto à mão, é aqui que se confere o que o player detectou.
  $('versao').textContent =
    ' · player ' +
    SpallaPlayer.version +
    ' · shaka ' +
    SpallaPlayer.shakaVersion +
    ' · ' +
    window.innerWidth +
    'x' +
    window.innerHeight +
    ' · dpr ' +
    (window.devicePixelRatio || 1) +
    ' · ' +
    navigator.userAgent;

  if (!SpallaPlayer.isSupported()) {
    $('versao').textContent = ' · este aparelho não é suportado';
  }
}

window.addEventListener('load', iniciar);
