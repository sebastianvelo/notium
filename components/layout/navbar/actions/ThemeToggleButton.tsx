"use client"
import useDarkMode from "@/hooks/app/useDarkMode";
import { Moon, Sun } from "lucide-react";

const ThemeToggleButton: React.FC = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    const baseClasses = "rounded-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
    const colorClasses = "bg-white hover:bg-white/50 hover:text-sky-500 text-secondary-700 focus:ring-secondary-300 dark:bg-black/80 dark:hover:bg-black/50 dark:text-secondary-300 dark:hover:text-yellow-200"

    return (
        <button className={`${baseClasses} ${colorClasses}`} onClick={toggleDarkMode}>
            {darkMode ? <Sun /> : <Moon />}
        </button>
    );
};

export default ThemeToggleButton;