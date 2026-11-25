import type { EducationEntry } from "@/types";

export const education: EducationEntry[] = [
  {
    id: "licence-3",
    period: { fr: "2024 — Présent", en: "2024 — Present" },
    title: {
      fr: "Licence 3 en Service Informatique aux Organisations",
      en: "Bachelor's Degree (L3) in IT Services for Organizations",
    },
    track: { fr: "Génie Logiciel", en: "Software Engineering" },
    institution: "ESMIA",
    topics: {
      fr: [
        "Algorithmique avancée",
        "Graphes",
        "Dijkstra",
        "Structures de données",
        "Développement d'applications",
        "Modélisation de bases de données avec UML",
        "Entraînement IA",
      ],
      en: [
        "Advanced algorithmics",
        "Graphs",
        "Dijkstra",
        "Data structures",
        "Application development",
        "Database modeling with UML",
        "AI training",
      ],
    },
  },
  {
    id: "baccalaureat",
    period: { fr: "2023", en: "2023" },
    title: {
      fr: "Baccalauréat — Série L",
      en: "Baccalaureate — Series L",
    },
    track: null,
    institution: "Lycée Moderne Ampefiloha (LMA), Antananarivo",
    topics: null,
  },
];