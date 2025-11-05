import Note from "@/types/Note";

type NoteCreateDTO = Omit<Note, "id" | "createdAt" | "updatedAt">;

export default NoteCreateDTO;