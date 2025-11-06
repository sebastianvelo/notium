import NoteUpdateDTO from "@/lib/dto/NoteUpdateDTO";
import NoteItemView from "@/types/view/NoteItemView";
import NotesListSectionView from "@/types/view/NotesListSectionView";
import React from "react";
import NoteEditorPanel from "./editor/NoteEditorPanel";
import NotesSidebar from "./sidebar/NotesSidebar";

export interface WorkspacesNotesLayoutProps {
    sections: NotesListSectionView[];
    selectedNote: NoteItemView | null;
    setSelectedNote: (note: NoteItemView) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    createNote: () => Promise<NoteItemView>;
    updateNote: (noteId: string, data: NoteUpdateDTO) => Promise<void>;
    deleteNote: (noteId: string) => Promise<void>;
}

const WorkspacesNotesLayout: React.FC<WorkspacesNotesLayoutProps> = ({ sections, selectedNote, setSelectedNote, searchQuery, setSearchQuery, createNote, updateNote, deleteNote }) => {
    const handleSaveNote = (data: NoteUpdateDTO) => {
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
                sections={sections}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
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