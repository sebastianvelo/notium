import Note from "@/types/Note";
import notesJson from "../mock/notes.json";

const NotesDB: Note[] = notesJson.map((n) => ({
    ...n,
}));

export default NotesDB;
