import { createClient } from "@/lib/db/supabase/SupabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createClient();

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        // Opcional: Obtener datos adicionales del perfil desde tu tabla de usuarios
        const { data: profile } = await supabase
            .from("profiles") // o el nombre de tu tabla
            .select("*")
            .eq("id", user.id)
            .single();

        return NextResponse.json({
            id: user.id,
            email: user.email,
            name: profile?.name || user.user_metadata?.name || null,
            avatar: profile?.avatar_url || user.user_metadata?.avatar_url || null,
            ...profile // incluye otros datos del perfil si existen
        });

    } catch (error) {
        console.error("❌ Error in /api/auth/me:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}