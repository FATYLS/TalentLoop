"use client";
import { User, Prospect, Campaign, CVData, UserSettings, SearchCriteria } from "./types";

const KEY = "talentloop_data";

interface AppData {
  user: User | null;
  prospects: Prospect[];
  campaigns: Campaign[];
  cv: CVData | null;
  settings: UserSettings;
}

const defaultSettings: UserSettings = {
  newsletter: true,
  searchCriteria: { job: "", city: "", zip: "", radius: "", experience: "" },
};

const defaultData: AppData = { user: null, prospects: [], campaigns: [], cv: null, settings: defaultSettings };

export function load(): AppData {
  if (typeof window === "undefined") return defaultData;
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem("dcstart_data");
    if (!raw) return defaultData;
    const data = JSON.parse(raw);
    return { ...defaultData, ...data, settings: { ...defaultSettings, ...data.settings } };
  } catch { return defaultData; }
}

function save(data: AppData) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function formatName(email: string) {
  const part = email.split("@")[0].replace(/[._]/g, " ");
  return part.charAt(0).toUpperCase() + part.slice(1);
}

export function login(email: string, _password: string): User {
  const data = load();
  const user: User = { email, name: formatName(email), credits: 1000, provider: "email" };
  data.user = user;
  save(data);
  return user;
}

export function loginWithGoogle(email: string, name: string): User {
  const data = load();
  const user: User = { email, name, credits: 1000, provider: "google", avatar: name[0]?.toUpperCase() };
  data.user = user;
  save(data);
  return user;
}

export function register(email: string, password: string): User {
  return login(email, password);
}

export function logout() {
  const data = load();
  data.user = null;
  save(data);
}

export function getUser(): User | null {
  return load().user;
}

export function updateUser(patch: Partial<User>) {
  const data = load();
  if (data.user) { data.user = { ...data.user, ...patch }; save(data); }
}

export function deductCredits(amount: number): boolean {
  const data = load();
  if (!data.user || data.user.credits < amount) return false;
  data.user.credits -= amount;
  save(data);
  return true;
}

export function getProspects(): Prospect[] {
  return load().prospects;
}

export function addProspect(p: Prospect) {
  const data = load();
  if (!data.prospects.find(x => x.id === p.id)) data.prospects.push(p);
  save(data);
}

export function removeProspect(id: string) {
  const data = load();
  data.prospects = data.prospects.filter(x => x.id !== id);
  save(data);
}

export function importDemoProspects(names: string[]) {
  names.forEach((name, i) => {
    const existing = DEMO_PROSPECTS.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existing) addProspect(existing);
    else addProspect({
      id: `import-${Date.now()}-${i}`, name, sector: "Import CSV", city: "France",
      size: "PME", status: "new",
    });
  });
}

export function getCampaigns(): Campaign[] {
  return load().campaigns;
}

export function createCampaign(name: string, count: number, letter?: string): Campaign {
  const data = load();
  const c: Campaign = {
    id: Date.now().toString(), name, prospects: count, sent: 0,
    status: "draft", createdAt: new Date().toISOString(), letter,
  };
  data.campaigns.push(c);
  save(data);
  return c;
}

export function getCV(): CVData | null {
  return load().cv;
}

export function setCV(cv: CVData) {
  const data = load();
  data.cv = cv;
  save(data);
}

export function getSettings(): UserSettings {
  return load().settings;
}

export function saveSettings(settings: Partial<UserSettings>) {
  const data = load();
  data.settings = { ...data.settings, ...settings };
  if (settings.searchCriteria) {
    data.settings.searchCriteria = { ...data.settings.searchCriteria, ...settings.searchCriteria };
  }
  save(data);
}

export const DEMO_PROSPECTS: Prospect[] = [
  { id: "1", name: "Capgemini", sector: "Conseil IT", city: "Paris", size: "Grande", email: "rh@capgemini.com", website: "capgemini.com", employees: "300 000+", status: "enriched" },
  { id: "2", name: "Decathlon", sector: "Retail / Sport", city: "Lille", size: "Grande", email: "recrutement@decathlon.com", website: "decathlon.fr", employees: "100 000+", status: "new" },
  { id: "3", name: "Alan", sector: "Insurtech", city: "Paris", size: "PME", email: "jobs@alan.eu", website: "alan.com", employees: "500+", status: "enriched" },
  { id: "4", name: "OVHcloud", sector: "Cloud", city: "Roubaix", size: "Grande", email: "careers@ovhcloud.com", website: "ovhcloud.com", employees: "2 500+", status: "new" },
  { id: "5", name: "Doctolib", sector: "Santé / Tech", city: "Paris", size: "PME", email: "recrutement@doctolib.fr", website: "doctolib.fr", employees: "2 800+", status: "enriched" },
  { id: "6", name: "Blablacar", sector: "Mobilité", city: "Paris", size: "PME", email: "jobs@blablacar.com", website: "blablacar.com", employees: "700+", status: "new" },
  { id: "7", name: "Criteo", sector: "AdTech", city: "Paris", size: "Grande", email: "careers@criteo.com", website: "criteo.com", employees: "2 800+", status: "enriched" },
  { id: "8", name: "Ledger", sector: "Crypto / Fintech", city: "Paris", size: "PME", email: "jobs@ledger.com", website: "ledger.com", employees: "700+", status: "new" },
  { id: "9", name: "Qonto", sector: "Fintech", city: "Paris", size: "PME", email: "jobs@qonto.com", website: "qonto.com", employees: "1 500+", status: "enriched" },
  { id: "10", name: "Datadog", sector: "SaaS / Monitoring", city: "Paris", size: "Grande", email: "careers@datadoghq.com", website: "datadoghq.com", employees: "5 000+", status: "new" },
  { id: "11", name: "Swile", sector: "RH Tech", city: "Montpellier", size: "PME", email: "jobs@swile.co", website: "swile.co", employees: "600+", status: "enriched" },
  { id: "12", name: "Contentsquare", sector: "Analytics", city: "Paris", size: "PME", email: "careers@contentsquare.com", website: "contentsquare.com", employees: "1 500+", status: "new" },
  { id: "13", name: "Veepee", sector: "E-commerce", city: "Saint-Denis", size: "Grande", email: "recrutement@veepee.com", website: "veepee.com", employees: "4 500+", status: "enriched" },
  { id: "14", name: "Back Market", sector: "E-commerce", city: "Paris", size: "PME", email: "jobs@backmarket.com", website: "backmarket.com", employees: "800+", status: "new" },
  { id: "15", name: "Scaleway", sector: "Cloud", city: "Paris", size: "PME", email: "jobs@scaleway.com", website: "scaleway.com", employees: "500+", status: "enriched" },
  { id: "16", name: "ManoMano", sector: "E-commerce BTP", city: "Paris", size: "PME", email: "careers@manomano.com", website: "manomano.com", employees: "900+", status: "new" },
  { id: "17", name: "PayFit", sector: "RH Tech", city: "Paris", size: "PME", email: "jobs@payfit.com", website: "payfit.com", employees: "700+", status: "enriched" },
  { id: "18", name: "Sorare", sector: "Gaming / Web3", city: "Paris", size: "PME", email: "jobs@sorare.com", website: "sorare.com", employees: "300+", status: "new" },
];

const TECH_SECTOR_HINTS = ["it", "tech", "cloud", "saas", "fintech", "insurtech", "adtech", "analytics", "gaming", "crypto", "web3", "e-commerce", "digital", "mobilité"];

function normalize(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

function matchesJobQuery(q: string, p: Prospect): boolean {
  if (!q.trim()) return true;
  const lower = normalize(q);
  const name = normalize(p.name);
  const sector = normalize(p.sector);

  if (name.includes(lower) || sector.includes(lower)) return true;

  const tokens = lower.split(/\s+/).filter(t => t.length > 2);
  if (tokens.some(t => name.includes(t) || sector.includes(t))) return true;

  const techJobWords = ["dev", "developpeur", "developer", "web", "fullstack", "stack", "react", "node", "python", "javascript", "logiciel", "informatique", "data", "engineer", "ingenieur", "frontend", "backend"];
  if (techJobWords.some(w => lower.includes(w)) && TECH_SECTOR_HINTS.some(h => sector.includes(h))) return true;

  const marketingWords = ["marketing", "communication", "seo", "social", "commercial"];
  if (marketingWords.some(w => lower.includes(w)) && (sector.includes("retail") || sector.includes("e-commerce") || sector.includes("ad"))) return true;

  const rhWords = ["rh", "ressources humaines", "recrutement"];
  if (rhWords.some(w => lower.includes(w)) && sector.includes("rh")) return true;

  return false;
}

function matchesCity(ville: string, prospectCity: string, radiusKm = 30): boolean {
  if (!ville.trim()) return true;
  const v = normalize(ville);
  const c = normalize(prospectCity);

  if (c.includes(v) || v.includes(c)) return true;
  if (v.includes("paris") || v.includes("75") || v.startsWith("75")) {
    const ileDeFrance = ["paris", "saint-denis", "boulogne", "nanterre", "levallois", "issy", "montreuil"];
    if (radiusKm >= 20) return ileDeFrance.some(loc => c.includes(loc));
    return c.includes("paris");
  }
  if (v.includes("lyon") || v.includes("69")) return c.includes("lyon");
  if (v.includes("lille") || v.includes("59")) return c.includes("lille") || (radiusKm >= 40 && c.includes("roubaix"));
  if (v.includes("montpellier") || v.includes("34")) return c.includes("montpellier");
  return true;
}

export function searchProspects(
  query: string,
  ville: string,
  sizes: { small: boolean; medium: boolean; large: boolean },
  radiusKm = 30,
) {
  return DEMO_PROSPECTS.filter(p => {
    const matchQ = matchesJobQuery(query, p);
    const matchV = matchesCity(ville, p.city, radiusKm);
    const sizeKey = p.size === "Grande" ? "large" : p.size === "PME" ? "medium" : "small";
    const matchSize = sizes[sizeKey] ?? true;
    return matchQ && matchV && matchSize;
  });
}
