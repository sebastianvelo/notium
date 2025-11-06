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
    xl: "text-2xl",
}

const iconSize = {
    sm: "h-2 w-2",
    lg: "h-3 w-3",
    xl: "h-4 w-4",
}

const Brand: React.FC<BrandProps> = ({ size = "xl" }) => {
    const commonStyles = `${textSize[size]}  tracking-widest font-bold font-brand`;
    
    return (
        <div className="flex items-center">
            <Link href={ROUTES.WORKSPACES} className="flex items-center space-x-1">
                <Notebook className={`text-primary-600 dark:text-primary-400 iconSize ${iconSize[size]}`} />
                <div>
                    <span className={`${commonStyles} text-primary-600 dark:text-primary-500`}>Not</span>
                    <span className={`${commonStyles} text-primary-400 dark:text-primary-300`}>ium</span>
                </div>
            </Link>
        </div>
    );
};

export default Brand;