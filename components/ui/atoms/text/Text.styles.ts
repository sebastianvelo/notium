import { TextSize, TextVariant, TextWeight, TextStyleProps, TextAlign, TextTransform } from "./types";

const baseStyles = "text-secondary-700 dark:text-secondary-300";

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

const aligns: Record<TextAlign, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
};

const transforms: Record<TextTransform, string> = {
    uppercase: "uppercase",
    lowercase: "lowercase",
    capitalize: "capitalize",
    "normal-case": "normal-case",
};

const getStyle = ({ variant = "body", size = "md", weight = "normal", align = "left", transform = "normal-case" }: TextStyleProps) =>
    `${baseStyles} ${variants[variant]} ${sizes[size]} ${weights[weight]} ${aligns[align]} ${transforms[transform]}`;

export default getStyle;
