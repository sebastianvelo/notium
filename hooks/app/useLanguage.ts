import LanguageContext, { LanguageContextType } from "@/context/language/LanguageContext";
import { useContext } from "react";

const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

export default useLanguage;