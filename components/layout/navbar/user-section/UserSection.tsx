import Button from "@/components/ui/atoms/button/Button";
import Text from "@/components/ui/atoms/text/Text";
import ROUTES from "@/constants/routes";
import useAuth from "@/hooks/controller/useAuth";
import Link from "next/link";

const UserSection: React.FC = () => {
    const { user, isLoading, logout } = useAuth();

    if (isLoading) {
        return (
            <div className="w-16 h-6 animate-pulse bg-secondary-200 dark:bg-secondary-700 rounded" />
        );
    }

    if (user) {
        return (
            <div className="flex items-center space-x-3">
                <Text className="text-sm font-medium">
                    {user.name || user.email}
                </Text>
                <Button onClick={logout} variant="ghost">
                    Sign out
                </Button>
            </div>
        );
    }

    return (
        <Link href={ROUTES.LOGIN}>
            <Text>Sign in</Text>
        </Link>
    );
};

export default UserSection;