import NoteCreateDTO from "@/lib/dto/NoteCreateDTO";
import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import Note from "@/types/Note";

interface INoteRepository {
    findAll(): Promise<Note[]>;
    findById(id: string): Promise<Note | null>;
    findByWorkspaceId(workspaceId: string): Promise<Note[]>;
    findByCreatedBy(userId: string): Promise<Note[]>;
    findSharedWithUser(userId: string): Promise<Note[]>;
    create(data: NoteCreateDTO): Promise<Note>;
    update(id: string, data: NoteUpdateDTO): Promise<Note | null>;
    delete(id: string): Promise<boolean>;
    shareWithUser(noteId: string, userId: string): Promise<Note | null>;
    unshareWithUser(noteId: string, userId: string): Promise<Note | null>;
}

export default INoteRepository;