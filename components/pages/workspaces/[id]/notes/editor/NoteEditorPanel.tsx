import React from "react";
import NoteEditorFormWrapper, { NoteEditorFormWrapperProps } from "./form/NoteEditorFormWrapper";
import NoteEditorPanelEmpty from "./NoteEditorPanelEmpty";

export interface NoteEditorPanelProps extends NoteEditorFormWrapperProps { }

const NoteEditorPanel: React.FC<NoteEditorPanelProps> = ({ note: selectedNote, onSave, onDelete }) => {
    return (
        <div className="flex-1">
            {selectedNote ? (<NoteEditorFormWrapper note={selectedNote} onSave={onSave} onDelete={onDelete} />)
                : (<NoteEditorPanelEmpty />)}
        </div>
    );
};

export default NoteEditorPanel;
