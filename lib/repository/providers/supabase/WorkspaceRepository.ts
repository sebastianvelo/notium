import { createClient } from '@/lib/db/supabase/SupabaseServer';
import WorkspaceCreateDTO from "@/lib/dto/WorkspaceCreateDTO";
import WorkspaceUpdateDTO from "@/lib/dto/WorkspaceUpdateDTO";
import { IWorkspaceRepository } from "@/lib/repository/interfaces/IWorkspaceRepository";
import Workspace, { WorkspaceStatus } from "@/types/Workspace";

class WorkspaceRepositorySupabase implements IWorkspaceRepository {
    async findAll(): Promise<Workspace[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('workspaces')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return this.mapToWorkspaces(data || []);
    }

    async findById(id: string): Promise<Workspace | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('workspaces')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return null;
        return this.mapToWorkspace(data);
    }

    async findByOwnerId(ownerId: string): Promise<Workspace[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('workspaces')
            .select('*')
            .eq('owner_id', ownerId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return this.mapToWorkspaces(data || []);
    }

    async create(workspaceData: WorkspaceCreateDTO): Promise<Workspace> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('workspaces')
            .insert([{
                name: workspaceData.name,
                description: workspaceData.description,
                owner_id: workspaceData.ownerId,
                status: WorkspaceStatus.ACTIVE,
            }])
            .select()
            .single();

        if (error) throw error;
        return this.mapToWorkspace(data);
    }

    async update(id: string, workspaceData: Partial<WorkspaceUpdateDTO>): Promise<Workspace | null> {
        const supabase = await createClient();
        const updateData: any = {};

        if (workspaceData.name !== undefined) updateData.name = workspaceData.name;
        if (workspaceData.description !== undefined) updateData.description = workspaceData.description;
        if (workspaceData.status !== undefined) updateData.status = workspaceData.status;

        const { data, error } = await supabase
            .from('workspaces')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) return null;
        return this.mapToWorkspace(data);
    }

    async delete(id: string): Promise<boolean> {
        const supabase = await createClient();
        const { error } = await supabase
            .from('workspaces')
            .delete()
            .eq('id', id);

        return !error;
    }

    // Helpers para mapear snake_case a camelCase
    private mapToWorkspace(data: any): Workspace {
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            ownerId: data.owner_id,
            status: data.status as WorkspaceStatus,
            createdAt: data.created_at,
        };
    }

    private mapToWorkspaces(data: any[]): Workspace[] {
        return data.map(item => this.mapToWorkspace(item));
    }
}

export default new WorkspaceRepositorySupabase();