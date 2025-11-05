import useI18N from "@/hooks/app/useI18N";
import React from "react";
import getStyle from "./Title.styles";
import { TitleLevel, TitleStyleProps } from "./types";

interface TitleProps extends TitleStyleProps, React.HTMLAttributes<HTMLHeadingElement> {
    as?: TitleLevel;
    t?: string;
}

const Title: React.FC<TitleProps> = ({ level, size, as, children, t, className = "", ...props }) => {
    const { t: translate } = useI18N();
    const Component = as || level || "h2";
    const content = t ? translate(t) : children;

    return (
        <Component className={`${getStyle({ level, size })} ${className}`} {...props}>
            {content}
        </Component>
    );
};

export default Title;