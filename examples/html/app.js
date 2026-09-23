/**
 * Exemplo de integração com HTML puro — sem framework, sem bundler.
 *
 * Existe para mostrar o caminho mais curto entre a tag <script> e o vídeo
 * tocando: um <div>, um construtor e alguns botões chamando a API pública.
 * É a referência para quem só precisa embutir o player numa página comum.
 */
(function () {
  // Peça um ID de conteúdo à Spalla e troque aqui antes de usar este exemplo.
  var CONTEUDO_ID = 'SEU_ID_AQUI';

  var estado = document.getElementById('estado');
  var player = new SpallaPlayer('#player');

  player.on('error', function (detalhe) {
    estado.textContent = 'erro: ' + detalhe.message;
  });

  // Todo navegador recusa autoplay com som sem gesto do usuário; comece mudo
  // (ou sem autoplay) e deixe o espectador ativar o som depois.
  player
    .load(CONTEUDO_ID)
    .then(function () {
      estado.textContent = 'carregado';
    })
    .catch(function (err) {
      estado.textContent = 'falha ao carregar: ' + err.message;
    });

  document.getElementById('tocar').addEventListener('click', function () {
    player.togglePlay();
  });

  document.getElementById('mudo').addEventListener('click', function () {
    player.muted = !player.muted;
  });

  document.getElementById('versao').textContent =
    'player ' + SpallaPlayer.version + ' · shaka ' + SpallaPlayer.shakaVersion;
})();
