import { useState } from "react";

export type DisplayLanguage = "english" | "sanskrit" | "both";

const STORAGE_KEY = "yoga-language";

export function useLanguagePreference() {
  const [language, setLanguage] = useState<DisplayLanguage>(
    () => (localStorage.getItem(STORAGE_KEY) as DisplayLanguage) || "both"
  );

  const setLang = (lang: DisplayLanguage) => {
    setLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  return { language, setLanguage: setLang };
}
