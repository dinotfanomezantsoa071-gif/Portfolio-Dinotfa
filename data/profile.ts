import type { Interest, Profile, Quality, SpokenLanguage } from "@/types";

export const profile: Profile = {
  name: "Dinot",
  fullName: "RAKOTONIRINA Fanomezantsoa Dino",
  location: "Antananarivo, Madagascar",
  email: "dinotfanomezantsoa071@gmail.com",
  phone: "+261 35 41 945 04",
  github: "https://github.com/dinotfanomezantsoa071-gif",
  linkedin: "https://www.linkedin.com/in/dinotrakotonirina/",
  cvPath: "/cv/CV_Dinot.pdf",
  // Exemple une fois ta photo placée dans public/images/profile/ :
  photo: "/images/profile/dinot.jpg",
};

export const qualities: Quality[] = [
  {
    id: "fast-learning",
    icon: "lucide:zap",
    label: { fr: "Apprentissage rapide", en: "Fast learner" },
  },
  {
    id: "autonomy",
    icon: "lucide:compass",
    label: { fr: "Autonomie", en: "Autonomy" },
  },
  {
    id: "responsibility",
    icon: "lucide:shield-check",
    label: { fr: "Sens des responsabilités", en: "Sense of responsibility" },
  },
  {
    id: "teamwork",
    icon: "lucide:users",
    label: { fr: "Esprit d'équipe", en: "Team spirit" },
  },
  {
    id: "rigor",
    icon: "lucide:ruler",
    label: { fr: "Rigueur", en: "Rigor" },
  },
  {
    id: "maturity",
    icon: "lucide:sprout",
    label: { fr: "Maturité", en: "Maturity" },
  },
];

export const spokenLanguages: SpokenLanguage[] = [
  {
    id: "french",
    name: { fr: "Français", en: "French" },
    level: { fr: "Courant", en: "Fluent" },
  },
  {
    id: "malagasy",
    name: { fr: "Malagasy", en: "Malagasy" },
    level: { fr: "Langue maternelle", en: "Native language" },
  },
  {
    id: "english",
    name: { fr: "Anglais", en: "English" },
    level: { fr: "Niveau intermédiaire", en: "Intermediate level" },
  },
];

export const interests: Interest[] = [
  {
    id: "football",
    icon: "mdi:soccer",
    label: { fr: "Football", en: "Football" },
  },
  {
    id: "digital-tech",
    icon: "lucide:cpu",
    label: { fr: "Technologies numériques", en: "Digital technologies" },
  },
  {
    id: "software-development",
    icon: "lucide:code",
    label: { fr: "Développement logiciel", en: "Software development" },
  },
];