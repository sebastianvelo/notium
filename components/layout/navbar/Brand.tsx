import ROUTES from "@/constants/routes";
import { Notebook } from "lucide-react";
import Link from "next/link";

const Brand: React.FC = () => {
    return (
        <div className="flex items-center">
            <Link href={ROUTES.WORKSPACES} className="flex items-center space-x-1">
                <Notebook className="text-primary-600 dark:text-primary-400 h-4 w-4" />
                <div>
                    <span className="text-2xl tracking-widest font-bold text-primary-600 dark:text-primary-500 font-brand">Not</span>
                    <span className="text-2xl tracking-widest font-bold text-primary-400 dark:text-primary-300 font-brand">ium</span>
                </div>
            </Link>
        </div>
    );
};

export default Brand;