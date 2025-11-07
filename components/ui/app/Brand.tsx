import ROUTES from "@/constants/routes";
import { Notebook } from "lucide-react";
import Link from "next/link";

type BrandSize = "sm" | "lg" | "xl";

interface BrandProps {
    size?: BrandSize;
}

const textSize = {
    sm: "text-lg",
    lg: "text-xl",
    xl: "text-3xl",
}

const Brand: React.FC<BrandProps> = ({ size = "xl" }) => {
    const commonStyles = `${textSize[size]} tracking-tighter font-black font-brand`;

    return (
        <div className="flex items-center group">
            <Link href={ROUTES.WORKSPACES} className="flex items-center space-x-1">
                <div>
                    <span className={`${commonStyles} text-primary-600 dark:text-primary-300 italic group-hover:not-italic`}>No</span>
                    <span className={`${commonStyles} text-primary-700 dark:text-primary-400 group-hover:italic`}>ti</span>
                    <span className={`${commonStyles} text-primary-800 dark:text-primary-500 italic group-hover:not-italic`}>um</span>
                </div>
            </Link>
        </div>
    );
};

export default Brand;