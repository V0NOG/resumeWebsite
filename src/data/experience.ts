export type Role = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  detail: string;
  tech: string[];
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
    detail:
      "Full-stack freelance engineering across multiple simultaneous clients. Built production web platforms end-to-end — from design brief through AWS deployment. Delivered a SaaS quotation tool with PDF export and full quote lifecycle management. Managed all infrastructure: AWS Lightsail instances, Route53 DNS, Docker containerisation, and SSL/security hardening. Ongoing support and client relationship management post-launch.",
    tech: ["React", "Node.js", "MongoDB", "AWS Lightsail", "Route53", "Docker", "TypeScript"],
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
    detail:
      "Worked on a banking SaaS platform serving enterprise financial institutions across Australia. Implemented capital adequacy ratio calculations and regulatory reporting modules to meet APRA compliance requirements. Served as the technical escalation point for complex client issues spanning API integration, data migrations, and platform customisation. Mentored junior engineers on platform architecture and client communication practices.",
    tech: ["JavaScript", "SQL", "REST APIs", "Financial regulation", "Banking SaaS"],
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
    detail:
      "Sole-trader software practice delivering bespoke digital systems for small and medium businesses. Full end-to-end ownership across every engagement: requirements gathering, system architecture, development, deployment, and post-launch support. Projects included internal tooling, customer-facing web platforms, and data automation pipelines for Australian SMBs.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
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
    detail:
      "In-house IT and software engineering for a construction equipment hire company. Built a custom web-based quotation portal from scratch that replaced a manual Excel process and became a core daily operational tool for the sales team. Also responsible for Windows Server infrastructure, network configuration across multiple sites, and end-user IT support.",
    tech: ["Custom web app", "Windows Server", "Networking", "SQL", "IT support"],
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
    detail:
      "Configuration engineering role focused on customising the CloudCase banking SaaS platform for high-profile financial institution clients. Responsible for front-end and back-end system configuration, data mapping, and platform testing across multiple client environments. Worked directly with client stakeholders to translate regulatory and operational requirements into platform configuration.",
    tech: ["Platform configuration", "JavaScript", "SQL", "Financial systems", "QA testing"],
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
    detail:
      "Entry-level systems engineering role working alongside senior engineers on enterprise client engagements. Responsible for front-end template configuration, technical documentation, and supporting client-facing deliverables. Built foundational skills in software configuration, stakeholder communication, and professional technical practice within a consultancy environment.",
    tech: ["HTML/CSS", "Template configuration", "Technical documentation", "Client support"],
  },
];
