import type { TerminalCommand } from "./commandTypes";
import { siteConfig } from "../../data/siteConfig";
import { themes, themeOrder } from "../themes/themes";
import { projects } from "./projectIndex";

const experience = [
  {
    company: "Madison Group Limited",
    title: "ICT Intern",
    period: "Feb 2026 - Sep 2026",
    responsibilities: [
      "Provided first-line ICT support for hardware, software, application, system access, and connectivity issues",
      "Supported ERP and enterprise business applications, assisting users with navigation, access, and troubleshooting",
      "Troubleshot technical and application issues, resolved common incidents, and escalated complex issues",
      "Assisted with API development and integration to support business processes and improve application workflows",
      "Participated in application testing, debugging, and issue investigation, including working with GeneXus",
      "Collaborated with ICT staff, developers, and business users to investigate issues and improve application functionality",
    ],
  },
  {
    company: "Logpagia Technologies LLC",
    title: "Software Developer",
    period: "2025 - 2026",
    responsibilities: [
      "Collaborated with developers to design, develop, test, and maintain enterprise software applications",
      "Contributed to an AI-powered enterprise platform supporting workforce management, finance, inventory, and analytics",
      "Developed and maintained frontend/backend features involving APIs, databases, authentication, and business workflows",
      "Conducted functional and black-box testing, documented defects, and supported debugging and issue resolution",
      "Supported testing and validation of healthcare and revenue-cycle management software across different user roles",
    ],
  },
  {
    company: "Ndifin",
    title: "Web Developer",
    period: "2024 - 2025",
    responsibilities: [
      "Developed and deployed scalable full-stack applications with authentication systems, dashboards, and e-commerce features",
      "Collaborated with teams to deliver customized client solutions",
    ],
  },
  {
    company: "Jimali Ventures",
    title: "Intern",
    period: "2024",
    responsibilities: [
      "Assisted in building and maintaining full-stack applications using Django and React",
      "Worked on debugging, API integration, and internal tool improvements",
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Economics",
    institution: "University of Nairobi",
    period: "2021 - 2025",
  },
];

const certifications = [
  { name: "Relational Databases", status: "FreeCodeCamp" },
  { name: "Full-Stack Development", status: "FreeCodeCamp" },
  { name: "Python", status: "FreeCodeCamp" },
  { name: "JavaScript & TypeScript Advanced", status: "Udemy" },
  { name: "Responsive Web Design", status: "FreeCodeCamp" },
  { name: "AI Foundations Associate", status: "Oracle University" },
  { name: "ITSM Foundation Training", status: "Completed" },
  { name: "IT Support Technical Skills Bootcamp", status: "Completed" },
];

const baseIntro = [
  "Lydia Nduati — Software Developer",
  "Nairobi, Kenya",
  "",
];

function formatProjectList(): string[] {
  const out: string[] = ["Projects:", ""];
  projects.forEach((p, i) => {
    out.push(`${i + 1}. ${p.title}: ${p.description}`);
    out.push(`   Tech: ${p.technologies.join(", ")}`);
    out.push(`   Status: ${p.status ?? "unknown"}`);
    if (p.github) out.push(`   GitHub: ${p.github}`);
    if (p.liveUrl) out.push(`   Live: ${p.liveUrl}`);
    out.push("");
  });
  out.push("Use 'projects <number>' to view details for a project.");
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
  return {
    Languages: ["Java", "Python", "JavaScript", "TypeScript", "PHP", "SQL"],
    Frontend: ["HTML", "CSS", "React.js", "Next.js"],
    Backend: ["Node.js", "Express.js", "Django", "FastAPI"],
    Databases: ["MongoDB", "Mongoose", "PostgreSQL", "MySQL"],
    "Tools & Technologies": ["Git", "GitHub", "Genexus", "Docker", "AWS", "Vercel", "Render", "Prisma ORM"],
    "APIs & Auth": ["REST APIs", "GraphQL", "JWT", "OAuth", "WebSockets"],
    Other: ["CI/CD", "Postman", "Figma"],
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
        "Full-Stack Software Developer experienced designing, developing, testing, and deploying applications",
        "using Java, TypeScript, JavaScript, Python, React, Next.js, Node.js, Django, and FastAPI.",
        "Proficient in REST APIs, SQL and NoSQL databases, cloud deployment, authentication systems, and ERP integration.",
        "Dedicated to building scalable, secure, and user-friendly solutions.",
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
        "Software Developer",
        "",
        "Location:",
        "Nairobi, Kenya",
        "",
        "Focus:",
        "Full-Stack Applications",
        "ERP & Business Systems",
        "AI-Powered Enterprise Platforms",
        "REST APIs & Authentication",
        "IT Support & Systems",
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
    execute: () => ["Coffee status: brewing... stay tuned."],
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
