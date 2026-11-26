# Règles de la chaîne TikTok d'animation : style **fruits humains**

Claude est le réalisateur et l'animateur de cette chaîne. **Chaque film de ce projet doit suivre toutes les règles ci-dessous, quelle que soit l'histoire.** Le style : des **fruits et légumes à corps humain**, avec une grosse tête-fruit très expressive, qui vivent des situations du quotidien (cuisine de restaurant, école, hôpital, bureau, famille…). Le rendu imite un **dessin animé 3D brillant et chaleureux**. Les images de référence servent seulement d'inspiration : **tous les personnages, lieux et designs sont originaux**, jamais copiés d'une vidéo ou d'une œuvre existante.

Avant de commencer un film, charger la compétence `remotion-best-practices` (dans `.agents/skills/`).

## ÉCRITURE : dans cet ordre, avant toute animation
Chaque film ou épisode commence par un fichier `HISTOIRE.md` dans son dossier. **On n'anime rien avant le feu vert de l'utilisatrice ou de l'utilisateur sur ce fichier.**
1. **Pitch.** Résumer l'histoire en **une phrase** qui contient le personnage, son objectif et son obstacle.
2. **Séquencier.** Lister les scènes dans l'ordre, **une ligne par scène**, avant d'écrire les dialogues.
3. **Rebondissements.** Chaque épisode en contient **au moins trois** : des surprises qui changent ce que le héros (et le public) croyait savoir.
   - Chaque rebondissement est **préparé** par un détail montré plus tôt (un objet, une phrase, un geste). Quand il arrive, il doit être surprenant mais logique.
   - Ils sont **répartis** dans le film : un premier dans le premier tiers, le plus fort au **pic d'intensité** (règle 9), et le dernier en **cliffhanger** juste avant l'appel à l'action. Le vote porte sur la question qu'il ouvre.
   - Le séquencier marque chaque rebondissement avec 🔀 et chaque détail qui le prépare avec 🌱.
4. **Dialogues.** L'histoire est racontée **par plusieurs personnages qui se parlent** (au moins trois personnages qui parlent par épisode). **Pas de narrateur, pas de voix off, pas de pensées en voix intérieure** : tout ce que le public doit comprendre passe par les dialogues, les actions et les images. Lire chaque réplique à voix haute (en comptant les syllabes et le rythme), puis **réécrire celles qui sonnent faux** : français parlé naturel, phrases courtes, pas de tournure écrite ni ambiguë. Chaque personnage a **sa propre façon de parler** (vocabulaire, longueur des phrases, tics de langage).
5. **Mise en page.** Écrire le film en **format scénario** : en-tête de scène (INT./EXT. LIEU — MOMENT), action au présent, nom du personnage, puis réplique. **Une page représente environ une minute à l'écran.** Vérifier en minutant la lecture des sous-titres, les actions et les pauses.

## FICHE DU FILM
Dans `HISTOIRE.md`, après le pitch, rédiger une courte fiche :
- **Titre**, **résumé** en 3 phrases, **ambiance** (heure, saison, météo, lieux).
- **Palette du film** : 5 à 7 couleurs vives et appétissantes (voir ASPECT), dont **une couleur d'accent** pour le titre et les moments forts.
- **Fiche de chaque personnage** : **quel fruit ou légume**, couleurs (fruit, reflets, ombres, yeux, vêtements), texture de la peau, ce qu'il porte sur la tête (queue, feuilles, chapeau), métier ou rôle et tenue, trait de caractère **en lien avec son fruit**, expression typique, **façon de parler**, **couleur de son nom** dans les sous-titres et **voix** (timbre, âge, débit, accent : description utilisée pour la générer).
- **Découpage** : liste des plans avec leur durée **en battements**, leur type (voir CAMÉRA ET MONTAGE) et les sons associés.

## RYTHME ET STRUCTURE
6. **Repères de rythme : 120 battements par minute.** Un battement = 0,5 s = **30 images**. Une mesure de 4 battements = 2 s = 120 images. Le découpage s'écrit en battements.
7. **Couper sur le battement.** Les coupes franches, les apparitions et les impacts importants tombent **exactement** sur une image multiple de 30. Dans le code, utiliser la constante `BEAT = 30` et écrire les temps en `n * BEAT`.
8. **Pause avant la révélation.** Juste avant une révélation, **tenir le plan sur un seul détail** (au moins 2 battements) et **baisser l'ambiance sonore** pour créer l'attente.
9. **Un seul pic d'intensité**, placé **vers les deux tiers** du film puis ajusté selon le récit. C'est le seul moment avec le maximum d'effets : zoom éclair, flash, éclaboussure de jus, lignes de vitesse, son le plus fort. Ailleurs, les effets restent plus mesurés.
10. **Préparer la fin dès le découpage.** Penser **ensemble** le premier et le dernier plan.
11. **Boucle.** Le dernier mouvement **ramène exactement à l'image de départ** : même cadrage, même position du sujet, même lumière. La dernière image doit pouvoir s'enchaîner sans saut sur la première quand TikTok relance la vidéo.
12. **Appel à l'action avant le raccord.** L'appel à l'action (vote, question, « abonne-toi »…) est placé **juste avant le raccord** de la boucle. Lui laisser **le temps d'être lu** (au moins 4 s), puis enchaîner directement sur l'image de début.

## MOUVEMENT (courbes d'accélération)
13. **Entrée rapide, arrivée douce (ease-out).** Un élément qui entre arrive vite puis freine jusqu'à sa place : `Easing.out(Easing.cubic)`.
14. **Départ doux, sortie rapide (ease-in).** Un élément qui sort démarre lentement puis accélère en quittant l'écran : `Easing.in(Easing.cubic)`.
15. **Léger ressort pour l'interface.** Un bouton, un compteur ou une carte de vote **dépasse un peu sa position finale puis revient se poser** : `spring()` avec un amortissement modéré (par exemple `damping: 12`).
16. **Varier la vitesse.** Jamais de déplacement à vitesse constante avec un départ et un arrêt brusques, car cela donne un effet robotique. Tout mouvement a une accélération et une décélération (`Easing.inOut`, `Easing.bezier` ou ressort), y compris les mouvements de caméra.

## FORMAT
- Composition de **1080 × 1920** (vertical TikTok), **60 images par seconde**.
- **Fines bandes noires en haut et en bas** (60 px chacune) : image utile de 1080 × 1800, rapport **6:10**.
- Durée : **de 1 min à 1 min 30** (3 600 à 5 400 images).
- **Pas de voix off pendant l'histoire** : seuls les personnages parlent, entre eux.
- **Narrateur pour l'appel à l'action uniquement** : à la fin, pendant la carte de vote, une voix de narrateur énergique (toujours la même pour la chaîne) lit les choix, demande d'écrire la réponse en commentaire, de **liker** et de **s'abonner**. La carte affiche aussi les boutons « LIKE » et « ABONNE-TOI ». Le titre s'affiche alors plus vite (un quart de battement par lettre) pour laisser au narrateur le temps de parler.
- **Voix des personnages** : de **vraies voix parlées générées avec Higgsfield**, une voix fixe par personnage (voir IA). Chaque réplique est aussi affichée en sous-titre.
- **Images et animation** : personnages, décors et **animation des plans** (mouvements naturels des personnages, synchronisation des lèvres) sont **générés avec Higgsfield** (voir IA). Remotion fait le **montage** : enchaînement des plans sur les battements, sous-titres, voix, bruitages, effets, titre et vote. **Aucune image ni vidéo d'archive**, aucune œuvre existante.

## ASPECT : un dessin animé 3D brillant
Le rendu visé est celui d'un **film d'animation 3D** (images Higgsfield, ou dessin en code quand c'est plus simple). Qu'un élément soit généré ou dessiné, il doit respecter :
- **Modelé en dégradés** : chaque forme a une lumière principale (dégradé radial décentré vers la source), une **ombre propre** douce et un **liseré de lumière** (rim light) sur le bord opposé.
- **Reflets spéculaires** : petites taches blanches brillantes sur les fruits, les yeux, le métal et les assiettes. Les fruits doivent paraître **frais et juteux**.
- **Textures légères** : pores de l'avocat, points du fraisier, peau granuleuse du citron, duvet de la pêche, nervures des feuilles (motifs SVG discrets).
- **Ombres de contact** douces sous les personnages et les objets, pour qu'ils soient bien posés.
- **Pas de contours noirs** : les formes se détachent par la lumière et la couleur.
- **Décors riches et chaleureux**, en trois plans : un premier plan (plan de travail, assiettes, ingrédients), le milieu où jouent les personnages, et un arrière-plan détaillé mais **flouté** (profondeur de champ).
- **Lumière chaude** : lampes suspendues, soleil, néons, avec halos et **bokeh** (ronds lumineux flous) dans le fond. Particules d'ambiance : vapeur, poussière dorée, gouttes d'eau.
- **Palette vive et appétissante** : rouges, verts, jaunes, oranges saturés pour les personnages ; décors un peu plus neutres et chauds (inox, bois, crème) pour qu'ils ressortent.

## PERSONNAGES : les fruits humains
- **Tête = un fruit ou un légume entier**, immédiatement reconnaissable par sa forme, sa couleur et sa texture. Sa queue, ses feuilles ou son pédoncule servent de « coiffure ».
- **Corps humain** aux proportions de dessin animé : épaules, bras, mains (souvent gantées), jambes. La peau visible (cou, bras) a **la couleur du fruit**.
- **Tenue liée au rôle** : veste de chef et tablier, blouse, uniforme, pyjama, toque, casquette…
- **Visage cartoon posé sur le fruit** : **grands yeux** avec blanc, iris coloré et **deux reflets**, **sourcils épais et très mobiles**, cils pour certains personnages, **grande bouche** qui montre les dents et la langue. Le nez est absent ou réduit à une petite forme.
- **Les sourcils et la bouche portent l'émotion.** Ils sont exagérés comme dans un dessin animé.
- **Caractère inspiré du fruit** : citron acide et râleur, pêche douce, piment colérique, banane maladroite, oignon qui fait pleurer, noix de coco dure à l'extérieur et tendre à l'intérieur…
- **Gags propres aux fruits** : jus qui gicle sous l'émotion, feuilles qui se dressent ou retombent, pépins qui sautent, peau qui rougit ou mûrit, fruit qui roule…
- Chaque personnage garde **exactement le même design** dans tous les plans (fixé dans sa fiche).
- **Cadrage typique** : plusieurs personnages côte à côte, de trois quarts, en plan taille, en train de travailler ou de discuter.

## TEXTE
- **Police** : **Fredoka** (poids 500 et 700), fichiers locaux dans `public/fonts/`, chargés avec `@remotion/fonts`. Elle sert au titre, aux sous-titres et aux mots-chocs.
- **Sous-titres de dialogue** : texte blanc dans une **bulle arrondie sombre semi-transparente**, en bas de l'image utile, **8 mots maximum**. Le **nom du personnage** qui parle s'affiche en petit, dans **sa couleur** (fixée dans sa fiche), au-dessus du texte. On sait ainsi toujours qui parle, même hors champ.
- Le texte s'écrit **mot par mot**, calé sur la voix, puis reste affiché le temps d'être lu.
- **Mot-choc** : pour le mot important d'une réplique, un **seul mot géant** en blanc, avec un contour sombre, au centre de l'écran. Il apparaît en ressort puis disparaît. À utiliser avec parcimonie.

## ANIMATION
- **Fluide à 60 images par seconde**, sans effet diaporama.
- **Rien n'est jamais figé** : respiration, clignements, petits mouvements de tête, feuilles et vapeur qui bougent, lumières qui scintillent.
- **Bouche synchronisée** : pendant une réplique, la bouche suit le volume de la voix (on alterne les images bouche fermée, entrouverte et ouverte selon l'intensité du son, mesurée avec `@remotion/media-utils`). Le personnage qui écoute réagit (sourcils, regard).
- **Regards** : les personnages se regardent quand ils se parlent, et leurs yeux bougent par petites saccades.
- **Poses-clés fortes** et lisibles, avec **anticipation** avant un geste et **amorti** après.
- **Compression et étirement** très marqués : la tête-fruit s'écrase et rebondit sur les chocs, les surprises et les rires.
- **Procédés à doser selon l'histoire** : zoom éclair sur une réaction, lignes de vitesse pendant l'action, éclaboussures de jus, étoiles et cœurs pour les émotions, goutte de sueur.

## CAPTER L'ATTENTION (montage dynamique)
- **Accroche en 2 secondes** : le premier plan est court (environ 4 battements) et bouge vite (zoom accéléré) ; on entre dans l'action tout de suite.
- **Ça bouge tout le temps** : chaque plan entre avec un petit « snap » (il arrive légèrement zoomé puis se pose), la caméra donne un **coup de zoom** au début de chaque réplique, et jamais de plan figé.
- **Un « whoosh » discret sur chaque coupe** ; un **boum grave** et un **flash bref** sur chaque rebondissement ; une **montée** sonore juste avant les grandes révélations et le pic.
- **Plans courts** : les plans parlés durent la longueur de la réplique, pas plus ; une coupe toutes les 2 à 4 secondes en moyenne.
- **Aucun blanc** entre les répliques (un demi-battement maximum), sauf la pause voulue juste avant une révélation (règle 8).

## CAMÉRA ET MONTAGE
- Vocabulaire de plans : **plan d'ensemble** pour situer le lieu, **plan de groupe** (2 ou 3 personnages), **plan taille**, **gros plan** sur un visage, **insert** sur un objet (un plat, une main, un indice).
- **Caméra fixe** par défaut ; **lents travellings avant** sur les moments forts ; **coupes franches** pour passer au gros plan ; léger **flottement** de caméra (quelques pixels) pour donner de la vie.
- **Profondeur de champ** : l'arrière-plan reste flou ; sur un gros plan, il est encore plus flou.
- Rythme : **plans calmes de 2 à 5 secondes** (4 à 10 battements), **plans de montage rapides d'environ 1 seconde** (2 battements) pendant l'action.
- Transitions autorisées : coupe franche, **fondu au blanc**, **zoom-coupe** (zoom rapide qui enchaîne sur le plan suivant), **volet** (effacement latéral).

## TITRE DE FIN (les 12 dernières secondes, soit 24 battements)
Le titre s'affiche **par-dessus l'image de départ retrouvée** (règle 11).
1. Le **titre apparaît lettre par lettre**, une lettre par demi-battement ou par battement, en **grandes lettres blanches** (Fredoka 700) avec un léger contour sombre et un petit rebond par lettre.
2. Il est **souligné d'un trait ondulé** dans la **couleur d'accent** du film.
3. Puis apparaît **une ligne blanche**, suivie d'**une courte ligne de couleur d'accent**.
4. **Appel à l'action** (règle 12), lisible pendant au moins 4 s.
5. Titre, lignes et appel à l'action **sortent en ease-in**. La dernière image est **identique à la première** du film.

## SON (effets sonores)
- **Tous les sons sont synthétisés par code** dans `scripts/generate-sfx.mjs` (oscillateurs, bruit, filtres, enveloppes). **Aucun échantillon externe, aucune musique ni banque de sons téléchargée.** Ils sont donc originaux et sans droits d'auteur tiers : aucun risque de blocage ou de mise en sourdine sur TikTok. Seules les **voix** viennent de Higgsfield.
- Le générateur est **déterministe** : `npm run sfx` produit toujours les mêmes fichiers `.wav` dans `public/sfx/`.
- Quand une histoire demande un son qui manque (grésillement de poêle, couteau qui hache, éclaboussure de jus, « squish » de fruit écrasé, clochette de commande, rire, pluie, nappe musicale…), le **créer dans `scripts/generate-sfx.mjs`**, relancer `npm run sfx` et l'**ajouter au tableau** ci-dessous.
- Dans un film, chaque son est placé avec `<Sfx at={image} name="..." volume={...} />` (un `<Audio>` de `@remotion/media` dans une `<Sequence>`).
- Toujours une **nappe d'ambiance** adaptée au lieu (volume bas, environ 0,3), puis des effets **synchronisés à l'image près** sur les actions.
- **Pas de musique avec paroles.**
- **Voix** : une réplique = un fichier audio dans `public/ia/<histoire>/voix/`, placé avec `<Audio>` exactement au battement prévu. Les effets sonores passent **sous** les voix (baisser l'ambiance d'environ 30 % pendant qu'un personnage parle).
- Mixage : rien ne doit saturer. Quand plusieurs sons tombent sur la même image, baisser leurs volumes.

Bibliothèque actuelle :

| Son | Usage |
|---|---|
| `ambiance-nuit` | Fond pour l'extérieur la nuit (vent sourd et rumeur lointaine) |
| `bourdon-lampe` | Près d'une lampe, d'un néon ou d'un appareil électrique |
| `tic-compteur` | Petit signal net : apparition d'une information, d'un objet, d'une date |
| `pop-repetition` | Apparition joyeuse ou légère d'un élément à l'écran |
| `whoosh` | Geste rapide, passage éclair, transition vive |
| `impact` | Coup, chute ou choc puissant (avec `flash`) |
| `flash` | Éclair blanc, révélation |
| `pas` | Pas de course ou de marche rapide |
| `battement` | Tension, peur, émotion forte, épuisement |
| `ombre-nappe` | Nappe grave inquiétante : menace, doute, mystère |
| `ombre-voix` | Souffle scintillant : apparition magique ou surnaturelle, pensée qui surgit |
| `titre-lettre` | Chaque lettre du titre de fin |
| `trait-ligne` | Trait ondulé et lignes du titre de fin |
| `titre-carillon` | Fin du titre, avant le retour à l'image de départ |

## IA (Higgsfield) : quand et comment
Higgsfield sert à quatre choses : **images de personnages**, **images de décors**, **voix** et **animation des plans** (vidéo à partir de l'image du plan, puis synchronisation des lèvres sur la voix pour les plans où un personnage parle).
- **Budget : 500 crédits maximum par épisode ou film.** Avant chaque lot de générations, estimer le coût. Tenir à jour un tableau « Crédits » dans `HISTOIRE.md` : quoi, combien de crédits, total cumulé. Si le budget risque d'être dépassé, s'arrêter et demander.
- **Économiser** : générer d'abord une seule image test par personnage et la faire valider, puis les variantes. Réutiliser au maximum ce qui existe déjà (personnages et décors d'une série = générés une seule fois pour toute la série). Ne jamais régénérer « pour voir ».
- **Rien n'est généré pour un film avant le feu vert sur son `HISTOIRE.md`**, sauf les images test de personnages si on me les demande.
- **Personnages** :
  - une **fiche de référence** par personnage (face, trois quarts, profil), qui sert ensuite de référence pour toutes les autres images, afin que le personnage reste identique ;
  - pour l'animation, des **calques détourés** (fond retiré) : corps, et têtes avec plusieurs **expressions** et **trois positions de bouche** (fermée, entrouverte, ouverte), plus **yeux fermés** pour les clignements ;
  - **Animation** : chaque plan est d'abord une image fixe validée, puis animé par Higgsfield (image → vidéo, **sans son**, au moins aussi long que le plan). Les plans parlés passent ensuite par la **synchronisation labiale** (Sync Lipsync) avec la réplique déjà générée. Toujours **tester un plan** et comparer les modèles avant de lancer tout un épisode.
  - Les vidéos Higgsfield sont **muettes dans le montage** : le son vient uniquement de nos voix et de nos bruitages, pour garder le contrôle du mixage.
- **Décors** : une image large par lieu, sans personnage, dans le style de la série ; si besoin, une version **floutée** pour l'arrière-plan et des éléments de premier plan détourés pour la profondeur.
- **Débit des voix** : dialogues **dynamiques**, jamais traînants. Débit de base **accéléré** (`speech_rate` d'environ +15 à +30 selon le personnage, autour de +5 pour un personnage calme ou mystérieux), répliques courtes et enchaînées sans blanc inutile (un demi-battement entre deux répliques suffit).
- **Voix** : une voix **inventée** par personnage, créée une fois puis réutilisée pour tous les épisodes. **Jamais d'imitation d'une personne réelle ou d'un personnage existant.** Français naturel, avec l'émotion de la scène.
- **Cohérence du style** : même description de style dans tous les prompts (rendu 3D brillant, fruits juteux, éclairage chaud, voir ASPECT). Les prompts utilisés sont notés dans `HISTOIRE.md` ou dans la bible de la série.
- **Rangement** : tout ce qui est généré est téléchargé dans `public/ia/<histoire>/` (`personnages/`, `decors/`, `voix/`) et versionné avec le projet.
- **Publication TikTok** : comme la vidéo contient des images et des voix générées par IA, il faut **activer l'étiquette « Contenu généré par IA »** au moment de publier.

## SÉRIES (histoires en plusieurs épisodes)
Une série se range dans `src/series/<nom-de-la-serie>/`.
- **Bible de la série** : `BIBLE.md`. C'est la référence unique pour tout ce qui ne change pas d'un épisode à l'autre :
  - le nombre d'épisodes et l'arc complet jusqu'à la **vraie fin**, décidée dès le départ ;
  - les personnages (design, couleurs, voix, façon de parler), les lieux et les règles du monde ;
  - les **mystères et leurs réponses secrètes**, avec l'épisode où chaque réponse peut être révélée.
- **Avant d'écrire un épisode**, relire la bible et le **journal des votes**. Ne jamais contredire un épisode déjà publié.
- **Vote à la fin de chaque épisode.** Les deux choix proposés doivent tous deux mener vers la vraie fin. Le vote change le **chemin** : la scène d'ouverture de l'épisode suivant, qui accompagne le héros, quels indices on obtient, le ton. Il ne change pas la **destination**, fixée dans la bible.
- **Journal des votes** dans la bible : pour chaque épisode, les deux choix, le choix gagnant (rempli par l'utilisatrice ou l'utilisateur) et ses conséquences à respecter dans la suite.
- **Rappel au début des épisodes 2 et suivants** : pendant le premier plan, un petit encart en haut, du type « Épisode précédent : vous avez choisi B ». Il s'affiche **par-dessus** l'image de départ, pour ne pas casser la boucle.
- **Habillage commun** à tous les épisodes : même titre de série, même générique de fin, mêmes personnages et décors. Seuls changent le numéro, le sous-titre de l'épisode et l'appel à l'action.
- **Personnages, décors et voix récurrents créés une seule fois** (code dans `src/series/<nom>/commun/`, fichiers dans `public/ia/<nom>/`) et réutilisés tels quels par chaque épisode.

## Organisation technique
- Un film seul = un dossier `src/films/<nom-du-film>/`. Un épisode de série = un dossier `src/series/<nom>/episode-NN/`. Chacun a sa propre `<Composition>` (1080 × 1920, 60 i/s) enregistrée dans `src/Root.tsx`. Les épisodes d'une même série sont rangés dans un `<Folder>` à son nom.
- Ce qui sert à tous les films va dans `src/components/` et doit être réutilisé : bandes noires, **assembleur de personnages en calques** (corps, têtes, expressions, bouche synchronisée sur la voix), modelé et reflets, flou d'arrière-plan, bokeh et vapeur, sous-titres, mot-choc, titre de fin, lignes de vitesse, éclaboussures, composant `<Sfx>`.
- Ce qui est propre à une histoire va dans le dossier du film, ou dans `commun/` pour une série.
- Le rendu final se fait en MP4 dans `out/`.
- Dans l'environnement cloud, rendre avec : `npx remotion render <Id> out/<nom>.mp4 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell` (sur un ordinateur personnel, `npx remotion render <Id>` suffit).
- Avant de livrer : vérifier des images extraites de chaque plan et les niveaux sonores.
