import I18n from "@/context/language/common/I18nKeys";
import NoteCreateDTO from "@/lib/dto/NoteCreateDTO";
import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import NoteRepository from "@/lib/repository/note";
import Note from "@/types/model/Note";
import NotesListSectionView from "@/types/view/NotesListSectionView";
import toNoteItemView from "../mapper/toNoteItemView";

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

    async getNotesView(workspaceId: string, userId: string, searchQuery: string = ''): Promise<NotesListSectionView[]> {
        const notes: Note[] = await this.getNotesByWorkspace(workspaceId);

        // Filtrar por búsqueda
        const filtered = notes.filter(note =>
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Agrupar
        const myNotes = filtered.filter(n => n.createdBy === userId);
        const sharedNotes = filtered.filter(n => n.sharedWith?.includes(userId));

        return [
            {
                title: I18n.WORKSPACE.NOTES.ALL,
                notes: filtered.map(toNoteItemView)
            },
            {
                title: I18n.WORKSPACE.NOTES.MY,
                notes: myNotes.map(toNoteItemView)
            },
            {
                title: I18n.WORKSPACE.NOTES.SHARED,
                notes: sharedNotes.map(toNoteItemView)
            }
        ].filter(section => section.notes.length > 0);
    },
};

export default NoteService;