import useWorkspaceNotes from "@/hooks/data/useWorkspaceNotes";
import Note from "@/types/model/Note";
import Workspace from "@/types/model/Workspace";
import React from "react";
import NoteEditorPanel from "./editor/NoteEditorPanel";
import NotesSidebar from "./sidebar/NotesSidebar";

export interface WorkspacesNotesLayoutProps {
    workspace: Workspace;
    notes: Note[];
}

const WorkspacesNotesLayout: React.FC<WorkspacesNotesLayoutProps> = ({ workspace, notes: initialNotes }) => {
    const { notes, selectedNote, setSelectedNote, createNote, updateNote, deleteNote, } = useWorkspaceNotes({ workspaceId: workspace.id, initialNotes });

    const handleSaveNote = (data: { title: string; content: string }) => {
        if (selectedNote) {
            updateNote(selectedNote.id, data);
        }
    };

    const handleDeleteNote = () => {
        if (selectedNote) {
            deleteNote(selectedNote.id);
        }
    };

    return (
        <div className="flex">
            <NotesSidebar
                notes={notes}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                createNote={createNote}
            />
            <NoteEditorPanel
                note={selectedNote}
                onSave={handleSaveNote}
                onDelete={handleDeleteNote}
            />
        </div>
    );
};

export default WorkspacesNotesLayout;