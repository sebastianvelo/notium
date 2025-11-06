import API_ROUTES from "@/constants/api.routes";
import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import fetcher from "@/lib/fetcher";
import Note from "@/types/model/Note";
import NoteItemView from "@/types/view/NoteItemView";
import NotesListSectionView from "@/types/view/NotesListSectionView";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import useWorkspace from "./useWorkspace";

const useWorkspaceNotes = () => {
  const { workspace } = useWorkspace();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const apiUrl = `${API_ROUTES.WORKSPACES.NOTES(workspace.id)}?query=${debouncedQuery}`;

  const { data: sections, error, mutate: mutateSections } = useSWR<NotesListSectionView[]>(apiUrl, fetcher);

  const selectedNote = sections?.flatMap(s => s.notes).find(n => n.id === selectedNoteId) || null;

  const createNote = useCallback(async () => {
    const res = await fetch(API_ROUTES.WORKSPACES.NOTES(workspace.id), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "", content: "" })
    });
    if (!res.ok) throw new Error("Failed to create");
    const newNote: Note = await res.json();

    await mutateSections();
    setSelectedNoteId(newNote.id);
    return newNote;
  }, [workspace.id, mutateSections]);

  const updateNote = useCallback(async (noteId: string, data: NoteUpdateDTO) => {
    const res = await fetch(API_ROUTES.NOTES.ID(noteId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Failed to update");

    await mutateSections();
  }, [mutateSections]);

  const deleteNote = useCallback(async (noteId: string) => {
    const res = await fetch(API_ROUTES.NOTES.ID(noteId), { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete");

    setSelectedNoteId(null);
    await mutateSections();
  }, [mutateSections]);

  return {
    sections: sections || [],
    selectedNote,
    setSelectedNote: (note: NoteItemView) => setSelectedNoteId(note.id || null),
    searchQuery,
    setSearchQuery,
    createNote,
    updateNote,
    deleteNote,
    isLoading: !sections && !error,
    error
  };
};

export default useWorkspaceNotes;