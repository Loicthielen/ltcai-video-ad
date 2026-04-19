# LTC AI — Explainer Video 45s (Meta Ads)

Projet Remotion standalone : une publicité Facebook Ads (format 4:5, 1080×1350) expliquant comment **LTC AI** (ltcai.be) aide les PME francophones à intégrer l'IA dans leurs opérations.

> Tagline : **« L'IA, simplement. »**

## Specs techniques

- **Framework** : Remotion 4.x
- **Format** : 1080 × 1350 (4:5 vertical, Facebook Feed desktop + mobile)
- **Durée** : 45 s @ 30 fps (1350 frames)
- **Export** : MP4, H.264, 30 fps, CRF 20 (bitrate adapté Meta 4–8 Mbps)
- **Silent-friendly** : vidéo 100 % compréhensible sans le son. Aucune voix-off. Toute la narration passe par des sous-titres incrustés et du texte à l'écran.

## Installation

```bash
npm install
```

## Lancer le studio (preview)

```bash
npm run studio
# équivalent à : npx remotion studio
```

Deux compositions sont disponibles :

- `Explainer45s` — version FR (défaut)
- `Explainer45s-NL` — version NL (prête pour traduction future)

## Exporter la vidéo

```bash
npm run render:explainer
```

Le fichier est écrit dans `out/ltcai-explainer-45s.mp4`.

Pour la version NL :

```bash
npx remotion render Explainer45s-NL out/ltcai-explainer-45s-nl.mp4 --codec=h264 --crf=20
```

## Modifier les sous-titres

Les sous-titres sont centralisés dans [`src/config/subtitles.ts`](src/config/subtitles.ts).

Chaque entrée suit le format :

```ts
{ scene: 'hook', text: 'Vos tâches répétitives vous épuisent ?', startFrame: 12, endFrame: 120 }
```

Pour ajuster un timing : modifiez `startFrame` / `endFrame` (valeurs en frames, 30 fps). Le helper `sec(n)` convertit des secondes en frames.

Pour ajouter une langue : dupliquez la section `fr` dans l'objet `subtitles`, traduisez, puis créez une nouvelle composition dans `src/Root.tsx` avec `language: 'xx'`.

## Ajouter / retirer un cas d'usage

Les 6 cas d'usage du flash (22–33 s) sont dans [`src/config/useCases.ts`](src/config/useCases.ts). C'est un simple array :

```ts
{
  id: 'emails',
  label: 'Réponses emails automatiques',
  icon: 'mail',       // voir src/components/Icon.tsx
  mockup: 'inbox',    // voir src/components/UseCaseCard.tsx
}
```

Ajoutez ou retirez des entrées, puis adaptez `FRAMES_PER_CASE` dans `src/scenes/UseCasesFlashScene.tsx` si nécessaire (par défaut la durée de la section reste 11 s, le nombre de cas divise cette durée).

Les icônes disponibles sont définies dans `src/components/Icon.tsx` (`mail`, `doc`, `bell`, `database`, `chat`, `chart`, `loupe`, `bulb`, `gear`, `growth`). Les mockups sont dans `src/components/UseCaseCard.tsx`.

## Musique de fond

La vidéo est volontairement silent-friendly. Si vous souhaitez ajouter une musique de fond très discrète :

1. Déposez un fichier `bg-music.mp3` dans `public/`.
2. Dans `src/config/brand.ts`, mettez `enableBackgroundMusic: true`.
3. Ajustez `backgroundMusicVolume` (défaut `0.15`, donc très bas).

**Rappel** : la vidéo doit rester 100 % compréhensible MUTE. La musique reste un complément.

## Identité visuelle

La charte LTC AI est strictement définie dans [`src/config/brand.ts`](src/config/brand.ts) :

| Rôle | Couleur | Hex |
|---|---|---|
| Primaire — Bleu nuit LTC | `navy` | `#0A1F3D` |
| Fond principal — Blanc cassé | `cream` | `#F5F1EA` |
| Accent chaleureux — CTA | `accent` | `#E8A94E` |
| Texte secondaire — Gris neutre | `neutral` | `#6B7380` |

Aucune couleur hors de cette palette ne doit être introduite. Si la charte évolue, modifiez uniquement `src/config/brand.ts` — tous les composants s'adapteront.

## Structure du projet

```
src/
├── Root.tsx                      # Inscription des compositions
├── index.ts                      # Entry point Remotion
├── compositions/
│   └── Explainer45s.tsx          # Assemblage de toutes les scènes
├── scenes/
│   ├── HookScene.tsx             # 0-4s
│   ├── ProcessIntroScene.tsx     # 4-10s
│   ├── AuditScene.tsx            # 10-16s
│   ├── RecommendationsScene.tsx  # 16-22s
│   ├── UseCasesFlashScene.tsx    # 22-33s
│   ├── FollowUpScene.tsx         # 33-39s
│   └── CTAScene.tsx              # 39-45s
├── components/
│   ├── AnimatedText.tsx          # Fade + slide-up doux
│   ├── Subtitle.tsx              # Sous-titres permanents
│   ├── MockupFrame.tsx           # Cadre fenêtre applicative
│   ├── StepCard.tsx              # Carte d'étape du processus
│   ├── UseCaseCard.tsx           # Cas d'usage + mini-mockup animé
│   ├── BrandLogo.tsx             # Logo LTC AI (wordmark)
│   └── Icon.tsx                  # Icônes SVG inline
└── config/
    ├── brand.ts                  # Palette + typo + tagline
    ├── useCases.ts               # Array des 6 cas d'usage
    └── subtitles.ts              # Sous-titres FR + NL
public/
└── bg-music.mp3 (optionnel)
```
