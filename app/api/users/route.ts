import { createClient } from "@/lib/db/supabase/SupabaseServer";
import UserService from "@/lib/service/UserService";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error("❌ Usuario no autenticado:", authError);
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const result = await UserService.registerUser({
            email: body.email,
            name: body.name,
            avatar: body.avatar,
        });

        return NextResponse.json({
            success: true,
            user: result
        });

    } catch (error) {
        console.error("❌ Error interno:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}