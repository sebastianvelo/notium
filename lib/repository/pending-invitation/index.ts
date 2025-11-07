import { createClient } from "@/lib/db/supabase/SupabaseServer";
import PendingInvitation from "@/types/model/PendingInvitation";
import IPendingInvitationRepository from "./interface";

class PendingInvitationRepositorySupabase implements IPendingInvitationRepository {
    async findByEmail(email: string): Promise<PendingInvitation[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("pending_invitations")
            .select("*")
            .eq("email", email.toLowerCase())
            .order("created_at", { ascending: false });

        if (error) throw error;
        return this.mapToInvitations(data || []);
    }

    async findByWorkspace(workspaceId: string): Promise<PendingInvitation[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("pending_invitations")
            .select("*")
            .eq("workspace_id", workspaceId)
            .order("created_at", { ascending: false });

        if (error) throw error;
        return this.mapToInvitations(data || []);
    }

    async create(data: Omit<PendingInvitation, "id" | "createdAt">): Promise<PendingInvitation> {
        const supabase = await createClient();
        const { data: inserted, error } = await supabase
            .from("pending_invitations")
            .insert([{
                workspace_id: data.workspaceId,
                email: data.email.toLowerCase(),
                role: data.role,
                invited_by: data.invitedBy,
            }])
            .select()
            .single();

        if (error) throw error;
        return this.mapToInvitation(inserted);
    }

    async delete(id: string): Promise<boolean> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("pending_invitations")
            .delete()
            .eq("id", id);

        return !error;
    }

    // Helpers para mapear snake_case a camelCase
    private mapToInvitation(data: any): PendingInvitation {
        return {
            id: data.id,
            workspaceId: data.workspace_id,
            email: data.email,
            role: data.role,
            invitedBy: data.invited_by,
            createdAt: data.created_at,
        };
    }

    private mapToInvitations(data: any[]): PendingInvitation[] {
        return data.map(item => this.mapToInvitation(item));
    }
}

export default new PendingInvitationRepositorySupabase();