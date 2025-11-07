import { createClient } from "@/lib/db/supabase/SupabaseServer"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/"

    console.log("🔵 [AUTH CALLBACK] Iniciando proceso de autenticación");
    console.log("🔵 Code presente:", !!code);
    console.log("🔵 Origin:", origin);
    console.log("🔵 Next redirect:", next);

    if (code) {
        const supabase = await createClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("📋 [EXCHANGE CODE] Resultado:");
        console.log("  ├─ Error:", error ? "❌ SÍ" : "✅ NO");
        if (error) {
            console.log("  ├─ Error message:", error.message);
            console.log("  └─ Error details:", JSON.stringify(error, null, 2));
        }
        console.log("  ├─ User:", data.user ? "✅ EXISTS" : "❌ NULL");
        console.log("  └─ Session:", data.session ? "✅ EXISTS" : "❌ NULL");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        if (!error && data.user) {
            try {
                const user = data.user;

                const userData = {
                    id: user.id,
                    email: user.email,
                    name: user.user_metadata?.full_name ||
                        user.user_metadata?.name ||
                        user.email?.split('@')[0],
                    avatar: user.user_metadata?.avatar_url ||
                        user.user_metadata?.picture,
                    provider: user.app_metadata?.provider,
                };

                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                console.log("📤 [API CALL] Enviando datos a /api/users:");
                console.log("  ├─ URL:", `${origin}/api/users`);
                console.log("  ├─ Method: POST");
                console.log("  └─ Body:", JSON.stringify(userData, null, 2));
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

                const response = await fetch(`${origin}/api/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                });

                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                console.log("📥 [API RESPONSE] Respuesta de /api/user:");
                console.log("  ├─ Status:", response.status);
                console.log("  ├─ Status Text:", response.statusText);
                console.log("  ├─ OK:", response.ok ? "✅ SÍ" : "❌ NO");
                console.log("  └─ Headers:", JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));

                if (!response.ok) {
                    const contentType = response.headers.get("content-type");
                    console.log("  ├─ Content-Type:", contentType);

                    let errorBody;
                    try {
                        if (contentType?.includes("application/json")) {
                            errorBody = await response.json();
                            console.log("  └─ Error Body (JSON):", JSON.stringify(errorBody, null, 2));
                        } else {
                            errorBody = await response.text();
                            console.log("  └─ Error Body (Text - primeros 500 chars):");
                            console.log(errorBody.substring(0, 500));
                            if (errorBody.length > 500) {
                                console.log("  └─ ... (truncado, total:", errorBody.length, "caracteres)");
                            }
                        }
                    } catch (parseError) {
                        console.log("  └─ ⚠️ No se pudo parsear el error body:", parseError);
                    }

                    console.error("❌ [ERROR] Falló el registro del usuario");
                } else {
                    const successBody = await response.json();
                    console.log("  └─ Success Body:", JSON.stringify(successBody, null, 2));
                    console.log("✅ [SUCCESS] Usuario registrado correctamente");
                }
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

            } catch (err) {
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                console.error("❌ [EXCEPTION] Error al llamar a /api/user:");
                console.error("  ├─ Error type:", err instanceof Error ? err.constructor.name : typeof err);
                console.error("  ├─ Message:", err instanceof Error ? err.message : String(err));
                console.error("  └─ Stack:", err instanceof Error ? err.stack : "N/A");
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            }

            // Redirige después de intentar registrar
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'

            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("🔀 [REDIRECT] Preparando redirección:");
            console.log("  ├─ Environment:", isLocalEnv ? "DEVELOPMENT" : "PRODUCTION");
            console.log("  ├─ Forwarded Host:", forwardedHost || "N/A");

            let redirectUrl;
            if (isLocalEnv) {
                redirectUrl = `${origin}${next}`;
            } else if (forwardedHost) {
                redirectUrl = `https://${forwardedHost}${next}`;
            } else {
                redirectUrl = `${origin}${next}`;
            }

            console.log("  └─ Final URL:", redirectUrl);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

            return NextResponse.redirect(redirectUrl);
        }

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("❌ [ERROR] Error exchanging code o no hay usuario");
        if (error) {
            console.log("  └─ Error details:", JSON.stringify(error, null, 2));
        }
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    } else {
        console.log("❌ [ERROR] No se recibió código de autenticación");
    }

    console.log("🔴 Redirigiendo a auth-code-error");
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}