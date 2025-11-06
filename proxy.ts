import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"
import ROUTES from "./constants/routes"

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    // actualiza response cookies
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user && !request.nextUrl.pathname.startsWith(ROUTES.LOGIN)) {
        return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }
    if (user && request.nextUrl.pathname.startsWith(ROUTES.LOGIN)) {
        return NextResponse.redirect(new URL(ROUTES.WORKSPACES, request.url));
    }

    return ;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
