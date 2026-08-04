"use client";

import { useTranslation } from "@/contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "tg" : "en")}
      className="language-switcher-btn"
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#003B5C";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "#fff";
        e.currentTarget.style.color = "#003B5C";
      }}
    >
      {language === "en" ? "EN" : "TG"}
    </button>
  );
};

export default LanguageSwitcher;
