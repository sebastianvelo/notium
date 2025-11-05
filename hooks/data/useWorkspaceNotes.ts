import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import NoteService from "@/lib/service/NoteService";
import Note from "@/types/Note";
import { useCallback, useState } from "react";

interface UseWorkspaceNotesOptions {
  workspaceId: string;
  initialNotes: Note[];
}

const useWorkspaceNotes = ({ workspaceId, initialNotes }: UseWorkspaceNotesOptions) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(initialNotes[0] || null);

  const createNote = useCallback(() => {
    const newNote = NoteService.createNote({
      title: "New Note",
      content: "",
      workspaceId,
      createdBy: "usr_1", // TODO: Obtener del contexto de auth
      sharedWith: [],
    });

    setNotes(prev => [newNote, ...prev]);
    setSelectedNote(newNote);

    return newNote;
  }, [workspaceId]);

  const updateNote = useCallback((noteId: string, data: NoteUpdateDTO) => {
    const updated = NoteService.updateNote(noteId, data);

    if (updated) {
      setNotes(prev =>
        prev.map(note => note.id === noteId ? updated : note)
      );
      if (selectedNote?.id === noteId) {
        setSelectedNote(updated);
      }
    }

    return updated;
  }, [selectedNote]);

  const deleteNote = useCallback((noteId: string) => {
    const success = NoteService.deleteNote(noteId);

    if (success) {
      setNotes(prev => prev.filter(n => n.id !== noteId));

      if (selectedNote?.id === noteId) {
        setNotes(currentNotes => {
          setSelectedNote(currentNotes[0] || null);
          return currentNotes;
        });
      }
    }

    return success;
  }, [selectedNote]);

  return {
    notes,
    selectedNote,
    setSelectedNote,
    createNote,
    updateNote,
    deleteNote,
  };
};

export default useWorkspaceNotes;