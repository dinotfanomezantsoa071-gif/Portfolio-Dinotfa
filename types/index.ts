export type Locale = "fr" | "en";

export type Theme = "light" | "dark";

export type Localized<T> = Record<Locale, T>;

export type LocalizedText = Localized<string>;

export type LocalizedList = Localized<string[]>;

export interface Profile {
  name: string;
  fullName: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  cvPath: string;
  /** Chemin vers la photo (ex : "/images/profile/dinot.jpg"), ou null. */
  photo: string | null;
}

export interface Quality {
  id: string;
  icon: string;
  label: LocalizedText;
}

export interface SpokenLanguage {
  id: string;
  name: LocalizedText;
  level: LocalizedText;
}

export interface Interest {
  id: string;
  icon: string;
  label: LocalizedText;
}

export interface SkillItem {
  name: LocalizedText;
  icon: string;
}

export interface SkillCategory {
  id: string;
  icon: string;
  title: LocalizedText;
  items: SkillItem[];
}

export interface EducationEntry {
  id: string;
  period: LocalizedText;
  title: LocalizedText;
  track: LocalizedText | null;
  institution: string;
  topics: LocalizedList | null;
}

export interface Screenshot {
  src: string;
  alt: LocalizedText;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  role: LocalizedText;
  type: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
  /** Champs configurables : null = section masquée ou "à venir". */
  context: LocalizedText | null;
  objective: LocalizedText | null;
  work: LocalizedList;
  features: LocalizedList;
  architecture: LocalizedList | null;
  /** Noms des technologies (voir lib/tech-icons.ts pour les icônes). */
  technologies: string[];
  /** Chemin dans /public (ex : "/projects/urbania-2035/cover.jpg"), ou null. */
  image: string | null;
  screenshots: Screenshot[];
  github: string | null;
  demo: string | null;
}