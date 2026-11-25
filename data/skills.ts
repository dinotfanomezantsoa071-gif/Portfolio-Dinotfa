import { getTechIcon } from "@/lib/tech-icons";
import { same } from "@/lib/utils";
import type { SkillCategory, SkillItem } from "@/types";

const tech = (name: string): SkillItem => ({
  name: same(name),
  icon: getTechIcon(name),
});

const concept = (fr: string, en: string, icon: string): SkillItem => ({
  name: { fr, en },
  icon,
});

/** Compétences principales. */
export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    icon: "lucide:code",
    title: { fr: "Langages", en: "Languages" },
    items: [
      tech("JavaScript"),
      tech("Python"),
      tech("Java"),
      tech("SQL"),
      tech("PHP"),
    ],
  },
  {
    id: "frameworks",
    icon: "lucide:layers",
    title: { fr: "Frameworks & technologies", en: "Frameworks & Technologies" },
    items: [
      tech("React"),
      tech("React Native"),
      tech("Node.js"),
      tech("Express"),
      tech("Django"),
    ],
  },
  {
    id: "databases",
    icon: "lucide:database",
    title: { fr: "Bases de données", en: "Databases" },
    items: [tech("MySQL"), tech("PostgreSQL"), tech("NoSQL")],
  },
  {
    id: "tools",
    icon: "lucide:wrench",
    title: { fr: "Outils", en: "Tools" },
    items: [
      tech("Git"),
      tech("GitHub"),
      tech("XAMPP"),
      tech("Expo"),
      tech("Laragon"),
    ],
  },
  {
    id: "design",
    icon: "lucide:pencil-ruler",
    title: { fr: "Conception", en: "Design" },
    items: [
      concept("UML", "UML", "lucide:workflow"),
      concept("Architecture MVC", "MVC architecture", "lucide:layers"),
      concept("MERISE", "MERISE", "lucide:network"),
      concept("Algorithmique", "Algorithmics", "lucide:binary"),
      concept("Structures de données", "Data structures", "lucide:boxes"),
    ],
  },
];

/** Notions : volontairement séparées des compétences principales. */
export const notions: SkillCategory = {
  id: "notions",
  icon: "lucide:compass",
  title: { fr: "Notions", en: "Basic knowledge" },
  items: [
    tech("Docker"),
    concept("Data Engineering", "Data Engineering", "lucide:database"),
    concept("Cryptographie", "Cryptography", "lucide:lock"),
    tech("Spring Boot"),
    tech("Angular"),
    tech("Laravel"),
  ],
};