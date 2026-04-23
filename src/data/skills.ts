export type SkillTag = { label: string; color: string; bg: string; border: string };
export type SkillCategory = { id: string; heading: string; tags: SkillTag[] };

const blue: Omit<SkillTag, "label"> = {
  color: "text-blue-400",
  bg: "bg-blue-500/10",
  border: "border-blue-500/20",
};
const amber: Omit<SkillTag, "label"> = {
  color: "text-amber-400",
  bg: "bg-amber-500/10",
  border: "border-amber-500/20",
};

export const coreSkills: SkillTag[] = [
  { label: "React", ...blue },
  { label: "TypeScript", ...blue },
  { label: "Node.js", ...blue },
  { label: "MongoDB", ...blue },
  { label: "Docker", ...blue },
  { label: "AWS", ...blue },
  { label: "Python", ...blue },
  { label: "Bash", ...blue },
];

export const securitySkills: SkillTag[] = [
  { label: "Pentesting", ...amber },
  { label: "OSINT", ...amber },
  { label: "Secure Auth", ...amber },
];
