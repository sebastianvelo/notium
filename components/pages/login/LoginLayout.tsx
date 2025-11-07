"use client";
import GoogleSignInButton from "@/components/pages/login/ui/GoogleSignInButton";
import Brand from "@/components/ui/app/Brand";
import Text from "@/components/ui/atoms/text/Text";
import Card, { CardBody, CardFooter, CardHeader } from "@/components/ui/molecules/card/Card";
import I18n from "@/context/language/common/I18nKeys";

const LoginLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-primary-50 to-indigo-100 flex items-baseline justify-center py-8">
            <Card className="max-w-md" hover>
                <CardHeader className="space-y-1">
                    <Brand />
                    <Text weight="bold" t={I18n.LOGIN.DESCRIPTION} />
                </CardHeader>
                <CardBody className="space-y-3">
                    <GoogleSignInButton />
                </CardBody>
                <CardFooter>
                    <Text size="xs" t={I18n.LOGIN.DISCLAIMER} />
                </CardFooter>
            </Card>
        </div>
    );
}

export default LoginLayout;