// Professional details summarized from Bojan's CV and career updates.
export const experience = [
  {
    role: "AI Engineer",
    company: "Stonebranch",
    start: "2026-02",
    startLabel: "Feb 2026",
    endLabel: "Present",
    focus: "AI products, agent tooling & organizational adoption",
    summary:
      "Developing AI products and internal solutions that support Stonebranch’s adoption of AI, with a focus on practical applications for the Universal Automation Center (UAC).",
    highlights: [
      "Develop the AI Integration Builder, a curated Claude Code plugin combining custom skills, scripts, hooks, agents, and evaluations to support integration development.",
      "Design and integrate custom AI solutions and guardrails for projects across the organization, aligning capabilities with project requirements.",
      "Shape new AI products and capabilities for use within UAC, from exploration and prototyping to defining practical integration approaches.",
      "Work with LangChain, LangGraph, and Pydantic AI, and evaluate agent harness capabilities for building and orchestrating AI workflows.",
    ],
    technologies: [
      "Claude Code",
      "LangChain",
      "LangGraph",
      "Pydantic AI",
      "Agent harnesses",
      "AI evaluations",
    ],
  },
  {
    role: "Software Engineer",
    company: "Stonebranch",
    start: "2025-02",
    startLabel: "Feb 2025",
    end: "2026-02",
    endLabel: "Feb 2026",
    focus: "Integrations, automation & developer tooling",
    summary:
      "Building integrations and the tools that make them easier to develop, while helping shape new capabilities for the Stonebranch Automation Platform (UAC).",
    highlights: [
      "Analyze new integration opportunities, including AI-driven capabilities, and define technical scopes around user needs and business goals.",
      "Build and improve internal tooling, frameworks, and CLI tools that standardize integration development.",
      "Develop and maintain Universal Extensions with modular architecture, automated testing, and CI/CD practices.",
    ],
    technologies: ["Python", "APIs", "CLI tooling", "CI/CD"],
  },
  {
    role: "Junior Software Engineer",
    company: "Stonebranch",
    start: "2024-09",
    startLabel: "Sep 2024",
    end: "2025-02",
    endLabel: "Feb 2025",
    focus: "Python integrations & cloud services",
    summary:
      "Developed and maintained Python-based Universal Extensions connecting third-party services to the UAC automation platform.",
    highlights: [
      "Worked on integrations for Kubernetes services on AWS and Azure, and SAP BTP Jobs, with an emphasis on API interactions and error handling.",
      "Applied unit testing, object-oriented design, and code reviews in an Agile team, with hands-on work in Git and CI/CD pipelines.",
    ],
    technologies: ["Python", "AWS", "Azure", "Kubernetes", "SAP BTP"],
  },
  {
    role: "Frontend Developer Intern",
    company: "Thrasker",
    start: "2024-04",
    startLabel: "Apr 2024",
    end: "2024-06",
    endLabel: "Jun 2024",
    focus: "Responsive websites & performance",
    summary:
      "Created responsive client landing pages with Astro, Tailwind CSS, and JavaScript, focusing on performance and a consistent experience across browsers.",
    highlights: [
      "Built layouts for Chrome, Firefox, Safari, and Edge, and worked on reducing load times and improving usability.",
    ],
    technologies: ["Astro", "Tailwind CSS", "JavaScript"],
  },
  {
    role: "IT Specialist Intern",
    company: "Aspekt.mk",
    start: "2022-12",
    startLabel: "Dec 2022",
    end: "2023-02",
    endLabel: "Feb 2023",
    focus: "Technical support, infrastructure & databases",
    summary:
      "Supported hardware, software, and network operations, working with Windows Server 2016 and SQL databases.",
    highlights: [
      "Resolved help desk issues, configured systems, documented processes, and helped maintain database performance, integrity, and security.",
    ],
    technologies: ["Windows Server", "SQL", "Networking"],
  },
];

export const skillGroups = [
  {
    title: "AI & agent development",
    skills: [
      "LangChain",
      "LangGraph",
      "Pydantic AI",
      "Claude Code plugins",
      "Agent orchestration",
      "Tool/function calling",
      "MCP",
      "Prompt engineering",
      "Context engineering",
    ],
  },
  {
    title: "AI quality & safety",
    skills: [
      "AI evaluations",
      "Guardrails",
      "Structured outputs",
      "Human-in-the-loop workflows",
      "Agent tracing & observability",
      "RAG",
      "Vector databases",
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      "Python",
      "Django",
      "FastAPI",
      "Pydantic",
      "Async Python",
      "C#",
      "ASP.NET",
      "API development",
      "REST API design",
      "OAuth 2.0 / OIDC",
      "WebSockets",
      "Background jobs & queues",
      "CLI development",
    ],
  },
  {
    title: "Web & mobile",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "React Native",
      "React Router",
      "Redux",
      "State management",
      "Astro",
      "Tailwind CSS",
      "Accessibility",
      "Responsive design",
    ],
  },
  {
    title: "Cloud & infrastructure",
    skills: [
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "AWS",
      "Azure",
      "Linux",
      "Shell scripting",
      "IT infrastructure",
    ],
  },
  {
    title: "Data & persistence",
    skills: [
      "MySQL",
      "PostgreSQL",
      "Redis",
      "Firebase",
      "SQLAlchemy",
      "Dapper ORM",
    ],
  },
  {
    title: "Testing & delivery",
    skills: [
      "Git",
      "CI/CD",
      "GitHub Actions",
      "GitLab CI/CD",
      "Automated testing",
      "pytest",
      "Integration testing",
      "Playwright",
      "API testing",
      "Mocking",
    ],
  },
  {
    title: "Hardware & desktop",
    skills: ["C++", "Arduino", ".NET", "WinForms", "Robotics"],
  },
];

export const education = [
  {
    qualification: "Bioinformatics",
    institution: "Faculty of Computer Science and Engineering, Skopje",
    period: "Expected graduation · 2029",
    detail: "Master’s degree program · Bioinformatics track.",
  },
  {
    qualification: "Computer Science & Computer Engineering",
    institution: "Faculty of Computer Science and Engineering, Skopje",
    period: "2022–2027",
    detail: "Bachelor’s degree program · Computer Engineering track.",
  },
  {
    qualification: "Electrical technician for computer technology & automation",
    institution: "SETU “Mihajlo Pupin”, Skopje",
    period: "Sep 2018 – May 2022",
    detail:
      "High school degree, with a foundation in computer technology, electronics, and automation.",
  },
  {
    qualification: "Python Backend Engineering with Django",
    institution: "Semos Education, Skopje",
    period: "Aug 2022 – Dec 2022",
    detail:
      "Completed the final project and was recognized as Rising Star of the Week.",
  },
];

export const cvProjects = [
  {
    title: "Financial Management App",
    summary:
      "A web and mobile application for tracking expenses, budgets, and transaction history, with real-time data synchronization and Firebase authentication.",
    technologies: ["React", "React Native", "Redux", "Firebase", "Node.js"],
  },
  {
    title: "Real-time Chat Application",
    summary:
      "A chat application with secure sign-in, instant messaging, and message history, combining an ASP.NET backend with a React interface.",
    technologies: ["ASP.NET", "C#", "React"],
  },
  {
    title: "Robotic Arm & Control Software",
    summary:
      "A school project spanning hardware selection, assembly, Arduino programming, and a custom WinForms application to control the arm in real time.",
    technologies: ["Arduino", "C++", "C#", ".NET", "WinForms"],
  },
];
