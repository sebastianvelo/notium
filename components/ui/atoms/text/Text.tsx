import useI18N from "@/hooks/app/useI18N";
import React from "react";
import getStyle from "./Text.styles";
import { TextStyleProps } from "./types";

interface TextProps extends TextStyleProps, React.HTMLAttributes<HTMLElement> {
    as?: "p" | "span" | "div" | "label";
    t?: string;
}

const Text: React.FC<TextProps> = ({ variant, size, weight, as = "p", children, t, className = "", ...props }) => {
    const { t: translate } = useI18N();
    const Component = as;
    const content = t ? translate(t) : children;

    return (
        <Component className={`${getStyle({ variant, size, weight })} ${className}`} {...props}>
            {content}
        </Component>
    );
};

export default Text;
