import WorkspaceService from "@/lib/service/WorkspaceService";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const workspace = await WorkspaceService.getWorkspaceById(params.id);
        if (!workspace) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(workspace);
    } catch {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const updated = await WorkspaceService.updateWorkspace(params.id, body);
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const ok = await WorkspaceService.deleteWorkspace(params.id);
        return NextResponse.json({ success: ok });
    } catch {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
