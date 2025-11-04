"use client"
import React, { ReactNode, useEffect, useState } from "react";
import LanguageContext from "./LanguageContext";
import { getInitialLanguage, LangLS, LANGUAGES } from "./common/utils";
import type { Locale } from "./types/types";

interface LanguageProviderProps {
  children: ReactNode;
  lang?: Locale;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, lang: defLang }) => {
  const [lang, setLang] = useState<Locale>(getInitialLanguage(defLang));

  useEffect(() => {
    localStorage.setItem(LangLS, lang);
  }, [lang]);

  const contextValue = React.useMemo(() => ({ lang, setLang, LANGUAGES }), [lang, setLang]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;