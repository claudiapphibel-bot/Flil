# Règles de la chaîne TikTok d'animation

Claude est le réalisateur et l'animateur de cette chaîne. **Chaque film de ce projet doit suivre toutes les règles ci-dessous.** Les captures d'écran de référence servent seulement d'inspiration : ne jamais copier leurs personnages, nous créons les nôtres.

Avant de commencer un film, charger la compétence `remotion-best-practices` (dans `.agents/skills/`).

## Charte de couleurs (fixée une fois pour toutes, la même pour tous les films)

| Rôle | Couleur | Code |
|---|---|---|
| Personnage | Orange doux | `#F2A65A` |
| Contour lumineux de l'ombre, texte de l'ombre, couleur d'accent | Cyan électrique | `#3DE0FF` |
| Couleur contrastante du titre (trait ondulé, petite ligne) | Cyan électrique | `#3DE0FF` |
| Fond | Presque noir | `#0A0A0F` |
| Ligne du sol, contours des accessoires | Gris | `#5A5A66` |
| Texte du narrateur, titre | Blanc | `#FFFFFF` |

## FORMAT
- Composition de **1080 × 1920** (format vertical TikTok), **60 images par seconde**.
- **Fines bandes noires en haut et en bas** (60 px chacune) : la zone d'image utile fait 1080 × 1800, soit un rapport de **6:10**.
- Durée : **de 1 min à 1 min 30** (3 600 à 5 400 images).
- **Pas de voix off.**
- Tout est dessiné en code par Remotion (formes SVG/CSS) : **aucune vidéo générée par IA, aucune image ni vidéo d'archive.**

## ASPECT
- Arrière-plans **très sombres**, avec une **fine ligne grise au sol**.
- **Vue de profil**, comme dans un jeu vidéo en 2D.
- La lumière vient **uniquement des objets de la scène** : lampe, téléphone, lampadaire, lune, projecteur. Aucune lumière ambiante.
- **Grandes lueurs douces** autour des sources lumineuses (dégradés radiaux, flou).
- Accessoires : **formes plates simples** aux **contours gris, fins et légèrement ondulés** (tracé qui « tremble » doucement d'une image à l'autre).

## PERSONNAGE
- Couleur unie : orange doux `#F2A65A`.
- **Grosse tête ronde, pas de cou.**
- **Yeux en points**, **un trait par sourcil**, **un trait pour la bouche**.
- **Membres longs et fins, sans doigts.**
- **Les sourcils portent l'expression** : c'est l'élément le plus expressif du visage.

## L'OMBRE
- **Même silhouette que le personnage**, mais **entièrement noire** et **plus grande**.
- **Contour lumineux** cyan `#3DE0FF` et **deux yeux en amande** (cyan).
- C'est sa **voix intérieure**.
- **Elle grandit à mesure que le personnage s'affaiblit** (sa taille et l'intensité de sa lueur augmentent au fil du film).

## TEXTE
- Police : **Comic Neue** (via `@remotion/google-fonts/ComicNeue`).
- **Narrateur** : texte petit, blanc, **centré en haut**, **8 mots maximum**, apparition et disparition en **fondu**.
- **Répliques de l'ombre** : en couleur d'accent (cyan), placées **à côté de l'ombre**.

## SENSATIONS DE JEU
- Un petit **compteur de JOURS** en haut à gauche (« JOUR 1 », « JOUR 2 »…).
- Le **nombre de répétitions** s'affiche à l'écran (ex. « ×12 »).
- **Après le premier jour**, le personnage obtient un **objet visible** qu'il **garde jusqu'à la fin** du film.
- **Coups puissants** : **lignes de vitesse** et **flash** blanc bref.
- **Quand il court, la ville défile derrière lui** (décor en parallaxe).

## ANIMATION
- Mouvement **fluide à chaque image**, jamais d'effet diaporama : tout bouge un peu (respiration, clignements, lueurs qui ondulent).
- **Compression et étirement** (squash & stretch) sur les sauts, les chocs, les réactions.
- **Caméra fixe** ; **lents travellings avant** sur les moments forts ; **coupes franches** pour les gros plans.
- Rythme : **plans calmes de 4 à 8 secondes**, **plans de montage d'environ 1 seconde**.

## TITRE (les 12 dernières secondes, soit 720 images)
1. Le **titre du film apparaît lettre par lettre**, en **grandes lettres blanches**.
2. Il est **souligné d'un trait ondulé** de couleur contrastante (cyan).
3. Puis apparaît **une ligne blanche**, suivie d'**une courte ligne de couleur contrastante**.
4. Enfin, **fondu au noir**.

## SON (effets sonores)
- **Tous les sons sont synthétisés par code** dans `scripts/generate-sfx.mjs` (oscillateurs, bruit, filtres, enveloppes). **Aucun échantillon externe, aucune musique ni banque de sons téléchargée, aucun son généré par IA.** Les sons sont donc originaux et sans droits d'auteur tiers : aucun risque de blocage ou de mise en sourdine sur TikTok.
- Le générateur est **déterministe** : `npm run sfx` produit toujours les mêmes fichiers `.wav` dans `public/sfx/`.
- Pour un nouveau son : l'ajouter dans `scripts/generate-sfx.mjs`, relancer `npm run sfx`, puis le documenter dans la liste ci-dessous.
- Dans un film, chaque son est placé avec le composant `<Sfx at={image} name="..." volume={...} />` (un `<Audio>` de `@remotion/media` dans une `<Sequence>`).
- Toujours une **nappe d'ambiance** en fond (volume bas, environ 0,3), puis des effets **synchronisés à l'image près** sur les actions.
- **Pas de voix, pas de musique avec paroles.**
- Mixage : les coups ne doivent pas saturer (garder les crêtes sous 0 dB : baisser les volumes quand plusieurs sons tombent sur la même image).

Bibliothèque actuelle :

| Son | Quand l'utiliser |
|---|---|
| `ambiance-nuit` | Fond de toutes les scènes de nuit (vent sourd + léger ronronnement de ville) |
| `bourdon-lampe` | Scènes près d'un lampadaire, d'une lampe ou d'un néon |
| `tic-compteur` | Changement du compteur de JOURS |
| `pop-repetition` | Affichage d'un nouveau nombre de répétitions |
| `whoosh` | Élan d'un geste rapide, transitions vives |
| `impact` | Coups puissants (toujours avec `flash`, lignes de vitesse et flash blanc à l'image) |
| `flash` | Éclair blanc d'un coup puissant |
| `pas` | Pas de course (un toutes les 12 images environ en course) |
| `battement` | Le personnage faiblit, doute, est épuisé |
| `ombre-nappe` | Présence de l'ombre qui grandit (nappe grave) |
| `ombre-voix` | Apparition d'une réplique de l'ombre |
| `titre-lettre` | Chaque lettre du titre final |
| `trait-ligne` | Trait ondulé et lignes du générique final |
| `titre-carillon` | Fin du titre, avant le fondu au noir |

## Organisation technique
- Un film = un dossier `src/films/<nom-du-film>/` avec sa propre `<Composition>` enregistrée dans `src/Root.tsx`.
- Les éléments réutilisables (personnage, ombre, bandes noires, compteur de jours, texte du narrateur, séquence titre, ville en parallaxe, lueurs) vont dans `src/components/` et sont partagés par tous les films.
- Le rendu final se fait en MP4 dans `out/`.
- Police : les fichiers Comic Neue sont dans `public/fonts/` (chargés localement, pas besoin d'Internet au rendu).
- Le film test (`src/films/test/`, composition « Test ») sert de référence pour le style et le découpage.
- Dans l'environnement cloud, rendre avec : `npx remotion render <Id> out/<nom>.mp4 --browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell` (sur un ordinateur personnel, `npx remotion render <Id>` suffit).
