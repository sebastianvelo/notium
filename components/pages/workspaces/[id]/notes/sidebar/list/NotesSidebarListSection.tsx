import Text from "@/components/ui/atoms/text/Text";
import NoteItemView from "@/types/view/NoteItemView";
import NotesListSectionView from "@/types/view/NotesListSectionView";
import React from "react";
import NoteItem from "./item/NoteItem";

export interface NotesSidebarListSectionProps extends NotesListSectionView {
    selectedNote: NoteItemView | null;
    setSelectedNote: (value: NoteItemView) => void;
}

const NotesSidebarListSection: React.FC<NotesSidebarListSectionProps> = ({ title, notes, selectedNote, setSelectedNote }) => {
    return notes.length > 0 && (
        <div className="py-2 space-y-2">
            <Text size="xs" weight="semibold" className="uppercase" t={title} />
            <div>
                {notes.map(note => (
                    <NoteItem
                        key={note.id}
                        active={selectedNote?.id === note.id}
                        onClick={() => setSelectedNote(note)}
                        {...note}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotesSidebarListSection;
