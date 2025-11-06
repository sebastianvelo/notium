import { createClient } from "@/lib/db/supabase/SupabaseServer";
import IMemberRepository from "@/lib/repository/member/interface";
import Member from "@/types/model/Member";

class MemberRepositorySupabase implements IMemberRepository {
    async findAll(): Promise<Member[]> {
        const supabase = await createClient();
        const { data, error } = await supabase.from("members").select("*");
        if (error) throw error;
        return data || [];
    }

    async findById(id: string): Promise<Member | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("members")
            .select("*")
            .eq("id", id)
            .single();

        return error ? null : data;
    }

    async findByWorkspace(workspaceId: string): Promise<Member[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("members")
            .select("*")
            .eq("workspaceId", workspaceId);

        if (error) throw error;
        return data || [];
    }

    async findByUser(userId: string): Promise<Member[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("members")
            .select("*")
            .eq("userId", userId);

        if (error) throw error;
        return data || [];
    }

    async findByUserInWorkspace(userId: string, workspaceId: string): Promise<Member | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("members")
            .select("*")
            .eq("userId", userId)
            .eq("workspaceId", workspaceId)
            .single();

        return error ? null : data;
    }

    async create(data: Omit<Member, "id">): Promise<Member> {
        const supabase = await createClient();
        const { data: inserted, error } = await supabase
            .from("members")
            .insert([data])
            .select()
            .single();

        if (error) throw error;
        return inserted;
    }

    async update(id: string, body: Partial<Omit<Member, "id">>): Promise<Member | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("members")
            .update(body)
            .eq("id", id)
            .select()
            .single();

        return error ? null : data;
    }

    async delete(id: string): Promise<boolean> {
        const supabase = await createClient();
        const { error } = await supabase.from("members").delete().eq("id", id);
        return !error;
    }
}

export default new MemberRepositorySupabase();