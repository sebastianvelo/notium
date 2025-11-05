export type TitleLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface TitleStyleProps {
    level?: TitleLevel;
    size?: TitleSize;
}