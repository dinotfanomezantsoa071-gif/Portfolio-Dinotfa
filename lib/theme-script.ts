import { STORAGE_KEYS } from "@/lib/constants";

/**
 * Script exécuté avant le premier affichage : applique le thème et la langue
 * sauvegardés, pour éviter tout flash blanc au chargement.
 */
export const themeInitScript = `(function(){try{var d=document.documentElement;var t=localStorage.getItem(${JSON.stringify(
  STORAGE_KEYS.theme,
)});var dark=t!=="light";d.classList.toggle("dark",dark);d.classList.toggle("light",!dark);d.style.colorScheme=dark?"dark":"light";var l=localStorage.getItem(${JSON.stringify(
  STORAGE_KEYS.locale,
)});d.lang=l==="en"?"en":"fr";}catch(e){}})();`;