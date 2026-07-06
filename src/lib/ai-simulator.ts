import { JobOffer } from "./mock-jobs";
import { DEMO_CV_PROFILE } from "./cv-demo";

export interface CVAdaptation {
  label: string;
  detail: string;
}

export interface InterviewQuestion {
  id: number;
  text: string;
}

export interface InterviewFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  summary: string;
}

const CANDIDATE_NAME = `${DEMO_CV_PROFILE.firstName} ${DEMO_CV_PROFILE.lastName}`;

export function generateCoverLetter(job: JobOffer): string {
  const topSkills = job.skills.slice(0, 4).join(", ");
  return `Madame, Monsieur,

Par la présente, je souhaite vous faire part de mon intérêt pour le poste de ${job.title} au sein de ${job.company} à ${job.city}.

${job.description.split("\n")[0]} Votre annonce a retenu mon attention car elle correspond à mon profil et à mes aspirations professionnelles.

Fort(e) de mon parcours en ${DEMO_CV_PROFILE.experiences[0]?.title.toLowerCase() || "développement"}, je maîtrise notamment ${topSkills}. Mon expérience chez ${DEMO_CV_PROFILE.experiences[0]?.company} m'a permis de développer une approche rigoureuse et orientée résultats, directement applicable aux missions que vous décrivez.

Ce qui m'attire particulièrement chez ${job.company}, c'est ${job.contract === "Alternance" ? "l'opportunité de combiner formation et expérience terrain" : "votre réputation dans le secteur et votre engagement envers l'excellence"}. Je suis convaincu(e) que mes compétences en ${job.skills[0]} et ma capacité d'adaptation pourraient apporter une valeur immédiate à vos équipes.

Je serais ravi(e) d'échanger avec vous lors d'un entretien pour vous présenter plus en détail mon parcours et discuter de la manière dont je pourrais contribuer à vos projets.

Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${CANDIDATE_NAME}`;
}

export function generateCVAdaptations(job: JobOffer): CVAdaptation[] {
  const base: CVAdaptation[] = [
    { label: "Accroche réalignée", detail: `Profil repositionné pour « ${job.title} » chez ${job.company}` },
    { label: "Mots-clés ATS optimisés", detail: job.skills.slice(0, 3).join(" · ") + " injectés dans le résumé" },
    { label: "Expériences re-priorisées", detail: "Mise en avant des missions les plus pertinentes pour le poste" },
  ];

  if (job.title.toLowerCase().includes("pâtissier")) {
    base.push({ label: "Compétences métier ajoutées", detail: "Viennoiserie, HACCP, création de recettes" });
  } else if (job.title.toLowerCase().includes("marketing")) {
    base.push({ label: "Portfolio digital mis en avant", detail: "Campagnes social media et analytics" });
  } else {
    base.push({ label: "Stack technique alignée", detail: job.skills.slice(0, 4).join(", ") });
  }

  return base;
}

export function getAdaptedSummary(job: JobOffer): string {
  const skills = job.skills.slice(0, 3).join(", ");
  if (job.title.toLowerCase().includes("pâtissier")) {
    return `Artisan(e) passionné(e) par la pâtisserie fine, avec une solide expérience en production artisanale et respect des normes HACCP. Spécialisé(e) en ${skills}.`;
  }
  if (job.title.toLowerCase().includes("marketing")) {
    return `Profil marketing digital motivé, à l'aise avec ${skills}. Expérience en gestion de campagnes et analyse de performance.`;
  }
  return `${DEMO_CV_PROFILE.summary} Compétences ciblées pour ${job.company} : ${skills}.`;
}

export function getInterviewQuestions(job: JobOffer): InterviewQuestion[] {
  const questions: Record<string, InterviewQuestion[]> = {
    patissier: [
      { id: 1, text: "Pourquoi souhaitez-vous rejoindre la Boulangerie Gourmande plutôt qu'une autre enseigne parisienne ?" },
      { id: 2, text: "Décrivez une création pâtissière dont vous êtes particulièrement fier(e) et les défis techniques rencontrés." },
      { id: 3, text: "Comment gérez-vous la pression d'une production matinale avec des délais serrés tout en maintenant la qualité ?" },
    ],
    dev: [
      { id: 1, text: `Pourquoi souhaitez-vous rejoindre ${job.company} en tant que ${job.title} ?` },
      { id: 2, text: "Décrivez un projet Full Stack récent : architecture, technologies et résultats obtenus." },
      { id: 3, text: "Comment abordez-vous le travail en équipe Agile avec des profils non-techniques (PO, UX) ?" },
    ],
    marketing: [
      { id: 1, text: `Qu'est-ce qui vous attire chez ${job.company} pour ce poste en alternance ?` },
      { id: 2, text: "Présentez une campagne marketing digital que vous avez menée ou imaginée, avec les KPIs associés." },
      { id: 3, text: "Comment restez-vous à jour sur les tendances du e-commerce et des réseaux sociaux ?" },
    ],
  };

  const key = job.title.toLowerCase().includes("pâtissier") ? "patissier"
    : job.title.toLowerCase().includes("marketing") ? "marketing"
    : "dev";

  return questions[key];
}

export function evaluateAnswer(job: JobOffer, question: string, answer: string): InterviewFeedback {
  const len = answer.trim().length;
  const hasKeywords = job.skills.some(s => answer.toLowerCase().includes(s.toLowerCase().split(" ")[0]));
  const hasExample = /exemple|projet|expérience|j'ai|nous avons/i.test(answer);
  const hasCompany = answer.toLowerCase().includes(job.company.toLowerCase().split(" ")[0]);

  let score = 40;
  if (len > 80) score += 15;
  if (len > 150) score += 10;
  if (hasKeywords) score += 15;
  if (hasExample) score += 12;
  if (hasCompany) score += 8;
  score = Math.min(98, score);

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (hasExample) strengths.push("Bonne utilisation d'exemples concrets pour illustrer votre propos");
  else improvements.push("Ajoutez un exemple précis tiré de votre expérience (projet, stage, formation)");

  if (hasKeywords) strengths.push(`Vous mentionnez des compétences pertinentes pour le poste (${job.skills.slice(0, 2).join(", ")})`);
  else improvements.push(`Intégrez des mots-clés du poste : ${job.skills.slice(0, 3).join(", ")}`);

  if (hasCompany) strengths.push(`Référence à ${job.company} — montre une recherche préalable sur l'entreprise`);
  else improvements.push(`Personnalisez votre réponse en évoquant ${job.company} et ses valeurs`);

  if (len < 60) improvements.push("Développez davantage votre réponse (visez 3-4 phrases minimum)");
  else strengths.push("Réponse structurée avec un volume de contenu adapté");

  const summary = score >= 75
    ? "Très bonne réponse ! Vous démontrez une bonne préparation pour cet entretien."
    : score >= 55
    ? "Réponse correcte avec des axes d'amélioration identifiés. Continuez à vous entraîner."
    : "Réponse à développer. Utilisez la méthode STAR (Situation, Tâche, Action, Résultat).";

  return { score, strengths, improvements, summary };
}
