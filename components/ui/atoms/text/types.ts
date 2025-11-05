export type TextVariant = "body" | "caption" | "label" | "helper";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextAlign = "left" | "center" | "right" | "justify";
export type TextTransform = "uppercase" | "lowercase" | "capitalize" | "normal-case";

export interface TextStyleProps {
    variant?: TextVariant;
    size?: TextSize;
    weight?: TextWeight;
    align?: TextAlign;
    transform?: TextTransform;
}

