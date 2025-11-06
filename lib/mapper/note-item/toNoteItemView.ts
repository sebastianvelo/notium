import Note from "@/types/model/Note";
import NoteItemView from "@/types/view/NoteItemView";

const toNoteItemView = (note: Note): NoteItemView => {
    return {
        id: note.id,
        title: note.title,
        content: note.content,
        updatedAt: new Date(note.updatedAt).toLocaleDateString()
    };
};

export default toNoteItemView;