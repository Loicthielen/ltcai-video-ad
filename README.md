# LTC AI — Pub Meta 15s (9:16)

Final delivery: **`out/ltcai-audit-15s.mp4`** — 15.08s, 1080x1920, 30fps, h264 + AAC, 12.7 MB.

## Quickstart

```bash
npm install
npm run start    # Remotion Studio at http://localhost:3000
npm run build    # renders out/ltcai-audit-15s.mp4
```

## Structure

```
src/
  index.tsx                      Remotion entry
  Root.tsx                       Composition registry (LTCAIAdAudit15s, 450 frames)
  compositions/
    LTCAIAdAudit15s.tsx          Sequence orchestration + cross-fades + audio
  scenes/
    Scene1Chaos.tsx              0-132   Chaos PME
    Scene2Bascule.tsx            120-192 Flash + shockwave + logo
    Scene3Liberation.tsx         180-336 +15h slot counter + benefits
    Scene4CTA.tsx                330-450 Logo + CTA + button shine
  components/
    KineticText.tsx              Word-staggered spring text with emphasis pulse
    SlotCounter.tsx              Slot-machine digit roller
    ParticleField.tsx            Canvas 2D particles (drift / explode / rain)
    ShockWave.tsx                Concentric expanding rings
    GlowWrapper.tsx              CSS bloom + sinusoidal pulsing
    MorphingIcon.tsx             SVG path lerping
    Float.tsx                    Continuous micro-float (seeded phase)
    GrainOverlay.tsx             Animated film grain
  theme/
    brand.ts                     Palette, fonts, safe zones
public/
  ltcai-logo.svg                 Wordmark + L-mark
  voiceover.mp3                  15s silent placeholder (production VO TBD)
out/
  ltcai-audit-15s.mp4            Final render
```

## Effets signatures implementes (12/12)

1. Kinetic typography — `KineticText`, mot-par-mot avec spring overshoot, scale + translateY (toutes les scenes).
2. Camera moves — dolly-in 1.0->1.15 sur Scene 1, dolly-out 1.18->1.0 sur Scene 3, breathe + outro zoom sur Scene 4.
3. Parallax multi-couches — fond + grille + icones de pain + texte foreground (Scene 1).
4. Particules procedurales — 120 particules d'explosion (Scene 2), 70 ambient drift (Scene 3), 50 confetti rain (Scene 4) via Canvas 2D seede.
5. Morphing SVG — `MorphingIcon` + interpolation des paths SVG du compteur slot.
6. Glow / bloom — `GlowWrapper` filter drop-shadow x2 avec pulsation sinusoidale.
7. Masques animes — RevealWipe via `clip-path inset()` sur "30 minutes offertes" (Scene 4).
8. Data-viz animee — `SlotCounter` chiffre roulant avec settle spring + courbe SVG `stroke-dasharray` qui se trace (Scene 3).
9. 3D tilt / perspective — illusion par scale + transformOrigin (dolly), rotation des dossiers, perspective des rayons.
10. Transitions signature — cross-fades 12 frames sur tous les overlaps de scenes + flash blanc + chromatic aberration au pivot.
11. Micro-animations continues — `Float` applique au compteur, aux icones, au logo CTA.
12. Grain / noise overlay — `GrainOverlay` SVG turbulence anime, ~16% mix-blend overlay.

A chaque frame: au minimum 3 elements en mouvement simultane (background gradient/rays + texte cinetique + particules ou micro-float).

## Charte LTC (defaults)

> NOTE: la skill `branding-ltcgroup` n'etait pas disponible dans cet environnement. Les couleurs et la typo ci-dessous sont des defaults professionnels coherents avec un positionnement IA / IT-consulting. A remplacer en pluggant la skill de production.

- Navy: `#0A1628` / Deep navy: `#050B16`
- Blue: `#2563EB` / Light: `#3B82F6`
- Cyan accent: `#06B6D4` / `#22D3EE`
- Gold: `#F59E0B` / `#FCD34D`
- Inter, weights 700-900

Tous les centralises dans `src/theme/brand.ts` — un seul fichier a echanger pour aligner sur la charte definitive.

## Safe zones Meta

Constantes dans `theme/brand.ts`:
- Top 250 px et bottom 450 px reserves a Meta (username, CTA caption).
- Tout le contenu critique (compteur, logos, CTA, ltcai.be) est entre y=400 et y=1400.

## Audio

- `voiceover.mp3` : **placeholder silencieux 15s** genere via le ffmpeg embarque de Remotion. La VO finale doit etre produite (script complet ci-dessous) puis deposee a la place du fichier silencieux.
- `bg-music.mp3` : **non inclus** — la composition n'attache aucune musique de fond. A ajouter a -20 dB une fois la piste fournie.

### Script VO a produire

> Dans votre PME, vous passez des heures sur des taches qui pourraient etre automatisees. L'IA peut vous en liberer. Simplement. Chez LTC AI, on vous montre exactement quoi automatiser, et combien vous allez gagner. Reservez votre diagnostic gratuit sur ltcai.be.

Specs ElevenLabs suggerees: voix masculine francaise, stability 0.65, similarity 0.7, style 0.2.

## Simplifications volontaires

- **Three.js / @remotion/three** : installes dans le package mais non utilises au final. Les effets 3D (perspective, dolly, depth) sont rendus via des transforms CSS scale/rotate stables — meme richesse visuelle, render plus rapide et plus reliable. Le scaffold reste pret si on veut pousser un shader plus tard.
- **GLSL shaders** : remplaces par gradients radiaux animes + chromatic aberration via overlays RGB shifts (Scene 2). Resultat impactant et zero risque de freeze rendu.
- **branding-ltcgroup skill** : non disponible — voir la note "Charte" ci-dessus.

## Render

Commande exacte:

```bash
npx remotion render src/index.tsx LTCAIAdAudit15s out/ltcai-audit-15s.mp4 \
  --codec=h264 --crf=18 --pixel-format=yuv420p \
  --audio-codec=aac --audio-bitrate=192k --concurrency=50%
```

Verifications passees:
- duree 15.08s (tolerance 0.1s)
- resolution 1080x1920
- 30 fps
- taille 12.7 MB (entre 8 et 25 MB)
- pixel format yuv420p (Meta-compatible)
