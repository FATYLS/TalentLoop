import { CVData } from "./types";

export const DEMO_CV_PROFILE = {
  firstName: "Fatima",
  lastName: "Zahra",
  email: "fatimazahrais037@gmail.com",
  phone: "06 12 34 56 78",
  city: "Paris, France",
  summary: "Développeur Web passionné et motivé, avec une solide expérience en React, Node.js et PHP. Recherche un poste en CDI pour contribuer à des projets innovants.",
  experiences: [
    { id: "1", title: "Développeur Web Full-Stack", company: "Digital Campus Paris", start: "2024", end: "2025", description: "Développement d'applications web avec React, Node.js et Symfony." },
    { id: "2", title: "Stagiaire Développeuse", company: "Startup Tech", start: "2023", end: "2024", description: "Création de composants React et intégration API REST." },
  ],
  education: [
    { id: "1", degree: "1er année Master en Tech Lead", school: "DIGITAL CAMPUS PARIS", start: "2024", end: "2025" },
    { id: "2", degree: "Licence Développement Web", school: "Université Paris", start: "2021", end: "2024" },
  ],
  skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Vue.js", "Tailwind CSS", "PHP", "Symfony", "Node.js", "Express.js", "PostgreSQL", "MySQL", "Docker", "Git"],
  languages: [
    { id: "1", name: "Arabe", level: "Natif" },
    { id: "2", name: "Français", level: "Courant" },
    { id: "3", name: "Anglais", level: "Intermédiaire" },
  ],
  interests: ["Jeux Vidéo", "WebDesign", "Cuisiner"],
};

export function buildDemoCV(jobTitle: string, contract: string, fileName: string, fileSize: string): CVData {
  return {
    score: 93,
    name: `${DEMO_CV_PROFILE.firstName} ${DEMO_CV_PROFILE.lastName}`,
    city: DEMO_CV_PROFILE.city,
    summary: DEMO_CV_PROFILE.summary,
    jobTitle,
    contract,
    fileName,
    fileSize,
    profileType: "Junior",
    photoScore: 7,
    sectors: [
      "Programmation informatique", "Conseil en systèmes", "Agences de publicité",
      "Édition de logiciels", "Hébergement web", "Services informatiques",
      "Formation professionnelle", "Commerce électronique", "+4 autres",
    ],
    suggestions: [
      "Score : 93/100. Votre CV est prometteur pour un poste de développeur web, mais il manque d'impact sur plusieurs points critiques. 5 corrections prioritaires identifiées pour atteindre 75+ et maximiser votre taux de réponse (temps estimé : 20-30 min).",
    ],
    strengths: [
      { title: "Maîtrise technique solide", text: "Votre CV met en avant des technologies recherchées (React, Node.js, PHP, SQL, Docker). Détaillez des projets concrets avec résultats mesurables." },
      { title: "Projets variés", text: "Présence de projets de fin d'études et associatifs. Détaillez les résultats obtenus et les technologies utilisées pour chaque projet." },
    ],
    improvements: [
      { severity: "CRITICAL", section: "Section Expériences", title: "Orthographe", text: "Plusieurs fautes d'orthographe détectées (ex: 'développement' mal orthographié). Ces erreurs sont éliminatoires pour les recruteurs. Action immédiate : relire avec un correcteur professionnel." },
      { severity: "MEDIUM", section: "interests", title: "Centres d'intérêt", text: "Vos centres d'intérêt sont trop génériques. Rendez-les plus spécifiques et liez-les à des compétences transférables.", before: "Jeux Vidéo, WebDesign, Cuisiner", after: "Conception UI/UX et prototypage (Figma) — Veille sur les tendances du design web", points: 4 },
    ],
    corrections: [
      { severity: "CRITICAL", section: "writingQuality", title: "Orthographe et grammaire", text: "Corrigez impérativement toutes les fautes d'orthographe et de grammaire. Elles nuisent gravement à votre crédibilité.", before: "Développeur passioné par le web", after: "Développeur passionné par le web", points: 10 },
      { severity: "HIGH", section: "experiences", title: "Impact des expériences", text: "Ajoutez des résultats chiffrés à chaque expérience pour démontrer votre impact concret.", points: 10 },
    ],
    profile: { ...DEMO_CV_PROFILE },
    analyzed: true,
    verified: false,
  };
}

export const DEMO_LETTER = `Madame, Monsieur,

Actuellement en recherche d'un poste de Développeur Web en CDI, je me permets de vous adresser ma candidature spontanée.

Fort(e) d'une formation en développement web et d'une expérience en React, Node.js et PHP, je suis convaincu(e) que mes compétences techniques et ma motivation correspondent aux besoins de votre entreprise.

Votre société, reconnue dans son secteur, représente pour moi une opportunité idéale pour contribuer à des projets innovants tout en continuant à progresser.

Je reste à votre disposition pour un entretien afin de vous exposer plus en détail ma motivation.

Cordialement,
Fatima Zahra`;
