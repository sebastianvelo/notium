import WorkspaceService from "@/lib/service/WorkspaceService";
import Workspace from "@/types/model/Workspace";
import { NextResponse } from "next/server";
import { APIResponse, ParamsId } from "../../types";

export async function GET(request: Request, { params }: ParamsId): APIResponse<Workspace> {
    const { id } = await params;
    
    try {
        const workspace = await WorkspaceService.getWorkspaceById(id);
        if (!workspace) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(workspace);
    } catch {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: ParamsId): APIResponse<Workspace> {
    const { id } = await params;

    try {
        const body = await request.json();
        const updated = await WorkspaceService.updateWorkspace(id, body);
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch {
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: ParamsId): APIResponse {
    const { id } = await params;

    try {
        const ok = await WorkspaceService.deleteWorkspace(id);
        return NextResponse.json({ success: ok });
    } catch {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}