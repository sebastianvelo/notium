import API_ROUTES from "@/constants/api.routes";
import { createClient } from "@/lib/db/supabase/SupabaseClient";
import { Provider } from "@supabase/supabase-js";

interface UseOAuthSignInParams {
    provider?: Provider;
}

interface UseOAuthSignInReturn {
    handleSignIn: () => Promise<void>;
    isLoading: boolean;
}

const useOAuthSignIn = ({ provider = "google" }: UseOAuthSignInParams = {}): UseOAuthSignInReturn => {
    const handleSignIn = async () => {
        const supabase = createClient();

        await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}${API_ROUTES.AUTH.CALLBACK}`,
            },
        });
    };

    return {
        handleSignIn,
        isLoading: false
    };
};

export default useOAuthSignIn;