import API_ROUTES from "@/constants/api.routes";
import ROUTES from "@/constants/routes";
import { useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    email: string;
}

interface UseAuthReturn {
    user: User | null;
    isLoading: boolean;
    logout: () => Promise<void>;
}

const useAuth = (): UseAuthReturn => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(API_ROUTES.AUTH.ME);
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

    const logout = async () => {
        try {
            const res = await fetch(API_ROUTES.AUTH.LOGOUT, { method: "POST" });
            if (res.ok) {
                setUser(null);
                window.location.href = ROUTES.HOME;
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return { user, isLoading, logout };
};

export default useAuth;