"use client";
import GoogleSignInButton from "@/components/pages/login/ui/GoogleSignInButton";
import Text from "@/components/ui/atoms/text/Text";
import Title from "@/components/ui/atoms/title/Title";
import Card, { CardBody, CardFooter, CardHeader } from "@/components/ui/molecules/card/Card";

const LoginLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-primary-50 to-indigo-100 flex items-baseline justify-center p-4">
            <Card className="max-w-md" hover>
                <CardHeader className="space-y-3">
                    <Title size="xl">Notium</Title>
                    <Title size="xs" t={"Collaborate on notes with your team"} />
                </CardHeader>
                <CardBody className="space-y-3">
                    <GoogleSignInButton />
                </CardBody>
                <CardFooter>
                    <Text size="xs" t={"By signing in, you agree to our Terms of Service and Privacy Policy"} />
                </CardFooter>
            </Card>
        </div>
    );
}

export default LoginLayout;