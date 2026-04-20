/**
 * Sous-titres centralisés — vidéo silent-friendly.
 * Timings alignés sur le storyboard 45s (à vitesse 1x) @ 30fps.
 * Tous les timings sont multipliés par 1/brand.speedFactor pour gérer
 * un ralentissement global (ex. 0.75 → vidéo étendue à 60s).
 */

import {brand} from './brand';

export type Language = 'fr' | 'nl';

export type Subtitle = {
  scene: string;
  text: string;
  startFrame: number;
  endFrame: number;
};

type SubtitleMap = Record<Language, Subtitle[]>;

// Helper : convertit des secondes "storyboard" (à vitesse 1x) en frames réels,
// en appliquant le facteur de vitesse global (brand.speedFactor).
const FPS = 30;
const sec = (s: number) => Math.round((s / brand.speedFactor) * FPS);

export const subtitles: SubtitleMap = {
  fr: [
    // [0-4s] HOOK — le titre est affiché en grand à l'écran par HookScene ;
    // le sous-titre porte la ligne d'appui narrative (pas de doublon).
    {
      scene: 'hook',
      text: "L'IA peut s'en occuper. Voici comment.",
      startFrame: sec(1.8),
      endFrame: sec(4),
    },

    // [4-10s] PROCESS INTRO
    {
      scene: 'process',
      text: 'Un processus simple en 4 étapes.',
      startFrame: sec(4.4),
      endFrame: sec(10),
    },

    // [10-16s] AUDIT
    {
      scene: 'audit',
      text: "D'abord, on comprend vos processus actuels.",
      startFrame: sec(10.4),
      endFrame: sec(16),
    },

    // [16-22s] RECOMMENDATIONS + IMPLEMENTATION
    {
      scene: 'reco',
      text: 'Ensuite, on vous livre un plan concret et on déploie les bons outils.',
      startFrame: sec(16.4),
      endFrame: sec(22),
    },

    // [22-33s] USE CASES FLASH
    {
      scene: 'usecases',
      text: 'Emails, devis, relances, CRM, support, reporting… tout s’automatise.',
      startFrame: sec(22.4),
      endFrame: sec(33),
    },

    // [33-39s] FOLLOW-UP — le tagline "L'IA, simplement." est à l'écran
    // via FollowUpScene. Sous-titre distinct (pas de doublon avec l'écran).
    {
      scene: 'followup',
      text: 'Pour faire évoluer vos outils dans le temps.',
      startFrame: sec(33.4),
      endFrame: sec(37),
    },

    // [39-45s] CTA
    {
      scene: 'cta',
      text: '30 minutes. Sans engagement.',
      startFrame: sec(39.4),
      endFrame: sec(45),
    },
  ],

  // Préparation future pour une version NL — même structure.
  nl: [
    {
      scene: 'hook',
      text: 'AI kan het overnemen. Zo werkt het.',
      startFrame: sec(1.8),
      endFrame: sec(4),
    },
    {
      scene: 'process',
      text: 'Een eenvoudig proces in 4 stappen.',
      startFrame: sec(4.4),
      endFrame: sec(10),
    },
    {
      scene: 'audit',
      text: 'Eerst begrijpen we uw huidige processen.',
      startFrame: sec(10.4),
      endFrame: sec(16),
    },
    {
      scene: 'reco',
      text: 'Daarna leveren we een concreet plan en implementeren we de juiste tools.',
      startFrame: sec(16.4),
      endFrame: sec(22),
    },
    {
      scene: 'usecases',
      text: 'E-mails, offertes, opvolging, CRM, support, rapportering… alles wordt geautomatiseerd.',
      startFrame: sec(22.4),
      endFrame: sec(33),
    },
    // Tagline affiché à l'écran par FollowUpScene — pas dupliqué ici.
    {
      scene: 'followup',
      text: 'Om uw tools in de tijd te laten evolueren.',
      startFrame: sec(33.4),
      endFrame: sec(37),
    },
    {
      scene: 'cta',
      text: '30 minuten. Vrijblijvend.',
      startFrame: sec(39.4),
      endFrame: sec(45),
    },
  ],
};

/** Récupère le sous-titre actif pour une frame donnée. */
export const getActiveSubtitle = (
  frame: number,
  language: Language = 'fr',
): Subtitle | null => {
  return (
    subtitles[language].find(
      (s) => frame >= s.startFrame && frame <= s.endFrame,
    ) ?? null
  );
};
