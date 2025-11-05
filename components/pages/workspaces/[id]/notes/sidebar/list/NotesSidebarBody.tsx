import { Note } from "@/types";
import React from "react";
import NotesSidebarListSection from "./NotesSidebarListSection";

export interface NotesSidebarBodyProps {
    myNotes: Note[];
    sharedNotes: Note[];
    filteredNotes: Note[];
    selectedNote: Note | null;
    setSelectedNote: (value: Note) => void;
}

const NotesSidebarBody: React.FC<NotesSidebarBodyProps> = ({ myNotes, sharedNotes, filteredNotes, selectedNote, setSelectedNote }) => {
    return (
        <div className="flex-1 overflow-y-auto">
            <NotesSidebarListSection
                title="MyNotes"
                notes={myNotes}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
            />
            <NotesSidebarListSection
                title="Shared with me"
                notes={sharedNotes}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
            />
            {filteredNotes.length === 0 && (
                <div className="text-center py-8 text-secondary-500 text-sm">
                    No notes found
                </div>
            )}
        </div>
    );
};

export default NotesSidebarBody;
