import NotesDB from "@/lib/db/memory/NoteDB";
import NoteCreateDTO from "@/lib/dto/NoteCreateDTO";
import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import Note from "@/types/Note";

const NoteRepository = {
    findAll(): Note[] {
        return NotesDB;
    },

    findById(id: string): Note | undefined {
        return NotesDB.find((n) => n.id === id);
    },

    findByWorkspaceId(workspaceId: string): Note[] {
        return NotesDB.filter((n) => n.workspaceId === workspaceId);
    },

    findByCreatedBy(userId: string): Note[] {
        return NotesDB.filter((n) => n.createdBy === userId);
    },

    findSharedWithUser(userId: string): Note[] {
        return NotesDB.filter((n) => n.sharedWith.includes(userId));
    },

    create(data: NoteCreateDTO): Note {
        const now = new Date().toISOString();
        const newNote: Note = {
            id: `note_${NotesDB.length + 1}`,
            createdAt: now,
            updatedAt: now,
            ...data,
        };
        NotesDB.push(newNote);
        return newNote;
    },

    update(id: string, data: NoteUpdateDTO): Note | undefined {
        const index = NotesDB.findIndex((n) => n.id === id);
        if (index === -1) return undefined;

        NotesDB[index] = {
            ...NotesDB[index],
            ...data,
            updatedAt: new Date().toISOString(),
        };
        return NotesDB[index];
    },

    delete(id: string): boolean {
        const index = NotesDB.findIndex((n) => n.id === id);
        if (index === -1) return false;

        NotesDB.splice(index, 1);
        return true;
    },

    shareWithUser(noteId: string, userId: string): Note | undefined {
        const note = this.findById(noteId);
        if (!note || note.sharedWith.includes(userId)) return note;

        return this.update(noteId, {
            sharedWith: [...note.sharedWith, userId],
        });
    },

    unshareWithUser(noteId: string, userId: string): Note | undefined {
        const note = this.findById(noteId);
        if (!note) return undefined;

        return this.update(noteId, {
            sharedWith: note.sharedWith.filter((id) => id !== userId),
        });
    },
};

export default NoteRepository;

