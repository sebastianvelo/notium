import { ButtonSize, ButtonStyleProps, ButtonVariant } from "./types";

const baseStyles = "font-medium rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary-400 text-white hover:bg-primary-500 focus:ring-primary-500 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-400 dark:focus:ring-primary-400",
    secondary: "bg-secondary-200 text-secondary-900 hover:bg-secondary-300 focus:ring-secondary-500 dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700 dark:focus:ring-secondary-400",
    ghost: "bg-transparent text-secondary-700 hover:bg-white/50 focus:ring-secondary-500 dark:text-secondary-200 dark:hover:bg-black/50 dark:focus:ring-secondary-400",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-700 dark:text-white dark:hover:bg-red-800 dark:focus:ring-red-400",
};

const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
};

const getStyle = ({ variant = "primary", size = "md" }: ButtonStyleProps) => `${baseStyles} ${variants[variant]} ${sizes[size]}`;

export default getStyle;