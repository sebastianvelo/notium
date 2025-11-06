import { useCallback, useState } from "react";
import { mutate } from "swr";
import Note from "@/types/Note";

interface UseWorkspaceNotesOptions {
  workspaceId: string;
  initialNotes: Note[];
}

const useWorkspaceNotes = ({ workspaceId, initialNotes }: UseWorkspaceNotesOptions) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(initialNotes[0] || null);

  const createNote = useCallback(async () => {
    const res = await fetch(`/api/workspaces/${workspaceId}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Note", content: "" })
    });
    if (!res.ok) throw new Error("Failed to create");
    const newNote: Note = await res.json();
    setNotes(prev => [newNote, ...prev]);
    setSelectedNote(newNote);
    mutate(`/api/workspaces/${workspaceId}/notes`);
    return newNote;
  }, [workspaceId]);

  const updateNote = useCallback(async (noteId: string, data: any) => {
    const res = await fetch(`/api/notes/${noteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update");
    const updated: Note = await res.json();

    setNotes(prev => prev.map(note => note.id === noteId ? updated : note));
    if (selectedNote?.id === noteId) setSelectedNote(updated);
    mutate(`/api/workspaces/${workspaceId}/notes`);
    return updated;
  }, [selectedNote, workspaceId]);

  const deleteNote = useCallback(async (noteId: string) => {
    const res = await fetch(`/api/notes/${noteId}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");
    setNotes(prev => prev.filter(n => n.id !== noteId));
    if (selectedNote?.id === noteId) setSelectedNote(notes[0] || null);
    mutate(`/api/workspaces/${workspaceId}/notes`);
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
