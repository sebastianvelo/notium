import React, { ComponentProps } from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick, hover = false }) => {
    const hoverStyles = hover ? "hover:shadow-lg hover:border-secondary-300 cursor-pointer" : "";

    return (
        <div className={`bg-white border border-secondary-200 rounded-lg shadow-sm transition-all ${hoverStyles} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

export default Card;

export const CardHeader: React.FC<ComponentProps<"div">> = ({ children, className = "" }) => {
    return (
        <div className={`px-6 py-4 border-b border-secondary-200 ${className}`}>
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
        <div className={`px-6 py-4 border-t border-secondary-200 bg-secondary-50 rounded-b-lg ${className}`}>
            {children}
        </div>
    );
};
