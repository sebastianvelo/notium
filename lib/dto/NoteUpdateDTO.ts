import Note from "@/types/model/Note";

type NoteUpdateDTO = Partial<Omit<Note, "id" | "createdAt" | "workspaceId" | "createdBy">>;

export default NoteUpdateDTO;