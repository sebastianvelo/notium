import React, { ComponentProps } from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick, hover = false }) => {
    const hoverStyles = hover ? "hover:shadow-lg hover:border-secondary-300 dark:border-secondary-800 cursor-pointer" : "";

    return (
        <div className={`backdrop-blur-xl bg-white/50 dark:bg-black/30 border border-secondary-200 dark:border-secondary-900 rounded-lg shadow-sm transition-all ${hoverStyles} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;

export const CardHeader: React.FC<ComponentProps<"div">> = ({ children, className = "" }) => {
    return (
        <div className={`px-6 py-4 border-b border-secondary-200 dark:border-secondary-900 ${className}`}>
            {children}
        </div>
    );
};

export const CardBody: React.FC<ComponentProps<"div">> = ({ children, className = "" }) => {
    return (
        <div className={`px-6 py-4 ${className}`}>
            {children}
        </div>
    );
};

export const CardFooter: React.FC<ComponentProps<"div">> = ({ children, className = "" }) => {
    return (
        <div className={`px-6 py-4 border-t border-secondary-200 dark:border-secondary-900 bg-secondary-50 dark:bg-secondary-950 rounded-b-lg ${className}`}>
            {children}
        </div>
    );
};
