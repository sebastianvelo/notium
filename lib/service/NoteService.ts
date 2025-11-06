import NoteCreateDTO from "@/lib/dto/NoteCreateDTO";
import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import NoteRepository from "@/lib/repository/note";
import Note from "@/types/Note";

const NoteService = {
    getAllNotes(): Promise<Note[]> {
        return NoteRepository.findAll();
    },

    getNoteById(id: string): Promise<Note | null> {
        return NoteRepository.findById(id);
    },

    getNotesByWorkspace(workspaceId: string): Promise<Note[]> {
        return NoteRepository.findByWorkspaceId(workspaceId);
    },

    getNotesByUser(userId: string): Promise<Note[]> {
        return NoteRepository.findByCreatedBy(userId);
    },

    getSharedNotesWithUser(userId: string): Promise<Note[]> {
        return NoteRepository.findSharedWithUser(userId);
    },

    async getAllAccessibleNotes(userId: string): Promise<Note[]> {
        const ownedNotes = await this.getNotesByUser(userId);
        const sharedNotes = await this.getSharedNotesWithUser(userId);

        // Combinar y eliminar duplicados
        const allNotes = [...ownedNotes, ...sharedNotes];
        const uniqueNotes = allNotes.filter(
            (note, index, self) => index === self.findIndex((n) => n.id === note.id)
        );

        return uniqueNotes;
    },

    createNote(data: NoteCreateDTO): Promise<Note> {
        return NoteRepository.create(data);
    },

    updateNote(id: string, data: NoteUpdateDTO): Promise<Note | null> {
        return NoteRepository.update(id, data);
    },

    deleteNote(id: string): Promise<boolean> {
        return NoteRepository.delete(id);
    },

    shareNote(noteId: string, userId: string): Promise<Note | null> {
        return NoteRepository.shareWithUser(noteId, userId);
    },

    unshareNote(noteId: string, userId: string): Promise<Note | null> {
        return NoteRepository.unshareWithUser(noteId, userId);
    },
};

export default NoteService;