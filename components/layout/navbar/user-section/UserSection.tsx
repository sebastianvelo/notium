import UserAvatar from "@/components/ui/app/UserAvatar";
import Button from "@/components/ui/atoms/button/Button";
import Text from "@/components/ui/atoms/text/Text";
import Card, { CardBody, CardFooter, CardHeader } from "@/components/ui/molecules/card/Card";
import ROUTES from "@/constants/routes";
import useAuth from "@/hooks/controller/useAuth";
import Link from "next/link";

const UserSection: React.FC = () => {
    const { user, isLoading, logout } = useAuth();

    if (isLoading) {
        return (
            <div className="w-16 h-6 animate-pulse bg-primary-200 dark:bg-primary-700 rounded" />
        );
    }

    if (user) {
        return (
            <details>
                <summary className="list-none cursor-pointer">
                    <UserAvatar name={user.name} />
                </summary>
                <Card className="absolute">
                    <CardHeader>
                        <Text weight="bold">{user.name}</Text>
                        <Text size="xs">{user.email}</Text>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-center">
                        <Button size="sm" onClick={logout} variant="danger">
                            Sign out
                        </Button>
                    </CardFooter>
                </Card>
            </details>
        );
    }

    return (
        <Link href={ROUTES.LOGIN}>
            <Text>Sign in</Text>
        </Link>
    );
};

export default UserSection;