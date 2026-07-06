export type OnboardingType = "stage" | "alternance" | "cdi" | "reconversion" | "freelance";

export const profileToType: Record<string, OnboardingType> = {
  "Je cherche un stage": "stage",
  "Je cherche une alternance": "alternance",
  "Sans emploi et j'ai vraiment besoin d'un travail": "cdi",
  "Sans emploi mais pas stressé(e) à ce sujet": "cdi",
  "Mal employé(e) et j'ai besoin de changer de travail": "cdi",
  "Employé(e) mais ouvert(e) à de meilleures opportunités": "cdi",
  "En reconversion professionnelle": "reconversion",
  "Freelance et je cherche des missions": "freelance",
};

export const onboardingIntro: Record<OnboardingType, { icon: string; title: string; desc: string }> = {
  stage: {
    icon: "🎓",
    title: "Votre premier pas dans le monde professionnel",
    desc: "Un stage, c'est l'occasion parfaite pour découvrir un métier et acquérir de l'expérience. On vous aide à trouver le stage idéal !",
  },
  alternance: {
    icon: "🔄",
    title: "Alternance : apprenez en travaillant",
    desc: "Combinez formation et expérience pro. TalentLoop cible les entreprises qui recrutent en alternance dans votre domaine.",
  },
  cdi: {
    icon: "💼",
    title: "Trouvez votre prochain CDI",
    desc: "Multipliez vos candidatures ciblées sans y passer vos soirées. TalentLoop automatise la recherche pour vous.",
  },
  reconversion: {
    icon: "🚀",
    title: "Réussissez votre reconversion",
    desc: "Changez de voie avec des candidatures personnalisées vers les entreprises qui recrutent votre nouveau profil.",
  },
  freelance: {
    icon: "⚡",
    title: "Trouvez vos prochaines missions",
    desc: "Prospectez des entreprises en masse avec des messages personnalisés. Concentrez-vous sur vos projets.",
  },
};

export const jobQuestion: Record<OnboardingType, string> = {
  stage: "Quel poste recherchez-vous pour votre stage ?",
  alternance: "Quel poste recherchez-vous en alternance ?",
  cdi: "Quel poste recherchez-vous ?",
  reconversion: "Quel est votre objectif professionnel ?",
  freelance: "Quel type de mission recherchez-vous ?",
};

export const jobPlaceholder: Record<OnboardingType, string> = {
  stage: "Ex: Développeur Web Full-Stack, Assistant Marketing Digital, Stagiaire Communication...",
  alternance: "Ex: Alternant Data Analyst, Alternant RH, Alternant Comptable...",
  cdi: "Ex: Développeur Python, Chef de projet, Data analyst...",
  reconversion: "Ex: Développeur Web, Product Manager, Consultant...",
  freelance: "Ex: Développeur React freelance, Consultant SEO, Designer UI...",
};

export const durationOptions = ["1 mois", "2 mois", "3 mois", "4 mois", "6 mois", "Flexible"];

export const sectors = [
  { icon: "🌐", label: "Aucune préférence (ouvert à tout)" },
  { icon: "💻", label: "Technologies de l'information" },
  { icon: "🎓", label: "Éducation et formation" },
  { icon: "⚡", label: "Énergie et utilities" },
  { icon: "🏥", label: "Santé et sciences de la vie" },
  { icon: "👥", label: "Ressources humaines" },
  { icon: "💰", label: "Services financiers" },
  { icon: "🏨", label: "Hôtellerie et tourisme" },
  { icon: "🏠", label: "Immobilier" },
  { icon: "🔧", label: "Ingénierie et construction" },
  { icon: "📢", label: "Publicité et marketing" },
  { icon: "⚖️", label: "Droit et services juridiques" },
];

export const salaryOptions = [
  { label: "Stage rémunéré obligatoire", sub: "Je dois être rémunéré(e)" },
  { label: "Rémunération préférée", sub: "C'est mieux mais pas obligatoire" },
  { label: "Flexible", sub: "Je m'adapte" },
];

export const startOptions = ["Immédiatement", "Sous 1 mois", "Sous 2 mois", "Flexible"];

export const sizeOptions = ["Startup", "PME", "Grande entreprise", "Flexible"];
