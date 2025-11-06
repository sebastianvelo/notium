import { createClient } from "@/lib/db/supabase/SupabaseServer"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/"

    console.log("🔍 Callback received - Code:", code ? "YES" : "NO");
    console.log("🔍 Origin:", origin);
    console.log("🔍 Next:", next);

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        
        console.log("✅ Exchange result - Error:", error);
        console.log("✅ Session:", data.session ? "EXISTS" : "NULL");
        
        if (!error) {
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