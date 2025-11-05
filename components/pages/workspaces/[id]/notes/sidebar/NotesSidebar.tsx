import Note from "@/types/Note";
import React, { useState } from "react";
import NotesSidebarActions from "./actions/NotesSidebarActions";
import NotesSidebarBody from "./list/NotesSidebarBody";

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

    const myNotes = filteredNotes.filter(note => note.createdBy === "usr_1");
    const sharedNotes = filteredNotes.filter(note => note.sharedWith.length > 0);

    return (
        <div className="w-80 border-r border-secondary-200 dark:border-secondary-900 flex flex-col">
            <NotesSidebarActions searchQuery={searchQuery} setSearchQuery={setSearchQuery} createNote={createNote} />
            <NotesSidebarBody myNotes={myNotes} sharedNotes={sharedNotes} filteredNotes={filteredNotes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
        </div>
    );
};

export default NotesSidebar;
