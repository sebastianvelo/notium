import { LoggedInRole } from "@/hooks/data/useWorkspaceMembers";
import NoteItemView from "@/types/view/NoteItemView";
import NotesListSectionView from "@/types/view/NotesListSectionView";
import React from "react";
import NotesSidebarActions from "./actions/NotesSidebarActions";
import NotesSidebarListSection from "./list/NotesSidebarListSection";

export interface NotesSidebarProps {
    sections: NotesListSectionView[];
    createNote: () => void;
    selectedNote: NoteItemView | null;
    setSelectedNote: (value: NoteItemView) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    loggedInRole: LoggedInRole;
}

const NotesSidebar: React.FC<NotesSidebarProps> = ({ createNote, sections, selectedNote, setSelectedNote, searchQuery, setSearchQuery, loggedInRole }) => {
    return (
        <div className="max-h-96 overflow-auto md:w-80 border-r border-secondary-200 dark:border-secondary-900 flex flex-col">
            <NotesSidebarActions searchQuery={searchQuery} setSearchQuery={setSearchQuery} createNote={createNote} loggedInRole={loggedInRole} />
            <div className="flex-1 overflow-y-auto">
                {sections.map((section, idx) => (
                    <NotesSidebarListSection
                        key={`notes-section-${idx}`}
                        selectedNote={selectedNote}
                        setSelectedNote={setSelectedNote}
                        {...section}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotesSidebar;
