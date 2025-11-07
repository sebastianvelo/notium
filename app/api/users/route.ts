import UserService from "@/lib/service/UserService";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔵 [/api/users POST] Inicio");

        const body = await request.json();
        console.log("📦 Body recibido:", JSON.stringify(body, null, 2));

        // Validación básica
        if (!body.id || !body.email) {
            console.log("❌ Validación fallida: id o email faltante");
            return NextResponse.json(
                { error: "ID y email son requeridos" },
                { status: 400 }
            );
        }

        console.log("🔄 Registrando/actualizando usuario...");

        const result = await UserService.registerUser({
            id: body.id,  // ← Asegúrate de incluir el ID
            email: body.email,
            name: body.name,
            avatar: body.avatar,
        });

        console.log("✅ Usuario procesado exitosamente:", JSON.stringify(result, null, 2));
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        return NextResponse.json({
            success: true,
            user: result
        });

    } catch (error) {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("❌ [/api/users POST] Error:");
        console.error("  ├─ Type:", error instanceof Error ? error.constructor.name : typeof error);
        console.error("  ├─ Message:", error instanceof Error ? error.message : String(error));
        console.error("  └─ Stack:", error instanceof Error ? error.stack : "N/A");

        // Si es un error de Supabase, mostrarlo
        if (error && typeof error === 'object' && 'code' in error) {
            console.error("  └─ Supabase Error Code:", (error as any).code);
            console.error("  └─ Supabase Error Details:", (error as any).details);
        }
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        return NextResponse.json(
            {
                error: "Error interno del servidor",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}