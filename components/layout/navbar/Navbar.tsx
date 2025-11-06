"use client";
import Brand from "@/components/ui/app/Brand";
import LanguageSelector from "./actions/LanguageSelector";
import ThemeToggleButton from "./actions/ThemeToggleButton";
import UserSection from "./user-section/UserSection";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gradient-to-l from-secondary-200 via-white to-secondary-200 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 border-b border-secondary-300 dark:border-secondary-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Brand />
                    <div className="flex items-center space-x-4">
                        <LanguageSelector />
                        <ThemeToggleButton />
                        <UserSection />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;