export type TextVariant = "body" | "caption" | "label" | "helper";
export type TextSize = "xs" | "sm" | "md" | "lg";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

export interface TextStyleProps {
    variant?: TextVariant;
    size?: TextSize;
    weight?: TextWeight;
}

