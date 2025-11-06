import { NextResponse } from "next/server";
import UserService from "@/lib/service/UserService";
import WorkspaceService from "@/lib/service/WorkspaceService";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const workspace = await WorkspaceService.getWorkspaceById(id);
        if (!workspace) return NextResponse.json({ error: "Not found" }, { status: 404 });

        const members = await UserService.getAllUsers(); // 🔥 ajustá al nombre real
        return NextResponse.json(members);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await request.json();
        const { userId, role } = body;

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        const workspace = await WorkspaceService.getWorkspaceById(id);
        if (!workspace) {
            return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
        }

        const newMember = await WorkspaceService.addMember(id, userId, role ?? "member"); // 🔥 ajustá al nombre real
        return NextResponse.json(newMember, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to add member" }, { status: 500 });
    }
}
