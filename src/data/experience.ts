export type Role = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    id: "freelance-2024",
    title: "Freelance Software Engineer",
    company: "Self-Employed",
    location: "Sydney",
    period: "2024 – Present",
    bullets: [
      "Built custom SaaS tools, websites and automations using React, Node.js and MongoDB",
      "Managed AWS infrastructure (Lightsail, Route53), security hardening and Docker deployments",
      "Troubleshot production issues across APIs, networking and databases",
    ],
  },
  {
    id: "cloudcase-2022",
    title: "Software Engineer",
    company: "CloudCase",
    location: "Sydney",
    period: "2022 – 2023",
    bullets: [
      "Configured and supported a banking SaaS platform for enterprise financial clients",
      "Implemented capital adequacy ratios and regulatory reporting features",
      "Acted as technical escalation point; mentored two engineers",
    ],
  },
  {
    id: "self-2020",
    title: "Software & Systems Engineer",
    company: "Self-Employed",
    location: "Sydney",
    period: "2020",
    bullets: [
      "Delivered custom software systems and web platforms end-to-end",
      "Full ownership of architecture, development, deployment and client support",
    ],
  },
  {
    id: "speedy-2019",
    title: "Systems Engineer & IT Support",
    company: "Speedy Gantry Hire",
    location: "Ingleburn",
    period: "2019 – 2020",
    bullets: [
      "Built a custom internal quotation portal used daily by staff",
      "Managed servers, networking and full-stack IT support",
    ],
  },
  {
    id: "cloudcase-2017",
    title: "System Configuration Engineer",
    company: "CloudCase",
    location: "Sydney",
    period: "2017 – 2018",
    bullets: [
      "Configured front-end and back-end systems for high-profile financial clients",
      "Performed systems analysis and platform customisation",
    ],
  },
  {
    id: "axion-2015",
    title: "Junior Systems Engineer",
    company: "Axion Consulting",
    location: "Sydney",
    period: "2015 – 2017",
    bullets: [
      "Front-end configuration and template development",
      "Early client-facing technical work",
    ],
  },
];
