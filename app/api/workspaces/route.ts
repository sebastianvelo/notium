import { APIResponse } from "@/app/api/types";
import { createClient } from "@/lib/db/supabase/SupabaseServer";
import WorkspaceCreateDTO from "@/lib/dto/WorkspaceCreateDTO";
import WorkspaceService from "@/lib/service/WorkspaceService";
import Workspace from "@/types/model/Workspace";
import WorkspaceItemView from "@/types/view/WorkspaceItemView";
import { NextResponse } from "next/server";

export async function GET(): APIResponse<WorkspaceItemView[]> {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const workspaces: WorkspaceItemView[] = await WorkspaceService.getWorkspacesViewByOwner(user.id);
        return NextResponse.json(workspaces);
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(request: Request): APIResponse<Workspace> {
    try {
        const body: WorkspaceCreateDTO = await request.json();
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        const workspace: Workspace = await WorkspaceService.createWorkspace({
            ...body,
            ownerId: user.id
        });
        return NextResponse.json(workspace, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}
