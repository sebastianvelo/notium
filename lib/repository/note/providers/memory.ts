import NotesDB from "@/lib/db/memory/NoteDB";
import NoteCreateDTO from "@/lib/dto/NoteCreateDTO";
import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import INoteRepository from "@/lib/repository/note/interface";
import Note from "@/types/model/Note";

class NoteRepositoryMemory implements INoteRepository {
    async findAll(): Promise<Note[]> {
        return NotesDB;
    }

    async findById(id: string): Promise<Note | null> {
        return NotesDB.find((n) => n.id === id) || null;
    }

    async findByWorkspaceId(workspaceId: string): Promise<Note[]> {
        return NotesDB.filter((n) => n.workspaceId === workspaceId);
    }

    async findByCreatedBy(userId: string): Promise<Note[]> {
        return NotesDB.filter((n) => n.createdBy === userId);
    }

    async findSharedWithUser(userId: string): Promise<Note[]> {
        return NotesDB.filter((n) => n.sharedWith.includes(userId));
    }

    async create(data: NoteCreateDTO): Promise<Note> {
        const now = new Date().toISOString();
        const newNote: Note = {
            id: `note_${NotesDB.length + 1}`,
            createdAt: now,
            updatedAt: now,
            ...data,
        };
        NotesDB.push(newNote);
        return newNote;
    }

    async update(id: string, data: NoteUpdateDTO): Promise<Note | null> {
        const index = NotesDB.findIndex((n) => n.id === id);
        if (index === -1) return null;

        NotesDB[index] = {
            ...NotesDB[index],
            ...data,
            updatedAt: new Date().toISOString(),
        };
        return NotesDB[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = NotesDB.findIndex((n) => n.id === id);
        if (index === -1) return false;

        NotesDB.splice(index, 1);
        return true;
    }

    async shareWithUser(noteId: string, userId: string): Promise<Note | null> {
        const note = await this.findById(noteId);
        if (!note || note.sharedWith.includes(userId)) return note;

        return this.update(noteId, {
            sharedWith: [...note.sharedWith, userId],
        });
    }

    async unshareWithUser(noteId: string, userId: string): Promise<Note | null> {
        const note = await this.findById(noteId);
        if (!note) return null;

        return this.update(noteId, {
            sharedWith: note.sharedWith.filter((id) => id !== userId),
        });
    }
}

export default new NoteRepositoryMemory();