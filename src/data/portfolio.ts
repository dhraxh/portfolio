/**
 * ─────────────────────────────────────────────────────────────
 *  Everything personal on the site lives in this one file.
 *  Edit the values below and the whole site updates.
 *  Anything marked TODO is a placeholder you should replace.
 * ─────────────────────────────────────────────────────────────
 */

export type Project = {
  title: string;
  description: string;
  /** Thumbnail in /public/projects/ (png, jpg, webp or svg). */
  image: string;
  liveUrl: string;
  codeUrl: string;
  tech: string[];
  /**
   * Show a live iframe preview on hover (desktop only).
   * Some sites block being embedded (X-Frame-Options / CSP) — if the
   * preview shows an error page, set this to false and the screenshot is used.
   */
  livePreview?: boolean;
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
  current?: boolean;
};

export const portfolio = {
  firstName: "Dheekshith",
  lastName: "", // TODO: your last name (leave "" to show only first name)
  role: "MCA Student",
  /** Square photo in /public, e.g. "/avatar.jpg". Leave "" to show your initial. */
  avatar: "",
  status: "Open to internships & opportunities",

  tagline: "I build things that solve real problems.", // TODO
  quote: "“Stay curious. Ship often. Keep learning.”", // TODO
  bio: "I'm an MCA student at NMAM Institute of Technology who enjoys turning ideas into clean, fast web apps. I like working across the stack — from React interfaces to Node.js APIs and databases — and I'm always exploring new tools.", // TODO

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "NMAM Institute of Technology (NMAMIT)",
      location: "Nitte, Karkala",
      period: "2025 – 2027", // TODO: confirm batch
      current: true,
    },
    {
      degree: "Bachelor of Computer Applications (BCA)", // TODO: BCA / BSc
      institution: "Your College Name", // TODO
      location: "City", // TODO
      period: "2022 – 2025", // TODO
    },
  ] satisfies Education[],

  skills: ["React", "Next.js", "TypeScript", "Node.js", "Python", "Java", "SQL", "MongoDB", "Tailwind CSS", "Git"], // TODO

  links: {
    github: "https://github.com/dhraxh",
    email: "your@email.com", // TODO
    linkedin: "https://www.linkedin.com/in/your-profile", // TODO: or "" to hide
  },

  /** Put your PDF at /public/resume.pdf */
  resume: "/resume.pdf",

  projects: [
    {
      title: "Project One", // TODO
      description: "A short one or two line description of what this project does and the problem it solves.",
      image: "/projects/project-1.svg",
      liveUrl: "https://example.com",
      codeUrl: "https://github.com/your-username/project-one",
      tech: ["Next.js", "TypeScript", "Tailwind"],
      livePreview: true,
    },
    {
      title: "Project Two", // TODO
      description: "A short one or two line description of what this project does and the problem it solves.",
      image: "/projects/project-2.svg",
      liveUrl: "https://example.com",
      codeUrl: "https://github.com/your-username/project-two",
      tech: ["React", "Node.js", "MongoDB"],
      livePreview: true,
    },
    {
      title: "Project Three", // TODO
      description: "A short one or two line description of what this project does and the problem it solves.",
      image: "/projects/project-3.svg",
      liveUrl: "https://example.com",
      codeUrl: "https://github.com/your-username/project-three",
      tech: ["Python", "Flask", "SQL"],
      livePreview: true,
    },
  ] satisfies Project[],

  contact: {
    heading: "Let's build something together.",
    blurb: "I'm currently looking for internships and opportunities. My inbox is always open — whether it's a role, a project, or just a hello.",
  },

  footer: { year: 2026, builtWith: "Next.js" },

  seo: {
    description:
      "Dheekshith — MCA student at NMAM Institute of Technology, Nitte. Portfolio of projects, skills and resume.",
  },
};

export const fullName = [portfolio.firstName, portfolio.lastName].filter(Boolean).join(" ");

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
