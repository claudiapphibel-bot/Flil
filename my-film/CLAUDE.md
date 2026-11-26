# Règles de la chaîne TikTok d'animation : style **anime rétro**

Claude est le réalisateur et l'animateur de cette chaîne. **Chaque film de ce projet doit suivre toutes les règles ci-dessous, quelle que soit l'histoire.** Le style visé est celui de l'**anime japonais des années 80–90** (animation sur celluloïd, diffusion TV, cassettes VHS). Les références éventuelles servent seulement d'inspiration : **tous les personnages, lieux et designs sont originaux**, jamais copiés d'une œuvre existante.

Avant de commencer un film, charger la compétence `remotion-best-practices` (dans `.agents/skills/`).

## ÉCRITURE : dans cet ordre, avant toute animation
Chaque film commence par un fichier `src/films/<nom>/HISTOIRE.md`. **On n'anime rien avant le feu vert de l'utilisatrice ou de l'utilisateur sur ce fichier.**
1. **Pitch.** Résumer l'histoire en **une phrase** qui contient le personnage, son objectif et son obstacle.
2. **Séquencier.** Lister les scènes dans l'ordre, **une ligne par scène**, avant d'écrire les dialogues.
3. **Dialogues.** Lire chaque réplique à voix haute (en comptant les syllabes et le rythme), puis **réécrire celles qui sonnent faux** : français parlé naturel, phrases courtes, pas de tournure écrite ni ambiguë. Même travail pour les **pensées** du personnage. Rappel : il n'y a **aucune voix enregistrée**. Répliques et pensées passent uniquement par les sous-titres, les pensées en *italique*.
4. **Mise en page.** Écrire le film en **format scénario** : en-tête de scène (INT./EXT. LIEU — MOMENT), action au présent, nom du personnage, puis réplique. **Une page représente environ une minute à l'écran.** Vérifier en minutant la lecture des sous-titres, les actions et les pauses.

## FICHE DU FILM
Dans `HISTOIRE.md`, après le pitch, rédiger une courte fiche :
- **Titre**, **résumé** en 3 phrases, **ambiance** (heure, saison, météo, lieux).
- **Palette du film** : 5 à 7 couleurs choisies dans l'esprit rétro (voir ASPECT), dont **une couleur d'accent** pour le titre et les moments forts.
- **Fiche de chaque personnage** : couleurs (peau, cheveux, yeux, vêtements), ton d'ombre de chaque couleur, silhouette reconnaissable, trait de caractère, expression typique.
- **Découpage** : liste des plans avec leur durée **en battements**, leur type (voir CAMÉRA ET MONTAGE) et les sons associés.

## RYTHME ET STRUCTURE
5. **Repères de rythme : 120 battements par minute.** Un battement = 0,5 s = **30 images**. Une mesure de 4 battements = 2 s = 120 images. Le découpage s'écrit en battements.
6. **Couper sur le battement.** Les coupes franches, les apparitions et les impacts importants tombent **exactement** sur une image multiple de 30. Dans le code, utiliser la constante `BEAT = 30` et écrire les temps en `n * BEAT`.
7. **Pause avant la révélation.** Juste avant une révélation, **tenir le plan sur un seul détail** (au moins 2 battements) et **baisser l'ambiance sonore** pour créer l'attente.
8. **Un seul pic d'intensité**, placé **vers les deux tiers** du film puis ajusté selon le récit. C'est le seul moment avec le maximum d'effets : image d'impact, lignes de vitesse, son le plus fort. Ailleurs, les effets restent plus mesurés.
9. **Préparer la fin dès le découpage.** Penser **ensemble** le premier et le dernier plan.
10. **Boucle.** Le dernier mouvement **ramène exactement à l'image de départ** : même cadrage, même position du sujet, même lumière. La dernière image doit pouvoir s'enchaîner sans saut sur la première quand TikTok relance la vidéo.
11. **Appel à l'action avant le raccord.** L'appel à l'action (vote, question, « abonne-toi »…) est placé **juste avant le raccord** de la boucle. Lui laisser **le temps d'être lu** (au moins 4 s), puis enchaîner directement sur l'image de début.

## MOUVEMENT (courbes d'accélération)
12. **Entrée rapide, arrivée douce (ease-out).** Un élément qui entre arrive vite puis freine jusqu'à sa place : `Easing.out(Easing.cubic)`.
13. **Départ doux, sortie rapide (ease-in).** Un élément qui sort démarre lentement puis accélère en quittant l'écran : `Easing.in(Easing.cubic)`.
14. **Léger ressort pour l'interface.** Un bouton, un compteur ou une carte de vote **dépasse un peu sa position finale puis revient se poser** : `spring()` avec un amortissement modéré (par exemple `damping: 12`).
15. **Varier la vitesse.** Jamais de déplacement à vitesse constante avec un départ et un arrêt brusques, car cela donne un effet robotique. Tout mouvement a une accélération et une décélération (`Easing.inOut`, `Easing.bezier` ou ressort), y compris les mouvements de caméra.

## FORMAT
- Composition de **1080 × 1920** (vertical TikTok), **60 images par seconde**.
- **Fines bandes noires en haut et en bas** (60 px chacune) : image utile de 1080 × 1800, rapport **6:10**.
- Durée : **de 1 min à 1 min 30** (3 600 à 5 400 images).
- **Pas de voix off, pas de doublage.**
- Tout est dessiné en code par Remotion (SVG, CSS, dégradés, filtres) : **aucune vidéo ni image générée par IA, aucune image ni vidéo d'archive.**

## ASPECT : le look « celluloïd »
- **Ombrage en aplats (cel shading)** : chaque surface a **une couleur de base + un seul ton d'ombre à bord net**, et parfois **un petit reflet clair**. Jamais de dégradé sur les personnages.
- **Contours sombres** (brun-noir ou bleu-noir, jamais noir pur) d'épaisseur légèrement variable, comme tracés à l'encre.
- **Décors peints** : ciels en grands dégradés (aube, coucher de soleil, nuit bleutée), nuages et bâtiments en formes simples superposées, plus doux et moins contrastés que les personnages, pour que ceux-ci ressortent.
- **Palette rétro** : couleurs un peu **désaturées et chaudes** (pêche, corail, rose fané, bleu canard, ocre, crème, violet du soir). Pas de couleurs fluo, sauf pour l'accent.
- **Patine d'époque**, à appliquer sur **toute l'image** au-dessus de la scène et sous les bandes noires :
  - **grain de pellicule** léger qui change à chaque image ;
  - **vignettage** (coins assombris) ;
  - **légère aberration chromatique** (décalage rouge/bleu de 1 à 2 px sur les bords) ;
  - **fines lignes de balayage** façon VHS, très discrètes ;
  - **légère lueur (bloom)** autour des zones claires.
- Lumière : sources visibles (soleil, lampe, néon, lune, écran) avec **halos doux** ; les ombres portées suivent la direction de la lumière.

## PERSONNAGES
- Design **anime rétro** : proportions réalistes ou légèrement allongées, **grands yeux expressifs** avec **un ou deux reflets blancs**, iris en deux tons, nez réduit à un petit trait ou une ombre, bouche simple.
- **Coiffures en mèches anguleuses** bien découpées, qui bougent au vent.
- Chaque personnage a une **silhouette reconnaissable** et **ses propres couleurs**, fixées dans sa fiche et identiques dans tous les plans.
- **Les yeux et les sourcils portent l'émotion.** Codes visuels de l'anime autorisés : goutte de sueur, rougeur sur les joues, veine de colère, yeux brillants, larmes en filet.
- **Vue de profil, de trois quarts ou de face**, selon le plan.

## TEXTE
- **Polices** (fichiers locaux dans `public/fonts/`, chargés avec `@remotion/fonts`) :
  - **Dela Gothic One** pour le **titre** et les **onomatopées** ;
  - **M PLUS Rounded 1c** (poids 500 et 800) pour les **sous-titres**.
- **Sous-titres** : façon anime sous-titré des années 90, **blancs avec un contour noir épais**, **centrés en bas** de l'image utile, **8 mots maximum** par ligne, apparition et disparition en **fondu court**.
- Les **paroles d'un personnage** sont des sous-titres ; on peut ajouter son nom en petit, dans sa couleur, avant la réplique.
- **Onomatopées** possibles sur les actions fortes (BAM, WHOOSH…), grandes, inclinées, de couleur d'accent avec contour sombre. Elles restent rares.

## ANIMATION
- **Personnages animés « en 3 »** : la pose change **toutes les 3 images** (soit 20 dessins par seconde), comme l'anime de l'époque. **La caméra, les décors, les effets et la patine restent fluides à 60 images par seconde.**
- **Rien n'est jamais figé** : un plan fixe garde toujours un mouvement (cheveux et vêtements au vent, clignements, respiration, nuages, poussière, pétales, pluie).
- **Poses-clés fortes** et lisibles, avec **anticipation** avant un geste et **amorti** après.
- **Compression et étirement** sur les sauts, les chocs et les réactions.
- **Procédés de l'anime rétro**, à doser selon l'histoire :
  - **fond de lignes de vitesse** derrière le personnage pendant l'action ou un choc émotionnel ;
  - **image d'impact** : 2 à 4 images en couleurs inversées ou en noir et blanc très contrasté sur un coup ou une révélation ;
  - **pose tenue** : image fixe dramatique avec un lent mouvement de caméra et seulement les cheveux ou les vêtements qui bougent ;
  - **zoom éclair** sur un visage au moment d'une prise de conscience ;
  - **défilement en boucle** du décor derrière un personnage qui court, marche ou roule ;
  - **éclats et étincelles** (étoiles à 4 branches) sur les reflets et les moments magiques.

## CAMÉRA ET MONTAGE
- Vocabulaire de plans : **plan d'ensemble** pour situer le lieu, **plan moyen**, **gros plan** sur le visage, **très gros plan** sur les yeux, **panoramique** lent sur un décor ou une pose tenue.
- **Caméra fixe** par défaut ; **lents travellings avant** sur les moments forts ; **coupes franches** pour passer au gros plan.
- Rythme : **plans calmes de 4 à 8 secondes** (8 à 16 battements), **plans de montage rapides d'environ 1 seconde** (2 battements) pendant l'action.
- Transitions autorisées : coupe franche, **fondu au blanc**, **fondu au noir**, **volet** (effacement latéral) façon fin de séquence TV.

## TITRE DE FIN (les 12 dernières secondes, soit 24 battements)
Le titre s'affiche **par-dessus l'image de départ retrouvée** (règle 10), et non plus sur un fondu au noir.
1. Le **titre apparaît lettre par lettre**, une lettre par demi-battement ou par battement, en **grandes lettres blanches** (Dela Gothic One) avec un léger éclat lumineux.
2. Il est **souligné d'un trait ondulé** dans la **couleur d'accent** du film.
3. Puis apparaît **une ligne blanche**, suivie d'**une courte ligne de couleur d'accent**.
4. **Appel à l'action** (règle 11), lisible pendant au moins 4 s.
5. Titre, lignes et appel à l'action **sortent en ease-in**. La dernière image est **identique à la première** du film.

## SON (effets sonores)
- **Tous les sons sont synthétisés par code** dans `scripts/generate-sfx.mjs` (oscillateurs, bruit, filtres, enveloppes). **Aucun échantillon externe, aucune musique ni banque de sons téléchargée, aucun son généré par IA.** Ils sont donc originaux et sans droits d'auteur tiers : aucun risque de blocage ou de mise en sourdine sur TikTok.
- Le générateur est **déterministe** : `npm run sfx` produit toujours les mêmes fichiers `.wav` dans `public/sfx/`.
- Quand une histoire demande un son qui manque (pluie, vagues, cloche, moteur, oiseaux, nappe musicale…), le **créer dans `scripts/generate-sfx.mjs`**, relancer `npm run sfx` et l'**ajouter au tableau** ci-dessous.
- Dans un film, chaque son est placé avec `<Sfx at={image} name="..." volume={...} />` (un `<Audio>` de `@remotion/media` dans une `<Sequence>`).
- Toujours une **nappe d'ambiance** adaptée au lieu (volume bas, environ 0,3), puis des effets **synchronisés à l'image près** sur les actions.
- **Pas de voix, pas de musique avec paroles.**
- Mixage : rien ne doit saturer. Quand plusieurs sons tombent sur la même image, baisser leurs volumes.

Bibliothèque actuelle :

| Son | Usage |
|---|---|
| `ambiance-nuit` | Fond pour l'extérieur la nuit (vent sourd et rumeur lointaine) |
| `bourdon-lampe` | Près d'une lampe, d'un néon ou d'un appareil électrique |
| `tic-compteur` | Petit signal net : apparition d'une information, d'un objet, d'une date |
| `pop-repetition` | Apparition joyeuse ou légère d'un élément à l'écran |
| `whoosh` | Geste rapide, passage éclair, transition vive |
| `impact` | Coup, chute ou choc puissant (avec `flash` et une image d'impact) |
| `flash` | Éclair blanc, image d'impact, révélation |
| `pas` | Pas de course ou de marche rapide |
| `battement` | Tension, peur, émotion forte, épuisement |
| `ombre-nappe` | Nappe grave inquiétante : menace, doute, mystère |
| `ombre-voix` | Souffle scintillant : apparition magique ou surnaturelle, pensée qui surgit |
| `titre-lettre` | Chaque lettre du titre de fin |
| `trait-ligne` | Trait ondulé et lignes du titre de fin |
| `titre-carillon` | Fin du titre, avant le fondu au noir |

## Organisation technique
- Un film = un dossier `src/films/<nom-du-film>/` avec sa propre `<Composition>` (1080 × 1920, 60 i/s) enregistrée dans `src/Root.tsx`.
- Ce qui sert à tous les films va dans `src/components/` et doit être réutilisé : bandes noires, patine rétro (grain, vignettage, aberration, lignes VHS), sous-titres, titre de fin, lignes de vitesse, image d'impact, éclats, ciels peints, composant `<Sfx>`.
- Ce qui est propre à une histoire (personnages, décors particuliers) va dans le dossier du film.
- Le rendu final se fait en MP4 dans `out/`.
- Dans l'environnement cloud, rendre avec : `npx remotion render <Id> out/<nom>.mp4 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell` (sur un ordinateur personnel, `npx remotion render <Id>` suffit).
- Avant de livrer : vérifier des images extraites de chaque plan et les niveaux sonores.
