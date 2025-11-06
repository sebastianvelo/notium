import { ParamsId } from "@/app/api/types";
import MemberService from "@/lib/service/MemberService";
import WorkspaceService from "@/lib/service/WorkspaceService";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: ParamsId) {
    const { id } = await params;

    try {
        const workspace = await WorkspaceService.getWorkspaceById(id);
        if (!workspace) {
            return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
        }

        const members = await MemberService.getMembersByWorkspace(id);
        return NextResponse.json(members);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: ParamsId) {
    const { id } = await params;

    try {
        const body = await request.json();
        const { userId, role } = body;

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        // Validar workspace
        const workspace = await WorkspaceService.getWorkspaceById(id);
        if (!workspace) {
            return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
        }

        // Crear miembro
        const newMember = await MemberService.addMember({
            userId,
            workspaceId: id,
            role: role ?? "viewer",
            joinedAt: new Date().toISOString(),
        });

        return NextResponse.json(newMember, { status: 201 });
    } catch (err: any) {
        console.error(err);

        if (err.message?.includes("already")) {
            return NextResponse.json({ error: err.message }, { status: 409 }); // conflict
        }

        return NextResponse.json({ error: "Failed to add member" }, { status: 500 });
    }
}
