import Note from "@/types/Note";

type NoteUpdateDTO = Partial<Omit<Note, "id" | "createdAt" | "workspaceId" | "createdBy">>;

export default NoteUpdateDTO;