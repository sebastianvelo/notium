import { createClient } from "@/lib/db/supabase/SupabaseServer";
import User from "@/types/User";

const UserRepository = {
    async findAll(): Promise<User[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("users")
            .select("*");

        if (error) throw error;
        return data || [];
    },

    async findById(id: string): Promise<User | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", id)
            .single();

        if (error) return null;
        return data;
    },

    async findByEmail(email: string): Promise<User | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (error) return null;
        return data;
    },

    async create(data: Omit<User, "id">): Promise<User> {
        const supabase = await createClient();
        const { data: newUser, error } = await supabase
            .from("users")
            .insert([data])
            .select()
            .single();

        if (error) throw error;
        return newUser;
    },

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
    },
};

export default UserRepository;