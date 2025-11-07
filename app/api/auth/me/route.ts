import { createClient } from "@/lib/db/supabase/SupabaseServer";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = await createClient();

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        return NextResponse.json({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || null,
            avatar: user.user_metadata?.avatar_url || null,
        });

    } catch (error) {
        console.error("❌ Error in /api/auth/me:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}