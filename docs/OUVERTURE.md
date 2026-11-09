# Hero booklets — complément à INSTRUCTIONS-SUITE.md

## Ouverture du jeu (ajoutée le 2026-11-08)

Avant le briefing, style Darkest Dungeon :
1. **Avertissement** sur fond noir : « AVERTISSEMENT », puis les lignes de Marc-André apparaissent une à une
   (Cette aventure n'est pas pour les cœurs fragiles… jusqu'à « …à survivre à ta mission sur… »). Tout reste affiché
   5 s, puis disparaît en fondu. Pas de bouton pour sauter.
2. **Écran titre** : image `fonds/titre.webp` (deux astronautes de dos, araignée violette géante), titre **ORION 5**
   qui s'allume en grésillant (la dernière ligne de l'avertissement enchaîne dessus), sous-titre « Chapitre 1 · L'araignée du SAS ».
   Boutons **Commencer le jeu** (→ briefing) et **Options**.
3. **Options** (gardées dans le navigateur) : Narration (activée / désactivée), Vitesse de la voix (lente / normale / rapide),
   Son des cinématiques (activé / coupé), Plein écran. Échap ou « Retour » ferme le panneau.

Réglages dans histoire.js : `HISTOIRE.ouverture` (avertissement, delaiEntreLignes 1.6 s, dureeAvertissement 5 s, titre, sousTitre, image).
Sans image, un ciel étoilé avec une planète violette est dessiné.

Narration : synthèse vocale du navigateur (voix française, québécoise si disponible). Elle lit le briefing, le titre et le texte
de chaque page, puis les choix (« Que fais-tu ? A : … ») quand ils apparaissent, et le texte des finales. Elle s'arrête quand l'élève
choisit. ISIS-73 est prononcée « Isis 73 ». La qualité de la voix dépend de l'appareil (bonne sur Chromebook avec les voix Google).

GAME OVER et « Recommencer » ramènent toujours à INTRO (pas à l'écran titre). Pour revoir l'ouverture : recharger la page.
Adresse : `#test` raccourcit l'avertissement (et les chronos) ; `#titre` saute directement à l'écran titre.


## Taille de l'écran vidéo et compression (2026-11-08)

- L'écran vidéo remplit le panneau intérieur du cadre (1242×828, de y 257 à 1085 du fond) ; format 3:2, rien n'est coupé.
  (Le plein écran 1920×1280 a été essayé puis annulé : trop grand, Marc-André veut les vidéos dans le cadre.)
- Chrono à part pour la page « Analyse de la menace » (l'araignée) : `dureeMenace` (14 s en classe).
- Vidéos réencodées pour alléger le zip (42 Mo → 24 Mo) : 900×600, CRF 28, son AAC 64 kb/s.
  Commande pour une nouvelle vidéo (après recadrage en 3:2) :
  `ffmpeg -i ENTREE.mp4 -vf scale=900:600 -c:v libx264 -preset veryfast -crf 28 -pix_fmt yuv420p -movflags +faststart -af loudnorm=I=-18:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 64k <ID>.mp4`
- Deux zips : hero-booklet-backup (chronos de test 5 s) et hero-booklet-classe-40s (40 s, araignée 14 s).
