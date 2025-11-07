import { APIResponse, ParamsId } from "@/app/api/types";
import { createClient } from "@/lib/db/supabase/SupabaseServer";
import MemberService from "@/lib/service/MemberService";
import WorkspaceService from "@/lib/service/WorkspaceService";
import Member from "@/types/model/Member";
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

export async function POST(request: Request, { params }: ParamsId): APIResponse<Member> {
    const { id } = await params;

    try {
        const body = await request.json();
        const { userId, role } = body;

        if (!userId) {
            return NextResponse.json({ error: "userId is required" }, { status: 400 });
        }

        const workspace: Workspace | null = await WorkspaceService.getWorkspaceById(id);
        if (!workspace) {
            return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
        }

        const newMember: Member = await MemberService.addMember({
            userId,
            workspaceId: id,
            role: role ?? "viewer",
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