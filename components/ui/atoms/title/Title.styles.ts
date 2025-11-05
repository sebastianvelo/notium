import { TitleSize, TitleStyleProps } from "./types";

const baseStyles = "font-bold text-secondary-900 dark:text-secondary-100 leading-tight";

const sizes: Record<TitleSize, string> = {
    xs: "text-lg",
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
    "2xl": "text-5xl",
    "3xl": "text-6xl",
};

const getStyle = ({ size = "md" }: TitleStyleProps) => `${baseStyles} ${sizes[size]}`;

export default getStyle;