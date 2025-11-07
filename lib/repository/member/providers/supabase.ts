import { createClient } from "@/lib/db/supabase/SupabaseServer";
import IMemberRepository from "@/lib/repository/member/interface";
import Member from "@/types/model/Member";

class MemberRepositorySupabase implements IMemberRepository {
    async findAll(): Promise<Member[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("members")
            .select("*")
            .order("joined_at", { ascending: false });

        if (error) throw error;
        return this.mapToMembers(data || []);
    }

    async findById(id: string): Promise<Member | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("members")
            .select("*")
            .eq("id", id)
            .single();

        return error ? null : this.mapToMember(data);
    }

    async findByWorkspace(workspaceId: string): Promise<Member[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("members")
            .select("*")
            .eq("workspace_id", workspaceId)
            .order("joined_at", { ascending: false });

        if (error) throw error;
        return this.mapToMembers(data || []);
    }

    async findByUser(userId: string): Promise<Member[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("members")
            .select("*")
            .eq("user_id", userId)
            .order("joined_at", { ascending: false });

        if (error) throw error;
        return this.mapToMembers(data || []);
    }

    async findByUserInWorkspace(userId: string, workspaceId: string): Promise<Member | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("members")
            .select("*")
            .eq("user_id", userId)
            .eq("workspace_id", workspaceId)
            .single();

        return error ? null : this.mapToMember(data);
    }

    async create(data: Omit<Member, "id" | "joined_at">): Promise<Member> {
        const supabase = await createClient();
        const { data: inserted, error } = await supabase
            .from("members")
            .insert([{
                user_id: data.userId,
                workspace_id: data.workspaceId,
                role: data.role,
            }])
            .select()
            .single();

        if (error) throw error;
        return this.mapToMember(inserted);
    }

    async update(id: string, body: Partial<Omit<Member, "id" | "joined_at">>): Promise<Member | null> {
        const supabase = await createClient();

        const updateData: any = {};
        if (body.role !== undefined) updateData.role = body.role;
        if (body.userId !== undefined) updateData.user_id = body.userId;
        if (body.workspaceId !== undefined) updateData.workspace_id = body.workspaceId;

        const { data, error } = await supabase
            .from("members")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();

        return error ? null : this.mapToMember(data);
    }

    async delete(id: string): Promise<boolean> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("members")
            .delete()
            .eq("id", id);

        return !error;
    }

    // Helpers para mapear snake_case a camelCase
    private mapToMember(data: any): Member {
        return {
            id: data.id,
            userId: data.user_id,
            workspaceId: data.workspace_id,
            role: data.role,
            joinedAt: data.joined_at,
        };
    }

    private mapToMembers(data: any[]): Member[] {
        return data.map(item => this.mapToMember(item));
    }
}

export default new MemberRepositorySupabase();