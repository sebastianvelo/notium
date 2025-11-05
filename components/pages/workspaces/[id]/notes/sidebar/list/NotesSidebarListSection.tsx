import { Note } from "@/types";
import React from "react";
import NoteItem from "./item/NoteItem";

export interface NotesSidebarListSectionProps {
    title: string;
    notes: Note[];
    selectedNote: Note | null;
    setSelectedNote: (value: Note) => void;
}

const NotesSidebarListSection: React.FC<NotesSidebarListSectionProps> = ({ title, notes, selectedNote, setSelectedNote }) => {
    return notes.length > 0 && (
        <div className="py-2">
            <div className="px-4 py-2">
                <h3 className="text-xs font-semibold text-secondary-500 uppercase">{title}</h3>
            </div>
            {notes.map(note => (
                <NoteItem
                    key={note.id}
                    note={note}
                    active={selectedNote?.id === note.id}
                    onClick={() => setSelectedNote(note)} />
            ))}
        </div>
    );
};

export default NotesSidebarListSection;
