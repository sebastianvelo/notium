export type Locale = "en" | "es";

export type Wordings = {
    [K in Locale]: {
        [key: string]: string | string[];
    };
};

export enum Language {
    EN = "en",
    ES = "es",
}

export type LanguageProps = {
    code: Language;
    label: string;
    flag: string;
    nativeName: string;
}