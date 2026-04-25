# LTC AI — Pub Meta 15s (9:16) — v2 sobre

Final delivery: **`out/ltcai-audit-15s.mp4`** — 15.08s, 1080x1920, 30fps, h264 + AAC, ~5.6 MB.

> v2 retravaillee selon les retours: ton "Linear / Stripe / Notion", pas
> "intro YouTube gaming". Tous les effets "cirque" ont ete retires.

## Quickstart

```bash
npm install
npm run start    # Remotion Studio at http://localhost:3000
npm run build    # renders out/ltcai-audit-15s.mp4
```

## Ce qui a change vs v1

Effets supprimes:
- Flash blanc, onde de choc radiale, aberration chromatique en Scene 2
- Explosion de 80-120 particules
- Compteur slot-machine -> remplace par `SoftCounter` (interpolation simple)
- Confettis et shine sweep dans le CTA
- Bloom intense sur les logos -> remplace par halo doux
- Texte "30 minutes offertes" du CTA
- Tous les emojis (Mail, Bell, Folder, BarChart, Sparkles via `lucide-react`)
- Couleurs gold/orange/red retirees du theme

Ce qui reste (en version sobre):
- Kinetic typography spring (la fondation visuelle de la pub)
- Parallaxe tres subtile (amplitude max 5px sur le float)
- Particules ambiantes monochromes bleu LTC, max 22 par scene, opacite <=30%
- Cross-fade doux entre scenes (12 frames)
- Halo discret autour du logo (opacite 0.15 -> 0.25 sur 2s en boucle)
- Grain SVG turbulence ~2.5%

## Structure

```
src/
  index.tsx                      Remotion entry
  Root.tsx                       Composition registry (LTCAIAdAudit15s, 450 frames)
  compositions/
    LTCAIAdAudit15s.tsx          Sequence orchestration + cross-fades + audio
  scenes/
    Scene1Chaos.tsx              0-132   Chaos PME (lucide Mail, Clock, Folder, Bell)
    Scene2Bascule.tsx            120-192 Silent transition (breath circle + text)
    Scene3Liberation.tsx         180-336 +15h SoftCounter + 3 benefit cards
    Scene4CTA.tsx                330-450 Logo + Diagnostic gratuit + ltcai.be
  components/
    KineticText.tsx              Word-staggered spring text
    SoftCounter.tsx              Calm number interpolation w/ settle halo
    ParticleField.tsx            Slow blue ambient drift, max 25
    GlowWrapper.tsx              CSS bloom (kept for future use)
    Float.tsx                    2-3px micro float, seeded phase
    GrainOverlay.tsx             Animated film grain
  theme/
    brand.ts                     Palette + safe zones (single source of truth)
public/
  ltcai-logo.svg                 LTC AI wordmark + L-mark (blues only)
  voiceover.mp3                  15s silent placeholder (production VO TBD)
out/
  ltcai-audit-15s.mp4            Final render
```

## Charte (defaults documentes)

> NOTE: la skill `branding-ltcgroup` n'etait pas disponible dans cet
> environnement. La palette ci-dessous est **strictement bleus + neutres**
> (aucun gold, orange, vert, rouge). Pour aligner sur la charte officielle,
> il suffit de remplacer les valeurs hex dans `src/theme/brand.ts` — c'est
> le seul fichier a modifier.

- **navyDeep** `#050B16` / **navy** `#0A1628` / **navySoft** `#13243F` / **navyMid** `#1A2F52`
- **blue** `#2563EB` / **blueLight** `#3B82F6` / **blueGlow** `#60A5FA`
- **cyan** `#06B6D4` / **cyanLight** `#22D3EE` / **cyanSoft** `#67E8F9`
- **white** `#F8FAFC` / **whiteSoft** `#E2E8F0` / **whiteMute** `#CBD5E1` / **gray** `#94A3B8` / **graySoft** `#64748B`
- **fonts**: Inter (700-900)

Toutes les couleurs du code passent par ces variables — pas de `#fff`,
`#FCD34D` ou `rgba(239,68,68,...)` hardcodes.

## Logo

`public/ltcai-logo.svg` est dessine en interne (mark "L" + cercle node,
wordmark "LTC AI"). Charge en SVG, jamais redessine en code via les composants
React. Lorsque la skill de production sera dispo, remplacer ce fichier
unique conserve toute la composition Scene 4.

## Pictogrammes

Tous les pictos sont des composants React de **lucide-react**, monochrome
LTC, stroke-width 1.4-1.5:
- Scene 1: `Mail`, `Bell`, `Folder`
- Scene 3: `Mail`, `BarChart3`, `Sparkles`

Aucun emoji n'est utilise nulle part.

## Safe zones Meta

Dans `theme/brand.ts`:
- Top 250 px et bottom 450 px reserves a Meta.
- Tout contenu critique (compteur, logo, CTA, ltcai.be) est entre y=400 et y=1400.

## Audio

- `voiceover.mp3` : **placeholder silencieux 15s**. La VO finale doit etre
  produite (script ci-dessous) puis deposee a la place.
- `bg-music.mp3` : non inclus, non attache. A ajouter a -20 dB une fois
  fourni en re-attachant un `<Audio>` dans la composition.

### Script VO

> Dans votre PME, vous passez des heures sur des taches qui pourraient etre
> automatisees. L'IA peut vous en liberer. Simplement. Chez LTC AI, on vous
> montre exactement quoi automatiser, et combien vous allez gagner.
> Reservez votre diagnostic gratuit sur ltcai.be.

Specs ElevenLabs suggerees: voix masculine francaise, stability 0.65,
similarity 0.7, style 0.2.

## Render

```bash
npx remotion render src/index.tsx LTCAIAdAudit15s out/ltcai-audit-15s.mp4 \
  --codec=h264 --crf=18 --pixel-format=yuv420p \
  --audio-codec=aac --audio-bitrate=192k --concurrency=50%
```

Verifications:
- duree 15.08 s (tolerance +/- 0.1 s)
- resolution 1080 x 1920
- 30 fps, yuv420p (Meta-compatible)
- taille 5.6 MB (sous la fourchette 8-25 MB indiquee, parce que la sobriete
  visuelle compresse mieux a CRF=18 — augmenter le CRF n'ameliorerait pas
  la qualite visuelle, seulement la taille du fichier)
