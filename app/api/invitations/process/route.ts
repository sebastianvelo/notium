import { default as MemberRepository, default as memberRepository } from "@/lib/repository/member";
import PendingInvitationRepository from "@/lib/repository/pending-invitation";
import { MemberRole } from "@/types/model/Member";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("🔵 [Process Invitations] Inicio");

        const body = await request.json();
        const { userId, email } = body;

        console.log("📦 Datos recibidos:");
        console.log("  ├─ User ID:", userId);
        console.log("  └─ Email:", email);

        if (!userId || !email) {
            console.log("❌ Validación fallida: userId o email faltante");
            return NextResponse.json(
                { error: "userId y email son requeridos" },
                { status: 400 }
            );
        }

        console.log("🔍 Buscando invitaciones pendientes para:", email);

        // Buscar invitaciones pendientes para este email
        const pendingInvites = await PendingInvitationRepository.findByEmail(email);

        console.log("📨 Invitaciones encontradas:", pendingInvites.length);

        if (pendingInvites.length === 0) {
            console.log("✅ No hay invitaciones pendientes");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            return NextResponse.json({
                success: true,
                count: 0,
                message: "No hay invitaciones pendientes"
            });
        }

        // Procesar cada invitación
        const results = [];
        for (const invite of pendingInvites) {
            try {
                console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
                console.log("📝 Procesando invitación:");
                console.log("  ├─ ID:", invite.id);
                console.log("  ├─ Workspace:", invite.workspaceId);
                console.log("  └─ Role:", invite.role);

                // Verificar si ya es miembro (por si acaso)
                const existingMember = await memberRepository.findByUserInWorkspace(
                    userId,
                    invite.workspaceId
                );

                if (existingMember) {
                    console.log("⚠️ Usuario ya es miembro de este workspace, saltando...");
                    // Eliminar la invitación de todas formas
                    await PendingInvitationRepository.delete(invite.id);
                    continue;
                }

                // Crear el member
                const newMember = await MemberRepository.create({
                    userId: userId,
                    workspaceId: invite.workspaceId,
                    role: invite.role as MemberRole,
                    joinedAt: Date.now().toLocaleString()
                });

                console.log("✅ Member creado:", JSON.stringify(newMember, null, 2));

                // Eliminar la invitación pendiente
                await PendingInvitationRepository.delete(invite.id);
                console.log("✅ Invitación eliminada");

                results.push({
                    workspaceId: invite.workspaceId,
                    role: invite.role,
                    status: "success"
                });

            } catch (error) {
                console.error("❌ Error procesando invitación:", error);
                results.push({
                    workspaceId: invite.workspaceId,
                    role: invite.role,
                    status: "error",
                    error: error instanceof Error ? error.message : String(error)
                });
            }
        }

        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("✅ Procesamiento completado");
        console.log("  ├─ Total procesadas:", results.length);
        console.log("  ├─ Exitosas:", results.filter(r => r.status === "success").length);
        console.log("  └─ Fallidas:", results.filter(r => r.status === "error").length);
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        return NextResponse.json({
            success: true,
            count: results.filter(r => r.status === "success").length,
            results: results
        });

    } catch (error) {
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("❌ [Process Invitations] Error:");
        console.error("  ├─ Type:", error instanceof Error ? error.constructor.name : typeof error);
        console.error("  ├─ Message:", error instanceof Error ? error.message : String(error));
        console.error("  └─ Stack:", error instanceof Error ? error.stack : "N/A");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

        return NextResponse.json(
            {
                error: "Error al procesar invitaciones",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}