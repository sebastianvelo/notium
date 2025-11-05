import NoteCreateDTO from "@/lib/dto/NoteCreateDTO";
import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import NoteRepository from "@/lib/repository/providers/memory/NoteRepository";
import Note from "@/types/Note";

const NoteService = {
    getAllNotes(): Note[] {
        return NoteRepository.findAll();
    },

    getNoteById(id: string): Note | undefined {
        return NoteRepository.findById(id);
    },

    getNotesByWorkspace(workspaceId: string): Note[] {
        return NoteRepository.findByWorkspaceId(workspaceId);
    },

    getNotesByUser(userId: string): Note[] {
        return NoteRepository.findByCreatedBy(userId);
    },

    getSharedNotesWithUser(userId: string): Note[] {
        return NoteRepository.findSharedWithUser(userId);
    },

    getAllAccessibleNotes(userId: string): Note[] {
        const ownedNotes = this.getNotesByUser(userId);
        const sharedNotes = this.getSharedNotesWithUser(userId);

        // Combinar y eliminar duplicados
        const allNotes = [...ownedNotes, ...sharedNotes];
        const uniqueNotes = allNotes.filter(
            (note, index, self) => index === self.findIndex((n) => n.id === note.id)
        );

        return uniqueNotes;
    },

    createNote(data: NoteCreateDTO): Note {
        return NoteRepository.create(data);
    },

    updateNote(id: string, data: NoteUpdateDTO): Note | undefined {
        return NoteRepository.update(id, data);
    },

    deleteNote(id: string): boolean {
        return NoteRepository.delete(id);
    },

    shareNote(noteId: string, userId: string): Note | undefined {
        return NoteRepository.shareWithUser(noteId, userId);
    },

    unshareNote(noteId: string, userId: string): Note | undefined {
        return NoteRepository.unshareWithUser(noteId, userId);
    },
};

export default NoteService;