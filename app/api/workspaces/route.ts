import { APIResponse } from "@/app/api/types";
import WorkspaceCreateDTO from "@/lib/dto/WorkspaceCreateDTO";
import WorkspaceService from "@/lib/service/WorkspaceService";
import Workspace from "@/types/model/Workspace";
import { NextResponse } from "next/server";

export async function GET(): APIResponse<Workspace[]> {
    try {
        const workspaces: Workspace[] = await WorkspaceService.getWorkspacesByOwner("usr_1");
        return NextResponse.json(workspaces);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(request: Request): APIResponse<Workspace> {
    try {
        const body: WorkspaceCreateDTO = await request.json();
        const workspace: Workspace = await WorkspaceService.createWorkspace(body);
        return NextResponse.json(workspace, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
