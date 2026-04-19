/**
 * 6 cas d'usage affichés en flash séquence (22-33s).
 * Chaque carte : ~1.8s. Array facilement modifiable.
 */

export type UseCase = {
  id: string;
  label: string;
  icon: 'mail' | 'doc' | 'bell' | 'database' | 'chat' | 'chart';
  /** Clé de mockup à animer dans UseCaseCard */
  mockup: 'inbox' | 'pdf' | 'notification' | 'records' | 'chatBubbles' | 'dashboard';
};

export const useCases: UseCase[] = [
  {
    id: 'emails',
    label: 'Réponses emails automatiques',
    icon: 'mail',
    mockup: 'inbox',
  },
  {
    id: 'devis',
    label: 'Génération de devis',
    icon: 'doc',
    mockup: 'pdf',
  },
  {
    id: 'relances',
    label: 'Relances clients',
    icon: 'bell',
    mockup: 'notification',
  },
  {
    id: 'crm',
    label: 'CRM mis à jour automatiquement',
    icon: 'database',
    mockup: 'records',
  },
  {
    id: 'support',
    label: 'Service client IA 24/7',
    icon: 'chat',
    mockup: 'chatBubbles',
  },
  {
    id: 'reporting',
    label: 'Reporting automatisé',
    icon: 'chart',
    mockup: 'dashboard',
  },
];
