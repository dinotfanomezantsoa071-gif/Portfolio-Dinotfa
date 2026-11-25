const TECH_ICONS: Record<string, string> = {
  JavaScript: "simple-icons:javascript",
  Python: "simple-icons:python",
  Java: "simple-icons:openjdk",
  SQL: "lucide:database",
  PHP: "simple-icons:php",
  React: "simple-icons:react",
  "React Native": "simple-icons:react",
  "Node.js": "simple-icons:nodedotjs",
  Express: "simple-icons:express",
  Django: "simple-icons:django",
  MySQL: "simple-icons:mysql",
  PostgreSQL: "simple-icons:postgresql",
  NoSQL: "lucide:database",
  Git: "simple-icons:git",
  GitHub: "simple-icons:github",
  XAMPP: "simple-icons:xampp",
  Expo: "simple-icons:expo",
  "Expo CLI": "simple-icons:expo",
  Laragon: "lucide:server",
  Tkinter: "lucide:app-window",
  Docker: "simple-icons:docker",
  "Spring Boot": "simple-icons:springboot",
  Angular: "simple-icons:angular",
  Laravel: "simple-icons:laravel",
};

const FALLBACK_ICON = "lucide:code";

export function getTechIcon(name: string): string {
  return TECH_ICONS[name] ?? FALLBACK_ICON;
}