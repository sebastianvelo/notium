import { Note, Workspace } from "@/types";
import React, { useState } from "react";
import NoteEditorPanel from "./editor/NoteEditorPanel";
import NotesSidebar from "./sidebar/NotesSidebar";

export interface WorkspacesNotesLayoutProps {
    workspace: Workspace;
    notes: Note[];
}

const WorkspacesNotesLayout: React.FC<WorkspacesNotesLayoutProps> = ({ workspace, notes: fnotes }) => {
    const [notes, setNotes] = useState<Note[]>(fnotes);
    const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0] || null);

    const handleCreateNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: "New Note",
            content: "",
            workspaceId: workspace.id,
            createdBy: "user1",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            sharedWith: [],
        };
        setNotes([newNote, ...notes]);
        setSelectedNote(newNote);
    };

    const handleSaveNote = (data: { title: string; content: string }) => {
        console.log("Saving note:", data);
        // TODO: Call API to save note
    };

    const handleDeleteNote = () => {
        if (selectedNote) {
            setNotes(notes.filter(n => n.id !== selectedNote.id));
            setSelectedNote(notes[0] || null);
        }
    };

    return (
        <div className="flex">
            <NotesSidebar notes={notes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} createNote={handleCreateNote} />
            <NoteEditorPanel note={selectedNote} onSave={handleSaveNote} onDelete={handleDeleteNote} />
        </div>
    );
};

export default WorkspacesNotesLayout;
