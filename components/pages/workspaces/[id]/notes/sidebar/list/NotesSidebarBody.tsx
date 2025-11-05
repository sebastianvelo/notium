import Text from "@/components/ui/atoms/text/Text";
import I18n from "@/context/language/common/I18nKeys";
import Note from "@/types/Note";
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
                title={I18n.WORKSPACE.NOTES.MY}
                notes={myNotes}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
            />
            <NotesSidebarListSection
                title={I18n.WORKSPACE.NOTES.SHARED}
                notes={sharedNotes}
                selectedNote={selectedNote}
                setSelectedNote={setSelectedNote}
            />
            {filteredNotes.length === 0 && (
                <Text size="sm" align="center" className="py-4" t={I18n.WORKSPACE.NOTES.EMPTY} />
            )}
        </div>
    );
};

export default NotesSidebarBody;
