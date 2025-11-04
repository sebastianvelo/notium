"use client"
import Select from "@/components/ui/molecules/select/Select";
import { Locale } from "@/context/language/types/types";
import useIsMobile from "@/hooks/app/useIsMobile";
import useLanguage from "@/hooks/app/useLanguage";
import { SelectOption } from "@/hooks/components/useSelectInput";

const LanguageSelector: React.FC = () => {
    const isMobile = useIsMobile();
    const { lang, setLang, LANGUAGES } = useLanguage();

    const languageOptions: SelectOption[] = LANGUAGES.map((language) => ({
        label: `${language.flag} ${!isMobile ? language.label : ""}`,
        value: language.code
    }));

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLang(e.target.value as Locale);
    };

    return <Select name="language" value={lang} onChange={handleLanguageChange} options={languageOptions} />;
};

export default LanguageSelector;