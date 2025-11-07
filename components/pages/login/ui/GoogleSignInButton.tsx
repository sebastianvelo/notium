import Button from "@/components/ui/atoms/button/Button";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import I18n from "@/context/language/common/I18nKeys";
import useI18N from "@/hooks/app/useI18N";
import useOAuthSignIn from "@/hooks/controller/useOAuthSignIn";

const GoogleSignInButton: React.FC = () => {
    const { t } = useI18N();
    const { handleSignIn } = useOAuthSignIn({ provider: "google" });

    return (
        <div className="space-y-4">
            <Button className="w-full flex items-center justify-center space-x-3" size="lg" onClick={handleSignIn}>
                <GoogleIcon />
                <span>{t(I18n.LOGIN.PROVIDERS.GOOGLE)}</span>
            </Button>
        </div>
    );
};

export default GoogleSignInButton;