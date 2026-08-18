import type { TerminalCommand } from "./commandTypes";
import { siteConfig } from "../../data/siteConfig";
import { themes, themeOrder } from "../themes/themes";

type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status?: string;
  github?: string;
  liveUrl?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: "revmind360",
    title: "RevMind360 / RevMindC",
    description:
      "Healthcare technology platform combining hospital management with revenue-cycle and claims intelligence.",
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    status: "private",
    featured: true,
  },
  {
    id: "lejaflow",
    title: "LejaFlow",
    description:
      "Business management and financial ledger platform for SMEs: sales, expenses, inventory, P&L, services, employees, and reports.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    status: "private",
    featured: true,
  },
  {
    id: "mtaafi",
    title: "Mtaafi",
    description: "Wi-Fi/WISP management platform for network operators.",
    technologies: ["Node.js", "MongoDB"],
    status: "private",
  },
  {
    id: "wakawears",
    title: "WakaWears",
    description: "E-commerce platform showcasing product catalog, cart, and checkout flows.",
    technologies: ["Next.js", "TypeScript"],
    status: "private",
  },
  {
    id: "cyberspan",
    title: "Cyberspan",
    description: "Cybersecurity platform for vulnerability and incident awareness.",
    technologies: ["TypeScript", "Docker"],
    status: "private",
  },
];

const experience = [
  {
    company: "Madison Group",
    title: "ICT Intern — IT Support & Systems",
    period: "2026",
    responsibilities: [
      "IT support and troubleshooting",
      "Systems support and administration",
      "End-user support and technical operations",
      "Maintaining technology-related workflows",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Economics",
    institution: "University of Nairobi",
    period: "2021 — 2025",
  },
];

const certifications = [
  { name: "Oracle Data Science Associate", status: "Status: not provided" },
  { name: "IBM SkillsBuild Cybersecurity Certificate", status: "Status: not provided" },
];

const baseIntro = [
  "Lydia Nduati — Software Developer | IT Support & Systems",
  "Nairobi, Kenya",
  "",
];

function formatProjectList(): string[] {
  const out: string[] = ["Projects:", ""];
  projects.forEach((p, i) => {
    out.push(`${i + 1}. ${p.title} — ${p.description}`);
  });
  out.push("", "Use 'projects <number>' to view details for a project.");
  return out;
}

function formatProjectDetail(index: number): string[] {
  const p = projects[index];
  if (!p) return [`No project found at index ${index + 1}`];
  const lines: string[] = [
    `{`,
    `  title: ${p.title}`,
    `  description: ${p.description}`,
    `  technologies: ${p.technologies.join(", ")}`,
    `  status: ${p.status ?? "unknown"}`,
  ];
  if (p.github) lines.push(`  github: ${p.github}`);
  if (p.liveUrl) lines.push(`  liveUrl: ${p.liveUrl}`);
  lines.push(`  featured: ${p.featured ? "yes" : "no"}`);
  lines.push(`}`);
  return lines;
}

function deriveSkills(): Record<string, string[]> {
  // derive from projects + known stack
  const techSet = new Set<string>(["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "MongoDB", "Docker"]);
  // ensure we also include project-specific ones
  projects.forEach((p) => p.technologies.forEach((t) => techSet.add(t)));

  return {
    Frontend: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"].filter((t) => techSet.has(t)),
    Backend: ["Node.js", "Express.js", "Django", "FastAPI"].filter((t) => techSet.has(t)),
    Databases: ["PostgreSQL", "Prisma", "MySQL", "MongoDB"].filter((t) => techSet.has(t)),
    Tools: ["Git", "GitHub", "Vercel", "Docker", "REST APIs"].filter((t) => techSet.has(t) || ["Git", "GitHub", "Vercel", "REST APIs"].includes(t)),
    "IT & Systems": ["IT Support", "System Administration", "Troubleshooting", "Network Fundamentals"],
  };
}

export const commands: TerminalCommand[] = [
  {
    name: "help",
    aliases: ["?"],
    description: "Show available commands",
    execute: () => {
      return [
        "Available commands:",
        "",
        "about          About Lydia",
        "whoami         Developer profile",
        "skills         Technical skills",
        "experience     Professional experience",
        "education      Education",
        "projects       Featured projects (use 'projects <n>')",
        "certifications Certifications",
        "resume         Resume",
        "contact        Contact information",
        "socials        Social profiles",
        "color          Change terminal color",
        "theme          Change terminal theme",
        "clear          Clear terminal",
        "help           Show available commands",
      ];
    },
  },

  {
    name: "color",
    aliases: ["colors", "theme"],
    description: "Change terminal theme",
    execute: (args?: string[]) => {
      // list available themes
      if (!args || args.length === 0) {
        const out = ["AVAILABLE THEMES", ""];
        Object.entries(themes).forEach(([k, v]) => {
          out.push(`${k.padEnd(8)} ${v.name}`);
        });
        out.push("", "Usage:", "", "color <theme>", "", "Example:", "", "color cyan");
        return out;
      }

      const raw = args[0].toLowerCase();
      const aliasMap: Record<string, string> = {
        matrix: "green",
        neon: "purple",
        retro: "amber",
        classic: "white",
        "neon-pink": "pink",
        "hot-pink": "pink",
        pink: "pink",
      };
      const name = aliasMap[raw] ?? raw;
      if (name === "reset") {
        return ["__RESET_THEME__"];
      }
      if (!themes[name]) {
        const out = [`Unknown theme: ${raw}`, "", "Available themes:", ""];
        Object.keys(themes).forEach((k) => out.push(k));
        return out;
      }
      return [`__SET_THEME__:${name}`];
    },
  },

  {
    name: "next-theme",
    description: "Cycle to the next theme",
    execute: () => {
      return ["__NEXT_THEME__"];
    },
  },
  {
    name: "about",
    aliases: ["bio"],
    description: "About Lydia",
    execute: () => {
      return [
        ...baseIntro,
        "",
        "Software developer experienced building web applications with TypeScript, React, and Next.js.",
        "Background in IT support and systems administration with hands-on troubleshooting and operational automation.",
        "Focused on business systems and fintech solutions that deliver practical product outcomes.",
      ];
    },
  },
  {
    name: "whoami",
    aliases: [],
    description: "Developer profile",
    execute: () => {
      return [
        "LYDIA  NDUATI",
        "",
        "Software Developer | IT Support & Systems",
        "",
        "Location:",
        "Nairobi, Kenya",
        "",
        "Focus:",
        "Web Applications",
        "Business Systems",
        "Healthcare Technology",
        "Revenue Cycle Management",
        "IT Support & Systems",
        "Cybersecurity",
        "",
        "Currently building practical technology solutions",
        "that solve real business problems.",
      ];
    },
  },
  {
    name: "skills",
    description: "Technical skills",
    execute: () => {
      const s = deriveSkills();
      const out: string[] = ["TECHNICAL SKILLS", ""];
      Object.entries(s).forEach(([cat, items]) => {
        out.push(cat);
        items.forEach((it) => out.push(`  ├── ${it}`));
        out.push("");
      });
      return out;
    },
  },
  {
    name: "experience",
    aliases: ["work"],
    description: "Professional experience",
    execute: () => {
      const out: string[] = ["EXPERIENCE", ""];
      experience.forEach((e) => {
        out.push(`${e.company}`);
        out.push(`${e.title}`);
        out.push(`${e.period}`);
        out.push("");
        e.responsibilities.forEach((r) => out.push(`- ${r}`));
        out.push("");
      });
      return out;
    },
  },
  {
    name: "education",
    description: "Education",
    execute: () => {
      const out: string[] = ["EDUCATION", ""];
      education.forEach((e) => {
        out.push(`${e.degree}`);
        out.push(`${e.institution}`);
        out.push(`${e.period}`);
        out.push("");
      });
      return out;
    },
  },
  {
    name: "projects",
    aliases: ["ls"],
    description: "Featured projects",
    execute: (args?: string[]) => {
      if (args && args.length > 0) {
        const maybeIndex = Number(args[0]);
        if (!Number.isNaN(maybeIndex)) {
          const p = projects[maybeIndex - 1];
          if (p) return [`__PROJECT__:${p.id}`];
          return [`No project found: ${args[0]}`];
        }
        // allow id lookup
        const idx = projects.findIndex((p) => p.id.toLowerCase() === args[0].toLowerCase());
        if (idx >= 0) return [`__PROJECT__:${projects[idx].id}`];
        return [`Project not found: ${args[0]}`];
      }
      return formatProjectList();
    },
  },
  {
    name: "certifications",
    description: "Certifications",
    execute: () => {
      const out: string[] = ["CERTIFICATIONS", ""];
      certifications.forEach((c) => out.push(`- ${c.name} — ${c.status}`));
      return out;
    },
  },
  {
    name: "resume",
    aliases: ["cv"],
    description: "Show resume summary or download link",
    execute: async () => {
      const out: string[] = ["RESUME", ""];
      const url = siteConfig.resume;
      if (!url) {
        out.push("No resume configured. Add the PDF path to data/siteConfig.ts");
        return out;
      }
      try {
        const res = await fetch(url, { method: "HEAD" });
        if (res.ok) {
          out.push("Download:");
          out.push(`[ DOWNLOAD PDF ] ${url}`);
        } else {
          out.push("Resume PDF not found at /public/resume.pdf — add the file to enable downloads.");
        }
      } catch (e) {
        out.push("Could not check resume PDF. Add /public/resume.pdf to enable downloads.");
      }
      return out;
    },
  },
  {
    name: "contact",
    description: "Contact information",
    execute: async () => {
      const out: string[] = ["CONTACT", ""];
      out.push("Email:");
      out.push(siteConfig.email || "[email not configured]");
      out.push("");
      out.push("Location:");
      out.push(siteConfig.location || "");
      out.push("");
      out.push("Available for:");
      siteConfig.availability.forEach((a) => out.push(`- ${a}`));
      return out;
    },
  },
  {
    name: "socials",
    aliases: ["github", "linkedin"],
    description: "Social profiles",
    execute: async () => {
      const out: string[] = ["SOCIALS", ""];
      if (siteConfig.github) out.push(`GitHub: ${siteConfig.github}`);
      if (siteConfig.linkedin) out.push(`LinkedIn: ${siteConfig.linkedin}`);
      if (siteConfig.twitter) out.push(`X / Twitter: ${siteConfig.twitter}`);
      if (!siteConfig.github && !siteConfig.linkedin && !siteConfig.twitter) out.push("No social links configured.");
      return out;
    },
  },
  {
    name: "neofetch",
    description: "Show brief system-like info",
    execute: () => [
      "LYDIA@PORTFOLIO",
      "──────────────────────",
      "OS: PortfolioOS",
      "Shell: lydia-shell",
      "Theme: Green CRT",
      "Stack: Next.js + TypeScript",
      "Status: Building",
    ],
  },
  {
    name: "matrix",
    description: "Matrix-style effect (subtle)",
    execute: () => ["Matrix mode not supported in terminal view. Try visiting the demo page."],
  },
  {
    name: "sudo",
    description: "Try to run a privileged command",
    execute: () => ["Permission denied: you are not root.", "Hint: this is a portfolio, not a live system."],
  },
  {
    name: "coffee",
    description: "Coffee status",
    execute: () => ["☕ Coffee status: brewing... stay tuned."],
  },
  {
    name: "gaming",
    description: "Gaming status",
    execute: () => ["Gaming mode: prefer retro consoles — portfolio stays serious."],
  },
  {
    name: "clear",
    description: "Clear terminal",
    execute: () => {
      return ["__CLEAR__"];
    },
  },
];

export default commands;
