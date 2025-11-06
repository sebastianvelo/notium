import { createClient } from "@/lib/db/supabase/SupabaseServer";
import NoteCreateDTO from "@/lib/dto/NoteCreateDTO";
import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import INoteRepository from "@/lib/repository/note/interface";
import Note from "@/types/Note";

class NoteRepositorySupabase implements INoteRepository {
    async findAll(): Promise<Note[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("notes")
            .select(`
                *,
                note_shares(user_id)
            `)
            .order("updated_at", { ascending: false });

        if (error) throw error;
        return this.mapToNotes(data || []);
    }

    async findById(id: string): Promise<Note | null> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("notes")
            .select(`
                *,
                note_shares(user_id)
            `)
            .eq("id", id)
            .single();

        if (error) return null;
        return this.mapToNote(data);
    }

    async findByWorkspaceId(workspaceId: string): Promise<Note[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("notes")
            .select(`
                *,
                note_shares(user_id)
            `)
            .eq("workspace_id", workspaceId)
            .order("updated_at", { ascending: false });

        if (error) throw error;
        return this.mapToNotes(data || []);
    }

    async findByCreatedBy(userId: string): Promise<Note[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("notes")
            .select(`
                *,
                note_shares(user_id)
            `)
            .eq("created_by", userId)
            .order("updated_at", { ascending: false });

        if (error) throw error;
        return this.mapToNotes(data || []);
    }

    async findSharedWithUser(userId: string): Promise<Note[]> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("note_shares")
            .select(`
                note_id,
                notes(
                    *,
                    note_shares(user_id)
                )
            `)
            .eq("user_id", userId);

        if (error) throw error;
        return data?.map(item => this.mapToNote(item.notes as any)) || [];
    }

    async create(noteData: NoteCreateDTO): Promise<Note> {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from("notes")
            .insert([{
                title: noteData.title,
                content: noteData.content,
                workspace_id: noteData.workspaceId,
                created_by: noteData.createdBy,
            }])
            .select(`
                *,
                note_shares(user_id)
            `)
            .single();

        if (error) throw error;
        return this.mapToNote(data);
    }

    async update(id: string, noteData: NoteUpdateDTO): Promise<Note | null> {
        const supabase = await createClient();
        const updateData: any = {};

        if (noteData.title !== undefined) updateData.title = noteData.title;
        if (noteData.content !== undefined) updateData.content = noteData.content;

        const { data, error } = await supabase
            .from("notes")
            .update(updateData)
            .eq("id", id)
            .select(`
                *,
                note_shares(user_id)
            `)
            .single();

        if (error) return null;
        return this.mapToNote(data);
    }

    async delete(id: string): Promise<boolean> {
        const supabase = await createClient();
        const { error } = await supabase
            .from("notes")
            .delete()
            .eq("id", id);

        return !error;
    }

    async shareWithUser(noteId: string, userId: string): Promise<Note | null> {
        const supabase = await createClient();

        // Insertar en note_shares
        const { error: shareError } = await supabase
            .from("note_shares")
            .insert([{
                note_id: noteId,
                user_id: userId,
            }]);

        if (shareError) return null;

        // Retornar la nota actualizada
        return this.findById(noteId);
    }

    async unshareWithUser(noteId: string, userId: string): Promise<Note | null> {
        const supabase = await createClient();

        // Eliminar de note_shares
        const { error: unshareError } = await supabase
            .from("note_shares")
            .delete()
            .eq("note_id", noteId)
            .eq("user_id", userId);

        if (unshareError) return null;

        // Retornar la nota actualizada
        return this.findById(noteId);
    }

    // Helpers para mapear snake_case a camelCase
    private mapToNote(data: any): Note {
        return {
            id: data.id,
            title: data.title,
            content: data.content,
            workspaceId: data.workspace_id,
            createdBy: data.created_by,
            sharedWith: data.note_shares?.map((share: any) => share.user_id) || [],
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };
    }

    private mapToNotes(data: any[]): Note[] {
        return data.map(item => this.mapToNote(item));
    }
}

export default new NoteRepositorySupabase();