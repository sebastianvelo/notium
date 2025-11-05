"use client";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import LanguageSelector from "./actions/LanguageSelector";
import ThemeToggleButton from "./actions/ThemeToggleButton";
import Brand from "./Brand";
import Text from "@/components/ui/atoms/text/Text";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white dark:bg-black border-b border-secondary-200 dark:border-secondary-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Brand />
                    <div className="flex items-center space-x-4">
                        <LanguageSelector />
                        <ThemeToggleButton />
                        <Link href={ROUTES.LOGIN}>
                            <Text>Sign in</Text>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;