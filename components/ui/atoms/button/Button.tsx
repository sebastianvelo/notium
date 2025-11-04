import React from "react";
import { ButtonStyleProps } from "./types";
import getStyle from "./Button.styles";

interface ButtonProps extends ButtonStyleProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size, children, className = "", ...props }) => {
    return (
        <button className={`${getStyle({ variant, size })} ${className}`} {...props}>
            {children}
        </button>
    );
}

export default Button;