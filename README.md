# LTC AI — Publicité Meta Ads 15s

Projet Remotion pour une publicité Facebook/Meta Ads de 15 secondes destinée à **LTC AI**
([ltcai.be](https://ltcai.be)), société belge d'accompagnement IA pour PME francophones
en Wallonie et à Bruxelles.

Objectif : générer des leads qualifiés via un **audit IA gratuit**.

## Specs

| Paramètre       | Valeur                                         |
| --------------- | ---------------------------------------------- |
| Format principal | 4:5 vertical — 1080 × 1350 (Facebook Feed)    |
| Variante prévue | 9:16 — 1080 × 1920 (Stories / Reels)           |
| Durée           | 15 s (450 frames)                              |
| Framerate       | 30 fps                                         |
| Export          | MP4 / H.264 / yuv420p (compatible Meta Ads)    |

## Installation

```bash
npm install
```

## Lancer le studio (prévisualisation interactive)

```bash
npx remotion studio
# ou
npm run studio
```

Ouvre ensuite `http://localhost:3000` et sélectionne la composition `LTCAi-Feed-4x5`.
Tu peux éditer **tous les textes en direct** via le panneau `Props` à droite (voir
[A/B testing](#a-b-testing) ci-dessous).

## Exporter la vidéo

```bash
# Export Facebook Feed 4:5 -> out/ltcai-audit-15s.mp4
npm run render

# Export Reels/Stories 9:16 -> out/ltcai-audit-15s-reels.mp4
npm run render:reels
```

Les fichiers sortent dans `out/`. H.264 + yuv420p pour une compatibilité
maximale avec le Meta Ads Manager.

## Storyboard (15 s)

| Temps   | Scène       | Message clé                                         |
| ------- | ----------- | --------------------------------------------------- |
| 0-3 s   | `Hook`      | "Vos emails, devis, relances… vous épuisent ?"     |
| 3-7 s   | `Problem`   | "Vous passez vos soirées à rattraper le retard."   |
| 7-11 s  | `Solution`  | "Et si l'IA s'en occupait à votre place ?"         |
| 11-15 s | `CTA`       | "Réservez votre audit gratuit — ltcai.be"          |

## Structure du projet

```
src/
├─ index.ts                # point d'entrée Remotion
├─ Root.tsx                # enregistre les compositions (4:5 + 9:16)
├─ AdVideo.tsx             # composition 15s, assemble les scènes
├─ config/
│  └─ brand.ts             # couleurs, typos, durées, dimensions, copy
├─ components/
│  ├─ AnimatedText.tsx     # texte animé réutilisable (fade / fadeUp / letters / words)
│  └─ LogoLTC.tsx          # logo textuel animé
└─ scenes/
   ├─ Hook.tsx             # 0-3 s  — problème nommé
   ├─ Problem.tsx          # 3-7 s  — amplification + pictos
   ├─ Solution.tsx         # 7-11 s — logo + réponse apaisée
   └─ CTA.tsx              # 11-15 s — bouton + URL
```

## A/B testing

Tous les textes sont pilotés par les `defaultProps` de la composition
(voir `src/config/brand.ts` → `DEFAULT_COPY`).

**Option A — dans Remotion Studio** : modifie les props à chaud dans le panneau de droite.

**Option B — en CLI** : passe un JSON de props au render.

```bash
# Variante avec un autre hook
npx remotion render LTCAi-Feed-4x5 out/variante-b.mp4 \
  --props='{"copy":{"hook":"Vous perdez 2h par jour sur vos mails ?","problem":"Vos clients attendent. Vous aussi.","solutionMain":"L IA peut s en charger.","solutionSub":"Simple, accessible, fait pour les PME.","ctaButton":"Réservez votre audit gratuit","ctaSecondary":"30 minutes. Sans engagement."},"url":"ltcai.be"}'
```

## Identité visuelle

- **Palette** : bleu nuit `#0E1B3A`, blanc cassé `#F6F1E7`, accent chaleureux `#E8A87C`.
- **Typo** : Inter (chargée automatiquement via `@remotion/google-fonts`).
- **Easing** : `spring` doux (damping 200, stiffness 80-90) — aucun rebond agressif.
- **Tagline** : *L'IA, simplement.*

Toutes ces constantes vivent dans `src/config/brand.ts` — un seul endroit à modifier.

## Ajouter d'autres formats

La composition `LTCAi-Reels-9x16` est déjà câblée dans `src/Root.tsx` avec la
dimension 1080 × 1920. Les scènes utilisent des pourcentages / centrages absolus,
elles se recadrent automatiquement. Pour un nouveau format (carré 1:1, 16:9…),
ajoute une dimension dans `DIMENSIONS` (`src/config/brand.ts`) puis une
`<Composition>` supplémentaire dans `Root.tsx`.
