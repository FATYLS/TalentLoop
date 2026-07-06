export interface JobOffer {
  id: string;
  title: string;
  company: string;
  city: string;
  contract: string;
  description: string;
  skills: string[];
  salary?: string;
  postedAt: string;
  source?: string;
}

export const MOCK_JOB_OFFERS: JobOffer[] = [
  {
    id: "job-patissier-001",
    title: "Pâtissier / Pâtissière",
    company: "Boulangerie Gourmande",
    city: "Paris",
    contract: "CDI",
    salary: "2 100 – 2 400 € brut/mois",
    postedAt: "2026-07-01",
    source: "TalentLoop",
    description: `La Boulangerie Gourmande, institution parisienne du 11ème arrondissement, recherche un(e) pâtissier(ère) passionné(e) pour rejoindre une équipe de 8 artisans.

Vous serez en charge de la production quotidienne de viennoiseries, entremets et pièces montées. Vous participerez à la création de nouvelles recettes saisonnières et assurerez le respect des normes HACCP.

Environnement exigeant mais bienveillant, avec une clientèle fidèle et des produits 100 % faits maison.`,
    skills: ["Pâtisserie artisanale", "Viennoiserie", "HACCP", "Créativité", "Travail en équipe", "Gestion des stocks"],
  },
  {
    id: "job-dev-002",
    title: "Développeur Full Stack",
    company: "Capgemini",
    city: "Lyon",
    contract: "CDI",
    salary: "38 000 – 48 000 € brut/an",
    postedAt: "2026-07-03",
    source: "TalentLoop",
    description: `Capgemini Lyon recrute un Développeur Full Stack pour accompagner des clients du secteur bancaire et assurance dans leur transformation digitale.

Vous interviendrez sur des projets Agile/Scrum en React, Node.js et cloud AWS. Vous collaborerez avec des équipes pluridisciplinaires (PO, UX, DevOps) sur des applications à fort trafic.

Poste en télétravail partiel (2 jours/semaine), mutuelle premium et plan de formation annuel.`,
    skills: ["React", "Node.js", "TypeScript", "AWS", "Agile/Scrum", "API REST", "PostgreSQL", "CI/CD"],
  },
  {
    id: "job-marketing-003",
    title: "Assistant Marketing Digital",
    company: "Decathlon",
    city: "Lille",
    contract: "Alternance",
    salary: "Gratification légale + avantages",
    postedAt: "2026-07-05",
    source: "TalentLoop",
    description: `Decathlon Lille recherche un(e) Assistant(e) Marketing Digital en alternance pour renforcer l'équipe e-commerce régionale.

Missions : gestion des campagnes social media, analyse des performances (Google Analytics, Meta Ads), création de contenus visuels et coordination avec les équipes produit.

Vous évoluerez au sein d'une marque internationale, avec de réelles responsabilités et un mentor dédié.`,
    skills: ["Marketing digital", "Réseaux sociaux", "Google Analytics", "Meta Ads", "Canva", "Rédaction web", "SEO"],
  },
  {
    id: "job-data-004",
    title: "Data Analyst Junior",
    company: "Alan",
    city: "Paris",
    contract: "CDI",
    salary: "42 000 – 50 000 € brut/an",
    postedAt: "2026-06-28",
    source: "TalentLoop",
    description: `Alan recherche un Data Analyst Junior pour analyser les données santé et améliorer l'expérience utilisateur de nos assurés.

Vous construirez des dashboards, mènerez des analyses A/B tests et collaborerez avec les équipes produit et engineering.`,
    skills: ["SQL", "Python", "Tableau", "A/B Testing", "Excel", "Communication"],
  },
];

export function getJobById(id: string): JobOffer | undefined {
  return MOCK_JOB_OFFERS.find(j => j.id === id);
}

export function parseJobFromUrl(url: string): JobOffer {
  let hostname = "Entreprise";
  let title = "Poste à pourvoir";
  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    hostname = parsed.hostname.replace("www.", "").split(".")[0];
    hostname = hostname.charAt(0).toUpperCase() + hostname.slice(1);
    const path = parsed.pathname.split("/").filter(Boolean).pop() || "";
    if (path) title = path.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  } catch {
    hostname = "Entreprise importée";
  }

  return {
    id: `job-url-${Date.now()}`,
    title,
    company: hostname,
    city: "France",
    contract: "À définir",
    postedAt: new Date().toISOString().split("T")[0],
    source: "Import URL",
    description: `Offre importée depuis ${url}.

TalentLoop a analysé cette annonce et identifié les compétences clés du poste. Notre IA générera une candidature personnalisée adaptée à cette opportunité.

Rejoignez une entreprise dynamique et contribuez à des projets stimulants dans un environnement collaboratif.`,
    skills: ["Adaptabilité", "Esprit d'équipe", "Rigueur", "Communication", "Autonomie"],
  };
}
