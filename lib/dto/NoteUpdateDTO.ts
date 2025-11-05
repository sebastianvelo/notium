import Note from "@/types/Note";

type NoteUpdateDTO = Pick<Note, "title" | "content">;

export default NoteUpdateDTO;