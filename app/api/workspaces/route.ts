import { NextResponse } from "next/server";
import WorkspaceService from "@/lib/service/WorkspaceService";

export async function GET() {
    try {
        const workspaces = await WorkspaceService.getAllWorkspaces();
        return NextResponse.json(workspaces);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const created = await WorkspaceService.createWorkspace(body);
        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
