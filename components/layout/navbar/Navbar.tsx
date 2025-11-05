"use client";
import Button from "@/components/ui/atoms/button/Button";
import Link from "next/link";
import LanguageSelector from "./actions/LanguageSelector";
import ThemeToggleButton from "./actions/ThemeToggleButton";
import ROUTES from "@/constants/routes";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white dark:bg-black border-b border-secondary-200 dark:border-secondary-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href={ROUTES.WORKSPACES} className="flex items-center">
                            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">Notapp</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-secondary-300 dark:bg-secondary-800 rounded-full flex items-center justify-center">
                                <span className="text-sm font-medium text-secondary-700">JD</span>
                            </div>
                            <span className="text-sm text-secondary-700">john@example.com</span>
                        </div>
                        <Button variant="ghost" size="sm">
                            Sign Out
                        </Button>
                        <LanguageSelector />
                        <ThemeToggleButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;