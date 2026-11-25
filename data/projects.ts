import { same } from "@/lib/utils";
import type { Project } from "@/types";

/**
 * Pour ajouter une image :
 *   1. place le fichier dans public/projects/<slug>/ (ex : cover.jpg)
 *   2. renseigne image: "/projects/<slug>/cover.jpg"
 * Pour ajouter un lien : remplace null par l'URL réelle.
 * Pour une capture : { src: "/projects/<slug>/capture-1.png", alt: { fr: "...", en: "..." } }
 */
export const projects: Project[] = [
  {
    id: "urbania-2035",
    slug: "urbania-2035",
    title: "Urbania 2035",
    role: { fr: "Développeur Full-Stack", en: "Full-Stack Developer" },
    type: { fr: "Projet académique", en: "Academic project" },
    category: { fr: "Full-Stack", en: "Full-Stack" },
    description: {
      fr: "Plateforme web et mobile de simulation du trafic routier et d'optimisation des trajets en ville.",
      en: "Web and mobile platform for road traffic simulation and urban route optimization.",
    },
    context: {
      fr: "Projet académique portant sur la simulation du trafic routier et l'optimisation des trajets en ville.",
      en: "Academic project focused on road traffic simulation and urban route optimization.",
    },
    objective: {
      fr: "Proposer une plateforme web et mobile permettant de simuler le trafic routier et d'optimiser les trajets en ville.",
      en: "Provide a web and mobile platform to simulate road traffic and optimize urban routes.",
    },
    work: {
      fr: [
        "Modélisation de l'architecture UML",
        "Gestion de base de données",
        "Intégration d'algorithmes de routage",
        "Utilisation des graphes",
        "Algorithme de Dijkstra",
        "Développement Full-Stack",
      ],
      en: [
        "UML architecture modeling",
        "Database management",
        "Integration of routing algorithms",
        "Use of graphs",
        "Dijkstra's algorithm",
        "Full-stack development",
      ],
    },
    features: {
      fr: [
        "Simulation du trafic routier",
        "Optimisation des trajets en ville",
        "Calcul d'itinéraires avec l'algorithme de Dijkstra",
      ],
      en: [
        "Road traffic simulation",
        "Urban route optimization",
        "Route computation using Dijkstra's algorithm",
      ],
    },
    architecture: {
      fr: [
        "Architecture modélisée avec UML",
        "Gestion de la base de données (MySQL, XAMPP)",
        "Algorithmes de routage appuyés sur la théorie des graphes",
      ],
      en: [
        "Architecture modeled with UML",
        "Database management (MySQL, XAMPP)",
        "Routing algorithms based on graph theory",
      ],
    },
    technologies: ["Node.js", "React", "MySQL", "XAMPP"],
    image: "/projects/urbania-2035/cover.png",
    screenshots: [],
    github: null,
    demo: null,
  },
  {
    id: "tantsaha-connect",
    slug: "tantsaha-connect",
    title: "Tantsaha Connect",
    role: { fr: "Développeur Mobile", en: "Mobile Developer" },
    type: { fr: "Projet académique", en: "Academic project" },
    category: { fr: "Mobile", en: "Mobile" },
    description: {
      fr: "Application mobile d'utilité publique avec météo en temps réel et stockage local.",
      en: "Public-interest mobile application with real-time weather and local storage.",
    },
    context: {
      fr: "Projet académique de développement mobile : une application d'utilité publique.",
      en: "Academic mobile development project: a public-interest application.",
    },
    objective: {
      fr: "Fournir une application mobile d'utilité publique avec météo en temps réel et stockage local.",
      en: "Deliver a public-interest mobile app with real-time weather and local storage.",
    },
    work: {
      fr: [
        "Conception de l'interface",
        "Intégration d'API externes",
        "Persistance des données",
        "Développement mobile",
        "Déploiement avec Expo CLI",
      ],
      en: [
        "Interface design",
        "External API integration",
        "Data persistence",
        "Mobile development",
        "Deployment with Expo CLI",
      ],
    },
    features: {
      fr: [
        "Météo en temps réel",
        "Stockage local",
        "Intégration d'API externes",
        "Interface mobile",
      ],
      en: [
        "Real-time weather",
        "Local storage",
        "External API integration",
        "Mobile interface",
      ],
    },
    architecture: null,
    technologies: ["React Native", "JavaScript", "Expo CLI"],
    image: "/projects/tantsaha-connect/cover.png",
    screenshots: [],
    github: null,
    demo: null,
  },
  {
    id: "agenda-personnel",
    slug: "agenda-personnel",
    title: "Agenda Personnel",
    role: { fr: "Développeur Web", en: "Web Developer" },
    type: { fr: "Projet académique", en: "Academic project" },
    category: { fr: "Web", en: "Web" },
    description: {
      fr: "Application web de gestion des tâches et de l'emploi du temps, avec priorisation, tableau de bord statistique et thèmes clair et sombre.",
      en: "Web app for managing tasks and schedules, with task prioritization, a statistics dashboard, and light and dark themes.",
    },
    context: {
      fr: "Projet académique de développement d'un agenda web personnel pour organiser les tâches et l'emploi du temps.",
      en: "Academic project to build a personal web planner for organizing tasks and schedules.",
    },
    objective: {
      fr: "Faciliter l'organisation quotidienne grâce à la gestion des tâches, leur catégorisation et leur priorisation.",
      en: "Make daily planning easier through task management, categorization, and prioritization.",
    },
    work: {
      fr: [
        "Conception de la base de données",
        "Authentification des utilisateurs et gestion des sessions",
        "Catégorisation et priorisation des tâches",
        "Tableau de bord statistique",
        "Sécurisation des requêtes avec PDO",
      ],
      en: [
        "Database design",
        "User authentication and session management",
        "Task categorization and prioritization",
        "Statistics dashboard",
        "Secure queries with PDO",
      ],
    },
    features: {
      fr: [
        "Gestion de tâches et d'emploi du temps",
        "Catégorisation et priorisation des tâches",
        "Tableau de bord statistique",
        "Thème clair et thème sombre",
      ],
      en: [
        "Task and schedule management",
        "Task categorization and prioritization",
        "Statistics dashboard",
        "Light and dark themes",
      ],
    },
    architecture: {
      fr: [
        "Base de données MySQL",
        "Gestion des sessions utilisateur",
        "Requêtes sécurisées avec PDO",
      ],
      en: [
        "MySQL database",
        "User session management",
        "Secure database queries with PDO",
      ],
    },
    technologies: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Bootstrap", "XAMPP"],
    image: "/projects/agenda-personnel/cover.png",
    screenshots: [],
    github: null,
    demo: null,
  },
];

export const projectTechNames = (project: Project) =>
  project.technologies.map((name) => ({ name: same(name), raw: name }));