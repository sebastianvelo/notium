import { createClient } from "@/lib/db/supabase/SupabaseServer"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/"

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        console.log("✅ Exchange result - Error:", error);
        console.log("✅ Session:", data.session ? "EXISTS" : "NULL");

        if (!error && data.user) {
            try {
                const user = data.user;

                const response = await fetch(`${origin}/api/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: user.id,
                        email: user.email,
                        name: user.user_metadata?.full_name ||
                            user.user_metadata?.name ||
                            user.email?.split('@')[0],
                        avatar: user.user_metadata?.avatar_url ||
                            user.user_metadata?.picture,
                        provider: user.app_metadata?.provider,
                    }),
                });

                if (!response.ok) {
                    console.error("❌ Error registrando usuario:", await response.text());
                }
            } catch (err) {
                console.error("❌ Error al llamar a /api/user:", err);
            }

            // Redirige después de intentar registrar
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }

        console.log("❌ Error exchanging code:", error);
    }

    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}