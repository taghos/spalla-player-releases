/**
 * Exemplo de integração com skin própria.
 *
 * A skin já foi registrada por `minha-skin.js`, carregado antes deste arquivo.
 * Aqui só se escolhe qual usar e se troca com o vídeo tocando.
 */
(function () {
  // Peça um ID de conteúdo à Spalla e troque aqui antes de usar este exemplo.
SEU_ID_AQUI

  var player = null;
  var seletor = document.getElementById('skin');
  var estado = document.getElementById('estado');

  function preencher() {
    var nomes = SpallaPlayer.skins();
    for (var i = 0; i < nomes.length; i++) {
      seletor.appendChild(new Option(nomes[i], nomes[i]));
    }
    seletor.value = 'noite';
  }

  function abrir() {
    if (player) player.destroy();
    // A skin também pode vir da query string (`?skin=noite`) ou do backend; o
    // construtor vence os dois.
    player = new SpallaPlayer('#player', { skin: seletor.value, allowUrlParams: true });
    player.load(VIDEO).catch(function (err) {
      estado.textContent = 'falha ao carregar: ' + err.message;
    });
    estado.textContent = 'skin: ' + player.skin;
  }

  seletor.addEventListener('change', function () {
    if (!player) return abrir();
    player.setSkin(seletor.value);
    estado.textContent = 'skin: ' + player.skin;
  });

  document.getElementById('abrir').addEventListener('click', abrir);

  preencher();
  abrir();
  document.getElementById('versao').textContent =
    'player ' + SpallaPlayer.version + ' · shaka ' + SpallaPlayer.shakaVersion;
})();
