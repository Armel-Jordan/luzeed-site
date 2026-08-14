// Bascule français / anglais.
//
// Le contenu des deux langues est dans la page ; le CSS masque celui qui n'est
// pas choisi. Pas de rechargement, pas de duplication de fichier, et surtout :
// la politique de confidentialité reste **entièrement présente dans le source**
// dans les deux langues. Un examinateur ou un robot qui lit la page brute les
// trouve toutes les deux — ce qui n'est pas le cas d'un texte chargé après coup.
//
// Le choix est retenu dans `localStorage`. C'est la seule chose que ce site
// écrit sur ta machine, et elle ne quitte pas ton navigateur : c'est dit dans
// la politique.
(function () {
  var CLE = 'luzeed-langue';
  var connues = ['fr', 'en'];

  function appliquer(langue) {
    document.body.dataset.lang = langue;
    document.documentElement.lang = langue;
    document.querySelectorAll('.langues button').forEach(function (bouton) {
      bouton.setAttribute(
        'aria-pressed',
        bouton.dataset.langue === langue ? 'true' : 'false',
      );
    });
  }

  function choisie() {
    try {
      var gardee = localStorage.getItem(CLE);
      if (connues.indexOf(gardee) !== -1) return gardee;
    } catch (e) {
      // Navigation privée, stockage refusé : on se rabat sur la langue du
      // navigateur plutôt que d'échouer.
    }
    var navigateur = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    return navigateur === 'fr' ? 'fr' : 'en';
  }

  appliquer(choisie());

  document.querySelectorAll('.langues button').forEach(function (bouton) {
    bouton.addEventListener('click', function () {
      var langue = bouton.dataset.langue;
      appliquer(langue);
      try {
        localStorage.setItem(CLE, langue);
      } catch (e) {
        // Sans stockage, le choix ne survit pas au rechargement. Acceptable.
      }
    });
  });
})();
