import { JobOffer } from "./mock-jobs";

const KEY = "talentloop_candidate";

export interface Application {
  id: string;
  jobId: string;
  job: JobOffer;
  letter: string;
  appliedAt: string;
  status: "generated" | "sent" | "interview";
}

interface CandidateData {
  customJobs: JobOffer[];
  applications: Application[];
  recruiterJobs: JobOffer[];
}

function load(): CandidateData {
  if (typeof window === "undefined") return { customJobs: [], applications: [], recruiterJobs: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { customJobs: [], applications: [], recruiterJobs: [] };
    return JSON.parse(raw);
  } catch {
    return { customJobs: [], applications: [], recruiterJobs: [] };
  }
}

function save(data: CandidateData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getCustomJobs(): JobOffer[] {
  return load().customJobs;
}

export function addCustomJob(job: JobOffer) {
  const data = load();
  data.customJobs = [job, ...data.customJobs.filter(j => j.id !== job.id)];
  save(data);
}

export function getRecruiterJobs(): JobOffer[] {
  return load().recruiterJobs;
}

export function addRecruiterJob(job: JobOffer) {
  const data = load();
  data.recruiterJobs = [job, ...data.recruiterJobs];
  save(data);
}

export function getApplications(): Application[] {
  return load().applications;
}

export function saveApplication(app: Application) {
  const data = load();
  data.applications = [app, ...data.applications.filter(a => a.jobId !== app.jobId)];
  save(data);
}

export function getApplicationByJobId(jobId: string): Application | undefined {
  return load().applications.find(a => a.jobId === jobId);
}
