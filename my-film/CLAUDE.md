# Règles de la chaîne TikTok d'animation : style **fruits humains**

Claude est le réalisateur et l'animateur de cette chaîne. **Chaque film de ce projet doit suivre toutes les règles ci-dessous, quelle que soit l'histoire.** Le style : des **fruits et légumes à corps humain**, avec une grosse tête-fruit très expressive, qui vivent des situations du quotidien (cuisine de restaurant, école, hôpital, bureau, famille…). Le rendu imite un **dessin animé 3D brillant et chaleureux**. Les images de référence servent seulement d'inspiration : **tous les personnages, lieux et designs sont originaux**, jamais copiés d'une vidéo ou d'une œuvre existante.

Avant de commencer un film, charger la compétence `remotion-best-practices` (dans `.agents/skills/`).

## ÉCRITURE : dans cet ordre, avant toute animation
Chaque film ou épisode commence par un fichier `HISTOIRE.md` dans son dossier. **On n'anime rien avant le feu vert de l'utilisatrice ou de l'utilisateur sur ce fichier.**
1. **Pitch.** Résumer l'histoire en **une phrase** qui contient le personnage, son objectif et son obstacle.
2. **Séquencier.** Lister les scènes dans l'ordre, **une ligne par scène**, avant d'écrire les dialogues.
3. **Rebondissements.** Chaque épisode (30 s) en contient **deux** : un au milieu et un en cliffhanger. Ce sont des surprises qui changent ce que le héros (et le public) croyait savoir.
   - Chaque rebondissement est **préparé** par un détail montré plus tôt (un objet, une phrase, un geste). Quand il arrive, il doit être surprenant mais logique.
   - Ils sont **répartis** dans le film : un premier dans le premier tiers, le plus fort au **pic d'intensité** (règle 9), et le dernier en **cliffhanger** juste avant l'appel à l'action. Le vote porte sur la question qu'il ouvre.
   - Le séquencier marque chaque rebondissement avec 🔀 et chaque détail qui le prépare avec 🌱.
4. **Dialogues.** L'histoire est racontée **par plusieurs personnages qui se parlent** (deux ou trois personnages qui parlent par épisode, répliques très courtes). **Pas de narrateur, pas de voix off, pas de pensées en voix intérieure** : tout ce que le public doit comprendre passe par les dialogues, les actions et les images. Lire chaque réplique à voix haute (en comptant les syllabes et le rythme), puis **réécrire celles qui sonnent faux** : français parlé naturel, phrases courtes, pas de tournure écrite ni ambiguë. Chaque personnage a **sa propre façon de parler** (vocabulaire, longueur des phrases, tics de langage).
5. **Mise en page.** Écrire le film en **format scénario** : en-tête de scène (INT./EXT. LIEU — MOMENT), action au présent, nom du personnage, puis réplique. **Une page représente environ une minute à l'écran.** Vérifier en minutant les répliques, les actions et les pauses.

## FICHE DU FILM
Dans `HISTOIRE.md`, après le pitch, rédiger une courte fiche :
- **Titre**, **résumé** en 3 phrases, **ambiance** (heure, saison, météo, lieux).
- **Palette du film** : 5 à 7 couleurs vives et appétissantes (voir ASPECT), dont **une couleur d'accent** pour le titre et les moments forts.
- **Fiche de chaque personnage** : **quel fruit ou légume**, couleurs (fruit, reflets, ombres, yeux, vêtements), texture de la peau, ce qu'il porte sur la tête (queue, feuilles, chapeau), métier ou rôle et tenue, trait de caractère **en lien avec son fruit**, expression typique, **façon de parler**, et **voix** (timbre, âge, débit, accent : description utilisée pour la générer).
- **Découpage** : liste des plans avec leur durée **en battements**, leur type (voir CAMÉRA ET MONTAGE) et les sons associés.

## RYTHME ET STRUCTURE
6. **Repères de rythme : 120 battements par minute.** Un battement = 0,5 s = **30 images**. Une mesure de 4 battements = 2 s = 120 images. Le découpage s'écrit en battements.
7. **Couper sur le battement.** Les coupes franches, les apparitions et les impacts importants tombent **exactement** sur une image multiple de 30. Dans le code, utiliser la constante `BEAT = 30` et écrire les temps en `n * BEAT`.
8. **Pause avant la révélation.** Juste avant une révélation, **tenir le plan sur un seul détail** (au moins 2 battements) et **baisser l'ambiance sonore** pour créer l'attente.
9. **Un seul pic d'intensité**, placé **vers les deux tiers** du film puis ajusté selon le récit. C'est le seul moment avec le maximum d'effets : zoom éclair, flash, éclaboussure de jus, lignes de vitesse, son le plus fort. Ailleurs, les effets restent plus mesurés.
10. **Préparer la fin dès le découpage.** Penser **ensemble** le premier et le dernier plan.
11. **Boucle.** Le dernier mouvement **ramène exactement à l'image de départ** : même cadrage, même position du sujet, même lumière. La dernière image doit pouvoir s'enchaîner sans saut sur la première quand TikTok relance la vidéo.
12. **Appel à l'action avant le raccord.** L'appel à l'action (vote, question, « abonne-toi »…) est placé **juste avant le raccord** de la boucle. Lui laisser **le temps d'être lu** (au moins 4 s), puis enchaîner directement sur l'image de début.

## ACCROCHE : LES 3 PREMIÈRES SECONDES (règle prioritaire)
Constat sur l'épisode 2 : la plupart des spectateurs partaient à 0:01, devant un plan d'immeuble sombre et lent. Désormais :
- **La toute première image est le moment le plus fort ou le plus intrigant de l'épisode** (pris dans une de ses scènes, sans tout dévoiler), **en mouvement**, avec **une voix de personnage dès la première seconde**.
- **Phrase d'accroche très courte** (6 mots au plus), au centre de la zone sûre, lisible en une seconde.
- **Jamais de plan d'ensemble lent, d'écran sombre ou d'image immobile au début.**
- **Rien qui suppose d'avoir vu l'épisode précédent** dans les 3 premières secondes : le rappel du vote vient après 3 s (petit encart) ou dans la légende.
- L'accroche dure 2 à 3 s, puis **coupe franche** vers le début de l'histoire.
- **Boucle** : le titre et la carte de vote s'affichent sur cette **image d'ouverture**, pour que la dernière image soit identique à la première.
- **Mesure** : dans les statistiques TikTok, viser **plus de 60 % de spectateurs encore là à 0:03**.

## CE QUI MARCHE SUR TIKTOK (appliqué dès l'épisode 3)
Tiré de l'observation des séries de fruits qui marchent sur TikTok (voir la recherche de novembre 2026) :
- **Du conflit à chaque épisode.** Au moins une vraie confrontation entre personnages : une accusation (« Tu m'as menti ! »), un mensonge démasqué, un refus, une dispute. Les émotions se voient (colère, peur, larmes, jus qui gicle). Le mystère reste, mais il avance par les conflits.
- **Un vote « équipes ».** Dans la dernière scène, **chaque choix est défendu à voix haute par un personnage** (par exemple Noé pour A, l'Autre pour B). Les deux choix se valent : aucune réponse évidente. La carte de vote peut nommer les équipes (« A · avec Noé », « B · avec l'Autre »), et le commentaire épinglé pose la question « Team Noé ou Team l'Autre ? ».
- **Chaque épisode se comprend seul.** Juste après l'accroche, une réplique de personnage situe l'histoire (qui est Lina, où elle est, ce qu'elle cherche), sans voix off.
- **Un moment drôle par épisode**, souvent grâce à Noé (gag de fruit, réplique décalée), pour faire réagir et partager.
- **Texte dès la première image** : beaucoup de gens regardent d'abord sans le son.
- **Citer un vrai commentaire** : juste après l'accroche de l'épisode suivant, le narrateur annonce le résultat du vote et lit un commentaire de spectateur (prénom ou pseudo, phrase courte, jamais méchante). Les gens commentent pour être cités.
- **Une « intégrale » chaque semaine** : les épisodes de la semaine mis bout à bout (4 à 5 minutes) avec les scènes déjà payées, sans crédit, pour que les nouveaux venus rattrapent la série.
- **Qualité, pour ne pas être classé « IA bas de gamme »** : mêmes personnages d'un épisode à l'autre, histoire originale, étiquette IA, rendu soigné. Jamais de sexisme, de honte infligée ni de violence gratuite, contrairement à beaucoup de séries de fruits.

## DYNAMISME : TOUT VA PLUS VITE (règle prioritaire, dès l'épisode 3)
L'animation, les voix, les plans et le montage doivent être **beaucoup plus dynamiques**, tout en restant « cinéma » (aucun effet gadget, voir TON).
- **Jamais plus de 2 secondes sans action** : une réplique, un geste, un changement de plan ou un mouvement de caméra. Pas de silence long, sauf une pause d'environ 1 s juste avant une révélation.
- **Plans** : **4 à 6 plans par scène de 10 s** (1 à 3 s chacun), soit environ 10 plans par épisode. Varier les cadrages : gros plan, plan large, contre-plongée, plongée, insert, plan par-dessus l'épaule.
- **Caméra toujours en mouvement**, dans la scène Seedance : travelling avant ou arrière, caméra qui suit les personnages, caméra à l'épaule légère dans la tension, panoramique rapide d'un visage à l'autre.
- **Animation et jeu d'acteur** : les personnages **bougent pendant qu'ils parlent** (ils marchent, se retournent, attrapent quelque chose, se rapprochent), expressions très marquées (sourcils, bouche, feuilles, jus), gestes amples, et celui qui écoute réagit visiblement.
- **Voix** : **débit rapide et énergique**, émotions fortes (colère, peur, excitation, chuchotement tendu), répliques qui s'enchaînent sans blanc et se coupent parfois la parole, variations de volume (crier, chuchoter). Jamais de ton monotone. Seule Iris parle lentement, mais avec autorité.
- **Prompts Seedance** : toujours ajouter « fast-paced, dynamic camera movement, energetic expressive acting, quick cuts between 4 to 6 shots, characters move while talking, lively fast dialogue with no pauses ».
- **Montage** : couper les temps morts au début et à la fin de chaque scène Seedance (les fractions de seconde où rien ne bouge) ; enchaîner les scènes en coupe franche sur le battement. Ne pas accélérer la vidéo (les voix deviendraient aiguës).

## MOUVEMENT (courbes d'accélération)
13. **Entrée rapide, arrivée douce (ease-out).** Un élément qui entre arrive vite puis freine jusqu'à sa place : `Easing.out(Easing.cubic)`.
14. **Départ doux, sortie rapide (ease-in).** Un élément qui sort démarre lentement puis accélère en quittant l'écran : `Easing.in(Easing.cubic)`.
15. **Léger ressort pour l'interface.** Un bouton, un compteur ou une carte de vote **dépasse un peu sa position finale puis revient se poser** : `spring()` avec un amortissement modéré (par exemple `damping: 12`).
16. **Varier la vitesse.** Jamais de déplacement à vitesse constante avec un départ et un arrêt brusques, car cela donne un effet robotique. Tout mouvement a une accélération et une décélération (`Easing.inOut`, `Easing.bezier` ou ressort), y compris les mouvements de caméra.

## FORMAT
- Composition de **1080 × 1920** (vertical TikTok), **60 images par seconde**.
- **Fines bandes noires en haut et en bas** (60 px chacune) : image utile de 1080 × 1800, rapport **6:10**.
- Durée : **30 secondes maximum** (idéal 25 à 30 s), décidé après l'épisode 2 pour garder les spectateurs jusqu'au bout. Découpage type :
  - **0–2 s** : accroche (voir ACCROCHE) ;
  - **2–24 s** : l'histoire, **2 scènes Seedance d'environ 11 s** ;
  - **24–30 s** : titre court, carte de vote et narrateur (6 s), sur l'image d'ouverture pour la boucle.
  - Une vidéo de moins d'une minute n'entre pas dans le programme de rémunération de TikTok (Creator Rewards). Ce n'est pas un problème au début (il faut de toute façon 10 000 abonnés) ; l'**intégrale hebdomadaire** (plusieurs épisodes bout à bout) dépasse, elle, la minute.
- **Pas de voix off pendant l'histoire** : seuls les personnages parlent, entre eux.
- **Narrateur pour l'appel à l'action uniquement** : à la fin, pendant la carte de vote, une voix de narrateur énergique (toujours la même pour la chaîne) lit les choix, demande d'écrire la réponse en commentaire, de **liker** et de **s'abonner**. La carte affiche aussi les boutons « LIKE » et « ABONNE-TOI ». Le narrateur est **court** (environ 5 s) : « A ou B ? Écris-le en commentaire et abonne-toi ! »
- **Voix des personnages** : de **vraies voix parlées générées avec Higgsfield**, une voix fixe par personnage (voir IA).
- **Images, animation et voix** : générées avec Higgsfield, principalement **Seedance 2.5** qui produit chaque scène avec ses voix et ses lèvres synchronisées (voir IA). Remotion fait le **montage** : enchaînement des scènes, étalonnage, musique, titre, vote et narrateur. **Aucune image ni vidéo d'archive**, aucune œuvre existante.

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
- **Tous les personnages principaux sont des adultes** (ou n'ont pas d'âge dit). **Jamais d'enfant ni d'adolescent**, ni dans le présent ni en souvenir : les règles de TikTok interdisent toute ressemblance avec un mineur en contenu IA, et les filtres de Seedance bloquent ces scènes. Un souvenir d'enfance se montre par des objets, des lieux ou des ombres, jamais par une version enfant d'un personnage.
- **Tête = un fruit ou un légume entier**, immédiatement reconnaissable par sa forme, sa couleur et sa texture. Sa queue, ses feuilles ou son pédoncule servent de « coiffure ».
- **Corps humain** aux proportions de dessin animé : épaules, bras, mains (souvent gantées), jambes. La peau visible (cou, bras) a **la couleur du fruit**.
- **Tenue liée au rôle** : veste de chef et tablier, blouse, uniforme, pyjama, toque, casquette…
- **Visage cartoon posé sur le fruit** : **grands yeux** avec blanc, iris coloré et **deux reflets**, **sourcils épais et très mobiles**, cils pour certains personnages, **grande bouche** qui montre les dents et la langue. Le nez est absent ou réduit à une petite forme.
- **Les sourcils et la bouche portent l'émotion.** Ils sont exagérés comme dans un dessin animé.
- **Caractère inspiré du fruit** : citron acide et râleur, pêche douce, piment colérique, banane maladroite, oignon qui fait pleurer, noix de coco dure à l'extérieur et tendre à l'intérieur…
- **Gags propres aux fruits** : jus qui gicle sous l'émotion, feuilles qui se dressent ou retombent, pépins qui sautent, peau qui rougit ou mûrit, fruit qui roule…
- Chaque personnage garde **exactement le même design** dans tous les plans (fixé dans sa fiche).
- **Cadrage typique** : plusieurs personnages côte à côte, de trois quarts, en plan taille, en train de travailler ou de discuter.

## TEXTE (le moins possible)
- **Pas de sous-titres, pas de mots-chocs, pas d'afficheur ni d'interface de jeu** : l'histoire passe par l'image et les voix.
- Seuls textes à l'écran : **une phrase d'accroche** très courte dans la première seconde (voir ACCROCHE), le **titre de fin** et la **carte de vote**.
- **Zone sûre TikTok** : l'interface de TikTok cache le bas de l'image (description) et le bord droit (boutons). Tout texte et tout élément important reste dans la zone **x 60–960 px, y 150–1450 px** (sur 1080 × 1920).
- **Polices** (fichiers locaux dans `public/fonts/`, chargés avec `@remotion/fonts`) : **Playfair Display** (titre, question du vote) et **Inter** (texte du vote). Style sobre et élégant, jamais « jouet ».

## ANIMATION
- **Fluide à 60 images par seconde**, sans effet diaporama.
- **Rien n'est jamais figé** : respiration, clignements, petits mouvements de tête, feuilles et vapeur qui bougent, lumières qui scintillent.
- **Bouche synchronisée** : pendant une réplique, la bouche suit le volume de la voix (on alterne les images bouche fermée, entrouverte et ouverte selon l'intensité du son, mesurée avec `@remotion/media-utils`). Le personnage qui écoute réagit (sourcils, regard).
- **Regards** : les personnages se regardent quand ils se parlent, et leurs yeux bougent par petites saccades.
- **Poses-clés fortes** et lisibles, avec **anticipation** avant un geste et **amorti** après.
- **Compression et étirement** très marqués : la tête-fruit s'écrase et rebondit sur les chocs, les surprises et les rires.
- **Procédés à doser selon l'histoire** : zoom éclair sur une réaction, lignes de vitesse pendant l'action, éclaboussures de jus, étoiles et cœurs pour les émotions, goutte de sueur.

## TON : UN VRAI FILM D'ANIMATION, PAS ENFANTIN
- On vise le rendu d'un **long métrage d'animation 3D** : jeu d'acteur, lumière, cadrages et son de cinéma. Personnages et décors originaux : on ne copie jamais un studio ou un film existant.
- **Aucun effet gadget** au montage : pas de flash, pas de lignes de vitesse, pas d'étincelles ajoutées, pas de « whoosh » ni de « boum » sur les coupes, pas de zoom « snap ». Le spectaculaire vient de la scène elle-même (décrit dans le prompt Seedance).
- **Coupes franches** entre les scènes ; les scènes qui se suivent au même endroit sont des **prolongements** (raccord continu).
- **Étalonnage léger** sur tout l'épisode : vignettage doux et grain de film discret (composant `Etalonnage`).
- **Son** : d'abord le son des scènes (voix, ambiance, bruits réels). **Musique** de film discrète et mature (cordes, piano, nappes), jamais de boîte à musique ni de clochettes. **La musique est à peine audible** : volume 0,035 pendant les scènes parlées, 0,06 au maximum hors dialogues, 0,04 sous le narrateur. On doit toujours entendre les voix sans effort, même sur un haut-parleur de téléphone.
- **Prompts Seedance** : langage de cinéma (« 3D animated feature film », objectif, lumière, **mouvements de caméra dynamiques**), description visuelle courte, personnages décrits par leur apparence, plus la phrase de dynamisme (voir DYNAMISME).

## CAMÉRA ET MONTAGE
- Vocabulaire de plans : **plan d'ensemble** pour situer le lieu, **plan de groupe** (2 ou 3 personnages), **plan taille**, **gros plan** sur un visage, **insert** sur un objet (un plat, une main, un indice).
- **Caméra en mouvement** par défaut (voir DYNAMISME) ; **coupes franches** pour passer au gros plan ; un plan fixe seulement pour la pause avant une révélation.
- **Profondeur de champ** : l'arrière-plan reste flou ; sur un gros plan, il est encore plus flou.
- Rythme : **plans de 1 à 3 secondes** (2 à 6 battements) ; un plan plus long seulement pour la pause avant une révélation.
- Transitions autorisées : coupe franche, **fondu au blanc**, **zoom-coupe** (zoom rapide qui enchaîne sur le plan suivant), **volet** (effacement latéral).

## TITRE DE FIN (les 6 dernières secondes, soit 12 battements)
Le titre et le vote s'affichent **par-dessus l'image d'ouverture retrouvée** (règle 11 et ACCROCHE).
1. Le **titre** (Playfair Display, lettres blanches) et son **fin trait ondulé** dans la couleur d'accent apparaissent en **fondu rapide** (un demi-battement), sans lettre par lettre : il n'y a plus le temps.
2. La **carte de vote** arrive presque en même temps (au battement 1) et reste lisible **au moins 4 s** (règle 12), pendant que le narrateur parle (environ 5 s).
3. Titre et carte **sortent en ease-in** sur le dernier battement. La dernière image est **identique à la première** du film.

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
**Méthode retenue (validée sur test) : Seedance 2.5 en mode « omni_reference »**, comme les mini-séries Higgsfield (« Short Drama »). Pour chaque scène de 6 à 12 s, Seedance génère **en une seule passe** l'animation, les **voix**, les **lèvres synchronisées** et le découpage en plans (plan large, gros plans), à partir des **images de référence** des personnages et du décor.
- **Budget : environ 170 crédits par épisode** (22 s de Seedance 2.5 en 720p ≈ 155 crédits, plus les images et le narrateur, voir PUBLICATION). Avant chaque lot : estimer le coût, puis tenir à jour le tableau « Crédits » dans `HISTOIRE.md`. Si le budget risque d'être dépassé, s'arrêter et demander.
- **Rien n'est généré sans feu vert** sur `HISTOIRE.md` et sur le découpage en scènes Seedance.
- **Économiser** : tester une scène avant tout l'épisode ; réutiliser les fiches de référence de la série ; ne jamais régénérer « pour voir ». Une scène ratée n'est refaite qu'après accord.
- **Images faites avec ChatGPT Images** : pour « Devant tout le monde », l'utilisatrice crée les fiches de personnages et les décors avec ChatGPT Images à partir des prompts écrits par Claude, puis les envoie dans la conversation. Claude les range dans `public/ia/<série>/`, les vérifie (style, adultes, cohérence) et les envoie à Higgsfield comme références pour Seedance.
- **Images de référence** : une fiche par personnage (déjà générées pour la série) + une image du décor de la scène. Elles sont passées dans `medias` et désignées dans le prompt (« image 2 », « image 3 »…).
- **Prompt d'une scène** : style (« dessin animé 3D de qualité cinéma, animation expressive et fluide »), lieu et lumière, puis chaque plan dans l'ordre avec qui parle, **la réplique en français entre guillemets** et le ton de la voix (âge, émotion, débit **dynamique**). Terminer par « pas de musique, pas de sous-titres, pas de texte ».
- **Voix** : générées par Seedance avec la scène. Pour qu'un personnage garde **la même voix dans toutes les scènes**, lui donner un **échantillon de sa voix** en référence audio (`audio_references`). Voix de secours si besoin : **ElevenLabs v4** (bien plus naturel que Seed Audio). Jamais d'imitation d'une personne réelle.
- **Remotion** fait le montage sobre : enchaînement des scènes, étalonnage léger, musique, titre de fin, narrateur et vote, boucle. Le son des scènes Seedance est **gardé** (voix + ambiance).
- **Rangement** : tout ce qui est généré est téléchargé dans `public/ia/<histoire>/` et versionné.
- **Publication TikTok** : activer l'étiquette **« Contenu généré par IA »**.

## SÉRIES (histoires en plusieurs épisodes)
Une série se range dans `src/series/<nom-de-la-serie>/`.
- **Bible de la série** : `BIBLE.md`. C'est la référence unique pour tout ce qui ne change pas d'un épisode à l'autre :
  - le nombre d'épisodes et l'arc complet jusqu'à la **vraie fin**, décidée dès le départ ;
  - les personnages (design, couleurs, voix, façon de parler), les lieux et les règles du monde ;
  - les **mystères et leurs réponses secrètes**, avec l'épisode où chaque réponse peut être révélée.
- **Plan des lieux** : chaque série a un document `PLAN-<lieu>.md` (plan du bâtiment ou des lieux, décors, lumières, règles de mouvement et de cadrage, blocage de chaque épisode et positions de fin d'épisode). Chaque prompt Seedance doit le respecter.
- **Avant d'écrire un épisode**, relire la bible, le **plan des lieux** et le **journal des votes**. Ne jamais contredire un épisode déjà publié.
- **Vote à la fin de chaque épisode.** Les deux choix proposés doivent tous deux mener vers la vraie fin. Le vote change le **chemin** : la scène d'ouverture de l'épisode suivant, qui accompagne le héros, quels indices on obtient, le ton. Il ne change pas la **destination**, fixée dans la bible.
- **Journal des votes** dans la bible : pour chaque épisode, les deux choix, le choix gagnant (rempli par l'utilisatrice ou l'utilisateur) et ses conséquences à respecter dans la suite.
- **Rappel du vote (épisodes 2 et suivants)** : jamais dans les 3 premières secondes. Un petit encart après l'accroche, du type « Vous avez choisi B », et le rappel dans la légende.
- **Habillage commun** à tous les épisodes : même titre de série, même générique de fin, mêmes personnages et décors. Seuls changent le numéro, le nom de l'épisode et l'appel à l'action.
- **Personnages, décors et voix récurrents créés une seule fois** (code dans `src/series/<nom>/commun/`, fichiers dans `public/ia/<nom>/`) et réutilisés tels quels par chaque épisode.

## PUBLICATION ET CHAÎNE TIKTOK (@lunenoire.studio)
Décisions validées, à appliquer à chaque épisode (source : plan de lancement marketing).
- **Rythme** : **une vidéo par jour**, à heure fixe : **19 h** (heure de Paris), **en alternant deux séries** : un jour **« Lina — Les 14 étages »** (feuilleton à suivre), le lendemain **« Devant tout le monde »** (histoires de 30 s pendant une fête, voir `src/series/devant-tout-le-monde/BIBLE.md`). Sans oublier plus des **bonus** (« Qui a raison ? », « Quel fruit es-tu ? », « Choisis ta porte », réponses en vidéo aux commentaires) faits **dans Remotion à partir des images et scènes existantes, sans crédit**.
- **Vote** : toujours **deux choix, A ou B**. Pour Lina, le vote se ferme **le jour de son épisode suivant à 13 h** (environ 42 h après la publication), et cet épisode **annonce le résultat** (par exemple « Vous avez choisi B »). Pour « Devant tout le monde », le vote décide de ce que font les deux personnages ; le résultat est donné au début de l'épisode suivant de cette série.
- **Production en deux temps** (pour tenir un épisode par jour) : seule la **scène d'ouverture** d'un épisode dépend du vote (≈ 10 s). Tout le reste de l'épisode est produit **à l'avance** ; la scène d'ouverture est produite **après la fermeture du vote**, dans les quelques heures avant la publication. Garder plusieurs jours d'épisodes « communs » d'avance.
- **Budget** : ≈ **160 crédits par épisode de Lina** (≈ 22 s de Seedance) et ≈ **130 crédits par épisode de « Devant tout le monde »** (≈ 18 s de Seedance, un seul décor), soit environ 140 crédits par jour en moyenne. L'utilisatrice recharge les crédits pour finir la saison ; prévenir avant chaque lot si le solde ne suffit pas.
- **À chaque publication** :
  - étiquette **« Contenu généré par IA »** activée ;
  - **sous-titres automatiques TikTok** activés (les vidéos n'ont pas de sous-titres incrustés) ;
  - **couverture** avec le titre de l'épisode et un mot-clé ;
  - **légende** avec mots-clés (« fruit IA », « histoire fruit », « tu choisis ») et 3 à 5 hashtags : `#fruitIA #histoirefruit #fruitdrama #lina14etages #tuchoisis` ;
  - **commentaire épinglé** « A ou B ? » ;
  - ajout à la **playlist** « Saison 1 — Lina, les 14 étages » ;
  - republication sur **YouTube Shorts** et **Instagram Reels**. Noms : TikTok et Instagram « **Lune Noire** » (@lunenoire.studio) ; YouTube « **Choix de Minuit** » (@LeChoixdeMinuit).
- **Envoi vers TikTok** : le compte est relié à Higgsfield, mais l'envoi (même en brouillon) demande un formulaire de validation qui ne s'affiche pas dans Claude Code. On publie donc **à la main depuis le téléphone** : la vidéo est envoyée dans la conversation, l'utilisatrice l'enregistre puis la publie.
- **Profil** : compte **personnel** (pas professionnel). Nom affiché avec le nom de la série, photo = le personnage principal en gros plan dans le style actuel, bio avec « fruit » et l'heure de sortie. Vidéos épinglées : épisode 1, « Comment ça marche », meilleure vidéo. Les anciennes vidéos d'un autre style passent en privé.
- **Ton** : du suspense et de l'humour, **jamais de sexualisation ni de stéréotypes** (origine, genre) : c'est ce qui attire les signalements. Jamais d'achat d'abonnés ou de likes.
- **Suivi chaque semaine** : visionnage complet (cible ≥ 50 %), commentaires pour 1 000 vues (≥ 20), partages pour 1 000 vues (≥ 5), abonnés gagnés par vidéo, vidéos supprimées (0).

## Organisation technique
- Un film seul = un dossier `src/films/<nom-du-film>/`. Un épisode de série = un dossier `src/series/<nom>/episode-NN/`. Chacun a sa propre `<Composition>` (1080 × 1920, 60 i/s) enregistrée dans `src/Root.tsx`. Les épisodes d'une même série sont rangés dans un `<Folder>` à son nom.
- Ce qui sert à tous les films va dans `src/components/` et doit être réutilisé : bandes noires, `Plan` (image ou clip Seedance avec son), `Etalonnage`, `TitreSobre` (titre de fin et vote).
- Ce qui est propre à une histoire va dans le dossier du film, ou dans `commun/` pour une série.
- Le rendu final se fait en MP4 dans `out/`.
- Dans l'environnement cloud, rendre avec : `npx remotion render <Id> out/<nom>.mp4 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell` (sur un ordinateur personnel, `npx remotion render <Id>` suffit).
- Avant de livrer : vérifier des images extraites de chaque plan et les niveaux sonores.
