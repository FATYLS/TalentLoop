import { t } from "./brand";

export const content = {
  hero: {
    trust: "Excellent",
    title: "10h perdues chaque semaine à postuler dans le vide ?",
    subtitle: t("Jobea contacte +500 entreprises en quelques heures."),
    desc: t("Fini le copier-coller. Fini les lettres generiques. Jobea analyse votre CV, cible les entreprises qui recrutent votre profil, redige des lettres personnalisees et les envoie depuis votre email."),
    cta1: "Trouver mes 5 premiers prospects",
    cta2: "Voir comment ca marche",
    badges: ["Style 100% humain", "Validation avant envoi", "Essai gratuit sans CB", "Base entreprises officielle (INSEE)"],
    companiesNote: "Utilisé par des candidats issus d'entreprises françaises reconnues",
    companiesSub: "Tech, retail, industrie, énergie et services",
    companies: "Orange·SNCF·BNP Paribas·Decathlon·Carrefour·L'Oréal·Capgemini·Dassault Systèmes·Sanofi·TotalEnergies·EDF·Engie·Vinci·Airbus·Thales·Veolia·La Poste·AXA·Michelin·Renault",
  },

  profiles: {
    title: "Décrivez votre situation professionnelle",
    subtitle: t("Sélectionnez votre profil pour découvrir comment Jobea peut accélérer votre recherche."),
    note: "Conçu pour les profils diplômés et qualifiés qui visent des postes à la hauteur de leurs compétences.",
    items: [
      "Je cherche un stage", "Je cherche une alternance",
      "Sans emploi et j'ai vraiment besoin d'un travail", "Sans emploi mais pas stressé(e) à ce sujet",
      "Mal employé(e) et j'ai besoin de changer de travail", "Employé(e) mais ouvert(e) à de meilleures opportunités",
      "En reconversion professionnelle", "Freelance et je cherche des missions",
    ],
  },

  steps: {
    title: "De votre CV a l'entretien, en 4 etapes.",
    subtitle: "Chaque etape est automatisee. Vous gardez le controle, l'IA fait le travail repetitif. Resultat : des entretiens, pas des accuses de reception.",
    labels: ["Analyse & Stratégie", "Ciblage IA", "Rédaction Unique", "Envoi Automatique"],
    workflow: "Voir le workflow en action (~8 min)",
    items: [
      { n: "1", title: "Analyse & Stratégie", desc: t("Jobea ne se contente pas de lire votre CV. L'IA comprend votre métier et propose des secteurs cibles pour construire une recherche efficace (poste/entreprise/secteur).") },
      { n: "2", title: "Ciblage Intelligent", desc: "Dites-nous \"Quoi\" et \"Où\" (ex: \"devops\" à Lyon + 20km). L'IA élargit la recherche avec des secteurs proches, puis filtre par taille et localisation. Vous obtenez une liste pertinente, avec les bons contacts RH." },
      { n: "3", title: "Rédaction Sur-Mesure", desc: "Pas de copier-coller. Pour chaque entreprise ciblée, l'IA visite leur site web, comprend leurs valeurs et rédige une lettre unique qui explique pourquoi VOUS êtes la bonne personne." },
      { n: "4", title: "Envoi Automatique", desc: t("Validez la liste, et Jobea envoie les emails un par un depuis votre propre boîte email (Gmail, Outlook, Yahoo...). Espacés dans le temps pour éviter les spams. Vous recevez les réponses directement.") },
    ],
  },

  timeSave: {
    title: "Moins de temps à postuler.",
    title2: "Plus de temps pour vous préparer.",
    badge: "Gagnez 10h/semaine",
    desc: "Pendant que vos candidatures partent, préparez vos entretiens.",
  },

  cv: {
    label: "Prepare",
    title: "Votre CV, noté et corrigé",
    desc: "Score sur 100. Suggestions concrètes. Red flags détectés. Vous savez exactement quoi améliorer avant de candidater.",
    cta: "Optimiser mon CV",
    social: "Rejoint par +14 200 chercheurs d'emploi",
    hint: "Rendez-le plus concis",
    demo: {
      name: "Marie Dupont", city: "Paris, France", score: 87,
      summary: "Entrepreneur visionnaire et innovateur technologique. Développeuse Full Stack avec 5 ans d'expérience en React, Node.js et Python. Architecture cloud et méthodologies agiles.",
      experiences: [
        { title: "Développeuse Full Stack Senior", company: "TechCorp", period: "1997-2011", bullets: ["Conception d'une plateforme SaaS B2B (React, Node.js)", "Migration cloud AWS réduisant les coûts de 40%"] },
        { title: "Founder & CEO", company: "StartupTech", period: "1985-1997", bullets: [] },
        { title: "Développeuse Junior", company: "TechCorp", period: "1976-1985", bullets: ["Sites web et applications sur mesure", "Optimisation des performances"] },
      ],
      skills: ["Innovation", "Design", "Leadership", "Stratégie"],
      styles: ["Harvard", "Modern", "Classic"],
    },
  },

  target: {
    title: "Ciblez les entreprises qui vous correspondent vraiment",
    desc: "Poste/secteur + ville/code postal + rayon, puis filtres par taille.",
    cta: "Lancer ma recherche",
  },

  sending: {
    title: "Envoi Automatique & Suivi",
    badge: "1 clic = 100 envois",
    items: [
      { company: "TotalEnergies", role: "Contrôleur de gestion", sector: "Finance", time: "À l'instant", tags: ["Gestion", "Reporting"], status: "Envoi en cours..." },
      { company: "BNP Paribas", role: "Assistant comptable", sector: "Comptabilité", time: "Il y a 3h", tags: ["Compta", "Excel"], status: "Envoyé" },
      { company: "Decathlon", role: "Chargé de ressources humaines", sector: "RH", time: "Il y a 4h", tags: ["RH", "Recrutement"], status: "En attente" },
    ],
  },

  letter: {
    title: "Lettres Hyper-Personnalisées",
    badge: "0% ChatGPT générique",
    text: `Madame, Monsieur,

Par la présente, je souhaite vous faire part de mon intérêt pour le poste de Développeur Full Stack au sein de Capgemini. Votre annonce publiée sur votre site carrière a retenu mon attention car elle correspond parfaitement à mon profil technique et à mes aspirations professionnelles dans le domaine du conseil en technologies.

Fort de 5 années d'expérience dans le développement web et mobile, j'ai développé des compétences solides en React, Node.js, Python et architecture cloud. Mon parcours m'a permis de concevoir et déployer plusieurs applications web pour des clients du secteur bancaire et assurance, ce qui m'a donné une vision approfondie des enjeux de transformation digitale dans votre secteur.

Ce qui m'attire particulièrement dans Capgemini, c'est votre position de leader européen du conseil en technologies et votre engagement en faveur de l'innovation durable. Votre approche centrée sur l'humain et vos valeurs d'excellence correspondent à celles que je défends dans mon travail quotidien. Je suis convaincu que mon expérience en développement agile et ma capacité à travailler en équipe internationale pourraient contribuer positivement à vos projets de transformation digitale.

Je serais ravi de pouvoir échanger avec vous lors d'un entretien pour vous présenter plus en détail mon parcours et discuter de la manière dont je pourrais apporter de la valeur à vos équipes. Je reste à votre disposition pour toute information complémentaire.

Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

Thomas Martin`,
  },

  cvAnalysis: {
    label: "Analyse CV par IA",
    sublabel: "Base de tout",
  },

  pricing: {
    label: "Tarification",
    title: "Des plans simples, sans engagement",
    subtitle: "Abonnements mensuels et recharges de crédits, adaptés à votre rythme de recherche.",
    priceNote: "À partir d'environ 24 €/mois.",
    cta: "Voir tous les tarifs en détail",
    footer: "Paiement sécurisé Stripe • Sans engagement • Crédits sans date d'expiration",
    refund: "Remboursement sous 7 jours — sous conditions",
    plans: [
      {
        name: t("Jobea Pro"),
        slug: "pro",
        desc: "Plan de démarrage pour tester TalentLoop",
        subtitle: t("Idéal pour tester Jobea sur vos premières campagnes."),
        candidatures: "~100 candidatures/mois",
        weekly: "6€/semaine",
        price: "24",
        period: "/mois",
        credits: "9 500 crédits/mois",
        tag: null,
        features: [
          "9 500 crédits TalentLoop rechargés chaque mois",
          "Accès à toutes les fonctionnalités de la plateforme",
          "Accès à tous les résultats de recherche entreprises (plus de limite à 5)",
          "~100 candidatures complètes estimées par mois",
          "Suivi des candidatures et analytics",
          "Support par email",
          "Sans engagement, annulez à tout moment",
        ],
      },
      {
        name: t("Jobea Premium"),
        slug: "premium",
        desc: "Recherche active, résultats maximums",
        subtitle: "Pour une recherche active, plusieurs dizaines de candidatures par mois.",
        candidatures: "~250 candidatures/mois",
        weekly: "8,75€/semaine",
        price: "35",
        period: "/mois",
        credits: "23 500 crédits/mois",
        tag: "Recommandé",
        features: [
          "23 500 crédits TalentLoop rechargés chaque mois",
          "Accès à toutes les fonctionnalités de la plateforme",
          "Accès à tous les résultats de recherche entreprises (plus de limite à 5)",
          "~250 candidatures complètes estimées par mois",
          "Traitement prioritaire des enrichissements",
          "Support prioritaire et analytics avancés",
          "Export PDF illimité de vos lettres",
          "Sans engagement, annulez à tout moment",
        ],
      },
      {
        name: t("Jobea Intensif"),
        slug: "intensif",
        desc: "Campagne massive, support VIP",
        subtitle: "Pour des campagnes massives et un accompagnement rapproché.",
        candidatures: "~500 candidatures/mois",
        weekly: "13,75€/semaine",
        price: "55",
        period: "/mois",
        credits: "47 000 crédits/mois",
        tag: null,
        features: [
          "47 000 crédits TalentLoop rechargés chaque mois",
          "Accès à toutes les fonctionnalités de la plateforme",
          "Accès à tous les résultats de recherche entreprises (plus de limite à 5)",
          "~500 candidatures complètes estimées par mois",
          "Support VIP avec réponse sous 12h",
          "Account manager dédié pour optimiser vos campagnes",
          "Traitement prioritaire des enrichissements",
          "Export PDF illimité de vos lettres",
          "Sans engagement, annulez à tout moment",
        ],
      },
    ],
    creditPacks: [
      { name: "Starter", price: "15", candidatures: "≈ 50 candidatures complètes", credits: "4 700 crédits", desc: "Parfait pour compléter votre quota et continuer sans interruption." },
      { name: "Boost", price: "27", candidatures: "≈ 100 candidatures complètes", credits: "9 400 crédits", desc: "Doublez votre capacité de candidatures." },
      { name: "Intense", price: "72", candidatures: "≈ 250 candidatures complètes", credits: "23 500 crédits", desc: "Le pack ultime pour des campagnes massives.", tag: "Meilleure valeur" },
    ],
  },

  features: {
    title: "Tout ce dont vous avez besoin pour automatiser vos candidatures",
    items: [
      { title: "Analyse de CV intelligente", desc: "Uploadez votre CV et obtenez un score sur 100 avec des suggestions concrètes. L'analyse détecte les points faibles, les red flags, et vous guide pour optimiser votre candidature.", href: "/profile" },
      { title: "Lettres de motivation personnalisées", desc: "Chaque lettre est générée automatiquement en fonction de votre profil, du secteur de l'entreprise et du poste recherché. Modifiable avant envoi.", href: "/campaigns" },
      { title: "Envoi automatique par email", desc: t("Connectez votre email (Gmail, Outlook, Yahoo ou autre) une fois. Jobea envoie vos candidatures avec votre CV en pièce jointe. Le système respecte les limites de chaque fournisseur pour éviter le spam."), href: "/campaigns" },
      { title: "Ma Sélection", desc: "Gérez votre sélection d'entreprises. Enrichissez-les automatiquement avec les emails RH et sites web. Exportez pour créer vos campagnes.", href: "/prospects/panier" },
      { title: "Campagnes de candidatures", desc: "Créez une campagne, ajoutez vos prospects, et générez toutes les lettres en une fois. Lancez l'envoi groupé ou individuel selon vos besoins.", href: "/campaigns" },
      { title: "Dashboard de suivi", desc: "Vue d'ensemble de votre activité : prospects, crédits, candidatures envoyées. Suivez vos taux d'ouverture et de réponse. Gérez votre progression avec l'onboarding.", href: "/dashboard" },
    ],
  },

  cta: {
    title: "Passez de la recherche a l'entretien.",
    desc: "5 candidatures personnalisees offertes. Uploadez votre CV, ciblez les entreprises, et recevez vos premieres lettres en 15 minutes.",
    button: "Trouver mes 5 premiers prospects",
    note: "Aucune carte requise • Configuration en 2 minutes",
  },

  testimonials: {
    title: t("Ils ont trouvé leur job avec Jobea"),
    items: [
      { text: "L'analyse de CV est bluffante. J'ai corrigé des erreurs que je faisais depuis des années. Mon score est passé de 62 à 87.", author: "Thomas D.", city: "Lyon", trustpilot: true },
      { text: "En tant qu'étudiant, le temps est précieux et cette application permet de gagner un temps fou pour trouver des entreprises et candidater. Rapide et efficace.", author: "Étudiant (Client)", city: "France", trustpilot: true },
      { text: t("J'envoyais 20 candidatures/semaine sur LinkedIn sans réponse. Avec Jobea, j'ai trouvé des boîtes que LinkedIn ne montrait jamais. 3 entretiens en 10 jours."), author: "Lucas G.", city: "Strasbourg", trustpilot: false },
      { text: t("3 mois sur LinkedIn à candidater dans le vide. Jobea m'a montré les vraies entreprises qui recrutent. 80 candidatures en 1 semaine, 5 entretiens."), author: "Amélie T.", city: "Montpellier", trustpilot: false },
      { text: "Expérience parfaite, après avoir cherché une application pour faciliter ma recherche de stage, c'est la seule application qui soit efficace. Elle est très complète et m'a permis de perfectionner mon CV. J'ai ENFIN trouvé un stage. Je conseille", author: "Julian Past", city: "France", trustpilot: true },
      { text: t("Jobea est vraiment un outil exceptionnel pour explorer les entreprises. Il propose une multitude de fonctionnalités pour aider à décrocher un stage ou un emploi. Toutes les entreprises légalement enregistrées y sont référencées. Je recommande."), author: "Maxime M.", city: "France", trustpilot: true },
      { text: "J'ai envoyé 30 candidatures en une après-midi. Le gain de temps est fou. J'ai juste dû ajuster quelques tournures de phrases, mais pour le reste c'est top.", author: "Marie L.", city: "Paris", trustpilot: false },
      { text: "J'ai testé l'application pour rechercher un stage en développement informatique. J'ai pu trouver premièrement tout les entreprises dans mon secteur et j'ai pu rédiger des lettres de motivations 100x plus rapidement ! Je recommande =)", author: "Constant", city: "France", trustpilot: true },
      { text: "Très bon site. Les informations sur les corrections à apporter au CV ont été précises et factuelles. Le fait que l'on puisse trouver des jobs de manière plus intuitive est un vrai plus.", author: "luluddof", city: "France", trustpilot: true },
      { text: "Les contacts RH exacts trouvés automatiquement, c'est un game changer. Plus besoin de chercher les emails manuellement.", author: "Nicolas F.", city: "Nice", trustpilot: false },
    ],
  },

  profileCards: {
    title: "Des profils comme le vôtre",
    subtitle: t("Jobea s'adapte à tous les profils. Stage, alternance, CDI, CDD, dans tous les domaines."),
    footer: "On s'adapte à tous les profils : stage, alternance, CDI, CDD, dans tous les domaines.",
    contract: "Stage, alternance, CDI, CDD - Tous les contrats",
    items: [
      { name: "Thomas Martin", role: "Développeur Full Stack", job: "Développeur Full Stack", skills: ["React", "Node.js", "Python", "AWS", "Docker", "TypeScript"], updated: "Mis à jour il y a 2 jours" },
      { name: "Sophie Dubois", role: "Chef de Projet Marketing", job: "Chef de Projet Marketing", skills: ["SEO", "Analytics", "Content", "Réseaux sociaux", "Google Ads", "Emailing"], updated: "Mis à jour il y a 5 heures" },
      { name: "Antoine Lefebvre", role: "Stagiaire Commercial", job: "Stage Commercial", skills: ["Vente", "Relation client", "Négociation", "CRM", "Prospection", "Fidélisation"], updated: "Mis à jour il y a 1 semaine" },
      { name: "Marie Bernard", role: "Étudiante Infirmière", job: "Alternance Infirmier", skills: ["Soins", "Urgences", "Pédiatrie", "Chirurgie", "ASE", "BLS"], updated: "Mis à jour il y a 3 jours" },
      { name: "Julie Petit", role: "Professeur des Écoles", job: "Professeur des Écoles", skills: ["Pédagogie", "Français", "Maths", "Sciences", "EPS", "Arts"], updated: "Mis à jour il y a 4 jours" },
      { name: "Lucas Moreau", role: "Comptable", job: "Comptable", skills: ["Comptabilité", "Fiscalité", "Sage", "Excel", "Déclarations", "Audit"], updated: "Mis à jour il y a 12 heures" },
      { name: "Clara Bouchard", role: "Étudiante Hôtellerie", job: "Stage Hôtellerie", skills: ["Accueil", "Réservation", "Service", "Langues", "Gestion", "Événementiel"], updated: "Mis à jour il y a 6 jours" },
      { name: "Nicolas Rousseau", role: "Étudiant Ingénieur", job: "Alternance Ingénieur", skills: ["Production", "Qualité", "Lean", "Automatisation", "PLM", "Maintenance"], updated: "Mis à jour il y a 1 jour" },
      { name: "Emma Vincent", role: "Éducatrice Spécialisée", job: "Éducateur Spécialisé", skills: ["Accompagnement", "Animation", "Écoute", "Projet", "Médiation", "Équipe"], updated: "Mis à jour il y a 2 jours" },
    ],
  },

  footnotes: {
    n1: t("¹ À propos des entreprises citées — Ces entreprises ne sont pas clientes de Jobea. Elles sont mentionnées à titre indicatif : certains utilisateurs ont postulé via Jobea et ont ensuite rejoint ou collaboré avec ces organisations."),
    n2: t("² À propos des exemples affichés — Les noms et logos d'entreprises présentés dans les démonstrations (offres et candidatures illustrées) le sont à titre purement illustratif. Ces entreprises ne sont ni clientes ni partenaires de Jobea et n'ont aucun lien avec le service."),
  },

  faq: {
    title: "Questions Fréquentes",
    subtitle: "Tout ce que vous devez savoir sur TalentLoop",
    items: [
      { q: t("Qu'est-ce que Jobea et comment ça marche ?"), a: t("Jobea est une plateforme qui automatise votre recherche d'emploi en 4 étapes : analyse de CV, ciblage intelligent d'entreprises via la base INSEE, rédaction de lettres personnalisées par IA, et envoi automatique depuis votre email.") },
      { q: t("Qu'est-ce qu'un secteur d'activité et pourquoi Jobea l'utilise-t-il ?"), a: "Un secteur d'activité regroupe des entreprises similaires (ex: restauration, informatique). TalentLoop l'utilise pour élargir intelligemment votre recherche et découvrir des entreprises que vous n'auriez pas pensé à cibler." },
      { q: t("Jobea peut-il garantir que je serai embauché ?"), a: "Non. TalentLoop maximise vos chances en multipliant vos candidatures ciblées et personnalisées, mais l'embauche dépend de nombreux facteurs. Notre objectif : vous obtenir plus d'entretiens." },
      { q: t("Comment Jobea m'aide-t-il à trouver un emploi plus rapidement ?"), a: "En automatisant le travail répétitif : recherche d'entreprises, rédaction de lettres, envoi. Vous gagnez 10h/semaine pour vous préparer aux entretiens." },
      { q: "Est-ce considéré comme du spam par les recruteurs ?", a: "Non. Les emails sont envoyés depuis votre propre boîte, espacés dans le temps, avec des lettres personnalisées pour chaque entreprise. C'est une candidature spontanée professionnelle." },
      { q: "Les lettres générées par IA seront-elles génériques ?", a: "Non. 0% ChatGPT générique. Chaque lettre est unique, basée sur le site web de l'entreprise, son secteur et votre profil." },
      { q: t("Mes données sont-elles sécurisées avec Jobea ?"), a: "Oui. Chiffrement AES-256, conformité RGPD. Vos données ne sont jamais revendues à des tiers." },
      { q: t("Comment Jobea trouve-t-il les emails RH des entreprises ?"), a: "Via notre base de données enrichie et des algorithmes qui identifient les contacts RH publics des entreprises." },
      { q: t("En quoi Jobea est-il différent des autres outils ?"), a: t("Jobea combine recherche d'entreprises INSEE, analyse CV, rédaction IA personnalisée et envoi automatique en une seule plateforme. Pas besoin de jongler entre 5 outils différents.") },
      { q: t("Ai-je besoin d'un CV existant pour utiliser Jobea ?"), a: "Oui, un CV est nécessaire pour l'analyse et la personnalisation des lettres. Si vous n'en avez pas, notre analyse vous guide pour en créer un." },
      { q: t("Jobea est-il gratuit ?"), a: "1000 crédits offerts à l'inscription (~5 candidatures), sans carte bancaire. Abonnements à partir de 24€/mois." },
      { q: "Puis-je modifier les lettres générées par l'IA ?", a: "Oui. Vous validez et modifiez chaque lettre avant envoi. Vous gardez le contrôle total." },
      { q: "Les employeurs peuvent-ils détecter l'utilisation de l'IA ?", a: "Nos lettres sont rédigées dans un style 100% humain, personnalisé pour chaque entreprise. Elles ne ressemblent pas à du contenu générique généré par IA." },
      { q: t("Comment fonctionne la recherche d'entreprises avec Jobea ?"), a: "Indiquez poste/secteur + ville + rayon. L'IA élargit avec des secteurs proches, filtre par taille et localisation. Vous obtenez une liste pertinente avec les contacts RH." },
      { q: t("À qui s'adresse Jobea ?"), a: "À tous les profils : stages, alternances, CDI, CDD, reconversion, freelances. Dans tous les domaines." },
      { q: t("Quels fournisseurs email sont compatibles avec Jobea ?"), a: "Gmail, Outlook, Yahoo et tout fournisseur SMTP standard." },
      { q: "Mon CV sera-t-il compatible ATS ?", a: "Oui. Notre analyse CV optimise votre profil pour les systèmes ATS des recruteurs avec un score sur 100 et des suggestions concrètes." },
      { q: t("Comment Jobea personnalise-t-il chaque lettre de motivation avec les informations de l'entreprise ?"), a: "L'IA visite le site web de chaque entreprise, comprend leurs valeurs et rédige une lettre unique expliquant pourquoi VOUS êtes la bonne personne." },
      { q: "Quels sont les modèles et styles de lettres de motivation disponibles ?", a: "Trois styles disponibles : Harvard, Modern et Classic. Choisissez celui qui correspond à votre profil." },
      { q: t("Jobea envoie-t-il VRAIMENT les emails à ma place ?"), a: "Oui, depuis votre propre boîte email (Gmail, Outlook, Yahoo...), avec votre CV en pièce jointe, après votre validation." },
      { q: "Puis-je créer plusieurs versions de lettres de motivation ?", a: "Oui. Vous pouvez créer et modifier autant de versions que nécessaire avant de lancer vos campagnes." },
      { q: t("Quels sont les tarifs de Jobea ?"), a: "À partir de 24€/mois. Trois plans : Pro, Premium (recommandé) et Intensif. Voir la page Tarifs." },
      { q: "Dois-je payer séparément pour chaque fonctionnalité ?", a: "Non. Tous les abonnements incluent l'accès à toutes les fonctionnalités. Seuls les crédits d'envoi varient selon le plan." },
      { q: "Proposez-vous des réductions supplémentaires (étudiants, etc.) ?", a: "Contactez notre support pour les offres étudiantes et promotions en cours." },
      { q: "Puis-je annuler mon abonnement ?", a: "Oui, sans engagement. Annulation à tout moment depuis votre espace." },
      { q: "Quand vais-je recevoir des réponses à mes candidatures ?", a: "Cela dépend des entreprises ciblées. En général, les premières réponses arrivent sous 1 à 2 semaines." },
      { q: "Que faire pendant que j'attends les réponses ?", a: "Préparez vos entretiens ! Utilisez le temps gagné pour travailler votre CV, votre pitch et vos compétences." },
      { q: "Proposez-vous des outils de préparation aux entretiens ?", a: "L'analyse CV et les suggestions d'amélioration vous aident à préparer vos entretiens. De nouveaux outils arrivent bientôt." },
      { q: "Êtes-vous ouvert aux partenariats avec des influenceurs ?", a: "Oui. Contactez-nous via la page Contact pour discuter d'un partenariat." },
      { q: t("Puis-je recommander Jobea à ma communauté ou mes amis ?"), a: "Oui ! Partagez TalentLoop avec vos amis. Un programme de parrainage est disponible." },
    ],
  },

  auth: {
    signup: {
      credits: "1000 crédits offerts (~5 candidatures) • Sans carte bancaire",
      title: "Automatisez",
      titleAccent: "vos candidatures.",
      desc: "Gagnez des heures chaque semaine. Laissez l'IA rédiger vos lettres et envoyer vos candidatures.",
      cta: "Créez un compte → lancez vos candidatures en 1 min",
      social: "Rejoint par plus de 2 300",
      newsletter: "+ de 10 000 candidats recoivent nos conseils chaque semaine",
      newsletterLabel: "Envoie-moi des astuces pour décrocher plus d'entretiens",
      newsletterSub: "Promos exclusives + conseils pratiques · Désinscription en 1 clic",
      legal: "En créant un compte, vous acceptez les Conditions d'Utilisation et la Politique de Confidentialité.",
    },
    login: {
      title: "Bienvenue.",
      desc: "Connectez-vous pour accéder à vos campagnes, suivre vos candidatures et décrocher votre prochain job.",
    },
  },
};
