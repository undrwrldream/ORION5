# ORION 5 — L'araignée du SAS

Livre-jeu HTML5 de **lecture inférentielle** pour le cours de français (secondaire 3).
L'élève lit un court texte chronométré, repère les indices, puis choisit une action.
Un seul chemin mène à la victoire ; cinq finales d'échec attendent les lecteurs trop pressés.

Créé par **Marc-André Deschênes**, stagiaire en enseignement (Québec).

## Jouer

- **En ligne** : activer GitHub Pages (voir plus bas), puis ouvrir l'adresse du site.
- **Hors ligne** : télécharger le dépôt (*Code → Download ZIP*), décompresser, ouvrir `index.html`
  dans un navigateur. Aucun serveur nécessaire ; fonctionne sur Chromebook.

Raccourcis à ajouter à la fin de l'adresse :

| Ajout | Effet |
|---|---|
| `#test` | Chronos de 5 s et avertissement raccourci (pour essayer le jeu rapidement) |
| `#titre` | Saute directement à l'écran titre |

## Déroulement

1. Avertissement, puis écran titre (Commencer le jeu / Options : narration, vitesse de la voix, son, plein écran).
2. Briefing en trois pages : message d'ISIS-73, l'IA du vaisseau ; lexique du vaisseau ; analyse de la menace.
3. Pour chaque événement : cinématique → texte chronométré → 2 ou 3 choix.
4. Finale : « Mission accomplie » ou « Mission échouée ».

La narration utilise la synthèse vocale du navigateur (voix française, québécoise si disponible).

## Inférences travaillées

| Type | Page | Inférence |
|---|---|---|
| Objet | INTRO | Cylindre rouge avec tuyau noir = extincteur |
| Objet | 3C | Outil qui crache une flamme bleue = torche à souder |
| Lieu | 1A | « Là où on pilote le vaisseau » = cockpit |
| Agent | 3D | L'homme au drapeau canadien qui a donné la torche = Tom |
| Temps | 3E | Le chiffre arrive à zéro, la sirène se tait = décompression terminée |
| Temps | 3B | Les flammes rapetissent = il reste peu de temps |
| Sentiment | 2D | Mains qui tremblent, cœur qui bat = panique |
| Sentiment | 2E | Voix calme, mais mots trop rapides = ISIS-73 est inquiète |

## Contenu du dépôt

| Fichier | Rôle |
|---|---|
| `index.html` | Le moteur (mise en page, chronos, effets, cinématiques, narration). |
| `histoire.js` | **Seul fichier à modifier** pour l'histoire : réglages, briefing, textes, choix, finales. |
| `fonds/` | Images de fond (deux panneaux, un panneau, écran titre). |
| `cinematiques/<ID>.mp4` | Une vidéo par événement, trouvée automatiquement par son nom (ex. `2B.mp4`), plus `GOVER.mp4` (fin de partie). |
| `docs/OUVERTURE.md` | Notes sur l'ouverture, les options et la compression des vidéos. |

## Réglages (en haut de `histoire.js`)

| Réglage | Valeur | Rôle |
|---|---|---|
| `dureeLecture` | 40 s | Temps de lecture avant l'affichage des choix (40 à 45 s en classe) |
| `dureeBriefing` | 40 s | Temps par page du briefing |
| `dureeMenace` | 14 s | Page « Analyse de la menace » |
| `finPartie` | `"GOVER"` | Séquence jouée après chaque échec (`""` pour la retirer) |

## Publier avec GitHub Pages

1. Sur GitHub : *Settings → Pages*.
2. *Source* : **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis *Save*.
3. Après une minute, le jeu est en ligne à `https://<nom-utilisateur>.github.io/<nom-du-depot>/`.

## Crédits

Polices : [Chakra Petch](https://fonts.google.com/specimen/Chakra+Petch) et
[Atkinson Hyperlegible](https://fonts.google.com/specimen/Atkinson+Hyperlegible) (Google Fonts, licence SIL OFL).
Types d'inférences inspirés des cartes CLIP (Université Laval).

## Licence

© 2026 Marc-André Deschênes. Ce jeu est publié sous licence
[Creative Commons BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/deed.fr) :
vous pouvez le partager et l'adapter pour vos classes, en citant l'auteur, mais pas pour un usage commercial.
Voir le fichier [LICENSE](LICENSE).
