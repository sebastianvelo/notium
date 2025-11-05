import { TextSize, TextVariant, TextWeight, TextStyleProps } from "./types";

const baseStyles = "text-secondary-700";

const variants: Record<TextVariant, string> = {
    body: "leading-normal",
    caption: "leading-tight text-secondary-600",
    label: "leading-snug font-medium",
    helper: "leading-tight text-secondary-500",
};

const sizes: Record<TextSize, string> = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
};

const weights: Record<TextWeight, string> = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
};

const getStyle = ({ variant = "body", size = "md", weight = "normal" }: TextStyleProps) =>
    `${baseStyles} ${variants[variant]} ${sizes[size]} ${weights[weight]}`;

export default getStyle;
