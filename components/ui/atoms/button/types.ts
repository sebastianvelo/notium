export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonStyleProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
}