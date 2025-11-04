import { Note } from "@/types";
import React, { useState } from "react";
import NotesSidebarActions from "./NotesSidebarActions";
import NotesSidebarList from "./NotesSidebarList";

export interface NotesSidebarProps {
    notes: Note[];
    createNote: () => void;
    selectedNote: Note | null;
    setSelectedNote: (value: Note) => void;
}

const NotesSidebar: React.FC<NotesSidebarProps> = ({ createNote, notes, selectedNote, setSelectedNote }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const myNotes = filteredNotes.filter(note => note.createdBy === "user1");
    const sharedNotes = filteredNotes.filter(note => note.sharedWith.length > 0);

    return (
        <div className="w-80 border-r border-secondary-200 dark:border-secondary-900 flex flex-col">
            <NotesSidebarActions searchQuery={searchQuery} setSearchQuery={setSearchQuery} createNote={createNote} />
            <div className="flex-1 overflow-y-auto">
                <NotesSidebarList
                    title="MyNotes"
                    notes={myNotes}
                    selectedNote={selectedNote}
                    setSelectedNote={setSelectedNote}
                />
                <NotesSidebarList
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
        </div>
    );
};

export default NotesSidebar;
