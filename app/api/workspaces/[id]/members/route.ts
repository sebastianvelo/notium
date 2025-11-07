import { APIResponse, ParamsId } from "@/app/api/types";
import { createClient } from "@/lib/db/supabase/SupabaseServer";
import MemberService from "@/lib/service/MemberService";
import WorkspaceService from "@/lib/service/WorkspaceService";
import Workspace from "@/types/model/Workspace";
import MemberItemView from "@/types/view/MemberItemView";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: ParamsId): APIResponse<MemberItemView[]> {
    const { id } = await params;

    try {
        const workspace: Workspace | null = await WorkspaceService.getWorkspaceById(id);
        if (!workspace) {
            return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const members: MemberItemView[] = await MemberService.getMembersViewsByWorkspace(id, user.id);
        return NextResponse.json(members);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: ParamsId) {
    const { id: workspaceId } = await params;

    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = await request.json();

        // Validaciones
        if (!body.email || !body.role) {
            return NextResponse.json(
                { error: "Email y role son requeridos" },
                { status: 400 }
            );
        }

        const member = await MemberService.getMembersByWorkspace(workspaceId);

        const result = await MemberService.inviteMember({
            workspaceId,
            email: body.email,
            role: body.role,
            invitedBy: user.id,
        });

        return NextResponse.json({
            success: true,
            message: result.id
                ? "Miembro agregado exitosamente"
                : "Invitación enviada (usuario se agregará al registrarse)",
            data: result
        });

    } catch (error) {
        console.error("Error invitando miembro:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Error interno" },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const { memberId, role } = await request.json();
        if (!memberId || !role) {
            return NextResponse.json({ error: "memberId and role are required" }, { status: 400 });
        }
        const updated = await MemberService.updateMemberRole(memberId, role);
        if (!updated) {
            return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }
        return NextResponse.json(updated, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to update member role" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { memberId } = await request.json();
        if (!memberId) {
            return NextResponse.json({ error: "memberId is required" }, { status: 400 });
        }

        const deleted = await MemberService.removeMember(memberId);
        if (!deleted) {
            return NextResponse.json({ error: "Member not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to remove member" }, { status: 500 });
    }
}