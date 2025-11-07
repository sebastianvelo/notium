import { createClient } from "@/lib/db/supabase/SupabaseServer";
import IUserRepository from "@/lib/repository/user/interface";
import User from "@/types/model/User";

class UserRepositorySupabase implements IUserRepository {
    async findAll(): Promise<User[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("users")
            .select("*");
        
        if (error) throw error;
        return data || [];
    }

    async findById(id: string): Promise<User | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id)
            .single();
        
        if (error) return null;
        return data;
    }

    async findByEmail(email: string): Promise<User | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();
        
        if (error) return null;
        return data;
    }

    async create(userData: User): Promise<User> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("users")
            .insert([userData])
            .select()
            .single();
        
        if (error) throw error;
        return data;
    }

    async update(id: string, userData: Partial<Omit<User, "id">>): Promise<User | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("users")
            .update(userData)
            .eq("id", id)
            .select()
            .single();
        
        if (error) return null;
        return data;
    }

    async upsertFromAuth(authUser: any): Promise<User> {
        const supabase = await createClient();
        const userData = {
            id: authUser.id,
            email: authUser.email!,
            name: authUser.user_metadata?.full_name || authUser.email!.split("@")[0],
            avatar: authUser.user_metadata?.avatar_url,
        };

        const { data, error } = await supabase
            .from("users")
            .upsert([userData], { onConflict: "id" })
            .select()
            .single();
        
        if (error) throw error;
        return data;
    }
}

export default new UserRepositorySupabase();