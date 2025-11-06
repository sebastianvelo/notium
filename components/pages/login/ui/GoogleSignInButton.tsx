import Button from "@/components/ui/atoms/button/Button";
import GoogleIcon from "@/components/ui/icons/GoogleIcon";
import useOAuthSignIn from "@/hooks/controller/useOAuthSignIn";

const GoogleSignInButton: React.FC = () => {
    const { handleSignIn } = useOAuthSignIn({ provider: "google" });

    return (
        <div className="space-y-4">
            <Button className="w-full flex items-center justify-center space-x-3" size="lg" onClick={handleSignIn}>
                <GoogleIcon />
                <span>Sign in with Google</span>
            </Button>
        </div>
    );
};

export default GoogleSignInButton;