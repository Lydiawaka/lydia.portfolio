export const projects = [
  {
    id: "tremile",
    title: "Tremile Manufacturing System",
    description:
      "Manufacturing and ERP management system for raw materials, inventory, production, costing, and expenses, with integrated worksheets for production and cost tracking.",
    technologies: ["Java", "Spring Boot", "TypeScript", "PostgreSQL"],
    status: "private",
    liveUrl: "https://www.tremilepaints.com/",
    featured: true,
  },
  {
    id: "logpagia",
    title: "Logpagia (Enterprise Platform)",
    description:
      "AI-powered enterprise platform integrating workforce management, financial intelligence (AP/AR), inventory systems, and analytics into a single ecosystem.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    status: "private",
    liveUrl: "https://logpagia.com",
    featured: true,
  },
  {
    id: "lejaflow",
    title: "LejaFlow (Business Management Platform)",
    description:
      "Full-stack SaaS application for managing finances, inventory, and services with an integrated admin dashboard for small and medium-sized businesses.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    status: "private",
    liveUrl: "https://lejaflow.com",
    featured: true,
  },
  {
    id: "recipe-finder",
    title: "Recipe Finder",
    description: "Web application that helps users discover recipes based on available ingredients.",
    technologies: ["Next.js", "TypeScript"],
    status: "active",
    github: "https://github.com/Lydiawaka/recipe-finder",
    liveUrl: "https://recipe-finder-one-sepia.vercel.app",
    featured: true,
  },
  {
    id: "wakawears",
    title: "WakaWears",
    description: "Full-featured online store with an admin dashboard for managing products, orders, and customers.",
    technologies: ["JavaScript", "React"],
    status: "active",
    github: "https://github.com/Lydiawaka/waka_wears",
  },
  {
    id: "masgas",
    title: "Masgas",
    description: "Full-featured online store with an admin dashboard for managing products, orders, and customers.",
    technologies: ["Next.js", "TypeScript"],
    status: "active",
    github: "https://github.com/Lydiawaka/masgas",
    liveUrl: "https://www.masgasenterprice.com/",
  },
  {
    id: "crypto-tracker",
    title: "Crypto Tracker App",
    description: "Real-time currency tracking and conversion application providing accurate exchange rates for users and travelers.",
    technologies: ["Next.js", "TypeScript"],
    status: "active",
    github: "https://github.com/Lydiawaka/crypto-tracker",
    liveUrl: "https://crypto-tracker-gilt-one.vercel.app",
    featured: true,
  },
];

export type Project = typeof projects[number];
