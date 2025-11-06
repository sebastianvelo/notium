import Note from "@/types/model/Note";

type NoteCreateDTO = Omit<Note, "id" | "createdAt" | "updatedAt">;

export default NoteCreateDTO;