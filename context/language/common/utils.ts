import { Language, LanguageProps, Locale } from '../types/types';

export const LangLS = "lang";

export const LANGUAGES: LanguageProps[] = [
    {
        code: Language.EN,
        label: "English",
        flag: "🇺🇸",
        nativeName: "English"
    },
    {
        code: Language.ES,
        label: "Español",
        flag: "🇪🇸",
        nativeName: "Español"
    },
];

export const getBrowserLanguage = (): Locale => {
    const browserLang = navigator.language.slice(0, 2).toLowerCase() as Locale;

    const supportedLanguages: Locale[] = ["en", "es"];

    if (supportedLanguages.includes(browserLang)) {
        return browserLang;
    }

    return Language.EN;
};

export const getInitialLanguage = (defLang?: Locale): Locale => {
    if (typeof window === "undefined") return "es";
    const storedLang = localStorage.getItem(LangLS) as Locale | null;

    const validLanguages: Locale[] = ["en", "es"];

    if (storedLang && validLanguages.includes(storedLang)) {
        return storedLang;
    }

    if (defLang && validLanguages.includes(defLang)) {
        return defLang;
    }

    return getBrowserLanguage();
};

export const getLanguageInfo = (code: Locale): LanguageProps | undefined => {
    return LANGUAGES.find(lang => lang.code === code);
};

export const isValidLanguage = (code: string): code is Locale => {
    const validCodes: string[] = ["en", "es"];
    return validCodes.includes(code);
};

/**
 * Reemplaza placeholders numéricos en un template por los valores de un array.
 * Sólo reconoce índices enteros >= 0.
 *
 * @param template - Cadena con placeholders como "{0}", "{1}", ...
 * @param data - Array cuyos elementos serán usados para sustituir.
 * @returns Cadena con los placeholders reemplazados.
 */
export const replacePlaceholders = (template: string, data: Array<string | number>): string => {
    return template.replace(/\{(\d+)\}/g, (match, group) => {
        const idx = Number(group);
        return idx < data.length && data[idx] !== undefined
            ? String(data[idx])
            : match;
    });
};