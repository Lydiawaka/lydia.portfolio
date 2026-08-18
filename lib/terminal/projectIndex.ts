export const projects = [
  {
    id: "revmind360",
    title: "RevMind360 / RevMindC",
    description:
      "Healthcare technology platform combining hospital management with revenue-cycle and claims intelligence.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    status: "active",
    featured: true,
  },
  {
    id: "lejaflow",
    title: "LejaFlow",
    description:
      "Business management and financial ledger platform for SMEs: sales, expenses, inventory, P&L, services, employees, and reports.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    status: "active",
    featured: true,
  },
  {
    id: "mtaafi",
    title: "Mtaafi",
    description: "Wi-Fi/WISP management platform for network operators.",
    technologies: ["Node.js", "MongoDB"],
    status: "active",
  },
  {
    id: "wakawears",
    title: "WakaWears",
    description: "E-commerce platform showcasing product catalog, cart, and checkout flows.",
    technologies: ["Next.js", "TypeScript"],
    status: "active",
  },
  {
    id: "cyberspan",
    title: "Cyberspan",
    description: "Cybersecurity platform for vulnerability and incident awareness.",
    technologies: ["TypeScript", "Docker"],
    status: "active",
  },
];

export type Project = typeof projects[number];
