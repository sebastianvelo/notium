import { createContext } from "react";
import { LanguageProps, Locale } from "./types/types";

export interface LanguageContextType {
  lang: Locale;
  setLang: React.Dispatch<React.SetStateAction<Locale>>;
  LANGUAGES: LanguageProps[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export default LanguageContext;