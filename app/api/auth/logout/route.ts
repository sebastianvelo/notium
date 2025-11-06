import { createClient } from "@/lib/db/supabase/SupabaseServer";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("❌ Error signing out:", error);
            return NextResponse.json(
                { error: "Failed to sign out" },
                { status: 500 }
            );
        }

        console.log("✅ User signed out successfully");

        return NextResponse.json(
            { message: "Signed out successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ Error in /api/auth/logout:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}