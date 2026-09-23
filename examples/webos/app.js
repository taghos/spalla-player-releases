/**
 * Aplicativo de exemplo para TVs LG com webOS.
 *
 * Existe para exercitar o player no aparelho: sem ponteiro, com controle
 * remoto e com o motor de mídia da TV. A lista, a navegação e o botão BACK
 * estão aqui; tudo que é reprodução vem do player, sem ajuste específico de
 * plataforma.
 */

/** Mesmos conteúdos da demo web, para comparar comportamento lado a lado. */
// Peça um ID de conteúdo à Spalla e troque aqui antes de usar este exemplo.
var CONTEUDOS = [
  { id: 'SEU_ID_AQUI', nome: 'Substitua pelo ID de conteúdo fornecido pela Spalla' },
];

/** Códigos que os navegadores de TV LG usam no controle remoto. */
var TECLAS = { BACK: 461, ENTER: 13, UP: 38, DOWN: 40 };

var player = null;
var foco = 0;
var diagTimer = null;
/** Tempo que o painel de diagnóstico fica à vista antes de sair da frente. */
var DIAG_MS = 12000;

function $(id) {
  return document.getElementById(id);
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
    deviceClass: 'tv',
  });

  player.on('error', function (detalhe) {
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

function sair() {
  if (typeof webOS !== 'undefined' && webOS.platformBack) {
    webOS.platformBack();
  } else if (window.close) {
    window.close();
  }
}

function aoTeclar(evento) {
  var diag = $('tecla');
  if (diag) diag.textContent = 'tecla ' + evento.keyCode + ' (' + (evento.key || '-') + ')';
  mostrarDiagnostico();

  if (player) {
    if (evento.keyCode === TECLAS.BACK && fechar()) evento.preventDefault();
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
    case TECLAS.BACK:
      sair();
      break;
    default:
      return;
  }
  evento.preventDefault();
}

function iniciar() {
  montarLista();
  mostrarDiagnostico();
  document.addEventListener('keydown', aoTeclar);

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

  if (typeof webOS !== 'undefined' && webOS.deviceInfo) {
    webOS.deviceInfo(function (info) {
      console.log('Model:', info.modelName);
      console.log('SDK Version:', info.sdkVersion);
      console.log('UHD:', info.uhd);
      console.log('Dolby Atmos:', info.dolbyAtmos);

      $('versao').textContent +=
        ' · Model: ' +
        info.modelName +
        ' · SDK Version: ' +
        info.sdkVersion +
        ' · UHD: ' +
        info.uhd +
        ' · Dolby Atmos: ' +
        info.dolbyAtmos;
    });
  } else {
    $('versao').textContent += ' · webOSTV.js ausente';
  }

  if (!SpallaPlayer.isSupported()) {
    $('versao').textContent = ' · este aparelho não é suportado';
  }
}

window.addEventListener('load', iniciar);
