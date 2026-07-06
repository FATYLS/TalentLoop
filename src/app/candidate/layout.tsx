import { CandidateShell } from "@/components/candidate/CandidateShell";

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return <CandidateShell>{children}</CandidateShell>;
}
