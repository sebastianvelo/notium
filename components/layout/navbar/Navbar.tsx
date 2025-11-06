"use client";
import { useEffect, useState } from "react";
import Text from "@/components/ui/atoms/text/Text";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import LanguageSelector from "./actions/LanguageSelector";
import ThemeToggleButton from "./actions/ThemeToggleButton";
import Brand from "./Brand";

interface User {
    id: string;
    name: string;
    email: string;
}

const Navbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const userData = await res.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                setUser(null);
                window.location.href = ROUTES.HOME;
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className="bg-gradient-to-l from-secondary-200 via-white to-secondary-200 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950 border-b border-secondary-300 dark:border-secondary-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Brand />
                    <div className="flex items-center space-x-4">
                        <LanguageSelector />
                        <ThemeToggleButton />

                        {isLoading ? (
                            <div className="w-16 h-6 animate-pulse bg-secondary-200 dark:bg-secondary-700 rounded" />
                        ) : user ? (
                            <div className="flex items-center space-x-3">
                                <Text className="text-sm font-medium">
                                    {user.name || user.email}
                                </Text>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-1.5 text-sm font-medium text-secondary-700 dark:text-secondary-300 hover:text-secondary-900 dark:hover:text-white transition-colors"
                                >
                                    Sign out
                                </button>
                            </div>
                        ) : (
                            <Link href={ROUTES.LOGIN}>
                                <Text>Sign in</Text>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;