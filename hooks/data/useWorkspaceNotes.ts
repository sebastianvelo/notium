import API_ROUTES from "@/constants/api.routes";
import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import Note from "@/types/model/Note";
import { useCallback, useState } from "react";
import { mutate } from "swr";

interface UseWorkspaceNotesOptions {
  workspaceId: string;
  initialNotes: Note[];
}

const useWorkspaceNotes = ({ workspaceId, initialNotes }: UseWorkspaceNotesOptions) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(initialNotes[0] || null);

  const createNote = useCallback(async () => {
    const res = await fetch(API_ROUTES.WORKSPACES.NOTES(workspaceId), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Note", content: "" })
    });
    if (!res.ok) throw new Error("Failed to create");
    const newNote: Note = await res.json();
    console.log(newNote)
    setNotes(prev => [newNote, ...prev]);
    setSelectedNote(newNote);
    mutate(API_ROUTES.WORKSPACES.NOTES(workspaceId));
    return newNote;
  }, [workspaceId]);

  const updateNote = useCallback(async (noteId: string, data: NoteUpdateDTO) => {
    const res = await fetch(API_ROUTES.NOTES.ID(noteId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update");
    const updated: Note = await res.json();

    setNotes(prev => prev.map(note => note.id === noteId ? updated : note));
    if (selectedNote?.id === noteId) setSelectedNote(updated);
    mutate(API_ROUTES.WORKSPACES.NOTES(workspaceId));
    return updated;
  }, [selectedNote, workspaceId]);

  const deleteNote = useCallback(async (noteId: string) => {
    const res = await fetch(API_ROUTES.NOTES.ID(noteId), { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    setNotes(prev => prev.filter(n => n.id !== noteId));
    setSelectedNote(null);
    mutate(API_ROUTES.WORKSPACES.NOTES(workspaceId));
    return true;
  }, [selectedNote, notes, workspaceId]);

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
