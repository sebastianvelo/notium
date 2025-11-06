import Text from "@/components/ui/atoms/text/Text";
import Note from "@/types/model/Note";
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
        <div className="py-2 space-y-2">
            <Text size="xs" weight="semibold" className="uppercase" t={title} />
            <div>
                {notes.map(note => (
                    <NoteItem
                        key={note.id}
                        note={note}
                        active={selectedNote?.id === note.id}
                        onClick={() => setSelectedNote(note)} />
                ))}
            </div>
        </div>
    );
};

export default NotesSidebarListSection;
