export type SkillTag = { label: string; color: string; bg: string; border: string };

const blue: Omit<SkillTag, "label"> = {
  color: "text-blue-400",
  bg: "bg-blue-500/10",
  border: "border-blue-500/20",
};
const purple: Omit<SkillTag, "label"> = {
  color: "text-purple-400",
  bg: "bg-purple-500/10",
  border: "border-purple-500/20",
};
const green: Omit<SkillTag, "label"> = {
  color: "text-emerald-400",
  bg: "bg-emerald-500/10",
  border: "border-emerald-500/20",
};
const amber: Omit<SkillTag, "label"> = {
  color: "text-amber-400",
  bg: "bg-amber-500/10",
  border: "border-amber-500/20",
};

export const coreSkills: SkillTag[] = [
  { label: "React", ...blue },
  { label: "TypeScript", ...blue },
  { label: "Next.js", ...blue },
  { label: "Node.js", ...blue },
  { label: "Python", ...blue },
  { label: "PostgreSQL", ...blue },
  { label: "MongoDB", ...blue },
  { label: "GraphQL", ...purple },
  { label: "Docker", ...green },
  { label: "Kubernetes", ...green },
  { label: "AWS", ...green },
  { label: "Terraform", ...green },
  { label: "Redis", ...blue },
  { label: "Linux", ...blue },
  { label: "Bash", ...blue },
  { label: "Git", ...blue },
];

export const securitySkills: SkillTag[] = [
  { label: "Pentesting", ...amber },
  { label: "OSINT", ...amber },
  { label: "Secure Auth", ...amber },
  { label: "E2E Encryption", ...amber },
  { label: "Network Security", ...amber },
];
