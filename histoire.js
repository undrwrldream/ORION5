/* ================================================================
   HERO BOOKLETS — contenu de l'histoire et réglages
   C'est le seul fichier à modifier pour écrire l'histoire.

   Chaque événement a un identifiant selon son palier : INTRO, 1A…, 2A…, 3A…, ENDA…, VICT.
   Sa cinématique est cherchée automatiquement dans :
       cinematiques/<IDENTIFIANT>.mp4      (ex. cinematiques/2B.mp4)
   Événement ordinaire : elle joue quand l'élève ARRIVE sur l'événement, avant le texte.
   Finale (ENDA…, VICT) : le texte s'affiche tout de suite ; la vidéo joue quand l'élève
   clique « Continuer ». Après un échec : vidéo de la finale → GOVER → « GAME OVER » 3 s
   → retour automatique à INTRO (sans le briefing). Aucun bouton pendant cette séquence.
   Tant qu'un fichier n'existe pas, un écran temporaire s'affiche.

   choix : { texte, suite, bon }
     suite = identifiant de l'événement suivant
     bon   = true (bon choix) ou false (mauvais choix)
     tentation = true (facultatif) : le choix est rouge et clignote doucement pour attirer l'élève (piège, ex. 3D)
   texte : une liste de paragraphes. On peut aussi y mettre
     { boutons: ["A", "B", "C"] }  → des boutons de panneau, un par ligne (ex. 3D)
     { danger: "..." }             → un panneau DANGER
   fin   : "echec" ou "victoire" pour les finales (aucun choix)

   CHEMIN GAGNANT : INTRO → 1C → 3B (fuite) → 3C (combat) → 3D → 3E → VICT

   ACTES (affichés au-dessus des boutons Rejouer / Continuer) : INTRO = Prologue,
   palier 1 = Acte 1, palier 2 = Acte 2, palier 3 = Acte 3, finales = Conclusion.
   Pour changer le nom d'un acte sur un événement : ajouter  acte: "..."

   PERSONNAGE : TOM, le plus âgé de l'équipage, un drapeau canadien sur l'épaule.
     Il n'est pas nommé avant 3D : on le voit à 2C, 2D (par radio), 3B (« La porte ! ») et 3C (il lance la torche).
     À 3D, il ferme le SAS et on apprend son nom. Après 3A, c'est lui qui reprend
     les commandes du vaisseau (secret, pas encore dans le texte).

   INFÉRENCES TRAVAILLÉES (pour l'enseignant)
     Objet     : INTRO — l'extincteur est décrit, jamais nommé.
                 3C    — la torche à souder est décrite, jamais nommée (« l'outil qui crache une flamme bleue »).
     Lieu      : 1A    — « là où on pilote le vaisseau » = le cockpit.
     Agent     : 3D    — l'homme au drapeau canadien qui a donné la torche = Tom.
     Temps     : 3E    — le chiffre arrive à zéro, la sirène se tait = la décompression est terminée.
                 3B    — les flammes rapetissent = il reste peu de temps.
     Sentiment : 2D    — mains qui tremblent, cœur qui bat = la panique.
                 2E    — voix calme, mais mots trop rapides et voix qui grésille = {IA} est inquiète.
   ================================================================ */

window.CONFIG = {
  dureeLecture: 40,           // secondes de lecture avant l'affichage des choix (40 à 45 en classe)
  dureeBriefing: 40,          // secondes de lecture de chaque page du briefing (40 en classe)
  dureeMenace: 14,            // secondes pour la page « Analyse de la menace » (l'araignée) du briefing (14 en classe)
  defilement: 0.85,           // part du chrono pendant laquelle le texte apparaît lettre par lettre
                              // (0.85 = le texte est complet à 85 % du chrono ; 0 = tout le texte d'un coup)
                              // (ajouter #test à la fin de l'adresse force 5 s pour les deux)
  delaiAvantVideo: 1500,      // ms d'attente avant que la cinématique s'ouvre
  delaiApresVideo: 1000,      // ms d'attente après sa fermeture
  delaiAvantFinale: 800,      // ms d'attente avant la vidéo d'une finale (après « Continuer »)
  dureeGameOver: 3000,        // ms d'affichage des mots GAME OVER avant le retour à INTRO
  dureeTemporaire: 3000,      // ms d'affichage de l'écran temporaire (cinématique manquante)
  finPartie: "GOVER"          // séquence jouée après la vidéo de chaque finale d'échec (cinematiques/GOVER.mp4) ; "" pour la retirer
};

window.HISTOIRE = {
  /* ---- Ouverture du jeu : avertissement sur fond noir, puis écran titre (Commencer / Options). ----
     Les lignes de l'avertissement apparaissent une à une, restent affichées « dureeAvertissement »
     secondes, puis disparaissent ; la dernière ligne enchaîne sur le titre.
     image : facultatif, une illustration plein écran pour l'écran titre (ex. "fonds/titre.webp").
     Sans image, un ciel étoilé avec la planète violette est dessiné. */
  ouverture: {
    avertissement: [
      "Cette aventure n'est pas pour les cœurs fragiles.",
      "Tu échoueras. Tu mordras la poussière.",
      "Mais ne te décourage pas.",
      "Ne laisse aucune pierre non retournée.",
      "Fonce tête baissée et essaie sans relâche.",
      "Seulement ainsi parviendras-tu, peut-être, à survivre à ta mission sur…"
    ],
    delaiEntreLignes: 1.6,    // secondes entre l'apparition de deux lignes
    dureeAvertissement: 5,    // secondes pendant lesquelles tout le texte reste affiché avant de disparaître
    titre: "ORION 5",
    sousTitre: "",
    image: "fonds/titre.webp"
  },

  /* ---- Briefing : trois pages plein écran (IA, lexique, menace), avant l'histoire. ---- */
  briefing: {
    page1: {
      nomIA: "ISIS-73",       // nom de l'intelligence artificielle : {IA} est remplacé partout (briefing, textes, choix) par ce nom
      meta: "Intelligence artificielle du vaisseau",
      titre: "Bonjour, je suis {IA}",
      texte: [
        "Je suis l'intelligence artificielle du vaisseau Orion. Bon retour à bord !",
        "Tu reviens d'une sortie extravéhiculaire. Tu viens d'entrer dans le SAS et de fermer la première porte, celle qui donne sur l'espace. La deuxième porte mène à l'intérieur, où t'attend ton équipage de six personnes."
      ],
      danger: "Toujours laisser le SAS décompresser avant d'ouvrir la porte vers l'espace."
    },
    lexique: {
      meta: "Lexique du vaisseau · {IA}",
      titre: "Les mots à connaître",
      mots: [
        { mot: "SAS", def: "Petite pièce entre l'espace et l'intérieur du vaisseau. Elle a deux portes : une vers l'espace, une vers le vaisseau." },
        { mot: "Cockpit", def: "La pièce d'où on pilote le vaisseau." },
        { mot: "Décompression", def: "On retire tout l'air d'une pièce. On dit aussi dépressurisation." },
        { mot: "Sortie extravéhiculaire", def: "Une sortie dans l'espace, à l'extérieur du vaisseau." },
        { mot: "Hublot", def: "Petite fenêtre ronde dans la paroi d'un vaisseau." },
        { mot: "Pod de secours", def: "Petite capsule qui sert à quitter le vaisseau en cas de danger." },
        { mot: "Brûleurs", def: "Appareils qui produisent de grandes flammes." },
        { mot: "Psionique", def: "Un pouvoir de l'esprit, par exemple faire voir des choses qui n'existent pas." }
      ]
    },
    page2: {
      meta: "Analyse de la menace · {IA}",
      titre: "Araignée géante",
      regles: [
        "Ne jamais l'affronter au corps à corps. Ses capacités psioniques sont hors du commun !",
        "Le feu lui fait mal. Devant une flamme, elle recule.",
        "Elle chasse en groupe. Si on attend, elle appelle les autres."
      ]
    }
  },
  depart: "INTRO",

  evenements: {
    /* ================= DÉPART ================= */
    INTRO: {
      titre: "Alerte au SAS",
      texte: [
        "Une araignée est descendue du plafond au bout d'un fil. Elle était toute petite... mais elle grossit à vue d'œil ! Maintenant, elle est plus grande que toi. Ton casque est encore embué, et le petit écran sur ton bras indique que ta sortie dans l'espace a duré presque trois heures.",
        "Derrière toi, il y a la porte du vaisseau. Si l'araignée passe cette porte, tout l'équipage sera en danger. À tes pieds, il y a un cylindre rouge avec un tuyau noir, le même qu'on voit accroché près des portes, dans les écoles.",
        "Dans ta radio, {IA} annonce : « Je peux allumer les brûleurs du SAS ! »"
      ],
      choix: [
        { texte: "Ouvrir la porte du vaisseau et courir", suite: "1A", bon: false },
        { texte: "Prendre l'extincteur et l'arroser", suite: "1B", bon: false },
        { texte: "Demander à {IA} d'allumer les brûleurs", suite: "1C", bon: true }
      ]
    },

    /* ================= PALIER 1 ================= */
    "1A": {
      titre: "La porte ouverte",
      texte: [
        "Tu ouvres la porte et tu cours dans le couloir du vaisseau. Derrière toi, des pattes grattent le métal. L'araignée est sortie du SAS ! Les lumières du couloir sont bleues et froides. Sur les murs, des affiches rappellent les heures des repas et le nom des membres de l'équipage.",
        "Tu entends les cris de l'équipage. {IA} parle dans ta radio : « Rejoins l'équipage là où on pilote le vaisseau ! Ses portes sont les plus solides ! »"
      ],
      choix: [
        { texte: "Retourner au SAS pour fermer la porte", suite: "2A", bon: false },
        { texte: "Continuer à fuir sans te retourner", suite: "2B", bon: false },
        { texte: "Courir jusqu'au cockpit", suite: "2C", bon: true }
      ]
    },
    "1B": {
      titre: "L'extincteur",
      texte: [
        "Tu prends l'extincteur et tu vises l'araignée. Un nuage de mousse blanche la couvre.",
        "Mais elle ne recule pas. Elle secoue la tête et siffle. Elle avance encore, plus fâchée qu'avant. Un morceau de mousse tombe sur tes bottes. Elle sent le savon et le plastique, comme celle qu'on utilise pour nettoyer la cuisine du vaisseau.",
        "{IA} parle dans ta radio : « Les brûleurs sont prêts ! Donne le signal, puis sors du SAS ! »"
      ],
      choix: [
        { texte: "Ouvrir la porte et courir au cockpit", suite: "2C", bon: false },
        { texte: "Fuir dans le couloir et te cacher", suite: "2D", bon: false },
        { texte: "Donner le signal des brûleurs et sortir", suite: "3B", bon: true }
      ]
    },
    "1C": {
      titre: "Feu !",
      texte: [
        "{IA} allume les brûleurs. Une grande flamme orange remplit le SAS ! La chaleur fait trembler l'air. Ta visière se couvre de buée, et une odeur de métal chaud remplit ton casque pendant quelques secondes.",
        "L'araignée pousse un cri aigu. Elle recule jusqu'au fond du SAS et ne bouge plus. La porte du vaisseau est juste derrière toi.",
        "{IA} dit : « Les flammes ne dureront pas longtemps. Il faut faire vite ! »"
      ],
      choix: [
        { texte: "Sortir du SAS pendant qu'elle recule", suite: "3B", bon: true },
        { texte: "Sortir et fermer la porte tout de suite", suite: "3D", bon: true },
        { texte: "Demander son plan à {IA}", suite: "2E", bon: true }
      ]
    },

    /* ================= PALIER 2 ================= */
    "2A": {
      titre: "Retour au SAS",
      texte: [
        "Tu fais demi-tour et tu cours vers le SAS. Trop tard ! L'araignée n'est plus seule. Sur les murs, au plafond, partout autour de toi, d'autres araignées descendent au bout de leurs fils.",
        "Les lumières rouges clignotent. Leurs yeux brillent dans le noir et leurs pattes grattent le métal. Au loin, la machine à café du vaisseau sonne, comme tous les matins à la même heure. Personne ne viendra la vider aujourd'hui."
      ],
      choix: [
        { texte: "Je hurle de terreur !", suite: "ENDA", bon: false }
      ]
    },
    "2B": {
      titre: "L'araignée est entrée",
      texte: [
        "Tu as fui en laissant le SAS ouvert. L'araignée est entrée dans le vaisseau. Elle avance dans le couloir et elle est très rapide. Sur le sol, une tasse renversée roule lentement. Quelqu'un a laissé la radio de la cuisine allumée : on entend une vieille chanson.",
        "Au bout du couloir, il y a le pod de secours. Mais il n'a presque plus de carburant. Il pourra partir, mais jamais revenir."
      ],
      choix: [
        { texte: "Monter dans le pod de secours", suite: "ENDC", bon: false },
        { texte: "Ne pas prendre le pod et te cacher", suite: "ENDE", bon: false }
      ]
    },
    "2C": {
      titre: "Le cockpit",
      texte: [
        "Tu arrives au cockpit. La capitaine du vaisseau est aux commandes, avec deux membres de l'équipage. Sur le tableau de bord, des dizaines de petites lumières clignotent en vert, en jaune et en rouge. L'écran principal montre une carte des étoiles.",
        "Mais l'araignée t'a suivi. Elle frappe la porte et le métal commence à plier. La capitaine crie : « Des rochers devant nous ! Je ne peux pas lâcher les commandes, sinon on s'écrase ! » Les deux autres attendent tes ordres. Le plus âgé porte un petit drapeau canadien sur l'épaule. Il tient l'outil qui sert à souder les plaques de métal."
      ],
      choix: [
        { texte: "Demander à la capitaine de t'aider à bloquer la porte", suite: "3A", bon: false },
        { texte: "Ouvrir la porte et attaquer l'araignée seul", suite: "ENDA", bon: false },
        { texte: "Demander aux deux membres de l'équipage de t'aider", suite: "3C", bon: true }
      ]
    },
    "2D": {
      titre: "Seul face à elle",
      texte: [
        "Tu as fui dans le couloir et tu t'es caché derrière une grosse caisse. Mais l'araignée est sortie du SAS. Elle avance vers toi. Tes mains tremblent et ton cœur bat si fort que tu l'entends dans tes oreilles. Ta respiration fait un bruit fort dans ton casque, comme un vent qui souffle.",
        "Soudain, des flammes jaillissent tout autour d'elle : {IA} a allumé des feux dans le couloir ! L'araignée recule vers le SAS. Dans ta radio, la voix grave du plus âgé de l'équipage gronde : « Retourne au SAS, à tout prix ! C'est la seule façon de l'enfermer ! »"
      ],
      choix: [
        { texte: "Rester caché et attendre", suite: "ENDE", bon: false },
        { texte: "Retourner vers le SAS malgré ta peur", suite: "3C", bon: true },
        { texte: "Frapper l'araignée avec l'extincteur", suite: "3B", bon: false }
      ]
    },
    "2E": {
      titre: "Le plan d'{IA}",
      texte: [
        "La voix d'{IA} est calme, mais ses mots arrivent plus vite que d'habitude et sa voix grésille. Derrière elle, une alarme sonne sans arrêt. {IA} explique le plan : « D'abord, sors du SAS. Ensuite, ferme la porte du vaisseau. L'araignée sera prisonnière. »",
        "« Après, lance la décompression. C'est seulement à la fin qu'on ouvre la porte vers l'espace. Je peux aussi fermer la porte d'ici, si tu veux. »"
      ],
      choix: [
        { texte: "Sortir et fermer la porte toi-même", suite: "3D", bon: true },
        { texte: "Sortir et laisser {IA} fermer la porte", suite: "3E", bon: true }
      ]
    },

    /* ================= PALIER 3 ================= */
    "3A": {
      titre: "Crash",
      texte: [
        "La capitaine lâche les commandes pour t'aider. Le vaisseau frappe un rocher ! Tout tremble et les lumières s'éteignent. Des papiers et des outils flottent un instant dans l'air.",
        "La capitaine est assommée. Plus personne ne pilote, et le vaisseau glisse lentement vers une grosse planète violette. L'araignée est étourdie sur le sol, mais une de ses pattes bouge déjà. Le pod de secours a été abîmé par le choc : son moteur ne marche plus."
      ],
      choix: [
        { texte: "Crier à l'équipage d'apporter du feu", suite: "3C", bon: true },
        { texte: "Fuir dans le pod de secours", suite: "ENDC", bon: false },
        { texte: "Attendre que la capitaine se réveille", suite: "ENDB", bon: false }
      ]
    },
    "3B": {
      titre: "La fuite",
      texte: [
        "Tu cours dans le couloir, loin du SAS. L'équipage court avec toi. Tout le monde est essoufflé. Quelqu'un tient encore son sandwich du dîner. Un autre a perdu une chaussure dans sa course.",
        "Derrière vous, le feu retient l'araignée au fond du SAS. Mais la porte du SAS est encore ouverte, et les flammes deviennent plus petites. Bientôt, elle n'aura plus peur. Le plus âgé de l'équipage, un drapeau canadien sur l'épaule, s'arrête et crie : « La porte ! Il faut la fermer, sinon elle va nous suivre ! »"
      ],
      choix: [
        { texte: "Attendre qu'elle reparte toute seule", suite: "ENDE", bon: false },
        { texte: "Courir te cacher avec l'équipage", suite: "ENDE", bon: false },
        { texte: "Faire demi-tour vers le SAS", suite: "3C", bon: true }
      ]
    },
    "3C": {
      titre: "Combat",
      texte: [
        "L'araignée se jette sur toi ! Tu te débats, mais tes coups ne lui font presque rien. Un panneau du mur tombe avec un grand bruit. Les lumières clignotent, et une voix robotique répète un message d'erreur que personne n'écoute.",
        "Le plus âgé de l'équipage, un petit drapeau canadien sur l'épaule, te lance l'outil qui sert à souder les plaques de métal. Il crache une longue flamme bleue. Quand la flamme passe près d'elle, l'araignée recule d'un coup vers le SAS. « Pousse-la dedans ! » crie-t-il.",
        "Dans ta radio, {IA} avertit : « Attention ! Ne te fie pas à tout ce que tu vois. Elle peut jouer avec ton esprit. »"
      ],
      choix: [
        { texte: "Lâcher la torche et frapper avec tes mains", suite: "ENDA", bon: false },
        { texte: "Te cacher et attendre que ça passe", suite: "ENDE", bon: false },
        { texte: "Repousser l'araignée dans le SAS avec la torche", suite: "3D", bon: true }
      ]
    },
    "3D": {
      titre: "Fermer le SAS",
      texte: [
        "La porte du SAS se ferme. L'araignée est prisonnière ! Près de toi, un homme garde la main sur le bouton. Sur son épaule, il y a un petit drapeau canadien. « On l'a eue ! » dit Tom.",
        "Mais ses yeux se mettent à briller. Tout devient confus dans ta tête. Les murs disparaissent : tu ne vois plus que le vide de l'espace, et des araignées partout !",
        "{IA} crie : « Ne te fie pas à ce que tu vois ! Ne te laisse pas duper par ses manipulations psychiques ! » Sur le panneau, il y a trois boutons :",
        { boutons: ["PORTE VERS L'ESPACE", "DÉCOMPRESSION", "AUTODESTRUCTION"] },
        "Ton doigt tremble au-dessus du bouton AUTODESTRUCTION."
      ],
      choix: [
        { texte: "Ouvrir tout de suite la porte vers l'espace", suite: "ENDD", bon: false },
        { texte: "Lancer l'autodestruction pour arrêter les araignées", suite: "ENDD", bon: false, tentation: true },
        { texte: "Lancer la décompression", suite: "3E", bon: true }
      ]
    },
    "3E": {
      titre: "Décompression",
      texte: [
        "Une sirène sonne. L'air sort du SAS en sifflant. L'araignée s'accroche au plancher avec ses griffes. Les lumières du SAS deviennent rouges. Sur l'écran, un chiffre descend lentement : la quantité d'air qui reste encore dans la pièce.",
        "Une minute passe, puis une autre. Le chiffre arrive à zéro et la sirène se tait. Un voyant s'allume : « Ne pas ouvrir la porte du vaisseau. » À côté de toi, Tom, le plus âgé de l'équipage, retient son souffle."
      ],
      choix: [
        { texte: "Ouvrir la porte vers l'espace", suite: "VICT", bon: true },
        { texte: "Ouvrir la porte du vaisseau pour vérifier", suite: "ENDD", bon: false }
      ]
    },

    /* ================= FINALES ================= */
    ENDA: { titre: "Dévoré", fin: "echec", texte: [
      "L'araignée est trop rapide et trop forte. Ses pattes t'attrapent.",
      "Une à une, toutes les personnes à bord disparaissent. Le vaisseau Orion flotte maintenant dans le silence."
    ] },
    ENDB: { titre: "Écrasé sur la planète", fin: "echec", texte: [
      "Personne ne pilote le vaisseau. Il descend de plus en plus vite vers la planète violette.",
      "Les alarmes hurlent, puis c'est le choc. Le vaisseau Orion s'écrase et disparaît dans un nuage de poussière."
    ] },
    ENDC: { titre: "À la dérive", fin: "echec", texte: [
      "Le pod de secours se détache du vaisseau. Mais il ne peut pas revenir.",
      "Tu dérives seul dans l'espace noir. Ton équipage, lui, est resté à bord... avec l'araignée."
    ] },
    ENDD: { titre: "Explosion", fin: "echec", texte: [
      "Une énorme explosion secoue le vaisseau. Les murs se tordent et les alarmes hurlent.",
      "Le vaisseau Orion se brise en morceaux devant la planète violette."
    ] },
    ENDE: { titre: "Ils sont plusieurs", fin: "echec", texte: [
      "Tu as perdu trop de temps. L'araignée appelle les siennes. Des bruits de pattes résonnent partout sur la coque.",
      "Soudain, grâce à son pouvoir psionique, une araignée traverse la vitre du cockpit comme si c'était de l'eau. Les autres la suivent. Le vaisseau est envahi."
    ] },
    VICT: { titre: "Araignée expulsée", fin: "victoire", texte: [
      "La porte vers l'espace s'ouvre. Il n'y a plus d'air dans le SAS : rien n'explose.",
      "L'araignée lâche prise. Elle est aspirée dans l'espace et disparaît dans le noir.",
      "Dans la radio, tout l'équipage crie de joie. Grâce à ta lecture attentive, tout le monde est sauvé !"
    ] }
  }
};
